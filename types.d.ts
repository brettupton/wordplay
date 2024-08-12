declare module 'pdfjs-dist/build/pdf.worker'
declare module 'mespeak'

type IPAChart = {
    [manner: string]: {
        [place: string]: string[]
    }
}