import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import NextDayPricePrediction from "./next-day-price-prediction";
import FuturePricePrediction from "./future-price-prediction";

const PricePredictionTab = ({companyId}: {companyId: string}) => {
    return (
        <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Next Day</TabsTrigger>
          {/* <TabsTrigger value="password">Future</TabsTrigger> */}
        </TabsList>
        <TabsContent value="account">
          <NextDayPricePrediction companyId={companyId} />
        </TabsContent>
        {/* <TabsContent value="password">
          <FuturePricePrediction companyId={companyId} />
        </TabsContent> */}
      </Tabs>
    </div>
    )
}

export default PricePredictionTab;