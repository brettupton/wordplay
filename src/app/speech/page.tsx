'use client'

import { ActionButton } from "@/components"
import { ChangeEvent, useState } from "react"

export default function Speech() {
    const [sentence, setSentence] = useState<string>("")
    const [tokens, setTokens] = useState<string[]>([])

    const handleSentenceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setSentence(value)
    }

    const handleSentenceSubmit = async () => {
        if (sentence) {
            try {
                const response = await fetch('/api/speech', {
                    method: "POST",
                    body: JSON.stringify(sentence)
                })
                if (response.ok) {
                    const result: APIResult = await response.json()
                    if (result.tokens) {
                        setTokens(result.tokens as string[])
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="flex flex-col w-full h-full mt-5 items-center">
            <div className="flex text-black">
                <input type="text" onChange={handleSentenceChange} />
            </div>
            <div className="flex">
                {sentence}
            </div>
            <div className="flex">
                <ActionButton text="Submit" action={handleSentenceSubmit} onEnter={true} />
            </div>
        </div>
    )
}