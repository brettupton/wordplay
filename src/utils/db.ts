import { Database, OPEN_READONLY } from "sqlite3"
import path from 'path'

const db = new Database(path.join(process.cwd(), 'src', 'db', 'cmudict.db'), OPEN_READONLY, (err) => {
    if (err) {
        console.error(err)
    }
})

const getPhonetic = (word: string): Promise<string> => {
    const dbParam = word.toUpperCase().trim()

    return new Promise((resolve, reject) => {
        db.get("SELECT phonetic FROM cmudict WHERE word=?",
            [dbParam], (err, row: { phonetic: string }) => {
                if (err) {
                    reject(err)
                }
                if (row) {
                    // const phonetic = row.phonetic.replace(/[ˈˌ.]/g, "")
                    resolve(row.phonetic)
                }
                reject("Phonetic not found")
            })
    })
}

export default getPhonetic