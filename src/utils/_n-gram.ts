
const nGramCount = (tokens: string[], n: number) => {
    let nGramsObj: { [nGram: string]: number } = {}
    const nGramsArr: [string[], number][] = []

    for (let i = 0; i < (tokens.length - n); i++) {
        const nGram = tokens.slice(i, i + n)
        const curr = JSON.stringify(nGram)

        if (!nGramsObj[curr]) {
            nGramsObj[curr] = 1
        } else {
            nGramsObj[curr]++
        }
    }

    Object.entries(nGramsObj).forEach((nGram) => {
        nGramsArr.push([JSON.parse(nGram[0]) as string[], nGram[1]])
    })

    return nGramsArr
}


export default nGramCount 