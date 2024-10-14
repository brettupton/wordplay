const punctTokens = (text: string) => {
    const pageNums = text.replace(/\n\d+\n/gm, '')
    const markup = pageNums.replace(/\n/g, ' ')
    const quotes = markup.replace(/(?:(“|”|"))/g, ' $& ')
    const punct = quotes.replace(/(?<!\w)(?=[.,!?;:"()-—])|(?=[.,!?;:"()-—])(?!\w)/g, ' $&')
    const double = punct.replace(/[\s-]{2,}/g, ' ')
    const tokens = double.split(" ").filter(token => token !== "")

    return tokens
}

const wordTokens = (text: string, unique?: boolean) => {
    text =
        // Non-word characters
        text.replace(/\W/g, " ")
            // Two or more spaces
            .replace(/\s{2, }/g, " ")

    const tokens = text.split(" ").filter(token => token !== "")

    if (unique) {
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

const spaceTokens = (text: string) => {
    text =
        // Page Numbers
        text.replace(/(?:\\n+\d+)/gm, '')
            // Markup
            .replace(/\\+[a-z]/gm, " ")
            // More than 2 hyphens
            .replace(/\-{2,}/gm, '')
            // More than 2 spaces
            .replace(/\s{2,}/g, ' ')

    const tokens = text.split(" ").filter(token => token !== "")

    return tokens
}

const tokenizer = { punctTokens, wordTokens, sentenceTokens, spaceTokens }

export default tokenizer