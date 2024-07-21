'use client'

import { ChangeEvent, FormEvent, useState } from "react"

interface PDFFormProps {
    updateStates: (result: any) => void
    route: string
}

export default function PDFForm({ updateStates, route }: PDFFormProps) {
    const [file, setFile] = useState<File | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            const response = await fetch(`/api/${route}`, {
                method: 'POST',
                body: formData,
            })
            const result = await response.json()
            updateStates(result)
            setIsLoading(false)
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }
    return (
        <div>
            {isLoading ?
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
            }
        </div>
    )
}