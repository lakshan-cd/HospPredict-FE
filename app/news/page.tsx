import HeroAreaPages from "@/components/hero-pages/hero-area-pages";
import ViewAllCompanies from "../financials/components/view-all-companies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Globe, Newspaper, Hotel, Star } from "lucide-react";
import HotelsTable from "./components/hotel-table";
import PredictSpikesNews from "./components/predict-spikes-news";
import PredictMultipleNews from "./components/predict-multiple-news";

const hotels : {id: string, name: string}[] = [
    {id: "AHUN.N0000", name: "Aitken Spence Hotel Holdings PLC"},
    {id: "TRAN.N0000", name: "Trans Asia Hotels PLC"},
    {id: "STAF.N0000", name: "Stafford Hotels PLC"},
    {id: "MRH.N0000", name: "Mahaweli Reach Hotels PLC"},
    {id: "AHPL.N0000", name: "Asian Hotels and Properties PLC"},
    {id: "GHLL.N0000", name: "Galadari Hotels PLC"},
    {id: "KJL.N0000", name: "John Keells Hotels PLC"},
    {id: "EDEN.N0000", name: "Eden Hotel Lanka PLC"},
    {id: "RENU.N0000", name: "Renuka City Hotel PLC"},
    {id: "RPBH.N0000", name: "Royal Palms Beach Hotels PLC"},
    {id: "RCH.N0000", name: "Reach Hotels PLC"},
    {id: "HSIG.N0000", name: "Hotel Sigiriya PLC"},
    {id: "BBH.N0000", name: "Browns Beach Hotels PLC"},
    {id: "PEG.N0000", name: "Pegasus Hotels of Ceylon PLC"},
    {id: "CHOT.N0000", name: "Ceylon Hotels Corporation PLC"},
    {id: "KHC.N0000", name: "Keells Hotels PLC"},
    {id: "SIGV.N0000", name: "Sigiriya Village Hotels PLC"},
    {id: "LHL.N0000", name: "Lighthouse Hotel PLC"},
    {id: "TAJ.N0000", name: "Taj Samudra Hotel PLC"},
    {id: "TANG.N0000", name: "Tal Lanka Hotel PLC"},
]
const Page = () => {
    return (
        <>
        <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
                <div className="my-12">
                <HeroAreaPages 
                title="Find what happen in the hotel industry with the social media / news articles" 
                description="Stay updated with the latest news, social media trends, and market analysis for Sri Lanka's premier hotel companies. Get comprehensive insights to make informed investment decisions." 
                icon1={<Hotel className="w-3 h-3 mr-1" />} 
                icon2={<Newspaper className="w-3 h-3 mr-1" />} 
                icon3={<TrendingUp className="w-3 h-3 mr-1" />} 
                icon1_name="Hotels"
                icon2_name="News"
                icon3_name="Analytics"
                />
                </div>

                {/* Right Side - Companies Table */}
                <div className="space-y-4">
                    <HotelsTable hotels={hotels} />
                </div>

                <div className="my-12">
                    <PredictSpikesNews hotels={hotels} />
                </div>

                <div className="my-12">
                    <PredictMultipleNews hotels={hotels} />
                </div>
            {/* </div> */}
        </div>
        </>
    )
}
export default Page;