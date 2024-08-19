import { NextRequest } from 'next/server'
import path from 'path'
import fileSys from '@/utils/fileSys'
import { createChain } from '@/utils/_markov'
import Tokenizer from '@/utils/_tokenizer'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        const text = await fileSys.getFileText(file)

        const tokenizer = new Tokenizer(text)
        const tokens = tokenizer.punctTokens()
        const examplePrefix = tokens.slice(0, 5)

        const chain = await createChain(text, examplePrefix, 20)

        return new Response(JSON.stringify({ text, chain }), { status: 200 })
    } catch (error: any) {
        return new Response(null, { status: 400, statusText: error })
    }
}