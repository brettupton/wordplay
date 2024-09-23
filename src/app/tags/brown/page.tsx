import { Suspense } from "react"
import PageTable from "@/components/PageTable"

export default async function Brown() {
    const response = await fetch(`http://localhost:3000/api/tags?page=1&limit=100`, {
        cache: 'no-store',
    })

    const { dbResults, totalRows } = await response.json()

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex">
                <PageTable initial={dbResults} total={totalRows} />
            </div>
        </Suspense>
    )
}