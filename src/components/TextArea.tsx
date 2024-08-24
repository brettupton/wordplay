'use client'

import { useEffect, useState } from "react"

interface TextAreaProps {
    text: string[]
    variant: "none" | "alternate" | "markov"
}

export default function TextArea({ text, variant }: TextAreaProps) {
    const [displayText, setDisplayText] = useState<string[] | string[][]>([])
    const [selection, setSelection] = useState<string[]>([])

    useEffect(() => {
        setDisplayText(calculateLines(text.flat()))
    }, [])

    const calculateLines = (text: string[]) => {
        const lines: string[][] = []
        let line: string[] = []

        text.forEach(word => {
            if (word.indexOf(".") > -1) {
                line.push(word + " ")
                lines.push(line)
                line = []
            } else {
                line.push(word + " ")
            }
        })

        return lines
    }

    return (
        <div
            className="h-[calc(100vh-9rem)] overflow-y-scroll leading-tight block p-2.5 w-full text-sm bg-gray-700 rounded-lg border border-gray-600 focus:ring-gray-500 focus:border-gray-500">
            {displayText.map((line, index) => (
                <div key={index} className={`${variant === "alternate" ? (index % 2) === 1 ? 'text-gray-400 mb-2' : 'text-white' : 'text-white'}`}>
                    {line}
                </div>
            ))}
        </div>
    )
}