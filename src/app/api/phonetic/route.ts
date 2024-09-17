import path from 'path'
import fs from 'fs'
import { NextResponse, type NextRequest } from 'next/server'
import getPDFText from '@/utils/pdf'
import fileSys from '@/utils/fileSys'
import sqlDB from '@/utils/sqlDB'
import { tokenizer } from '@/utils/tokenizer'
import splitSyllables from '@/utils/syllables'

const cmuDB = new sqlDB('cmu')

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (query) {
        try {
            const queryResult = await cmuDB.queryOne(query)
            const syllables = splitSyllables(queryResult)

            return new Response(JSON.stringify({ queryResult, syllables }), { status: 200 })
        } catch (err: any) {
            return new Response(err, { status: 400 })
        }
    }

    return new Response('No request query', { status: 400 })
}

// export async function PUT(request: NextRequest) {
//     const res = await request.json()
//     const { word, phonetic } = res

//     try {
//         await addPhonetic(word.toUpperCase(), phonetic)

//         return new Response('', { status: 201 })
//     } catch (err: any) {
//         return new Response(err, { status: 200 })
//     }
// }

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const uploadPath = path.join(process.cwd(), 'public', 'uploads')

        try {
            const text = await getPDFText(file)
            let phoneticText = text
            const uniqueWordTokens = tokenizer.wordTokens('unique')
            const phonetics = await cmuDB.queryMany(uniqueWordTokens)

            phonetics.forEach(ipa => {
                const [word, phonetic] = ipa
                phoneticText = phoneticText.replace(new RegExp(`\\b${word}\\b`, 'g'), phonetic)
            })

            const merged = text.split("\n").reduce(function (arr, v, i) {
                //@ts-ignore
                return arr.concat(v, phoneticText.split("\n")[i])
            }, [])

            await fileSys.delDir(uploadPath)
            fs.writeFile(path.join(uploadPath, `${file.name.split(".")[0]}.txt`), text, 'utf-8', (err) => {
                if (err) {
                    resolve(NextResponse.error())
                }
            })

            resolve(NextResponse.json({ phoneticText, merged }))
        } catch (err) {
            resolve(err)
        }
    })

}