import { NextResponse } from 'next/server'
import getPDFText from '@/utils/pdf'
import wordFrequency from '@/utils/_frequency'

export async function POST(request: Request) {
    return new Promise(async (resolve) => {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const text = await getPDFText(file)
        const freq = wordFrequency(text)

        resolve(NextResponse.json({ freq, raw: text }))
    })
}
