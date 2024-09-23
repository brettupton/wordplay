import { tokenizer, sqlDB } from "@/utils"
import { NextRequest } from "next/server"
import assignTags from "@/utils/brillTag"

export async function POST(request: NextRequest) {
    try {
        const sentence = await request.json()
        const brownDB = new sqlDB('brown')
        const tokens = tokenizer.wordTokens(sentence)

        const dictResults = await brownDB.queryMany(tokens) as BrownDict
        brownDB.close()

        const assigned = assignTags(dictResults)
        return new Response(JSON.stringify({ assigned }), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response(null, { status: 400 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const limit = Number(searchParams.get('limit'))
        const page = Number(searchParams.get('page'))
        const offset = (page - 1) * Math.min(100, limit)

        const brownDB = new sqlDB('brown')
        const dbResults = await brownDB.getPaginated(offset, limit)
        const totalRows = await brownDB.getNumRows()
        brownDB.close()

        return new Response(JSON.stringify({ dbResults, totalRows }), { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response(null, { status: 400 })
    }
}