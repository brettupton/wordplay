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

type BinaryNode = {
    tier: number
    element: string | number
    connections: number[]
    topPointX?: number
    topPointY?: number
    bottomPointX?: number
    bottomPointY?: number
}

type BrownDict = [
    string,
    {
        COUNT: number
        [pos: string]: number
    }
][]