const punctTokens = (text: string) => {
    const pageNums = text.replace(/\n\d+\n/gm, '')
    const markup = pageNums.replace(/\n/g, ' ')
    const quotes = markup.replace(/(?:(“|”|"))/g, ' $& ')
    const punct = quotes.replace(/(?<!\w)(?=[.,!?;:"()-—])|(?=[.,!?;:"()-—])(?!\w)/g, ' $&')
    const double = punct.replace(/[\s-]{2,}/g, ' ')
    const tokens = double.split(" ").filter(token => token !== "")

    return tokens
}


const wordTokens = (text: string, type?: string) => {
    const pageNums = text.replace(/(?:\\n+\d+)/gm, '')
    const markup = pageNums.replace(/(?:\\+[a-z])/gm, ' ')
    const quotes = markup.replace(/“|”|"/gm, " \" ")
    const hyphens = quotes.replace(/-\s*/g, '')
    const punct = hyphens.replace(/[^a-zA-z]/g, " ")
    const double = punct.replace(/\s{2,}/g, ' ')
    const tokens = double.split(" ").filter(token => token !== "")

    if (type === 'unique') {
        return Array.from(new Set(tokens))
    }

    return tokens
}

const sentenceTokens = (text: string) => {
    const pageNums = text.replace(/(?:\\n+\d+)/gm, '')
    const markup = pageNums.replace(/(?:\\+[a-z])/gm, ' ')
    const double = markup.replace(/\s{2,}/g, ' ')
    const tokens = double.split(".").filter(token => token !== "")

    return tokens
}

export const tokenizer = { punctTokens, wordTokens, sentenceTokens }