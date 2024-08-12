// Big thanks to https://github.com/itinerarium/phoneme-synthesis for mapping and main function

import { mappings } from "./info/eSpeakMap"

export default function IPAtoESpeak(IPA: string) {
    let markedIPA = `/${IPA}/`

    for (let i = 0; i < mappings.length; i++) {
        markedIPA = markedIPA.replace(mappings[i].src, mappings[i].dest)
    }
    return (`[[${markedIPA}]]`)
}