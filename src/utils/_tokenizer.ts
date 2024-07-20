export default class Tokenizer {
    private readonly text: string

    constructor(text: string) {
        this.text = text
    }

    public rawText() {
        // This is determined by specific corpus, ie weird artifacts from PDF that need to be removed
        const specReplace = this.text.replace(/^[-]+Page \(\d+\) Break[-]+$/gm, '')

        return specReplace
    }

    public wordTokens() {
        const rawText = this.rawText()
        const markup = rawText.replace(/(?:\\+[a-z])/gm, ' ')
        const quotes = markup.replace(/“|”|"/gm, " \" ")
        const punct = quotes.replace(/(?<!\w)(?=[.,!?;:])|(?=[.,!?;:])(?!\w)/g, ' $&')
        const tokens = punct.split(" ").filter(token => token !== "")

        return tokens
    }

    public punctTokenize() {
        const rawText = this.rawText()
        const returns = rawText.replace(/(\r\n|\r|\n)+/g, ' ')
        const quotes = returns.replace(/“|”|"/gm, " \" ")
        const punct = quotes.replace(/[.,\-'!?(—–);:*]/gm, " ")
        const tokens = punct.split(" ").filter(token => token !== " ")

        return tokens
    }
}