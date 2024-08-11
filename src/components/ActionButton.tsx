interface ActionButtonProps {
    action: () => void
    text: string
}

export default function ActionButton({ action, text }: ActionButtonProps) {
    return (
        <div className="flex justify-center mt-3">
            <button
                onClick={action}
                className="border border-white rounded px-2 py-1 hover:bg-white hover:text-black active:scale-95 transition-transform duration-75">
                {text}
            </button>
        </div>
    )
}