'use client'

import PDFForm from "@/components/PDFForm"
import { useState } from "react"

export default function Phonetic() {
    const [text, setText] = useState<string>("")
    const [phonetics, setPhonetics] = useState<string>("")

    const updateStates = (result: any) => {
        setText(result.raw)
        setPhonetics(result.phonetics)
    }


    return (
        <div className="flex w-full h-full justify-center mt-5">
            {text.length <= 0
                ? <PDFForm updateStates={updateStates} route="phonetic" />
                : <div>{text}</div>
            }
        </div>
    )
}