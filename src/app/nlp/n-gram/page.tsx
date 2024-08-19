'use client'

import { ChangeEvent, useState } from 'react'
import { FileForm, Table, TextArea, ActionButton, Spinner } from '@/components'

export default function NGram() {
    const [nGrams, setNGrams] = useState<[string, number][] | undefined>()
    const [text, setText] = useState<string>("")
    const [n, setN] = useState<number>(2)
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)

    const updateStates = (result: any) => {
        setNGrams(result.nGrams)
        setText(result.text)
    }

    const handleNChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { valueAsNumber } = e.currentTarget
        setN(valueAsNumber)
    }

    const fetchUpdate = async () => {
        setUpdateLoading(true)

        try {
            const response = await fetch(`/api/n-gram?n=${n}`)

            if (!response.ok) {
                throw response.statusText
            }
            const result = await response.json()
            setUpdateLoading(false)
            setNGrams([...result])
        } catch (error) {
            setUpdateLoading(false)
            console.error(error)
        }
    }

    const handleRefresh = () => {
        setNGrams(undefined)
        setText("")
        setN(2)
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {
                !nGrams
                    ?
                    <FileForm updateStates={updateStates} route="n-gram" />
                    :
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full max-w-100 space-x-4'>
                            <div className="flex justify-center w-1/2">
                                {updateLoading ?
                                    <Spinner />
                                    :
                                    <Table data={nGrams} colLabels={[`${n}-Gram`, 'Count']} />
                                }
                            </div>
                            <div className="flex-1">
                                <TextArea text={text.split("\n")} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">
                                <div className="relative w-1/4">
                                    <label htmlFor="length" className="block mb-2 text-sm font-medium text-white">n = {n}</label>
                                    <input id="length" type="range" min="2" max="5" onChange={handleNChange} onMouseUp={fetchUpdate} defaultValue={n} step="1" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <ActionButton action={handleRefresh} text="Refresh" />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}