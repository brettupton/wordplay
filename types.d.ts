declare module 'pdfjs-dist/build/pdf.worker'
declare module 'mespeak'

type IPAChart = {
    [manner: string]: {
        [place: string]: string[]
    }
}

type WindowSize = {
    width: number
    height: number
}

type APIResult = {
    [key: string]: string | string[]
}