'use client'

import { useEffect, useState } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import PDFForm from '@/components/PDFForm'

interface nGrams {
    [index: string]: {
        count: number
        nGram: string[]
    }
}

interface WindowSize {
    width: number
    height: number
}

export default function NGram() {
    const [nGramArr, setNGramArr] = useState<{ nGram: string, count: number }[]>([])
    const [text, setText] = useState<string>("")
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: window.innerWidth, height: window.innerHeight })

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const updateStates = (result: { nGrams: nGrams, raw: string }) => {
        setText(result.raw)
        const itemArr = Object.entries(result.nGrams).map(([key, value]) => ({
            nGram: value.nGram.join(', '),
            count: value.count
        }))
        setNGramArr(itemArr)
    }

    const handleRefresh = () => {
        setNGramArr([])
        setText("")
    }

    return (
        <div className="flex w-full h-full justify-center mt-5">
            {
                nGramArr.length <= 0
                    ?
                    <PDFForm updateStates={updateStates} route="n-gram" />
                    :
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <div className='flex-1 bg-gray-800 font-medium h-[calc(100vh-10rem)] m-3'>
                                <div className='flex justify-around text-gray-200 uppercase border-b bg-gray-600 p-1'>
                                    <div className='flex w-full px-5'>N-Gram</div>
                                    <div className='flex w-full justify-center'>
                                        Count
                                        <button >
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <Grid
                                    columnCount={2}
                                    columnWidth={windowSize.width / 4 - 10}
                                    height={windowSize.height - 200}
                                    rowCount={nGramArr.length}
                                    rowHeight={35}
                                    width={windowSize.width / 2}
                                >
                                    {({ columnIndex, rowIndex, style }) => (
                                        <div style={style} className={`text-${columnIndex === 1 ? 'center' : 'start'} px-5 py-2 border-b border-white text-sm`}>
                                            {columnIndex === 1 ?
                                                nGramArr[rowIndex].count
                                                :
                                                nGramArr[rowIndex].nGram
                                            }
                                        </div>
                                    )}
                                </Grid>
                            </div>
                            <div className="flex-1 h-[calc(100vh-10rem)] m-3">
                                <textarea
                                    id="content" value={text}
                                    className="h-full block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" readOnly />
                            </div>
                        </div>
                        <div className='flex justify-center'>
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