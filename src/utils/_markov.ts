// https://rosettacode.org/wiki/Markov_chain_text_generator#

import tokenizer from "./tokenizer"

const createPrefixes = async (tokens: string[], n: number) => {
    const prefixesMap = new Map<string, { prefix: string[], suffixes: string[] }>()

    for (let i = 0; i < (tokens.length - n); i++) {
        const prefix = tokens.slice(i, i + n)
        const suffix = tokens[i + n]
        const prefixKey = prefix.join(' ')

        if (prefixesMap.has(prefixKey)) {
            const prefixItem = prefixesMap.get(prefixKey) || { prefix: [], suffixes: [] }
            if (!prefixItem.suffixes.includes(suffix)) {
                prefixItem.suffixes.push(suffix)
            }
        } else {
            prefixesMap.set(prefixKey, {
                prefix: prefix,
                suffixes: [suffix]
            })
        }
    }
    return prefixesMap
}

const createChain = async (tokens: string[], initPrefix: string[], chainLength: number) => {
    const prefixesMap = await createPrefixes(tokens, initPrefix.length)
    let sentence = initPrefix.join(" ")

    for (let i = 0; i < chainLength; i++) {
        const words = sentence.split(" ")
        const prefix = words.slice(-(initPrefix.length)).join(" ")
        const suffixesLen = prefixesMap.get(prefix)!.suffixes.length
        const randomSuffix = prefixesMap.get(prefix)!.suffixes[Math.floor(Math.random() * suffixesLen)]
        sentence += " " + randomSuffix
    }

    return sentence.replace(/\s(?=[^a-zA-Z])/gm, "")
}

export default createChain