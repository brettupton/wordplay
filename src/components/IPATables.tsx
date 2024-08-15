import { IPACharts } from "@/utils/info/IPACharts"
import IPATable from "./IPATable"

export default function IPATables() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex">
                <IPATable topLabel="Consonants (Pulmonic)" IPAData={IPACharts.pulmonicConsonant} />
            </div>
            <div className="flex">
                <div className="flex">
                    <IPATable topLabel="Consonants (Nonpulmonic)" IPAData={IPACharts.clicks} />
                </div>
                <div className="flex">
                    <IPATable IPAData={IPACharts.voicedImplosives} />
                </div>
                <div className="flex">
                    <IPATable IPAData={IPACharts.ejectives} />
                </div>
            </div>
        </div>
    )
}