import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'
import getPDFText from '@/utils/pdf'
import { delDir } from '@/utils/filesys'
import getPhonetic from '@/utils/db'
import Tokenizer from '@/utils/_tokenizer'

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const uploadPath = path.join(process.cwd(), 'public', 'uploads')

        try {
            const text = await getPDFText(file)
            const tokenizer = new Tokenizer(text)

            const wordTokens = tokenizer.wordTokens()
            const phonetics = await getPhonetic(wordTokens[0])

            await delDir(uploadPath)
            fs.writeFile(path.join(uploadPath, `${file.name.split(".")[0]}.txt`), text, 'utf-8', (err) => {
                if (err) {
                    resolve(NextResponse.error())
                }
            })

            resolve(NextResponse.json({ raw: text, phonetics }))
        } catch (err) {
            resolve(err)
        }
    })

}