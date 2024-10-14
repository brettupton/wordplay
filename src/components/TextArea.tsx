'use client'

interface TextAreaProps {
    text: string | string[] | string[][]
}

export default function TextArea({ text }: TextAreaProps) {
    const textDisplay = () => {
        if (Array.isArray(text) && Array.isArray(text[0])) {
            return (
                text.map((element, index) => (
                    <div className="flex flex-col px-2" key={index}>
                        <div className="flex">
                            {element[0]}
                        </div>
                        <div className="flex justify-center text-xs text-gray-400">
                            {element[1]}
                        </div>
                    </div>
                ))
            )
        } else if (Array.isArray(text)) {
            return (
                text.map((element, index) => (
                    <div className="flex flex-col px-2" key={index}>
                        <div className="flex">
                            {element}
                        </div>
                    </div>
                ))
            )
        } else {
            return (
                <div className="flex">
                    {text}
                </div>
            )
        }
    }

    return (
        <div
            className="flex flex-wrap h-[calc(100vh-9rem)] overflow-y-scroll leading-tight block p-2.5 w-full text-sm bg-gray-700 rounded-lg border border-gray-600 focus:ring-gray-500 focus:border-gray-500">
            {textDisplay()}
        </div>
    )
}