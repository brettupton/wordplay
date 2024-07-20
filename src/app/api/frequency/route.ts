import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import PDFParser, { Output } from "pdf2json"
import { getDocument } from 'pdfjs-dist'
import wordFrequency from '@/utils/_frequency'
import { TextItem } from 'pdfjs-dist/types/src/display/api'

async function gettext(file: File) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let combinedText = '';

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent({ includeMarkedContent: false });

            let pageText = '';
            textContent.items.forEach(item => {
                if ('str' in item) {  // Check if item has the 'str' property
                    pageText += item.str + ' ';
                }
            });

            combinedText += pageText.trim() + '\n';
        }

        return combinedText;
    } catch (error) {
        console.error('Error extracting text:', error);
        throw error;
    }
}

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File

        console.log(await gettext(file))
        resolve(NextResponse.json({ freq: {}, raw: "" }))
    })
}
