import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import PDFParser from "pdf2json"
import { processText, createChain } from '@/utils/_markov'

export async function POST(request: Request) {
    const pdfParser = new PDFParser(null, true)

    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const split: string[] = JSON.parse(formData.get('split') as string)
        const selectedWords = JSON.parse(formData.get('selectedWords') as string)
        const chainLength = Number(formData.get('chainLength'))

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer())

            const uploadPath = path.join(process.cwd(), 'public/uploads', `${file.name}`)

            fs.writeFile(uploadPath, buffer, (err) => {
                if (err) {
                    console.error(err)
                    resolve(NextResponse.json({ error: err.message }))
                }
                pdfParser.loadPDF(uploadPath)
            })

            pdfParser.on("pdfParser_dataError", (errData) =>
                resolve(NextResponse.json({ error: errData.parserError }))
            )
            pdfParser.on("pdfParser_dataReady", async (pdfData) => {
                const text = pdfParser.getRawTextContent()
                const { split } = await processText(text)

                resolve(NextResponse.json({ split: split }))
            })
        } else {
            const sentence = await createChain(split, selectedWords, selectedWords.length, chainLength)
            resolve(NextResponse.json({ sentence: sentence }))
        }
    })
}