'use client'

import FileForm from "@/components/FileForm"
import TextArea from "@/components/TextArea"
import Table from "@/components/Table"
import { useEffect, useState } from "react"

export default function Frequency() {
    const [freq, setFreq] = useState<[string, number][]>([])
    const [text, setText] = useState<string>("")
    const [stopWords, setStopWords] = useState<boolean>(false)
    const [casing, setCasing] = useState<boolean>(false)

    const updateStates = (result: any) => {
        setFreq(result.freq)
        setText(result.text)
    }

    const handleRefresh = () => {
        setFreq([])
        setText("")
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {
                text.length <= 0
                    ?
                    <FileForm updateStates={updateStates} route="frequency" />
                    :
                    <div className="flex flex-col w-full">
                        <div className="flex w-full max-w-100 space-x-4 justify-between">
                            <Table data={freq} labels={['Word', 'Count']} />
                            <div className="flex-1 h-[calc(100vh-16rem)]">
                                <TextArea text={text.split("\n")} />
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
        </div>
    )
}
