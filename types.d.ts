declare module 'pdfjs-dist/build/pdf.worker'

type IPAChart = {
    [manner: string]: {
        [place: string]: string[]
    }
}