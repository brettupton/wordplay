'use client'

import { useEffect, useState } from "react"

interface TextAreaProps {
    text: string[] | string[][]
    options?: {
        type: "alternate"
    }
}

export default function TextArea({ text, options }: TextAreaProps) {
    const [displayText, setDisplayText] = useState<string[] | string[][]>(text)

    // useEffect(() => {
    //     const lines = createLines(text.flat())
    //     setDisplayText([...lines])
    // }, [])

    // const createLines = (flatArr: string[]) => {
    //     const lines: string[][] = []
    //     let line: string[] = []

    //     flatArr.forEach(word => {
    //         // Check for end of sentence to push to line and create new line
    //         if (word.indexOf(".") > -1) {
    //             line.push(word + " ")
    //             lines.push(line)
    //             line = []
    //             return
    //         }
    //         line.push(word + " ")
    //     })
    //     lines.push(line)

    //     return lines
    // }

    return (
        <div
            className="h-[calc(100vh-9rem)] overflow-y-scroll leading-tight block p-2.5 w-full text-sm bg-gray-700 rounded-lg border border-gray-600 focus:ring-gray-500 focus:border-gray-500">
            {displayText.map((line, index) => (
                <div key={index} className={`${options?.type === "alternate" ? (index % 2) === 1 ? 'text-gray-400 mb-2' : 'text-white' : 'text-white'}`}>
                    {line}
                </div>
            ))}
        </div>
    )
}