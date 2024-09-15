'use client'

import { ActionButton, FileForm, TextArea, Spinner } from '@/components'
import { ChangeEvent, useState } from "react"


export default function Markov() {
    const [tokens, setTokens] = useState<string[]>([])
    const [chain, setChain] = useState<string>("")
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [isSubArray, setIsSubArray] = useState<boolean>(false)
    const [chainLength, setChainLength] = useState<number>(15)
    const [isChainLoading, setIsChainLoading] = useState<boolean>(false)

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setChainLength(Number(value))
    }

    const handlePrefixChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        if (isSubArr(tokens, value.split(","))) {
            setIsSubArray(true)
        } else {
            setIsSubArray(false)
        }
        setSelectedWords(value.split(","))
    }

    const updateStates = (result: APIResult) => {
        setTokens(result.tokens as string[])
        setChain(result.chain as string)
        setSelectedWords(result.examplePrefix as string[])
    }

    const handleChainSubmit = async () => {
        if (!isSubArray) return

        try {
            setIsChainLoading(true)
            const response = await fetch(`/api/markov?chainLength=${chainLength}&prefix=${selectedWords}`, { method: "GET" })

            if (response.ok) {
                const result: APIResult = await response.json()

                setChain(result.chain as string)
                setIsChainLoading(false)
            } else {
                throw new Error(response.statusText)
            }
        } catch (error) {
            setIsChainLoading(false)
            console.error(error)
        }
    }

    const handleRefresh = () => {
        setChain("")
        setTokens([])
        setSelectedWords([])
        setChainLength(15)
        setIsChainLoading(false)
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

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {tokens.length <= 0
                ?
                <FileForm updateStates={updateStates} route="markov" />
                :
                <div className="flex w-full max-w-100 space-x-4 justify-between">
                    <div className="flex-1">
                        <TextArea text={tokens} variant="markov" />
                    </div>
                    <div className="flex-1">
                        <div className="relative border-2 border-white p-5 m-5 w-72 h-15">
                            <div className="absolute -top-3 left-3 bg-black px-1 text-sm">
                                Prefix
                            </div>
                            <div className="content">
                                <input type="text"
                                    className={`bg-transparent p-1 rounded border ${isSubArray ? 'border-green-500 focus:outline-none focus:ring-0 focus:border-green-500"' : 'border-red-500 focus:outline-none focus:ring-0 focus:border-red-500'}`}
                                    defaultValue={selectedWords} onChange={handlePrefixChange} />
                            </div>
                        </div>
                        <div className="relative border-2 border-white p-5 m-5 w-72 h-48">
                            <div className="absolute -top-3 left-3 bg-black px-1 text-sm">
                                Chain
                            </div>
                            <div className="content">
                                {isChainLoading ?
                                    <Spinner />
                                    :
                                    chain
                                }
                            </div>
                        </div>
                        <div className="flex">
                            <div className="relative w-1/4">
                                <label htmlFor="length" className="block mb-2 text-sm font-medium text-white">Length = {chainLength}</label>
                                <input id="length" type="range" min="10" max="30" onChange={handleLengthChange} defaultValue={chainLength} step="1" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <ActionButton action={handleChainSubmit} text="Generate" />
                        </div>
                        <div className="flex justify-start">
                            <ActionButton action={handleRefresh} text="Refresh" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
