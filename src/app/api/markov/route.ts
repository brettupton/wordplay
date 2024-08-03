import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import getPDFText from '@/utils/pdf'
import { readDir, delDir } from '@/utils/filesys'
import { createChain } from '@/utils/_markov'
import Tokenizer from '@/utils/_tokenizer'

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const selectedWords: string[] = JSON.parse(formData.get('selected') as string)
        const chainLength = Number(formData.get('chainLength'))
        const uploadPath = path.join(process.cwd(), 'public', 'uploads')

        if (file) {
            const text = await getPDFText(file)
            const tokenizer = new Tokenizer(text)
            const punctTokens = tokenizer.punctTokens()

            await delDir(uploadPath)
            fs.writeFile(path.join(uploadPath, `${file.name.split(".")[0]}.txt`), punctTokens.join(" "), 'utf-8', (err) => {
                if (err) {
                    resolve(NextResponse.error())
                }
            })

            resolve(NextResponse.json({ punctTokens }))
        } else {
            const wordString = await readDir(uploadPath)
            const punctTokens = wordString.split(" ")
            const chain = await createChain(punctTokens, selectedWords, chainLength)

            resolve(NextResponse.json({ chain }))
        }
    })
}