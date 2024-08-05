import { IPAConsonant, IPADiphthong, IPAVowel } from "@/utils/info/IPACharts";
import IPATable from "./IPATable";

export default function IPATables() {
    return (
        <div className="flex flex-col">
            <div className="flex overflow-x-auto">
                <IPATable topLabel="Consonants" IPAData={IPAConsonant} bottomLabel="*American English" />
            </div>
            <div className="flex gap-10">
                <div className="flex">
                    <IPATable topLabel="Vowels" IPAData={IPAVowel} />
                </div>
                <div className="flex">
                    <IPATable topLabel="Diphthongs" IPAData={IPADiphthong} />
                </div>
            </div>
        </div>
    )
}