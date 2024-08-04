'use client'

import IPATables from "@/components/IPATables"
import PDFForm from "@/components/PDFForm"
import TextArea from "@/components/TextArea"
import { useEffect, useState } from "react"

interface Phonetics {
    word: string,
    phonetic: string
}

export default function Phonetic() {
    const [phonetics, setPhonetics] = useState<string>("")
    const [merged, setMerged] = useState<string[]>([])
    const [selection, setSelection] = useState<string>("")
    const [showMerged, setShowMerged] = useState<boolean>(true)

    useEffect(() => {
        const updateSelection = () => {
            const selection = window.getSelection()

            if (selection) {
                setSelection(selection.toString())
            } else {
                setSelection("")
            }
        }

        window.addEventListener('mouseup', updateSelection)

        return function () {
            window.removeEventListener('mouseup', updateSelection)
        }
    }, [])

    const updateStates = (result: any) => {
        setPhonetics(result.phoneticText)
        setMerged([...result.merged])
    }

    const handleCheckBox = () => {
        setShowMerged(!showMerged)
    }

    const handleRefresh = () => {
        setPhonetics("")
        setMerged([])
        setShowMerged(true)
    }

    return (
        <div className="flex w-full h-full justify-center mt-5 gap-5">
            <div className="flex-1 w-1/2">
                <IPATables />
            </div>
            <div className="flex w-1/2 justify-center">
                {phonetics.length <= 0 ?
                    <PDFForm updateStates={updateStates} route="phonetic" />
                    :
                    <div className="flex flex-col">
                        <div className="flex">
                            {showMerged ?
                                <TextArea text={merged} alternate={showMerged} />
                                :
                                <TextArea text={phonetics.split("\n")} />
                            }
                        </div>
                        <div className="flex mt-1">
                            <input id="checkbox" type="checkbox" checked={!showMerged} onChange={handleCheckBox} />
                            <label htmlFor="checkbox" className="text-sm ml-2">IPA Only</label>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleRefresh}
                                className="border border-white rounded px-2 py-1 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                                New
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}