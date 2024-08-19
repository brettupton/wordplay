// https://rosettacode.org/wiki/Markov_chain_text_generator#

import Tokenizer from "./_tokenizer"

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

const createChain = async (text: string, initPrefix: string[], chainLength: number) => {
    const tokenizer = new Tokenizer(text)
    const tokens = tokenizer.punctTokens()

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

export { createChain }

// https://www.kdnuggets.com/2019/11/markov-chains-train-text-generation.html
// import * as math from 'mathjs'

// function weightedChoice(objects: string[], weights: number[]) {
//     // Calculate the sum of weights
//     const sumOfWeights = weights.reduce((sum, weight) => sum + weight, 0);

//     // Normalize weights to sum to 1
//     const normalizedWeights = weights.map(weight => weight / sumOfWeights);

//     // Calculate cumulative sum of weights
//     const cumulativeWeights = normalizedWeights.reduce((acc, weight, i) => {
//         acc.push((acc[i - 1] || 0) + weight);
//         return acc;
//     }, [] as number[]);

//     // Generate a random number between 0 and 1
//     const random = Math.random();

//     // Find and return the object corresponding to the random number
//     for (let i = 0; i < cumulativeWeights.length; i++) {
//         if (random < cumulativeWeights[i]) {
//             return objects[i];
//         }
//     }

//     // Fallback in case no object was selected (shouldn't normally reach here)
//     return objects[objects.length - 1];
// }

// const processText = async (text: string) => {
//     const breakLines = text.replace(/^[-]+Page \(\d+\) Break[-]+$/gm, '')
//     const breaks = breakLines.replace(/(\r\n|\r|\n)+/g, ' ')
//     const quotes = breaks.replace(/“|”|"/gm, " \" ")
//     const punct = quotes.replace(/[.,\-'!?(—–);:*]/gm, " ")
//     const digits = punct.replace(/\d/g, '')
//     const split = digits.split(" ").filter(word => word !== "")

//     return { split }
// }

// const initializeMatrixAndCreateDict = async (k: number, split: string[], unique: string[]) => {
//     const kArr: string[][] = []

//     for (let i = 0; i <= split.length - k; i++) {
//         kArr.push(split.slice(i, i + k))
//     }

//     const wordIdxDict: Record<string, number> = unique.reduce((acc, word, index) => {
//         acc[word] = index;
//         return acc;
//     }, {} as Record<string, number>)

//     const serializedK = kArr.map(subArr => JSON.stringify(subArr))
//     const distinct = Array.from(new Set(serializedK))
//     const distinctK: string[] = distinct.map(serializedArr => JSON.parse(serializedArr))

//     const matrixArr = math.zeros([distinctK.length, unique.length])
//     const sparseMatrix = math.sparse(matrixArr)


//     const kWordsIdxDict: Record<string, number> = distinctK.reduce((acc, arr, index) => {
//         const key = JSON.stringify(arr) // Serialize the array to use as a key
//         acc[key] = index
//         return acc
//     }, {} as Record<string, number>)

//     for (let i = 0; i < kArr.length - k; i++) {
//         const word = kArr[i]
//         const key = JSON.stringify(word)
//         const wordSequenceIdx = kWordsIdxDict[key]
//         const nextWordIdx = wordIdxDict[split[i + k]]
//         sparseMatrix.set([wordSequenceIdx, nextWordIdx], sparseMatrix.get([wordSequenceIdx, nextWordIdx]) + 1)
//     }

//     return { kWordsIdxDict, sparseMatrix }
// }

// const createChain = async (split: string[], seed: string[], k: number, chainLength: number) => {
//     const unique = Array.from(new Set([...split]))
//     const { kWordsIdxDict, sparseMatrix } = await initializeMatrixAndCreateDict(k, split, unique)

//     const nextWordAfter = async (sequence: string[], alpha = 0) => {
//         const rowIndex = kWordsIdxDict[JSON.stringify(sequence)]
//         const rowVector: number[] = []
//         for (let i = 0; i < sparseMatrix.size()[1]; i++) {
//             const value = sparseMatrix.get([rowIndex, i])
//             rowVector.push(value + alpha)
//         }

//         const rowSum = rowVector.reduce((partialSum, a) => partialSum + a, 0)

//         const likelihoods: number[] = []
//         rowVector.forEach(num => {
//             likelihoods.push(num / rowSum)
//         })

//         return weightedChoice(unique, likelihoods)
//     }

//     let currentWords = seed
//     let sentence = seed.join(" ")

//     for (let i = 0; i < chainLength; i++) {
//         sentence += " "
//         const nextWord: string = await nextWordAfter(currentWords)
//         sentence += nextWord
//         currentWords = currentWords.slice(1).concat(nextWord)
//     }
//     return sentence
// }