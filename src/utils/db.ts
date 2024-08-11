import { Database, OPEN_READWRITE } from "sqlite3"
import path from 'path'

interface Phonetics {
    word: string,
    phonetic: string
}

const db = new Database(path.join(process.cwd(), 'src', 'db', 'cmudict.db'), OPEN_READWRITE, (err) => {
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

const addPhonetic = (word: string, phonetic: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO cmudict (word, phonetic) VALUES(?, ?)', [word, phonetic], (err) => {
            if (err) {
                reject("Error inserting row.")
            }
            resolve()
        })
    })
}

const removePhonetic = (word: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM cmudict WHERE word=?', [word], (err) => {
            if (err) {
                reject("Error deleting row.")
            }
            resolve()
        })
    })
}

export { getPhonetic, getPhonetics, addPhonetic, removePhonetic }