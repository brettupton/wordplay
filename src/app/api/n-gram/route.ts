import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import countNGrams from '@/utils/_n-gram'
import getPDFText from '@/utils/pdf'
import { readDir, delDir } from '@/utils/fileSys'

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const nChoice = Number(formData.get('n'))
        const uploadPath = path.join(process.cwd(), 'public', 'uploads')

        if (file) {
            const text = await getPDFText(file)

            await delDir(uploadPath)
            fs.writeFile(path.join(uploadPath, `${file.name.split(".")[0]}.txt`), text, 'utf-8', (err) => {
                if (err) {
                    resolve(NextResponse.error())
                }
            })

            const nGrams = countNGrams(text, 2)

            resolve(NextResponse.json({ nGrams, raw: text }))
        } else {
            const text = await readDir(uploadPath)
            const nGrams = countNGrams(text, nChoice)
            resolve(NextResponse.json({ nGrams }))
        }
    })
}
