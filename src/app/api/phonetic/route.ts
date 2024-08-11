import path from 'path'
import fs from 'fs'
import { NextResponse, type NextRequest } from 'next/server'
import getPDFText from '@/utils/pdf'
import { delDir } from '@/utils/filesys'
import { addPhonetic, getPhonetic, getPhonetics } from '@/utils/db'
import Tokenizer from '@/utils/_tokenizer'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (query) {
        try {
            const result = await getPhonetic(query.toUpperCase())

            return new Response(result, { status: 200 })
        } catch (err: any) {
            return new Response(err, { status: 200 })
        }
    }
}

export async function PUT(request: NextRequest) {
    const res = await request.json()
    const { word, phonetic } = res

    try {
        await addPhonetic(word.toUpperCase(), phonetic)

        return new Response('', { status: 200 })
    } catch (err: any) {
        return new Response(err, { status: 200 })
    }
}

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const uploadPath = path.join(process.cwd(), 'public', 'uploads')

        try {
            const text = await getPDFText(file)
            let phoneticText = text
            const tokenizer = new Tokenizer(text)
            const uniqueWordTokens = tokenizer.uniqueWordTokens()
            const phonetics = await getPhonetics(uniqueWordTokens)

            phonetics.forEach(ipa => {
                const { word, phonetic } = ipa
                phoneticText = phoneticText.replace(new RegExp(`\\b${word}\\b`, 'g'), phonetic)
            })

            const merged = text.split("\n").reduce(function (arr, v, i) {
                //@ts-ignore
                return arr.concat(v, phoneticText.split("\n")[i])
            }, [])

            await delDir(uploadPath)
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