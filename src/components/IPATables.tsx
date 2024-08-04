import { IPAConsonant, IPADiphthong, IPAVowel } from "@/utils/info/IPACharts";
import IPATable from "./IPATable";

export default function IPATables() {
    return (
        <div className="flex flex-col">
            <div className="flex overflow-x-auto">
                <IPATable label="Consonants" header={Object.keys(IPAConsonant.Plosive)} IPAData={IPAConsonant} first={true} />
            </div>
            <div className="flex gap-10">
                <div className="flex">
                    <IPATable label="Vowels" header={Object.keys(IPAVowel.Front)} IPAData={IPAVowel} />
                </div>
                <div className="flex">
                    <IPATable label="Diphthongs" header={Object.keys(IPADiphthong.Closing)} IPAData={IPADiphthong} />
                </div>
            </div>
        </div>
    )
}