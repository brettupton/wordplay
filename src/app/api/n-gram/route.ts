import { NextRequest } from 'next/server'
import path from 'path'
import nGramCount from '@/utils/_n-gram'
import fileSys from '@/utils/fileSys'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const n = Number(searchParams.get('n'))

        const text = await fileSys.readDir(path.join(process.cwd(), 'public', 'uploads'))
        const nGrams = nGramCount(text, n)

        return new Response(JSON.stringify(nGrams), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 200, statusText: error })
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const text = await fileSys.getFileText(file)
        const nGrams = nGramCount(text, 2)

        return new Response(JSON.stringify({ text, nGrams }), { status: 200 })

    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}
