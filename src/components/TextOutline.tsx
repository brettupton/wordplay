import { ReactNode } from "react"

interface TextOutlineProps {
    title: string
    content: string | ReactNode
    width?: number
}

export default function TextOutline({ title, content, width }: TextOutlineProps) {
    return (
        <div className={`relative border-2 border-white p-3 m-4 w-full`}>
            <div className="absolute -top-3 left-3 bg-black px-1 text-sm">
                {title}
            </div>
            <div id="content" className="text-center">
                {content}
            </div>
        </div>
    )
}