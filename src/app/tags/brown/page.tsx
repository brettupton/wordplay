'use client'

import { useEffect, useState } from "react"
import PageTable from "@/components/PageTable"


export default function Brown() {
    const [dbResults, setDBResults] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(100)
    const [totalRows, setTotalRows] = useState<number>(0)

    useEffect(() => {
        const getBrownDB = async (page: number, limit: number) => {
            try {
                const response = await fetch(`/api/tags?page=${page}&limit=${limit}`, { method: 'GET' })
                if (!response.ok) {
                    throw new Error('Error fetching request')
                }
                const res = await response.json()

                setDBResults([...res.dbResults])
                setTotalRows(res.totalRows)
            } catch (error) {
                console.error(error)
            }
        }

        getBrownDB(page, limit)
    }, [page, limit])

    const setTablePage = (pageNum: number) => {
        setPage(pageNum)
    }

    return (
        <div className="flex">
            <PageTable rows={dbResults} page={page} limit={limit} total={totalRows} setPage={setTablePage} />
        </div>
    )
}