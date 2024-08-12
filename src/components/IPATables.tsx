import { IPAPulmonicConsonant, IPAVowel } from "@/utils/info/IPACharts";
import IPATable from "./IPATable";

export default function IPATables() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex overflow-x-auto">
                <IPATable topLabel="Consonants (Pulmonic)" IPAData={IPAPulmonicConsonant} />
            </div>
        </div>
    )
}