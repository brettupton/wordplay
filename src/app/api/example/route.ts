import { fileSys, tokenizer, sqlDB, _tag } from "@/utils"
import path from 'path'
import { NextRequest } from "next/server"

const examplePath = path.join(process.cwd(), 'public', 'examples')

export async function GET(request: NextRequest) {
    // Handle all incoming selections if example is chosen instead of uploading file
    try {
        const searchParams = request.nextUrl.searchParams
        const route = searchParams.get('route') as string
        const selection = searchParams.get('selection') as string

        switch (route) {
            case "tags":
                const text = await fileSys.readFileInDir(examplePath, selection)
                const brownDB = new sqlDB('brown')
                const tokens = tokenizer.spaceTokens(text)

                const dictResults = await brownDB.queryMany(tokens) as BrownDict
                brownDB.close()

                const tags = _tag.brillTagger(dictResults, 2)
                return new Response(JSON.stringify({ tags }), { status: 200 })

            default:
                throw new Error("Route not provided. Check URL path.")
        }
    } catch (error) {
        console.error(error)
        return new Response(null, { status: 400 })
    }
}