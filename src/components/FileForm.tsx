'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import Spinner from "./Spinner"

interface FileFormProps {
    updateStates: (result: any) => void
    route: string
}

export default function FileForm({ updateStates, route }: FileFormProps) {
    const [file, setFile] = useState<File | undefined>()
    const [exSelection, setExSelection] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fileUploaded, setFileUploaded] = useState(false)

    const handleSelectionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if ("files" in e.currentTarget && e.currentTarget.files) {
            setExSelection("")
            setFile(e.currentTarget.files[0])
            setFileUploaded(true)
        } else {
            if (e.currentTarget.value === "Select") {
                setExSelection("")
                setFileUploaded(false)
            } else {
                setExSelection(e.currentTarget.value)
                setFile(undefined)
                setFileUploaded(true)
            }
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (file) {
            setIsLoading(true)

            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await fetch(`/api/${route}`, {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    setIsLoading(false)
                    setFileUploaded(false)
                    throw new Error(response.statusText)
                }
                const result: APIResult = await response.json()
                updateStates(result)
                setIsLoading(false)
                setFileUploaded(false)
            } catch (error) {
                setIsLoading(false)
                console.error('Error uploading file:', error)
            }
        }

        if (exSelection) {
            setIsLoading(true)

            try {
                const response = await fetch(`api/example?route=${route}&selection=${exSelection}`)

                if (!response.ok) {
                    setIsLoading(false)
                    setFileUploaded(false)
                    throw new Error(response.statusText)
                }

                const result: APIResult = await response.json()
                updateStates(result)
                setIsLoading(false)
                setFileUploaded(false)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    }
    return (
        <div className="flex flex-col">
            {isLoading ?
                <Spinner message="Parsing text" />
                :
                <form onSubmit={handleSubmit}>
                    <div className="flex m-4">
                        <div className="flex flex-col pr-4 text-white">
                            <label className="block text-sm font-bold mb-2" htmlFor="file">
                                Upload PDF/TXT
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
                                id="file"
                                type="file"
                                accept=".pdf, .txt"
                                onChange={handleSelectionChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="exampleSelect" className="block mb-2 text-sm font-medium text-white">Choose example</label>
                            <select
                                className="shadow appearance-none border rounded text-sm rounded-lg block w-full p-2.5 bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-white focus:border-white"
                                id="exampleSelect"
                                onChange={handleSelectionChange}
                                value={exSelection}
                            >
                                <option defaultValue={"Select"}>Select</option>
                                <option value="rotk-pg1.txt">Return of the King - Page 1</option>
                                <option value="wizard-pg1.txt">A Wizard of Earthsea - Page 1</option>
                                <option value="hobbit-pg1.txt">The Hobbit - Page 1</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex text-center justify-center">
                        <button
                            className={`border border-white rounded p-2 ${!fileUploaded ? 'cursor-not-allowed' : 'hover:bg-white hover:text-black active:scale-95 transition-transform duration-75'}`}
                            type="submit"
                            disabled={!fileUploaded}
                        >Submit</button>
                    </div>
                </form>
            }
        </div>
    )
}