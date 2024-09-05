'use client'
import { BinaryTree, TextOutline } from "@/components"
import splitSyllables from "@/utils/syllables"
import { useEffect, useState } from "react"

export default function Dev() {
    const [syllables, setSyllables] = useState<{ onset: string; nucleus: string; coda: string; }[]>()
    const phonetic = "suˌpɚkæˌləfræˈdʒəlɪˌstɪk"

    const createTree = () => {
        const syllables = splitSyllables(phonetic)
        setSyllables(syllables)
    }

    return (
        <div className="flex flex-col w-full h-full mt-5">
            <button onClick={createTree}>Tree</button>
            {syllables ?
                <div id="nodes" className="flex flex-col items-center">
                    <div className="flex">
                        <TextOutline title="Phonetic" content={phonetic} />
                    </div>
                    {syllables.map((syllable, index) => {
                        return (
                            <div key={index} className="flex mt-3">
                                <div className="flex" style={{ width: "114px" }}>
                                    <TextOutline title="Onset" content={syllable.onset} />
                                </div>
                                <div className="flex" style={{ width: "114px" }}>
                                    <TextOutline title="Nucleus" content={syllable.nucleus} />
                                </div>
                                <div className="flex" style={{ width: "114px" }}>
                                    <TextOutline title="Coda" content={syllable.coda} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div></div>
            }
        </div>
    )
}