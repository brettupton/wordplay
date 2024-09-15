import TextOutline from "./TextOutline"

interface SyllableTreeProps {
    phonetic: string
    syllables: { onset: string, nucleus: string, coda: string }[]
}

export default function SyllableTree({ phonetic, syllables }: SyllableTreeProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <TextOutline title="Phonetic" content={phonetic} />
            </div>
            {syllables.map((syllable, index) => {
                return (
                    <div key={index} className="flex mt-3">
                        <div className="flex w-28">
                            <TextOutline title="Onset" content={syllable.onset} />
                        </div>
                        <div className="flex w-28">
                            <TextOutline title="Nucleus" content={syllable.nucleus} />
                        </div>
                        <div className="flex w-28">
                            <TextOutline title="Coda" content={syllable.coda} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}