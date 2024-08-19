interface TextAreaProps {
    text: string[]
    alternate?: boolean
}

export default function TextArea({ text, alternate }: TextAreaProps) {
    return (
        <div
            className="h-[calc(100vh-9rem)] overflow-y-scroll leading-tight block p-2.5 w-full text-sm bg-gray-700 rounded-lg border border-gray-600 focus:ring-gray-500 focus:border-gray-500">
            {text.map((line, index) => (
                <div key={index} className={`${alternate ? (index % 2) === 1 ? 'text-gray-400 mb-2' : 'text-white' : 'text-white'}`}>
                    {line}
                </div>
            ))}
        </div>
    )
}