import fs from 'fs'
import path from 'path'
import getPDFText from './pdf'

const uploadPath = path.join(process.cwd(), 'public', 'uploads')

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
                if (files.length <= 0 || files.length > 1) {
                    reject("Directory contains zero files or more than one file")
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

const replaceFile = (dirPath: string, fileName: string, data: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await delDir(dirPath)

            fs.writeFile(path.join(dirPath, fileName), data, (err) => {
                if (err) {
                    throw err
                }
                resolve()
            })
        } catch (err) {
            console.error(err)
            reject('Something went wrong in replacing the directory')
        }
    })
}

const getFileText = (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop()
    const fileName = file.name.split(".")[0]

    return new Promise(async (resolve, reject) => {
        let text = ""

        try {
            if (fileExt === 'txt') {
                text = await file.text()
            } else if (fileExt === 'pdf') {
                text = await getPDFText(file)
            } else {
                throw new Error()
            }

            await replaceFile(uploadPath, `${fileName}.txt`, text)
            resolve(text)
        } catch (err) {
            reject('Invalid file format.')
        }
    })
}

const fileSys = {
    readDir,
    delDir,
    replaceFile,
    getFileText
}

export default fileSys