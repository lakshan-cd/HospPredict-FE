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
  getQoQChangesForMetric,
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
import { enqueueSnackbar } from "notistack";

export const QoQChanges = ({ companyId }: { companyId: string }) => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [currentMetric, setCurrentMetric] = useState<string>("");
  const [errMsg, setErrMsg] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timelineData, setTimelineData] = useState<
    { from_period: string; to_period: string; qoq_change: number }[]
  >([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await getAvailableMetricsKnowledgeGraph(companyId);
      setMetrics(response.available_metrics);
    };
    fetchMetrics();
  }, [companyId]);

  const handleViewQoQCharts = async () => {
    setIsLoading(true);
    try {
      const response = await getQoQChangesForMetric(companyId, currentMetric);
      setTimelineData(response.qoq_changes);
    } catch (error: any) {
        enqueueSnackbar(`Error fetching QoQ changes : ${error.detail}`, {
            variant: "error",
        });
    } finally {
      setIsLoading(false);
    }
  };

  const chartConfig = {
    qoq_change: {
      label: "QoQ Change",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // Sort by to_period date
  const sortedTimeline = timelineData
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.to_period);
      const dateB = new Date(b.to_period);
      return dateA.getTime() - dateB.getTime();
    });

  // Format for chart: X = to_period (DD/MM/YYYY), Y = qoq_change
  const chartData = sortedTimeline.map((item) => {
    const [month, day, year] = item.to_period.split("/");
    return {
      ...item,
      displayPeriod: `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`,
    };
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <TypographyH2>Quarter over quarter changes</TypographyH2>
          </CardTitle>
          <CardDescription>
            Select the metric and analyze the quarter over quarter changes.
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
              onClick={() => handleViewQoQCharts()}
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
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="displayPeriod"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      const [day, month, year] = value.split("/");
                      return `${day}/${month}/${year}`;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-background/90 border border-border rounded-lg px-3 py-2 text-xs text-foreground shadow">
                            <div className="font-semibold">Date: {d.displayPeriod}</div>
                            <div>QoQ Change: {d.qoq_change}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    dataKey="qoq_change"
                    type="natural"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
              <CardFooter className="flex-col items-start gap-2 text-sm mt-4">
                <div className="text-muted-foreground leading-none">
                  Showing the {currentMetric} QoQ change for the last {timelineData.length} periods
                </div>
              </CardFooter>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
