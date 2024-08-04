import { Database, OPEN_READONLY } from "sqlite3"
import path from 'path'

interface Phonetics {
    word: string,
    phonetic: string
}

const db = new Database(path.join(process.cwd(), 'src', 'db', 'cmudict.db'), OPEN_READONLY, (err) => {
    if (err) {
        console.error(err)
    }
})

const getPhonetic = (word: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const param = word.toUpperCase().trim()

        db.get('SELECT phonetic FROM cmudict WHERE word=?', [param], (err, row: { phonetic: string }) => {
            if (err) {
                reject(err)
            }
            if (row) {
                resolve(row.phonetic)
            } else {
                reject("Phonetic not found")
            }
        })
    })
}

const getPhonetics = (tokens: string[]): Promise<Phonetics[]> => {
    const phonetics: Phonetics[] = []

    return new Promise((resolve, reject) => {
        let index = 0
        const next = () => {
            if (index >= tokens.length) {
                resolve(phonetics)
            }

            if (tokens[index]) {
                let param = tokens[index].toUpperCase().trim()

                db.get('SELECT phonetic FROM cmudict WHERE word=?', [param], (err, row: { phonetic: string }) => {
                    if (err) {
                        console.error(err)
                        index++
                        return
                    }
                    if (row) {
                        phonetics.push({ word: tokens[index], phonetic: row.phonetic })
                    } else {
                        phonetics.push({ word: tokens[index], phonetic: param })
                    }
                    index++
                    next()
                })
            }
        }

        next()
    })
}

export default getPhonetics