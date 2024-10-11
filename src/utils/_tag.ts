const tagRules = {
    'PREV_TAG': [
        ['VB', 'DT', 'NN', 'If a word is tagged as a verb (VB) but is preceded by a determiner (DT), it should be corrected to a noun (NN).'],
        ['VB', 'IN', 'NN', 'If a word is tagged as a verb (VB), but it follows a preposition (IN), it should be corrected to a noun (NN).'],
        ['VB', 'JJ', 'NN', 'If a word is tagged as a verb (VB), but it is preceded by an adjective (JJ), it should be changed to a noun (NN).'],
        ['NN', 'MD', 'VB', 'If a word is tagged as a noun (NN), but it follows a modal verb (MD), it should be corrected to a verb (VB)']
    ],
    'NEXT_TAG': [],
    'ENDINGS': [
        ['NN', '-ED', 'VBD', 'If a word is tagged as a noun (NN), but it ends in “-ed,” it should be changed to VBD (past-tense verb).'],
        ['NN', '-ING', 'VBG', 'If a word is tagged as a noun (NN) but ends in “-ing,” it should be corrected to a gerund (VBG)'],
        ['NN', '-EST', 'JJS', 'If a word is tagged as a noun (NN), but it ends in “-est,” it should be corrected to JJS (superlative adjective).']
    ]
}

const initTags = (dbResults: BrownDict): POSTuple[] => {
    const words: POSTuple[] = []
    for (let i = 0; i < dbResults.length; i++) {
        const [word, parts] = dbResults[i]
        let maxTag = "NN"
        // Check if word was found in brownDB and finding most frequent tag, returning mass/singular noun as default if not found
        if (parts) {
            maxTag = Object.keys(parts).filter((tag) => tag !== "COUNT").reduce((a, b) => parts[a] > parts[b] ? a : b)
        }

        words.push([word, maxTag, 0])
    }

    return words
}

const brillTagger = (dbResults: BrownDict, passes: number) => {
    const wordsArr = initTags(dbResults)

    for (let i = 0; i < passes; i++) {
        wordsArr.forEach((word, index) => {
            // Each rule needs to check either the previous and next tag against current tag to determine change
            // Also check for certain endings in words to determine change
            let [currWord, currTag] = word
            const prevTag = wordsArr[index - 1] ? wordsArr[index - 1][1] : ""
            const nextTag = wordsArr[index + 1] ? wordsArr[index + 1][1] : ""
            const endRuleMatch = currWord.match(/(ed|ing|est)$/g)

            // Iterate through each rule and compare tags
            // Increment numChanges on every tag change
            tagRules.PREV_TAG.forEach((rule) => {
                const [currRuleTag, prevRuleTag, changeTag] = rule

                if (currTag === currRuleTag) {
                    if (prevTag === prevRuleTag) {
                        // console.log(`currWord: ${currWord}\ncurrTag: ${currTag}\nprevTag: ${prevTag}\nnextTag: ${nextTag}\nendRuleMatch: ${endRuleMatch}\nwordsArr[index][1]: ${wordsArr[index][1]}\nchangeTag: ${changeTag}\n-----------`)
                        wordsArr[index][1] = changeTag
                        wordsArr[index][2]++
                    }
                }
            })
            tagRules.NEXT_TAG.forEach((rule) => {
                const [currRuleTag, nextRuleTag, changeTag] = rule

                if (currTag === currRuleTag) {
                    if (nextTag === nextRuleTag) {
                        wordsArr[index][1] = changeTag
                        wordsArr[index][2]++
                    }
                }
            })

            if (endRuleMatch) {
                tagRules.ENDINGS.forEach((rule) => {
                    const [currRuleTag, ruleEnd, changeTag] = rule
                    const endingMatch = "-" + endRuleMatch[0].toUpperCase()

                    if (currTag === currRuleTag) {
                        if (endingMatch === ruleEnd) {
                            wordsArr[index][1] = changeTag
                            wordsArr[index][2]++
                        }
                    }
                })
            }
        })
    }

    return wordsArr
}

const tags = {
    brillTagger
}

export default tags