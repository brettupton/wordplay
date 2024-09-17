import stopWords from "./info/stopwords"
import { tokenizer } from "./tokenizer"

interface frequency {
  [word: string]: number
}

const wordFrequency = (text: string, keepStopWords?: boolean, keepCasing?: boolean) => {
  const words = tokenizer.wordTokens(text)
  const freq: frequency = {}

  words.forEach(word => {
    if (!keepCasing) {
      word = word.toLowerCase()
    }

    if (!keepStopWords && stopWords.includes(word)) return

    // Removes anything that isn't a character
    if (/[^a-zA-Z]+/g.test(word)) return
    // Removes lone characters except for 'a' & 'i'
    if (/(?<!\w)[^ai](?!\w)/gm.test(word)) return

    if (!freq[word]) {
      freq[word] = 1
    } else {
      freq[word]++
    }
  })

  return Object.entries(freq)
}

export default wordFrequency