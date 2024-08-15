// Thanks to https://github.com/itinerarium/phoneme-synthesis for mappings and translate function

import meSpeak from 'mespeak'
import enUsVoice from 'mespeak/voices/en/en-us.json'
import config from 'mespeak/src/mespeak_config.json'
import { mappings } from "./info/eSpeakMap"

meSpeak.loadConfig(config)
meSpeak.loadVoice(enUsVoice)

const speakWord = (word: string, ipa: boolean) => {
    if (ipa) {
        let eSpeak = `/${word}/`

        for (let i = 0; i < mappings.length; i++) {
            eSpeak = eSpeak.replace(mappings[i].src, mappings[i].dest)
        }

        meSpeak.speak(`[[${eSpeak}]]`)
    } else {
        meSpeak.speak(word)
    }
}

export default speakWord