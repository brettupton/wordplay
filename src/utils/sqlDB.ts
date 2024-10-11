import { Database, OPEN_READWRITE } from "sqlite3"
import path from 'path'

export default class sqlDB {
    private db
    private dbType
    private column

    constructor(database: 'cmu' | 'brown') {
        this.db = new Database(path.join(process.cwd(), 'src', 'db', `${database}dict.db`), OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err)
            }
        })
        this.dbType = database
        this.column = (database === "cmu" ? "phonetic" : database === "brown" ? "pos" : "")
    }

    public queryOne(word: string) {
        return new Promise<string>((resolve, reject) => {
            word = word.trim()
            if (this.dbType === 'cmu') {
                word = word.toUpperCase().trim()
            }

            this.db.get(`SELECT ${this.column} FROM ${this.dbType}dict WHERE word=?`, [word], (err, row: any) => {
                if (err) {
                    reject(err)
                }
                resolve(row.phonetic ?? row.pos ?? word)
            })
        })
    }

    public queryMany(words: string[]) {
        const results: string[][] = []

        return new Promise<string[][]>((resolve, reject) => {
            let index = 0
            const next = () => {
                if (index >= words.length) {
                    resolve(results)
                }

                const word = words[index]

                if (word) {
                    // Remove all punctuation from word first
                    let searchWord = word.trim().replace(/[^\w\s]/gm, "")
                    if (this.dbType === 'cmu') {
                        searchWord = searchWord.toUpperCase()
                    }

                    this.db.get(`SELECT ${this.column} FROM ${this.dbType}dict WHERE word=?`, [searchWord], (err, row: any) => {
                        if (err) {
                            reject(err)
                            index++
                            return
                        }
                        // POS tags are stored as JSON string, phonetics are normal strings
                        const result: string = row ? row.phonetic ?? JSON.parse(row.pos) : ""
                        results.push([word, result])
                        index++
                        next()
                    })
                }
            }

            next()
        })
    }

    public getPaginated(offset: number, limit: number): Promise<{ word: string, pos: string }[]> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${this.dbType}dict LIMIT ? OFFSET ?`, [limit, offset], (err, rows: { word: string, pos: string }[]) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }

    public getNumRows(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT COUNT(*) AS totalRows FROM ${this.dbType}dict`, (err, row: { totalRows: number }) => {
                if (err) {
                    reject(err)
                }

                resolve(row.totalRows)
            })
        })
    }

    public close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error closing the database:', err)
            }
        })
    }
}