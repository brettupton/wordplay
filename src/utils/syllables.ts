// TODO: Configure for open/closed syllables

const isVowel = (char: string) => {
    return (/[ɑæəɔaʊaɪɛɚeɪɪioɝʊʌɔɪʊu]/gm).test(char)
}

const isDiphthong = (char: string) => {
    return (/[aɪ|aʊ|eɪ|oʊ|ɔ]/g).test(char)
}

const splitSyllables = (phonetic: string) => {
    const syllables: { onset: string, nucleus: string, coda: string }[] = []
    let onset = ""
    let nucleus = ""
    let coda = ""
    let prevChar = ""

    for (let i = 0; i < phonetic.length; i++) {
        const char = phonetic[i]

        // Words are split into onset and rhyme (with rhyme being split into nucleus and coda)
        // Summary: Consonants -> either onset or coda depending on position in word and position with respect to nucleus
        //          Vowels -> exclusively nucleus and main component of syllable (Diphthongs are rarish types of vowels)
        if (isVowel(char)) {
            if (onset !== "") {
                if (coda !== "") {
                    syllables.push({ onset, nucleus, coda })
                    onset = ""
                    nucleus = char
                    coda = ""
                } else {
                    if (isDiphthong(prevChar + char)) {
                        nucleus += char
                    } else {
                        nucleus = char
                    }
                }
            } else {
                if (coda !== "") {
                    syllables.push({ onset, nucleus, coda })
                    onset = ""
                    nucleus = char
                    coda = ""
                } else {
                    if (isDiphthong(prevChar + char)) {
                        nucleus += char
                    } else {
                        nucleus = char
                    }
                }
            }
        } else {
            if (nucleus === "") {
                onset += char
            } else {
                coda += char
            }
        }
        // console.log(`${i}: Curr:${char} Prev:${prevChar} Onset:${onset} Nucleus:${nucleus} Coda:${coda}`)
        prevChar = char
    }
    syllables.push({ onset, nucleus, coda })

    // console.log(syllables)
    // console.log(syllables.length)
    return syllables
}

export default splitSyllables