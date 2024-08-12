'use client'

import ActionButton from "@/components/ActionButton"
import IPATables from "@/components/IPATables"
import Spinner from "@/components/Spinner"
import { useState, ChangeEvent } from 'react'
import IPAtoESpeak from "@/utils/_phonetic"
import meSpeak from 'mespeak'
import enUsVoice from 'mespeak/voices/en/en-us.json'
import config from 'mespeak/src/mespeak_config.json'
import { mappings } from "@/utils/info/eSpeakMap"

meSpeak.loadConfig(config);
meSpeak.loadVoice(enUsVoice);

export default function LearnPhonetic() {
    const [searchWord, setSearchWord] = useState<string>("")
    const [searchWordPhonetic, setSearchWordPhonetic] = useState<string | undefined>()
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [newPhonetic, setNewPhonetic] = useState<string>("")
    const [newLoading, setNewLoading] = useState<boolean>(false)

    const handleSearchWordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setSearchWord(value.replace(/[^a-z]/gi, ''))
        setSearchWordPhonetic(undefined)
        setNewPhonetic("")
    }

    const handleSearchWord = async () => {
        if (searchWord) {
            setSearchLoading(true)
            try {
                const response = await fetch(`/api/phonetic?query=${searchWord}`, { method: 'GET' })

                if (!response.ok) {
                    throw response.statusText
                }
                const result = await response.json()

                setSearchWordPhonetic(result.phonetic)
                setSearchLoading(false)
            } catch (error) {
                console.error('Something went wrong\n', error)
                setSearchLoading(false)
            }
        }
    }

    const handlePhoneticChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setNewPhonetic(value)
    }

    const addPhonetic = async () => {
        if (newPhonetic.length > 0) {
            setNewLoading(true)
            try {
                const response = await fetch('/api/phonetic',
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            word: searchWord,
                            phonetic: newPhonetic
                        })
                    })
                if (response.ok) {
                    setNewLoading(false)
                    setSearchWordPhonetic(newPhonetic)
                }
            } catch (error) {
                console.error(error)
                setNewLoading(false)
            }
        }
    }

    const handleSpeak = () => {
        if (searchWordPhonetic) {
            meSpeak.speak(IPAtoESpeak(searchWordPhonetic))
        }
    }

    return (
        <div className="flex flex-col w-full h-full justify-center">
            <div className="flex h-1/4 justify-center pt-5 justify-center gap-10">
                <div className="flex">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <label htmlFor="search" className="block mb-2 text-sm font-medium text-white">Phonetic Lookup</label>
                            <input type="text" id="search" value={searchWord} onChange={handleSearchWordChange} placeholder="Word"
                                className="block w-full p-2 border rounded-lg text-sm focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" />
                        </div>
                        <div className="flex">
                            {searchLoading ?
                                <Spinner />
                                :
                                <ActionButton action={handleSearchWord} text="Search" actionOnEnter={true} />
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="result" className="block mb-2 text-sm font-medium text-white">Result</label>
                        <input type="text" id="result" defaultValue={searchWordPhonetic}
                            className="block w-full p-2 border rounded-lg text-sm focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" readOnly />
                    </div>
                    <div className="flex">
                        <ActionButton action={handleSpeak} text="Speak" />
                    </div>
                    {searchWordPhonetic === searchWord &&
                        <div className="flex flex-col">
                            <div className="mt-3">
                                <label htmlFor="new" className="block mb-2 text-sm font-medium text-white">New Phonetic</label>
                                <input type="text" id="new" value={newPhonetic} onChange={handlePhoneticChange}
                                    className="block w-full p-2 border rounded-lg text-sm focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" />
                            </div>
                            <div className="flex">
                                {newLoading ?
                                    <Spinner />
                                    :
                                    <ActionButton action={addPhonetic} text="Add" />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="flex h-3/4 w-full">
                <IPATables />
            </div>
        </div>
    )
}