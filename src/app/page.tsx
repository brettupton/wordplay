'use client'

import Image from 'next/image'
import WordPlayLogo from '../../public/images/wordplay.png'
import { useState, useEffect } from 'react'
import { Draw } from '@/utils/draw'
import Link from 'next/link'

export default function Home() {
    const [routes] = useState(['frequency', 'phonetics', 'markov', 'n-gram'])

    const getCircularPosition = (index: number, total: number) => {
        const angle = (index / total) * 3 * Math.PI // Evenly spaced angles
        const radius = 200 + Math.random() * 50 // Random radius from the center
        const x = radius * Math.cos(angle) // X coordinate based on the angle
        const y = radius * Math.sin(angle) // Y coordinate based on the angle
        return { x, y }
    }

    useEffect(() => {
        const updateLines = () => {
            const logo = document.getElementById('logo')
            const lines = document.querySelectorAll('#line')
            lines.forEach((line) => line.remove())

            if (logo) {
                routes.forEach((route) => {
                    const routeEle = document.getElementById(route)
                    if (routeEle) {
                        Draw.createLineBetween(document, logo, routeEle)
                    }
                })
            }
        }

        updateLines()
        window.addEventListener('resize', updateLines)

        return () => {
            window.removeEventListener('resize', updateLines)
        }
    }, [routes])

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="absolute text-3xl font-bold">
                <Image
                    className='bg-black'
                    id='logo'
                    src={WordPlayLogo}
                    height={400}
                    width={200}
                    alt='Wordplay Logo' />
            </div>
            {routes.map((word, index) => {
                const { x, y } = getCircularPosition(index, routes.length)
                return (
                    <Link
                        href={word}
                        id={word}
                        key={index}
                        className="absolute text-center inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-base font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800"
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                        }}>
                        <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {word[0].toUpperCase() + word.slice(1)}
                        </span>
                    </Link>
                );
            })}
        </div>
    )
}