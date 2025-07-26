import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import { PredictRiskPeriod } from "../predict-risk-period"
  import { PredictRiskMetric } from "../predict-risk-metric"
import { TimelineChanges } from "./timeline-changes"
import { QoQChanges } from "./qoq-changes"
import { CriticalPeriods } from "./critical-periods"
import { ViewGraphForQuaters } from "./view-graph-for-qauters"
  
  export function ExploreKnowledgeBase({companyId}: {companyId: string}) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Timeline and charts</TabsTrigger>
            <TabsTrigger value="password">Quarter over quarter changes</TabsTrigger>
            <TabsTrigger value="critical">Critical Periods</TabsTrigger>
            <TabsTrigger value="graph">View Graph for Quarters</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <TimelineChanges companyId={companyId} />
          </TabsContent>
          <TabsContent value="password">
            <QoQChanges companyId={companyId} />
          </TabsContent>
          <TabsContent value="critical">
            <CriticalPeriods companyId={companyId} />
          </TabsContent>
          <TabsContent value="graph">
            <ViewGraphForQuaters companyId={companyId} />
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  