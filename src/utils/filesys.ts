import fs from 'fs'
import path from 'path'

const delDir = (dirPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dirPath)) {
            fs.readdir(dirPath, (err, files) => {
                files.forEach((name) => {
                    fs.unlinkSync(path.join(dirPath, name))
                })
                resolve()
            })
        } else {
            reject("Directory does not exist")
        }
    })
}

const readDir = (dirPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dirPath)) {
            fs.readdir(dirPath, (err, files) => {
                if (files.length > 1) {
                    reject("Directory contains more than one file")
                }
                fs.readFile(path.join(dirPath, files[0]), (err, data) => {
                    if (err) {
                        reject(`Something went wrong reading file: ${err.message}`)

                    }
                    resolve(data.toString())
                })
            })
        } else {
            reject("Directory does not exist")
        }
    })
}

export { readDir, delDir }