import Image from 'next/image'
import Link from 'next/link'
import WordPlayLogo from '../../public/images/wordplay.png'
import LinkButton from '@/components/LinkButton'

export default function Home() {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="flex w-1/2 justify-around text-2xl">
                <div className="flex">
                    <LinkButton href="frequency" text="Frequency" />
                </div>
                <div className="flex">
                    <LinkButton href="phonetic" text="Phonetic" />
                </div>
            </div>
            <div className="flex">
                <Image
                    src={WordPlayLogo}
                    height={200}
                    width={200}
                    alt="WordPlay Logo" />
            </div>
            <div className="flex w-1/2 justify-around text-2xl">
                <div className="flex">
                    <LinkButton href="n-gram" text="N-Gram" />
                </div>
                <div className="flex">
                    <LinkButton href="markov" text="Markov" />
                </div>
            </div>
        </div>
    )
}