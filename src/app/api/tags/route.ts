import { tokenizer, sqlDB, fileSys, _tag } from "@/utils"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const text = await fileSys.getFileText(file)

        const brownDB = new sqlDB('brown')
        const tokens = tokenizer.spaceTokens(text)

        const dictResults = await brownDB.queryMany(tokens) as BrownDict
        brownDB.close()

        const tags = _tag.brillTagger(dictResults, 3)
        return new Response(JSON.stringify({ tags }), { status: 200 })
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