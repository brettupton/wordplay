'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

interface nGrams {
    [index: string]: {
        count: number
        nGram: string[]
    }
}

export default function NGram() {
    const [file, setFile] = useState<File | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [nGrams, setNGrams] = useState<nGrams>({})

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget

        if (files) {
            setFile(files[0])
        }
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
            const response = await fetch('/api/n-gram', {
                method: 'POST',
                body: formData,
            })
            const result = await response.json()
            setNGrams(result.nGrams)
            setIsLoading(false)
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const handleSort = () => {

    }

    const handleRefresh = () => {
        setFile(undefined)
        setNGrams({})
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {isLoading
                ?
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading
                    </span>
                </div>
                : Object.keys(nGrams).length > 0
                    ?
                    <div className="flex flex-col w-1/3">
                        <div className="flex w-full max-w-100 space-x-4 justify-between">
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
                                                    <button onClick={handleSort}>
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(nGrams).map((gram, index) => (
                                            <tr className="bg-white border-b dark:bg-gray-800" key={index}>
                                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                    {nGrams[gram].nGram.map((word, key) => {
                                                        return (
                                                            <span key={key}>{word} </span>
                                                        )
                                                    })}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-white ">
                                                    {nGrams[gram].count}
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-20 mt-2 text-center">
                            <button
                                onClick={handleRefresh}
                                className="border border-white rounded p-2 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                                New
                            </button>
                        </div>
                    </div>
                    :
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
            }
        </div>
    )
}