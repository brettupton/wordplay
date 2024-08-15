import path from 'path'
import wordFrequency from '@/utils/_frequency'
import { NextRequest } from 'next/server'
import fileSys from '@/utils/fileSys'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const text = await fileSys.getFileText(file)
        const freq = wordFrequency(text)

        return new Response(JSON.stringify({ text, freq }), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}
