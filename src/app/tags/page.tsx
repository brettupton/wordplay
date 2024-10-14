'use client'

import { ActionButton, FileForm, LinkButton, TextArea } from "@/components"
import { useState } from "react"

export default function Tags() {
    const [tags, setTags] = useState<string[][]>([])

    const updateStates = (result: any) => {
        const alternatedTags = alternateTags(result.tags)

        const newTags = result.tags.map((tag: POSTuple) => {
            return [tag[0], tag[1]]
        })

        setTags([...newTags])
    }

    const handleRefresh = () => {
        setTags([])
    }

    const alternateTags = (tags: POSTuple[]): string[][] => {
        // Formats tag array as [[...words], [...tags]] alternating for page display
        const alternated: string[][] = []

        while (tags.length > 0) {
            const wordArr: string[] = []
            const tagArr: string[] = []
            const perIndex = tags.findIndex(([word]) => word.includes("."))

            if (perIndex === -1) break

            const sentence = tags.slice(0, perIndex + 1)
            sentence.forEach((token) => {

                wordArr.push(token[0], " ")
                tagArr.push(token[1], " ")
            })

            alternated.push(wordArr, tagArr)

            tags = tags.slice(perIndex + 1)
        }

        if (tags.length > 0) {
            const wordArr: string[] = []
            const tagArr: string[] = []
            tags.forEach((token) => {
                wordArr.push(token[0], " ")
                tagArr.push(token[1], " ")
            })

            alternated.push(wordArr, tagArr)
        }

        return alternated
    }

    return (
        <div className="flex flex-col justify-between w-full h-full mt-5">
            {tags.length <= 0 ?
                <div className="flex justify-center">
                    <FileForm updateStates={updateStates} route="tags" />
                </div>
                :
                <div className="flex flex-col w-1/2">
                    <div className="flex">
                        <TextArea text={tags} options={{ type: "alternate" }} />
                    </div>
                    <div className="flex justify-center">
                        {/* <ActionButton action={handleRefresh} text="Refresh" /> */}
                        <button onClick={handleRefresh}>Refresh</button>
                    </div>
                </div>
            }
            <div className="flex justify-end -mt-12">
                <LinkButton text="Brown Corpus" href="tags/brown" />
            </div>
        </div>
    )
}