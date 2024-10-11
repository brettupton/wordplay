// http://korpus.uib.no/icame/manuals/BROWN/INDEX.HTM#bc6

import { Suspense } from "react"
import { sqlDB } from "@/utils"
import { Spinner, PageTable } from "@/components"

export default async function Brown() {
    const brownDB = new sqlDB('brown')
    const dbResults = await brownDB.getPaginated(0, 100)
    const totalRows = await brownDB.getNumRows()
    brownDB.close()

    return (
        <Suspense fallback={<Spinner />}>
            <div className="flex">
                <PageTable initial={dbResults} total={totalRows} />
            </div>
        </Suspense>
    )
}