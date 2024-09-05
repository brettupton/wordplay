const createPoint = (document: Document, x: number, y: number, color: string = "white") => {
    const point = document.createElement('div')

    point.id = "point"
    point.style.cssText = `
        position: absolute;
        height: 10px;
        width: 10px;
        background: ${color};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
    `

    document.body.appendChild(point)
}

const createLine = (document: Document, x1: number, y1: number, x2: number, y2: number) => {
    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
    const cx = ((x1 + x2) / 2) - (length / 2)
    const cy = ((y1 + y2) / 2) - (1 / 2)
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI)
    const line = document.createElement('div')

    line.id = "line"
    line.style.cssText = `
    padding: 0px;
    margin: 0px;
    height: 1px;
    background-color: white;
    line-height: 1px;
    position: absolute;
    left: ${cx}px;
    top: ${cy}px;
    width: ${length}px;
    transform: rotate(${angle}deg);
`

    document.body.appendChild(line)
}

export const Draw = { createPoint, createLine }