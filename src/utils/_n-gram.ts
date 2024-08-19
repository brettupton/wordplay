import Tokenizer from "./_tokenizer"

const nGramCount = (text: string, n: number) => {
    const tokenizer = new Tokenizer(text)
    const words = tokenizer.wordTokens()
    const nGrams: { [nGram: string]: number } = {}

    for (let i = 0; i < (words.length - n); i++) {
        const nGram = words.slice(i, i + n)
        const curr = JSON.stringify(nGram).toLowerCase()

        if (!nGrams[curr]) {
            nGrams[curr] = 1
        } else {
            nGrams[curr]++
        }
    }

    return Object.entries(nGrams)
}


export default nGramCount 