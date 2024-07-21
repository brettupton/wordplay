import { NextResponse } from 'next/server'
import countNGrams from '@/utils/_n-gram'
import getPDFText from '@/utils/pdf'

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File

        const text = await getPDFText(file)
        const nGrams = countNGrams(text, 2)

        resolve(NextResponse.json({ nGrams, raw: text }))
    })
}