"use client";

import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAvailableMetricsKnowledgeGraph,
  getTimeLineDataForMetric,
} from "@/service/financial-knowledgegraph.service";
import { getAllCompanyMetrics } from "@/service/financial.service";
import { useEffect, useState } from "react";
import { LineChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "@/components/ui/chart";
import { Line } from "recharts";
import { TrendingUp } from "lucide-react";

export const TimelineChanges = ({ companyId }: { companyId: string }) => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [currentMetric, setCurrentMetric] = useState<string>("");
  const [errMsg, setErrMsg] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timelineData, setTimelineData] = useState<
    { period: string; value: number }[]
  >([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await getAvailableMetricsKnowledgeGraph(companyId);
      setMetrics(response.available_metrics);
    };
    fetchMetrics();
  }, [companyId]);

  const handleViewCharts = async () => {
    setIsLoading(true);
    try {
      const response = await getTimeLineDataForMetric(companyId, currentMetric);
      setTimelineData(response.timeline);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartConfig = {
    value: {
      label: "Value",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const sortedTimeline = timelineData
    .slice() // copy to avoid mutating original
    .sort((a, b) => {
      // Parse MM/DD/YYYY to Date
      const dateA = new Date(a.period);
      const dateB = new Date(b.period);
      return dateA.getTime() - dateB.getTime();
    });

  // For display, you can format as DD/MM/YYYY:
  const chartData = sortedTimeline.map((item) => {
    const [month, day, year] = item.period.split("/");
    return {
      ...item,
      displayPeriod: `${day.padStart(2, "0")}/${month.padStart(
        2,
        "0"
      )}/${year}`,
    };
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <TypographyH2>Timeline and charts</TypographyH2>
          </CardTitle>
          <CardDescription>
            Select the metric and analyze the timeline changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 w-full items-center">
            <div className="grid gap-2">
              <Label htmlFor="tabs-demo-name">Name</Label>
              <Input
                id="tabs-demo-name"
                defaultValue={companyId
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                readOnly
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="metric-select">Metric</Label>
              <Select
                value={currentMetric}
                onValueChange={(val) => {
                  setTimelineData([]);
                  setCurrentMetric(val);
                  if (errMsg.some((err) => err.field === "metric"))
                    setErrMsg([]);
                }}
                disabled={metrics.length === 0}
              >
                <SelectTrigger id="metric-select">
                  <SelectValue placeholder="Select a metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map((metric) => (
                    <SelectItem key={metric} value={metric}>
                      {metric}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errMsg.some((err) => err.field === "metric") && (
                <span className="text-red-500 text-xs mt-1">
                  {errMsg.find((err) => err.field === "metric")?.msg}
                </span>
              )}
            </div>
          </div>
          <div className="flex mt-4">
            <Button
              disabled={isLoading || !currentMetric}
              onClick={() => handleViewCharts()}
            >
              View charts
            </Button>
          </div>
        </CardContent>
        <CardContent>
          {isLoading && (
            <div className="my-2">
              <SkeletonLoader rows={3} />
            </div>
          )}

          {timelineData.length > 0 && !isLoading && (
            <>
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="displayPeriod"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      const [month, day, year] = value.split("/");
                      return `${day}/${month}/${year}`;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-background/90 border border-border rounded-lg px-3 py-2 text-xs text-foreground shadow">
                            <div className="font-semibold">
                              Date: {d.displayPeriod}
                            </div>
                            <div>Value: {d.value}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    dataKey="value"
                    type="natural"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
              <CardFooter className="flex-col items-start gap-2 text-sm mt-4">
                <div className="text-muted-foreground leading-none">
                  Showing the {currentMetric} for the last {timelineData.length}{" "}
                  quarters
                </div>
              </CardFooter>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
