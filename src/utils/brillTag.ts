const assignTags = (results: BrownDict) => {
    const words: string[][] = []
    for (let i = 0; i < results.length; i++) {
        const [word, parts] = results[i]
        const tagArray = Object.keys(parts)
        let max = 0

        // Filter out count and assign max to tag with highest frequency
        tagArray.filter((tag) => tag !== "COUNT")
            .forEach((tag) => {
                if (parts[tag] >= max) {
                    max = parts[tag]
                }
            })

        // Find tag with frequency equal to max, default to singular or mass noun
        const maxTag = tagArray.find((tag) => parts[tag] === max) ?? "NN"
        words.push([word, maxTag])
    }

    return words
}

export default assignTags