import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'

export default async function getPDFText(file: File): Promise<string> {
    GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.mjs'

    try {
        const arrayBuffer = await file.arrayBuffer()
        const loadingTask = getDocument({ data: arrayBuffer })
        const pdf = await loadingTask.promise

        let combinedText = ''

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent({ includeMarkedContent: false })

            // Directly concatenate all text items without grouping
            const pageText = textContent.items
                .filter(item => 'str' in item) // Ensure item has text
                .map(item => item.str)
                .join(' ') // Join text items with a space

            combinedText += pageText + ' ' // Add a space between pages
        }

        return combinedText.trim() // Remove extra spaces at the end

        // // Group text items by lines based on their vertical position
        // const lines: string[] = []
        // let currentLine: string[] = []
        // let lastY: null | number = null
        // const lineThreshold = 2

        // textContent.items.forEach(item => {
        //     if ('str' in item) {
        //         // Group text items into lines
        //         if (lastY === null || Math.abs(lastY - item.transform[5]) < lineThreshold) {
        //             currentLine.push(item.str)
        //         } else {
        //             lines.push(currentLine.join(' '))
        //             currentLine = [item.str]
        //         }
        //         lastY = item.transform[5]
        //     }
        // })

        // // Add last line
        // if (currentLine.length > 0) {
        //     lines.push(currentLine.join(' '))
        // }

        // combinedText += lines.join('\n') + '\n' 
        // }
    } catch (error) {
        console.error('Error extracting text:', error)
        throw error
    }
}