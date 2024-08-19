import path from 'path'
import { NextRequest } from 'next/server'
import wordFrequency from '@/utils/_frequency'
import fileSys from '@/utils/fileSys'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const stopWords: boolean = JSON.parse(searchParams.get('stopWords') as string)
        const casing: boolean = JSON.parse(searchParams.get('casing') as string)

        const text = await fileSys.readDir(path.join(process.cwd(), 'public', 'uploads'))
        const freq = wordFrequency(text, stopWords, casing)

        return new Response(JSON.stringify(freq), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}

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
