import { useEffect } from "react"

interface ActionButtonProps {
    action: () => void
    text: string
    actionOnEnter?: boolean
}

export default function ActionButton({ action, text, actionOnEnter }: ActionButtonProps) {
    useEffect(() => {
        const clickAction = (e: KeyboardEvent) => {
            if (actionOnEnter) {
                if (e.key === "Enter") {
                    e.preventDefault()
                    document.getElementById(`${text}-button`)?.click()
                }
            }
        }
        window.addEventListener('keydown', clickAction)

        return () => {
            window.removeEventListener('keydown', clickAction)
        }
    }, [actionOnEnter, text])

    return (
        <div className="flex justify-center mt-3">
            <button
                onClick={action}
                id={`${text}-button`}
                className="border border-white rounded px-2 py-1 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                {text}
            </button>
        </div>
    )
}