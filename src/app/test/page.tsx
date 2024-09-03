'use client'
import { BinaryTree } from "@/components"
import { useState } from "react"

export default function Test() {
    const [testArray, setTestArray] = useState<any[]>(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    // const [testArray, setTestArray] = useState(new Array(31).fill(""))
    // const [testArray, setTestArray] = useState([
    //     "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    //     "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"
    // ])

    return (
        <div className="flex flex-col w-full h-full mt-5">
            <BinaryTree array={testArray} />
        </div>
    )
}