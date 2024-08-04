import stopWords from "./info/stopwords"
import Tokenizer from "./_tokenizer"

interface words {
  [word: string]: {
    count: number
  }
}

const wordFrequency = (text: string) => {
  const tokenizer = new Tokenizer(text)
  const words = tokenizer.wordTokens()
  const freq: words = {}

  words.forEach(word => {
    const lower = word.toLowerCase()
    if (stopWords.includes(lower)) return
    // Removes anything that isn't a character
    if (/[^a-zA-Z]+/g.test(lower)) return

    if (!freq[lower]) {
      freq[lower] = { count: 1 }
    } else {
      freq[lower].count++
    }
  })

  return freq
}

export default wordFrequency