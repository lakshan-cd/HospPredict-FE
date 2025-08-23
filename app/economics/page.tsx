import { Activity, TrendingUp, BarChart2, Hotel } from "lucide-react";
import ViewAllCompanies from "../financials/components/view-all-companies";
import HeroAreaPages from "@/components/hero-pages/hero-area-pages";

const Page = ()=> {
    return (
        <>
        <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
            <div className="my-12">
            <div className="my-12">
                <HeroAreaPages 
                    title="Explore financial insights and performance trends in Sri Lanka's hotel industry" 
                    description="Access detailed economic analysis, key performance metrics, and price prediction models for Sri Lanka's premier hotel companies. Make informed investment decisions with data-driven insights." 
                    icon1={<Hotel className="w-3 h-3 mr-1" />} 
                    icon2={<Activity className="w-3 h-3 mr-1" />} 
                    icon3={<TrendingUp className="w-3 h-3 mr-1" />} 
                    icon1_name="Hotels"
                    icon2_name="Macro Economics"
                    icon3_name="Analytics"
                />
                </div>

            </div>
            <ViewAllCompanies page="economics" />
        </div>
</>
    )
}

export default Page;