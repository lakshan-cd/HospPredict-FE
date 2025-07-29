import HeroAreaPages from "@/components/hero-pages/hero-area-pages";
import { PredictNewCompany } from "./components/predict-new-company";
import ViewAllCompanies from "./components/view-all-companies";
import { BarChart3, DollarSign, TrendingUp } from "lucide-react";

const Page = () => {
    return (
        <>
                <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
                    <div className="my-12">
                        <HeroAreaPages 
                          title="Find what company you want to invest in" 
                            description="Gain deep financial insights into Sri Lanka's leading hotel companies through advanced data analysis, interactive knowledge graphs, and predictive risk modeling. Understand financial performance, uncover hidden relationships, and evaluate potential risks to support smarter investment decisions." 
                          icon1={<BarChart3 className="w-3 h-3 mr-1" />} 
                          icon2={<DollarSign className="w-3 h-3 mr-1" />} 
                          icon3={<TrendingUp className="w-3 h-3 mr-1" />} 
                          icon1_name="Financials"
                          icon2_name="Economics"
                          icon3_name="Analytics"
                          />
                           
                    </div>
                    <ViewAllCompanies page="financials" />

                    <div className="mt-12">
                        <PredictNewCompany />
                    </div>
                </div>
        </>
    )
}
export default Page;