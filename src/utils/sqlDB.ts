import { Database, OPEN_READWRITE } from "sqlite3"
import path from 'path'

// const addPhonetic = (word: string, phonetic: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         db.run('INSERT INTO cmudict (word, phonetic) VALUES(?, ?)', [word, phonetic], (err) => {
//             if (err) {
//                 reject("Error inserting row.")
//             }
//             resolve()
//         })
//     })
// }

// const removePhonetic = (word: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         db.run('DELETE FROM cmudict WHERE word=?', [word], (err) => {
//             if (err) {
//                 reject("Error deleting row.")
//             }
//             resolve()
//         })
//     })
// }

export default class sqlDB {
    private db
    private dbType

    constructor(database: 'cmu' | 'brown') {
        this.db = new Database(path.join(process.cwd(), 'src', 'db', `${database}dict.db`), OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err)
            }
        })
        this.dbType = database
    }

    public queryOne(word: string) {
        let column: string
        return new Promise<string>((resolve, reject) => {
            if (this.dbType === 'cmu') {
                word = word.toUpperCase().trim()
                column = "phonetic"
            } else if (this.dbType === 'brown') {
                word = word.trim()
                column = "pos"
            }

            this.db.get(`SELECT ${column} FROM ${this.dbType}dict WHERE word=?`, [word], (err, row: any) => {
                if (err) {
                    reject(err)
                }
                resolve(row.phonetic ?? row.pos ?? word)
            })
        })
    }

    public queryMany(words: string[]) {
        const results: string[][] = []
        let column: string

        return new Promise<string[][]>((resolve, reject) => {
            let index = 0
            const next = () => {
                if (index >= words.length) {
                    resolve(results)
                }

                let word = words[index]

                if (word) {
                    if (this.dbType === 'cmu') {
                        word = word.toUpperCase().trim()
                        column = "phonetic"
                    } else if (this.dbType === 'brown') {
                        word = word.trim()
                        column = "pos"
                    }

                    this.db.get(`SELECT ${column} FROM ${this.dbType}dict WHERE word=?`, [word], (err, row: any) => {
                        if (err) {
                            reject(err)
                            index++
                            return
                        }
                        const result: string = row ? row.phonetics ?? row.pos : word
                        results.push([word, result])
                        index++
                        next()
                    })
                }
            }

            next()
        })
    }

}