'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface words {
    [word: string]: {
        count: number
    }
}

export default function Frequency() {
    const [file, setFile] = useState<File | undefined>()
    const [freq, setFreq] = useState<words>({})
    const [text, setText] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [countDesc, setCountDesc] = useState<boolean>(false)

    useEffect(() => {
        handleSort()
    }, [countDesc])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget

        if (files) {
            setFile(files[0])
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/frequency', {
                method: 'POST',
                body: formData,
            })
            const result = await response.json()
            setFreq(result.freq)
            setText(result.raw)
            setIsLoading(false)
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const toggleSortOrder = () => {
        setCountDesc(!countDesc)
    }

    const handleSort = () => {
        const sortedEntries = Object.entries(freq).sort(([wordA, objA], [wordB, objB]) => {
            if (objA.count !== objB.count) {
                return countDesc ? objB.count - objA.count : objA.count - objB.count
            }
            return wordA.localeCompare(wordB)
        })

        const sorted = Object.fromEntries(sortedEntries)
        setFreq(sorted)
    }

    const handleRefresh = () => {
        setFreq({})
        setText("")
        setFile(undefined)
        setCountDesc(false)
    }

    return (
        <main className="flex w-full h-full justify-center mt-5">
            {
                isLoading ?
                    <div className="flex items-center flex-col justify-center">
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                        <div>
                            Reading text
                        </div>
                    </div>
                    :
                    Object.keys(freq).length <= 0
                        ?
                        <form onSubmit={handleSubmit}>
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
                        <div className="flex flex-col w-full">
                            <div className="flex w-full max-w-100 space-x-4 justify-between">
                                <div className="flex-1 h-[calc(100vh-16rem)]">
                                    <textarea
                                        id="content" value={text}
                                        className="h-full block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" readOnly />
                                </div>
                                <div className="flex-1 overflow-y-auto h-[calc(100vh-16rem)]">
                                    <table className="w-full sm:text-sm lg:text-md text-left rtl:text-right">
                                        <thead className="text-gray-200 uppercase border-b bg-gray-600 sticky top-0">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Word
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    <div className="flex items-center">
                                                        Count
                                                        <button onClick={toggleSortOrder}>
                                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(freq).map((word, index) => (
                                                <tr className="bg-white border-b dark:bg-gray-800" key={index}>
                                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                        {word}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-white ">
                                                        {freq[word].count}
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-center mt-5">
                                <button
                                    onClick={handleRefresh}
                                    className="border border-white rounded px-2 py-1 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                                    New
                                </button>
                            </div>
                        </div>
            }
        </main>
    )
}
