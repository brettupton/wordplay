import Link from "next/link"

export default function Home() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col items-stretch w-full max-w-xs">
        <Link href="/frequency" className="text-center text-center relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Frequency
          </span>
        </Link>
        <Link href="/markov" className="text-center relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Markov Chain
          </span>
        </Link>
        <Link href="/n-gram" className="text-center relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
            N-gram
          </span>
        </Link>
        <Link href="/" className="text-center relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Cluster
          </span>
        </Link>
        <Link href="/" className="text-center relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Complexity
          </span>
        </Link>
      </div>
    </div>
  )
}
