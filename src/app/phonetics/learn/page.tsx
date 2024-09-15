'use client'

import { ActionButton, IPATables, Spinner } from "@/components"
import SyllableTree from "@/components/SyllableTree"
import speakWord from "@/utils/speak"
import { ChangeEvent, useState } from 'react'

export default function LearnPhonetic() {
    const [queryWord, setQueryWord] = useState<string>("")
    const [queryWordPhonetic, setQueryWordPhonetic] = useState<string | undefined>()
    const [queryWordSyllables, setQueryWordSyllables] = useState()
    const [queryLoading, setQueryLoading] = useState<boolean>(false)
    const [newPhonetic, setNewPhonetic] = useState<string>("")
    const [newLoading, setNewLoading] = useState<boolean>(false)

    const handleQueryWordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setQueryWord(value.replace(/[^a-z]/gi, ''))
        setQueryWordPhonetic(undefined)
        setNewPhonetic("")
    }

    const handleQueryWord = async () => {
        if (queryWord) {
            setQueryLoading(true)
            try {
                const response = await fetch(`/api/phonetic?query=${queryWord}`, { method: 'GET' })

                if (!response.ok) {
                    throw response.statusText
                }
                const result = await response.json()

                setQueryWordPhonetic(result.phonetic.phonetic)
                setQueryWordSyllables(result.syllables)
                setQueryLoading(false)
            } catch (error) {
                console.error('Something went wrong\n', error)
                setQueryLoading(false)
            }
        }
    }

    const handlePhoneticChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setNewPhonetic(value)
    }

    const addPhonetic = async () => {
        if (newPhonetic) {
            setNewLoading(true)
            try {
                const response = await fetch('/api/phonetic',
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            word: queryWord,
                            phonetic: newPhonetic
                        })
                    })
                if (response.ok) {
                    setNewLoading(false)
                    setQueryWordPhonetic(newPhonetic)
                }
            } catch (error) {
                console.error(error)
                setNewLoading(false)
            }
        }
    }

    const handleSpeak = () => {
        if (queryWordPhonetic) {
            speakWord(queryWordPhonetic, true)
        }
    }

    return (
        <div className="flex flex-col w-full h-full justify-center">
            <div className="flex h-1/4 justify-center pt-5 justify-center gap-10">
                <div className="flex">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <label htmlFor="search" className="block mb-2 text-sm font-medium text-white">Phonetic Lookup</label>
                            <input type="text" id="search" value={queryWord} onChange={handleQueryWordChange} placeholder="Word"
                                className="block w-full p-2 border rounded-lg text-sm focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" />
                        </div>
                        <div className="flex">
                            {queryLoading ?
                                <Spinner />
                                :
                                <ActionButton action={handleQueryWord} text="Search" actionOnEnter={true} />
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="result" className="block mb-2 text-sm font-medium text-white">Result</label>
                        <input type="text" id="result" defaultValue={queryWordPhonetic}
                            className="block w-full p-2 border rounded-lg text-sm focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" readOnly />
                    </div>
                    <div className="flex">
                        <ActionButton action={handleSpeak} text="Speak" />
                    </div>
                    {queryWordPhonetic === queryWord &&
                        <div className="flex flex-col">
                            <div className="mt-3">
                                <label htmlFor="new" className="block mb-2 text-sm font-medium text-white">New Phonetic</label>
                                <input type="text" id="new" value={newPhonetic} onChange={handlePhoneticChange}
                                    className="block w-full p-2 border rounded-lg text-sm focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" />
                            </div>
                            {/* <div className="flex">
                                {newLoading ?
                                    <Spinner />
                                    :
                                    <ActionButton action={addPhonetic} text="Add" />
                                }
                            </div> */}
                        </div>
                    }
                </div>
            </div>
            <div className="flex h-3/4 w-full justify-center">
                {/* <IPATables /> */}
                {queryWordPhonetic && queryWordSyllables ?
                    <SyllableTree phonetic={queryWordPhonetic} syllables={queryWordSyllables} />
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}