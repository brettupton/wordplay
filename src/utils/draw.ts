type PointProperties = {
    color: string
    height: number
    width: number
}

type LineProperties = {
    color: string
    thickness: number
}

const createPoint = (document: Document, x: number, y: number, properties: PointProperties = { color: 'white', height: 10, width: 10 }) => {
    const point = document.createElement('div')

    point.id = "point"
    point.style.cssText = `
        position: absolute;
        height: ${properties.height}px;
        width: ${properties.width}px;
        background: ${properties.color};
        border-radius: 50%;
        left: ${x - (properties.width)}px;
        top: ${y - (properties.height)}px;
    `

    document.body.appendChild(point)
}

const createLineBetween = (document: Document, e1: HTMLElement, e2: HTMLElement, properties: LineProperties = { color: 'white', thickness: 3 }) => {
    // Select first line and remove from document if there are 10 or more
    // lines already in document
    const lines = document.querySelectorAll('#line')
    if (lines.length >= 10) {
        lines[0].remove()
    }

    // Get bounding boxes for both elements
    const e1Bounds = e1.getBoundingClientRect()
    const e2Bounds = e2.getBoundingClientRect()

    // Find center of both elements
    const e1Center = {
        x: e1Bounds.left + (e1Bounds.width / 2),
        y: e1Bounds.top + (e1Bounds.height / 2)
    }
    const e2Center = {
        x: e2Bounds.left + (e2Bounds.width / 2),
        y: e2Bounds.top + (e2Bounds.height / 2)
    }

    // Calculate line length, x, y, and angle from element centers
    const length = Math.sqrt(((e2Center.x - e1Center.x) * (e2Center.x - e1Center.x)) + ((e2Center.y - e1Center.y) * (e2Center.y - e1Center.y)))
    const cx = ((e1Center.x + e2Center.x) / 2) - (length / 2)
    const cy = ((e1Center.y + e2Center.y) / 2) - (1 / 2)
    const angle = Math.atan2((e1Center.y - e2Center.y), (e1Center.x - e2Center.x)) * (180 / Math.PI)
    const line = document.createElement('div')

    line.id = "line"
    line.style.cssText = `
    padding: 0px;
    margin: 0px;
    height: ${properties.thickness}px;
    background-color: ${properties.color};
    line-height: 1px;
    position: absolute;
    left: ${cx}px;
    top: ${cy}px;
    width: ${length}px;
    transform: rotate(${angle}deg);
    border-radius: ${properties.thickness / 2}px;
    box-shadow: 0 0 1px ${properties.color};
    z-index: -1;
`
    document.body.appendChild(line)
}

export const Draw = { createPoint, createLineBetween }