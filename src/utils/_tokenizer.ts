export default class Tokenizer {
    private readonly text: string

    constructor(text: string) {
        this.text = text
    }

    // Adds space in front of punctuation to include in split
    public punctTokens() {
        const pageNums = this.text.replace(/\n\d+\n/gm, '')
        const markup = pageNums.replace(/\n/g, ' ')
        const quotes = markup.replace(/(?:(“|”|"))/g, ' $& ')
        const punct = quotes.replace(/(?<!\w)(?=[.,!?;:"])|(?=[.,!?;:"])(?!\w)/g, ' $&')
        const double = punct.replace(/\s{2,}/g, ' ')
        const tokens = double.split(" ").filter(token => token !== "")

        return tokens
    }

    // Removes punctuation entirely and splits
    public wordTokens() {
        const pageNums = this.text.replace(/(?:\\n+\d+)/gm, '')
        const markup = pageNums.replace(/(?:\\+[a-z])/gm, ' ')
        const quotes = markup.replace(/“|”|"/gm, " \" ")
        const hyphens = quotes.replace(/-\s*/g, '')
        const punct = hyphens.replace(/[^a-zA-z]/g, " ")
        const double = punct.replace(/\s{2,}/g, ' ')
        const tokens = double.split(" ").filter(token => token !== "")

        return tokens
    }
}