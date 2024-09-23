'use client'

import { useState } from "react"

interface PageTableProps {
    initial: any[]
    total: number
}

export default function PageTable({ initial, total }: PageTableProps) {
    const [dbResults, setDBResults] = useState<any[]>(initial)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(100)

    const fetchPageData = async (pageNum: number) => {
        if (pageNum > 0) {
            try {
                const response = await fetch(`/api/tags?page=${pageNum}&limit=${limit}`)
                if (!response.ok) {
                    throw new Error("Error fetching data.")
                }
                const data = await response.json()
                setDBResults([...data.dbResults])
                setPage(pageNum)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Word
                        </th>
                        <th scope="col" className="px-6 py-3">
                            POS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dbResults.map((row, index) => {
                        return (
                            <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600" key={index}>
                                <td className="px-6 py-4">
                                    {row.word}
                                </td>
                                <td className="px-6 py-4">
                                    {row.pos}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{((page - 1) * limit) + 1}-{dbResults.length * page}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button onClick={() => fetchPageData(page - 1)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    </li>
                    <li hidden={page - 2 <= 0}>
                        <button onClick={() => fetchPageData(page - 2)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page - 2}</button>
                    </li>
                    <li hidden={page - 1 <= 0}>
                        <button onClick={() => fetchPageData(page - 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page - 1}</button>
                    </li>
                    <li>
                        <button onClick={() => fetchPageData(page)} aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{page}</button>
                    </li>
                    <li>
                        <button onClick={() => fetchPageData(page + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page + 1}</button>
                    </li>
                    <li>
                        <button onClick={() => fetchPageData(page + 2)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page + 2}</button>
                    </li>
                    <li>
                        <button onClick={() => fetchPageData(page + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}