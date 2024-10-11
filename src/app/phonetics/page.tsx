import Image from "next/image"
import { WordCloud } from "@/components"

export default function Phonetic() {
    const routes = ['read', 'learn']

    return (
        <WordCloud centerImage={
            <Image
                src='/images/phonetics.png'
                width={400}
                height={400}
                alt="Phonetics Logo"
            />
        }
            words={routes}
        />
    )
}