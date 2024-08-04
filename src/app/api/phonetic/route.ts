import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'
import getPDFText from '@/utils/pdf'
import { delDir } from '@/utils/filesys'
import getPhonetics from '@/utils/db'
import Tokenizer from '@/utils/_tokenizer'

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