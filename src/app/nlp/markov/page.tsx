'use client'

import { FileForm, TextArea } from '@/components'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FixedSizeGrid as Grid } from 'react-window'

interface WindowSize {
    width: number
    height: number
}

export default function Markov() {
    const [tokens, setTokens] = useState<string[]>([])
    const [text, setText] = useState<string>("")
    const [chain, setChain] = useState<string>("")
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [chainLength, setChainLength] = useState<number>(20)
    const [sentence, setSentence] = useState<string>("")
    const [isChainLoading, setIsChainLoading] = useState<boolean>(false)
    const [windowSize, setWindowSize] = useState<WindowSize>(
        {
            width: 0,
            height: 0
        })
    const [columnCount, setColumnCount] = useState<number>(8)

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const handleWordChange = (word: string) => {
        if (selectedWords.length === 0) {
            setSelectedWords([word])
        } else {
            const checkArr = [...selectedWords, word]
            if (isSubArr(tokens, checkArr)) {
                setSelectedWords(checkArr)
            }
        }
    }

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        setChainLength(Number(value))
    }

    const handleWordReset = () => {
        setSelectedWords([])
        setSentence("")
    }

    const updateStates = (result: any) => {
        setText(result.text)
        setChain(result.chain)
    }

    const handleChainSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (selectedWords.length <= 0) return

        setIsChainLoading(true)

        const formData = new FormData()
        formData.append('selected', JSON.stringify(selectedWords))
        formData.append('chainLength', chainLength.toString())

        try {
            const response = await fetch('/api/markov', {
                method: 'POST',
                body: formData
            })
            const result = await response.json()
            setSentence(result.chain)
            setIsChainLoading(false)
        } catch (error) {
            console.error('Error creating chain:', error)
        }
    }

    const handleRefresh = () => {
        setTokens([])
        setSelectedWords([])
        setChainLength(5)
        setSentence("")
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
            {text.length <= 0
                ?
                <FileForm updateStates={updateStates} route="markov" />
                :
                <div className="flex w-full max-w-100 space-x-4 justify-between">
                    <div className="flex-1">
                        <TextArea text={text.split("\n")} />
                    </div>
                    <div className="flex-1 border border-white rounded">
                        {chain}
                    </div>
                </div>
            }
        </div>
    )
}
