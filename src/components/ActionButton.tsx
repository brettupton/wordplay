import { useEffect } from "react"

interface ActionButtonProps {
    action: () => void | Promise<void>
    text: string
    onEnter?: boolean
}

export default function ActionButton({ action, text, onEnter }: ActionButtonProps) {
    useEffect(() => {
        const clickAction = (e: KeyboardEvent) => {
            if (onEnter && e.key === "Enter") {
                e.preventDefault()
                document.getElementById(`${text}-button`)?.click()
            }
        }
        window.addEventListener('keydown', clickAction)

        return () => {
            window.removeEventListener('keydown', clickAction)
        }
    }, [onEnter, text])

    return (
        <div className="flex justify-center mt-3">
            <button
                onClick={action}
                id={`${text}-button`}
                className="border border-white rounded px-2 py-1 m-2 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                {text}
            </button>
        </div>
    )
}