import { FixedSizeGrid as Grid } from 'react-window'
import { useState, useEffect } from 'react'

interface TableProps {
    data: [string, number][]
    labels: string[]
}

export default function Table({ data, labels }: TableProps) {
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 })

    let tableData = data

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

    const handleSort = (col: number) => {
        if (typeof tableData[0][col] === 'number') {
            const sortedArray = tableData.sort((a, b) => {
                return (b[col] as number) - (a[col] as number)
            })

            tableData = [...sortedArray]
        }
    }

    return (
        <div>
            <div className='flex justify-around text-gray-200 uppercase border-b bg-gray-600 p-1'>
                <div className='flex w-full px-5'>
                    {labels[0]}
                    <button onClick={() => handleSort(0)}>
                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                    </button>
                </div>
                <div className='flex w-full justify-center'>
                    {labels[1]}
                    <button onClick={() => handleSort(1)}>
                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <Grid
                columnCount={2}
                columnWidth={windowSize.width / 4 - 10}
                height={windowSize.height - 175}
                rowCount={data.length}
                rowHeight={35}
                width={windowSize.width / 2}>
                {({ columnIndex, rowIndex, style }) => (
                    <div style={style} className={`text-${columnIndex === 0 ? 'start' : 'center'} px-5 py-2 border-b border-white text-sm`}>
                        {columnIndex === 0 ?
                            tableData[rowIndex][0]
                            :
                            tableData[rowIndex][1]
                        }
                    </div>
                )}
            </Grid>
        </div>
    )
}