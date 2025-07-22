"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

export const description = "A line chart"

const chartData = [
  { month: "21/07", desktop: { value: 186, news: "New CEO Appointed" } },
  { month: "22/07", desktop: { value: 305, news: "New Product Launched" } },
  { month: "23/07", desktop: { value: 237, news: "CEO Appointed" } },
  { month: "24/07", desktop: { value: 73, news: "New Product Launched" } },
  { month: "25/07", desktop: { value: 209, news: "New CEO Appointed" } },
  { month: "26/07", desktop: { value: 214, news: "New Product Launched" } },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function NewsChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stock Spikes - Related News</CardTitle>
        <CardDescription>July 20 - July 26, 2025</CardDescription>
      </CardHeader>
      <CardContent className="w-full p-4">
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            width={undefined}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const { value, news } = payload[0].payload.desktop;
                  return (
                    <div className="bg-background/90 border border-border rounded-lg px-3 py-2 text-xs text-foreground shadow">
                      <div className="font-semibold">{label}</div>
                      <div>Value: {value}</div>
                      <div className="italic">{news}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              dataKey="desktop.value"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total news for the last 6 days
        </div>
      </CardFooter>
    </Card>
  )
}
