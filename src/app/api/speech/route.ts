import { tokenizer } from "@/utils/tokenizer"
import sqlDB from "@/utils/sqlDB"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const sentence = await request.json()
        const brownDB = new sqlDB('brown')
        const tokens = tokenizer.wordTokens(sentence)

        const pos = await brownDB.queryMany(tokens)
        console.log(pos)

        return new Response(JSON.stringify({ tokens }), { status: 200 })
    } catch (error) {
        return new Response(null, { status: 400 })
    }
}