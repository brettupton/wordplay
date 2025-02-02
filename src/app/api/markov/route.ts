import { NextRequest } from 'next/server'
import path from 'path'
import { fileSys, _markov, _nGram, tokenizer } from '@/utils'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const type = searchParams.get('type')
        const text = await fileSys.readDir(path.join(process.cwd(), 'public', 'uploads'))
        const tokens = tokenizer.punctTokens(text)

        if (type === "markov") {
            const chainLength = Number(searchParams.get('chainLength'))
            const prefix = searchParams.get('prefix')?.split("%") ?? []
            const chain = await _markov(tokens, prefix, chainLength)

            return new Response(JSON.stringify({ chain }), { status: 200 })
        } else {
            const n = Number(searchParams.get('n'))
            const nGrams = _nGram(tokens, n)

            return new Response(JSON.stringify({ nGrams }), { status: 200 })
        }
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        const text = await fileSys.getFileText(file)
        const tokens = tokenizer.punctTokens(text)
        const nGrams = _nGram(tokens, 2)

        const exampleStart = Math.floor(Math.random() * tokens.length)
        const examplePrefix = tokens.slice(exampleStart, exampleStart + 3)

        const chain = await _markov(tokens, examplePrefix, 20)

        return new Response(JSON.stringify({ text, nGrams, chain, examplePrefix }), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}