/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react"
import { FileForm, Table, TextArea, ActionButton, Spinner } from '@/components'

export default function Frequency() {
    const [freq, setFreq] = useState<[string, number][] | undefined>()
    const [text, setText] = useState<string>("")
    const [stopWords, setStopWords] = useState<boolean>(false)
    const [casing, setCasing] = useState<boolean>(false)
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)

    useEffect(() => {
        if (freq) {
            fetchUpdate()
        }
    }, [stopWords, casing])

    const fetchUpdate = async () => {
        setUpdateLoading(true)
        try {
            const response = await fetch(`/api/frequency?stopWords=${stopWords}&casing=${casing}`)

            if (!response.ok) {
                throw response.statusText
            }
            const result = await response.json()
            setUpdateLoading(false)
            setFreq([...result])
        } catch (err) {
            setUpdateLoading(false)
            console.error(err)
        }
    }

    const updateStates = (result: any) => {
        setFreq(result.freq)
        setText(result.text)
    }

    const handleRefresh = () => {
        setFreq(undefined)
        setText("")
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {
                !freq
                    ?
                    <FileForm updateStates={updateStates} route="frequency" />
                    :
                    <div className="flex flex-col w-full">
                        <div className="flex w-full max-w-100 space-x-4 justify-between">
                            <div className="flex justify-center w-1/2">
                                {updateLoading ?
                                    <Spinner />
                                    :
                                    <Table data={freq} colLabels={['Word', 'Count']} />
                                }
                            </div>
                            <div className="flex-1 h-[calc(100vh-16rem)]">
                                <TextArea text={text.split("\n")} variant="none" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 w-full">
                                <div className="flex">
                                    <input type="checkbox" id="stop-words" checked={stopWords} onChange={() => setStopWords(!stopWords)} />
                                    <label htmlFor="stop-words" className="text-sm p-1">Stop Words</label>
                                </div>
                                <div className="flex">
                                    <input type="checkbox" id="casing" checked={casing} onChange={() => setCasing(!casing)} />
                                    <label htmlFor="casing" className="text-sm p-1">Casing</label>
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
