const countNGrams = (text: string[], n: number) => {
    const count: { [index: string]: { count: number, nGram: string[] } } = {}


    for (let i = 0; i < (text.length - n); i++) {
        const nGram = text.slice(i, i + n)
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


export { countNGrams }