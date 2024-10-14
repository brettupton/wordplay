'use client'

import { ChangeEvent, useState } from 'react'
import { FileForm, Table, ActionButton, Spinner, TextOutline } from '@/components'

export default function Markov() {
    // N-Gram
    const [nGrams, setNGrams] = useState<[string[], number][]>([])
    const [n, setN] = useState<number>(2)
    // Markov
    const [chain, setChain] = useState<string>("")
    const [prefix, setPrefix] = useState<string[]>([])
    const [isChainLoading, setIsChainLoading] = useState<boolean>(false)
    const [chainLength, setChainLength] = useState<number>(15)
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)

    const updateStates = (result: any) => {
        setChain(result.chain)
        setPrefix(result.examplePrefix)
        setNGrams(result.nGrams)
    }

    const handleNChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { valueAsNumber } = e.currentTarget
        setN(valueAsNumber)
    }

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setChainLength(Number(value))
    }

    const handleChainSubmit = async () => {
        try {
            setIsChainLoading(true)
            const response = await fetch(`/api/markov?type=markov&chainLength=${chainLength}&prefix=${prefix.join("%")}`, { method: "GET" })

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

    const handleNFetch = async () => {
        setUpdateLoading(true)

        try {
            const response = await fetch(`/api/markov?type=ngram&n=${n}`, { method: "GET" })

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const result = await response.json()
            setUpdateLoading(false)
            setNGrams(result.nGrams)
        } catch (error) {
            setUpdateLoading(false)
            console.error(error)
        }
    }

    const setSelection = (selection: string | string[]) => {
        setPrefix(selection as string[])
    }

    const handleRefresh = () => {
        setNGrams([])
        setN(2)
        setChain("")
        setChainLength(15)
        setPrefix([])
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {
                nGrams.length <= 0
                    ?
                    <FileForm updateStates={updateStates} route="markov" />
                    :
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full max-w-100 space-x-4'>
                            <div className="flex justify-center w-1/2">
                                {updateLoading ?
                                    <Spinner />
                                    :
                                    <Table data={nGrams} colLabels={[`${n}-Gram`, 'Count']} setSelection={setSelection} />
                                }
                            </div>
                            <div className="flex-1">
                                <TextOutline title="Prefix" width={72} content={prefix.join(" ")} />
                                <TextOutline title="Chain" width={72} content={
                                    isChainLoading ?
                                        <Spinner />
                                        :
                                        chain
                                } />
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
                        <div className="flex">
                            <div className="flex-1">
                                <div className="relative w-1/4">
                                    <label htmlFor="length" className="block mb-2 text-sm font-medium text-white">n = {n}</label>
                                    <input id="length" type="range" min="2" max="5" onChange={handleNChange} onMouseUp={handleNFetch} defaultValue={n} step="1" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}