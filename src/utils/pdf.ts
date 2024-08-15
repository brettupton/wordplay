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

            // Group text items by lines based on their vertical position
            const lines: string[] = []
            let currentLine: string[] = []
            let lastY: null | number = null
            const lineThreshold = 5

            textContent.items.forEach(item => {
                if ('str' in item) {
                    // Group text items into lines
                    if (lastY === null || Math.abs(lastY - item.transform[5]) < lineThreshold) {
                        currentLine.push(item.str)
                    } else {
                        lines.push(currentLine.join(' '))
                        currentLine = [item.str]
                    }
                    lastY = item.transform[5]
                }
            })

            // Add last line
            if (currentLine.length > 0) {
                lines.push(currentLine.join(' '))
            }

            combinedText += lines.join('\n') + '\n'
        }

        return combinedText
    } catch (error) {
        console.error('Error extracting text:', error)
        throw error
    }
}