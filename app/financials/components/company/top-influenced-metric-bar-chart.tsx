"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

export function TopInfluencedMetricBarChart({data}: {data: any[]}) {
  // Prepare chart data: x = feature, y = importance
  const chartData = data.map(item => ({
    feature: item.feature,
    importance: item.importance,
    value: item.value,
  }));

  const chartConfig = {
    importance: {
      label: "Importance",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Influential Metrics</CardTitle>
        <CardDescription>Feature importance for this prediction</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} height={100} width={100}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="feature"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-background/90 border border-border rounded-lg px-3 py-2 text-xs text-foreground shadow">
                      <div className="font-semibold">{d.feature}</div>
                      <div>Importance: {d.importance.toFixed(4)}</div>
                      <div>Value: {d.value}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="importance" fill="var(--color-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Showing top {chartData.length} features by importance
        </div>
      </CardFooter>
    </Card>
  )
}
