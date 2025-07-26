import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { PredictRiskPeriod } from "./predict-risk-period"
import { PredictRiskMetric } from "./predict-risk-metric"

export function PredictRisk({companyId}: {companyId: string}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Period</TabsTrigger>
          <TabsTrigger value="password">Metric</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <PredictRiskPeriod companyId={companyId} />
        </TabsContent>
        <TabsContent value="password">
          <PredictRiskMetric companyId={companyId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
