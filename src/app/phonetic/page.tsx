import Image from "next/image"
import PhoneticLogo from '../../../public/images/phonetics.png'
import LinkButton from "@/components/LinkButton"

export default function Phonetic() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex w-full justify-center mt-20">
                <Image
                    src={PhoneticLogo}
                    width={400}
                    height={400}
                    alt="Phonetics Logo"
                />
            </div>
            <div className="flex flex-col w-full h-1/2 justify-center items-center">
                <div className="flex flex-col items-stretch w-full max-w-xs">
                    <LinkButton href="phonetic/read" text="Read" />
                    <LinkButton href="phonetic/learn" text="Learn" />
                </div>
            </div>
        </div>
    )
}