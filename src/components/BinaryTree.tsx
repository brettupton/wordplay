'use client'

import { useEffect, useState } from "react"
import { Draw } from "@/utils/draw"

interface BinaryTreeProps {
    array: string[] | number[]
}

export default function BinaryTree({ array }: BinaryTreeProps) {
    const [nodeRenderArr, setNodeRenderArr] = useState<(string | number)[][]>([])
    const [binaryNodes, setBinaryNodes] = useState<{ [index: number]: BinaryNode }>({})

    const calcNewNodes = (array: any[]) => {
        const newNodes: { [index: number]: BinaryNode } = {}
        const nodes = array.length
        const maxTier = Math.ceil(Math.log(nodes + 1) / Math.log(2))

        for (let i = 0; i < nodes; i++) {
            const currTier = Math.floor(Math.log2(i + 1)) + 1

            newNodes[i] = {
                tier: currTier,
                element: array[i],
                connections: (currTier !== maxTier) ? ((i * 2) + 1 <= nodes) ? [(i * 2) + 1, (i * 2) + 2] : [] : [],
            }
        }

        return newNodes
    }

    const calcNodeArray = (array: (string | number)[]) => {
        const newNodeArr: (string | number)[][] = []
        const nodes = array.length
        // 2 ^ (# of tiers) - 1 = (# of nodes)
        const tiers = Math.ceil(Math.log(nodes + 1) / Math.log(2))

        // For each tier, push new slice of array equal to length of 2 ^ (tier #)
        for (let i = 0; i < tiers; i++) {
            newNodeArr.push(array.slice(0, (2 ** i)))
            array.splice(0, 2 ** i)
        }

        return newNodeArr
    }

    useEffect(() => {
        const updateNodePos = () => {
            const nodes = document.getElementById('nodes')
            // Select all previous lines and remove from document
            const lines = document.querySelectorAll('#line')
            lines.forEach((line) => line.remove())

            // Loop through nodes div to find all children/subchildren
            // Get bounds of child and create point at x offset and y
            if (nodes) {
                const binaryNodesPos: { [index: number]: BinaryNode } = {}
                let child = nodes.firstElementChild
                let tier = 0
                let node = (2 ** tier - 1)

                while (child) {
                    let subChild = child.firstElementChild

                    while (subChild) {
                        let bounds = subChild.getBoundingClientRect()
                        // Get padding, border-width, and border-radius of subChild to compute new x
                        let padding = parseFloat(window.getComputedStyle(subChild).getPropertyValue('padding'))
                        let borderWidth = parseFloat(window.getComputedStyle(subChild).getPropertyValue('border-width')) * 2
                        let borderRadius = parseFloat(window.getComputedStyle(subChild).getPropertyValue('border-radius')) * 2
                        let x = bounds.x + ((bounds.width - (padding - borderWidth - borderRadius)) / 2)

                        binaryNodesPos[node] = {
                            ...binaryNodes[node],
                            topPointX: x,
                            topPointY: bounds.y - 3,
                            bottomPointX: x,
                            bottomPointY: bounds.y + (bounds.height)
                        }
                        node += 1
                        subChild = subChild.nextElementSibling
                    }
                    tier += 1
                    child = child.nextElementSibling
                }
                setBinaryNodes(binaryNodesPos)
            }
        }

        updateNodePos()
        window.addEventListener('resize', updateNodePos)

        return () => {
            window.removeEventListener('resize', updateNodePos)
        }
    }, [nodeRenderArr])

    useEffect(() => {
        if (array && array.length > 0 && array.length < 32) {
            const renderNodeArr = calcNodeArray([...array])
            const newNodes = calcNewNodes([...array])
            setNodeRenderArr(renderNodeArr)
            setBinaryNodes(newNodes)
        }
    }, [array])

    useEffect(() => {
        for (let index in binaryNodes) {
            const currNode = binaryNodes[index]
            const connections = currNode.connections

            // Loop through connection points on node and draw line between node bottom and connection top
            connections.forEach(connection => {
                const connectionNode = binaryNodes[connection]

                if (connectionNode && currNode.bottomPointX && currNode.bottomPointY && connectionNode.topPointX && connectionNode.topPointY) {
                    Draw.createLine(document, currNode.bottomPointX, currNode.bottomPointY, connectionNode.topPointX, connectionNode.topPointY)
                }
            })
        }
    }, [binaryNodes])

    return (
        <div id="nodes">
            {nodeRenderArr.map((node, i) => {
                return (
                    <div key={"n" + i} className="flex justify-center" style={{ marginTop: `${i * 25}px` }}>
                        {node.map((ele: any, j: number) => {
                            return (
                                <div key={"e" + j} className={`border border-white rounded text-center p-4 m-3`}>
                                    {ele}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}