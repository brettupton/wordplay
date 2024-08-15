'use client'

import { Gentium_Plus } from "next/font/google"
import { useState, useRef } from "react"
import { IPASounds } from "@/utils/info/IPACharts"

interface IPATableProps {
    topLabel?: string
    IPAData: IPAChart
    bottomLabel?: string
}

const gentium = Gentium_Plus({ weight: "700", subsets: ["latin"] })

const IPATable = ({ topLabel, IPAData, bottomLabel }: IPATableProps) => {
    const places = Object.keys(IPAData)
    const manners = Object.keys(IPAData[places[0]])

    const handleSymbolClick = async (symbol: string) => {

    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <span className="text-sm">{topLabel || "\u00A0"}</span>
                        <table
                            className="min-w-full border border-neutral-200 bg-gray-700 text-center text-sm font-light text-surface text-white">
                            <thead
                                className="border-b border-neutral-200 bg-gray-800 font-medium">
                                <tr>
                                    <th
                                        scope="col"
                                        className="border-e border-neutral-200">
                                    </th>
                                    {places.map((place, index) => {
                                        return (
                                            <th
                                                scope="col" key={index}
                                                className="border-e border-neutral-200 px-4 py-2">
                                                {place}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {manners.map((manner, index) => {
                                    return (
                                        <tr className="border-b border-neutral-200" key={index}>
                                            <td className="whitespace-nowrap border-e border-neutral-200 bg-gray-800 px-2 py-2 font-medium">
                                                {manner}
                                            </td>
                                            {places.map((place, index) => {
                                                return (
                                                    <td key={index}
                                                        className={`${gentium.className} whitespace-nowrap border-e border-neutral-200 text-lg px-2 py-2 font-medium hover:bg-gray-500`}>
                                                        {IPAData[place][manner].map((symbol, index) => {
                                                            return (
                                                                <button key={index} className="w-1/2" onClick={() => handleSymbolClick(symbol)}>{symbol}</button>
                                                            )
                                                        })}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {bottomLabel &&
                            <div className="px-2 text-xs text-right w-full italic">{bottomLabel}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IPATable

// 1. Place of Articulation
// This refers to where in the vocal tract the airflow restriction occurs.

// Bilabial: Produced with both lips. Examples: [p], [b], [m].
// Labiodental: Produced with the lower lip against the upper teeth. Examples: [f], [v].
// Dental: Produced with the tongue against the upper teeth. Examples: [θ] (as in "think"), [ð] (as in "this").
// Alveolar: Produced with the tongue against the ridge just behind the upper teeth (the alveolar ridge). Examples: [t], [d], [s], [z], [n], [l], [ɹ] (American English "r").
// Postalveolar: Produced with the tongue just behind the alveolar ridge. Examples: [ʃ] (as in "shoe"), [ʒ] (as in "measure").
// Retroflex: Produced with the tongue curled back in the mouth. Example: [ɹ] (American English "r" in some accents).
// Palatal: Produced with the body of the tongue raised against the hard palate. Examples: [j] (as in "yes").
// Velar: Produced with the back of the tongue against the soft part of the roof of the mouth (the velum). Examples: [k], [g], [ŋ] (as in "sing").
// Uvular: Produced with the back of the tongue against the uvula. Not common in English but used in other languages.

// 2. Manner of Articulation
// This refers to how the airflow is restricted or modified.

// Plosive (Stop): Produced by completely blocking the airflow and then releasing it suddenly. Examples: [p], [b], [t], [d], [k], [g].
// Nasal: Produced with the airflow directed through the nasal cavity. Examples: [m], [n], [ŋ].
// Trill: Produced by vibrating the articulator (such as the tongue) against a point of contact. Example: [r] (in some languages).
// Tap/Flap: Produced by a single, quick touch of the articulator against the place of contact. Example: [ɾ] (as in the American English "t" in "butter" in some accents).
// Fricative: Produced by forcing air through a narrow constriction, causing friction. Examples: [f], [v], [s], [z], [ʃ], [ʒ].
// Lateral Fricative: A fricative where the airflow goes around the sides of the tongue. Example: [ɬ] (not found in English).
// Approximant: Produced with the articulators close together but not so close as to cause turbulence. Examples: [ɹ], [j], [w].
// Lateral Approximant: An approximant where the airflow goes around the sides of the tongue. Example: [l].

// 3. Voicing
// Refers to whether the vocal cords are vibrating during the articulation.

// Voiced: Vocal cords vibrate. Examples: [b], [d], [g], [v], [z], [ʒ].
// Voiceless: Vocal cords do not vibrate. Examples: [p], [t], [k], [f], [s], [ʃ].