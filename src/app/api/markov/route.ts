import { NextRequest } from 'next/server'
import path from 'path'
import fileSys from '@/utils/fileSys'
import { createChain } from '@/utils/_markov'
import Tokenizer from '@/utils/_tokenizer'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const chainLength = Number(searchParams.get('chainLength'))
        const prefix = searchParams.get('prefix')

        const text = await fileSys.readDir(path.join(process.cwd(), 'public', 'uploads'))
        const chain = await createChain(text, prefix!.split(","), chainLength)

        return new Response(JSON.stringify({ chain }), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        const text = await fileSys.getFileText(file)
        const tokens = new Tokenizer(text).punctTokens()

        const exampleStart = Math.floor(Math.random() * tokens.length)
        const examplePrefix = tokens.slice(exampleStart, exampleStart + 3)

        const chain = await createChain(text, examplePrefix, 20)

        return new Response(JSON.stringify({ tokens, chain, examplePrefix }), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}