import Image from "next/image"
import NLPLogo from '../../../public/images/nlp.png'
import LinkButton from "@/components/LinkButton"

export default function NLP() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex w-full justify-center mt-20">
                <Image
                    src={NLPLogo}
                    width={400}
                    height={400}
                    alt="Phonetics Logo"
                />
            </div>
            <div className="flex flex-col w-full h-1/2 justify-center items-center">
                <div className="flex flex-col items-stretch w-full max-w-xs">
                    <LinkButton href="nlp/n-gram" text="N-Gram" />
                    <LinkButton href="nlp/markov" text="Markov" />
                </div>
            </div>
        </div>
    )
}