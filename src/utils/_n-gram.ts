import Tokenizer from "./_tokenizer"

const countNGrams = (text: string, n: number) => {
    const tokenizer = new Tokenizer(text)
    const words = tokenizer.punctTokens()
    const count: { [index: string]: { count: number, nGram: string[] } } = {}

    for (let i = 0; i < (words.length - n); i++) {
        const nGram = words.slice(i, i + n)
        const curr = JSON.stringify(nGram).toLowerCase()

        if (count[curr]) {
            count[curr].count++
        } else {
            count[curr] = {
                count: 1,
                nGram: nGram
            }
        }
    }

    return count
}


export default countNGrams 