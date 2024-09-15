import Link from "next/link"

interface LinkButtonProps {
    href: string
    text: string
}

export default function LinkButton({ href, text }: LinkButtonProps) {
    return (
        <Link href={`/${href}`} className="text-center relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-base font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
            <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {text}
            </span>
        </Link>
    )
}