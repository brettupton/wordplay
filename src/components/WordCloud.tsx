'use client'

import { ReactElement, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface WordCloudProps {
    centerImage: ReactElement
    words: string[]
}

interface WordsPOS {
    word: string
    x: number
    y: number
}

export default function WordCloud({ centerImage, words }: WordCloudProps) {
    const [wordsPos, setWordsPos] = useState<WordsPOS[]>([])

    const pathname = usePathname()

    const getCircularPosition = (index: number) => {
        const angle = (index / words.length) * (words.length - 1) * Math.PI // Spaced angles
        const radius = 250 + Math.random() * 50 // Random radius from the center
        const x = radius * Math.cos(angle) // X coordinate based on the angle
        const y = radius * Math.sin(angle) // Y coordinate based on the angle
        return { x, y }
    }

    const updateWordPos = () => {
        const newPos: WordsPOS[] = words.map((word, index) => {
            const { x, y } = getCircularPosition(index)

            return { word, x, y }
        })
        setWordsPos([...newPos])
    }

    useEffect(() => {
        updateWordPos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="absolute text-3xl font-bold">
                {centerImage}
            </div>
            {wordsPos.map((word, index) => {
                return (
                    <Link
                        href={pathname === "/" ? word.word : pathname + '/' + word.word}
                        key={index}
                        className="absolute text-center inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-base font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800"
                        style={{
                            transform: `translate(${word.x}px, ${word.y}px)`,
                        }}>
                        <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {word.word[0].toUpperCase() + word.word.slice(1)}
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}