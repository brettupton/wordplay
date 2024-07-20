'use client'

import { ChangeEvent, CSSProperties, FormEvent, useEffect, useState } from "react"
import { FixedSizeList as List } from 'react-window'

export default function Markov() {
    const [file, setFile] = useState<File | undefined>()
    const [splitText, setSplitText] = useState<string[]>([])
    const [chunkedWords, setChunkedWords] = useState<string[][]>([])
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [chainLength, setChainLength] = useState<number>(5)
    const [sentence, setSentence] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isChainLoading, setIsChainLoading] = useState<boolean>(false)

    const chunkWords = (words: string[], size: number) => {
        const chunks = []
        for (let i = 0; i < words.length; i += size) {
            chunks.push(words.slice(i, i + size))
        }
        return chunks
    }

    useEffect(() => {
        if (splitText.length > 0) {
            setChunkedWords(chunkWords(splitText, 14))
        }
    }, [splitText])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget

        if (files) {
            setFile(files[0])
        }
    }

    const handleWordChange = (word: string) => {
        if (selectedWords.length === 0) {
            setSelectedWords([word])
        } else {
            const checkArr = [...selectedWords, word]
            if (isSubArr(splitText, checkArr)) {
                setSelectedWords(checkArr)
            }
        }
    }

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setChainLength(Number(value))
    }

    const handleWordReset = () => {
        setSelectedWords([])
        setSentence("")
    }

    const handlePDFSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/markov', {
                method: 'POST',
                body: formData,
            })
            const result = await response.json()
            setSplitText([...result.split])
            setIsLoading(false)
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const handleChainSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsChainLoading(true)

        if (!selectedWords) return

        const formData = new FormData()
        formData.append('split', JSON.stringify(splitText))
        formData.append('selectedWords', JSON.stringify(selectedWords))
        formData.append('chainLength', chainLength.toString())

        try {
            const response = await fetch('/api/markov', {
                method: 'POST',
                body: formData
            })
            const result = await response.json()
            setSentence(result.sentence)
            setIsChainLoading(false)
        } catch (error) {
            console.error('Error creating chain:', error)
        }
    }

    const handleRefresh = () => {
        setSplitText([])
        setSelectedWords([])
        setChunkedWords([])
        setChainLength(5)
        setSentence("")
        setFile(undefined)
    }

    function isSubArr(main: string[], sub: string[]) {
        if (sub.length === 0) return true
        if (sub.length > main.length) return false

        for (let i = 0; i <= main.length - sub.length; i++) {
            let found = true
            for (let j = 0; j < sub.length; j++) {
                if (main[i + j] !== sub[j]) {
                    found = false
                    break
                }
            }
            if (found) return true
        }

        return false
    }

    const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
        const currentChunk = chunkedWords[index]

        return (
            <div style={style} className="flex flex-wrap items-center justify-start">
                {currentChunk ? (
                    currentChunk.map((word, wordIndex) => (
                        <button
                            key={wordIndex}
                            onClick={() => handleWordChange(word)}
                            className={`m-1 px-3 py-1 text-white rounded ${selectedWords.includes(word) ? 'bg-blue-700' : 'bg-blue-500'}`}
                        >
                            {word}
                        </button>
                    ))
                ) : (
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading
                        </span>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {
                isLoading ?
                    <div className="flex items-center flex-col justify-center">
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading
                            </span>
                        </div>
                        <div>
                            Reading text
                        </div>
                    </div>
                    :
                    splitText.length <= 0
                        ?
                        <form onSubmit={handlePDFSubmit}>
                            <div className="w-50">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                        PDF/TXT
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="text-center">
                                    <button
                                        className="border border-white rounded p-2 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75"
                                        type="submit"
                                    >Submit</button>
                                </div>
                            </div>
                        </form>
                        :
                        <div className="flex w-full max-w-100 space-x-4 justify-between">
                            <div className="relative w-2/3 p-2 bg-gray-700 rounded-lg overflow-y-auto border border-gray-600">
                                <List
                                    height={window.innerHeight - 110}
                                    itemCount={chunkedWords.length}
                                    itemSize={40}
                                    width="100%"
                                >
                                    {Row}
                                </List>
                            </div>
                            <div className="w-1/3">
                                <div className="w-full max-w-sm mb-4 border border-white rounded-lg shadow p-6 ">
                                    <form className="space-y-6" onSubmit={handleChainSubmit}>
                                        <h5 className="text-xl font-medium text-white">Chain Options</h5>
                                        <div>
                                            <label htmlFor="word" className="block mb-2 text-sm font-medium text-white">Word(s)</label>
                                            <div className="flex">
                                                <input type="text" id="word" className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" value={selectedWords} disabled />
                                                <button type="button" className="ml-2" onClick={handleWordReset}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="length" className="block mb-2 text-sm font-medium text-white">Length</label>
                                            <input id="length" type="range" min="5" max="20" onChange={handleLengthChange} defaultValue={chainLength} step="1" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                                            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">{chainLength}</span>
                                        </div>
                                        <button type="submit" className="border border-white rounded px-2 py-1 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">Create</button>
                                    </form>
                                </div>
                                <div className="w-full max-w-sm p-6 mb-5 border border-white rounded-lg shadow">
                                    <div className="text-lg pb-5">
                                        Chain:
                                    </div>
                                    {isChainLoading ?
                                        <div
                                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                            <span
                                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                Loading...
                                            </span>
                                        </div>
                                        :
                                        <div>
                                            {sentence}
                                        </div>
                                    }
                                </div>
                                <button onClick={handleRefresh}
                                    className="border border-white rounded p-2 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                                    New
                                </button>
                            </div>
                        </div>
            }
        </div>
    )
}
