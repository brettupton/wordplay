import { fileSys, tokenizer, sqlDB, _tag, _frequency, _nGram, _markov } from "@/utils"
import path from 'path'
import { NextRequest } from "next/server"

const examplePath = path.join(process.cwd(), 'public', 'examples')

export async function GET(request: NextRequest) {
    // Handle all incoming selections if example is chosen instead of uploading file
    try {
        const searchParams = request.nextUrl.searchParams
        const route = searchParams.get('route') as string
        const selection = searchParams.get('selection') as string
        const text = await fileSys.readFileInDir(examplePath, selection)

        switch (route) {
            case "frequency":
                const freq = _frequency(text, false, false)

                return new Response(JSON.stringify({ freq, text }), { status: 200 })

            case "markov":
                const markovTokens = tokenizer.punctTokens(text)
                const nGrams = _nGram(markovTokens, 2)

                const exampleStart = Math.floor(Math.random() * markovTokens.length)
                const examplePrefix = markovTokens.slice(exampleStart, exampleStart + 3)

                const chain = await _markov(markovTokens, examplePrefix, 20)

                return new Response(JSON.stringify({ text, nGrams, chain, examplePrefix: examplePrefix.join(" ") }), { status: 200 })

            case "tags":
                const brownDB = new sqlDB('brown')
                const tagTokens = tokenizer.spaceTokens(text)

                const dictResults = await brownDB.queryMany(tagTokens) as BrownDict
                brownDB.close()

                const tags = _tag.brillTagger(dictResults, 2)
                return new Response(JSON.stringify({ tags }), { status: 200 })

            default:
                throw new Error("Route not provided. Check URL path.")
        }
    } catch (error: any) {
        console.error(error)
        return new Response(null, { status: 400, statusText: error.message })
    }
}