"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCompanyMetrics, getAllCompanyTrendGraph } from "@/service/financial.service"
import { useEffect, useState } from "react";

export const description = "An interactive area chart"

const METRICS = [
  'open_rs', 'high_rs', 'low_rs', 'close_rs', 'tradevolume', 'sharevolume', 'turnover_rs', 'daily_return', 'return_ma7', 'return_ma30', 'volatility_30', 'vol_zscore', 'vol_thresh', 'TotalAssets', 'CurrentAssets', 'CashAndCashivalents', 'AccountsReceivable', 'Inventory', 'PPE', 'TotalLiabilities', 'CurrentLiabilities', 'LongTermDebt', 'ShareholdersEquity', 'RetainedEarnings', 'WorkingCapital', 'Revenue', 'CostOfGoodsSold', 'GrossProfit', 'OperatingExpenses', 'Depreciation', 'OperatingIncome', 'EBITDA', 'NetIncome', 'EPS', 'OperatingCF', 'InvestingCF', 'FinancingCF', 'NetChangeCash', 'Capex', 'FreeCashFlow', 'CurrentRatio', 'QuickRatio', 'CashRatio', 'GrossMargin', 'OperatingMargin', 'EBITDAMargin', 'NetProfitMargin', 'ROA', 'ROE', 'DebtToEquity', 'DebtRatio', 'AssetTurnover', 'CashFlowRatio', 'CashFlowToAssets', 'InterestCoverage', 'BasicDilutedEPS', 'DividendsPerShare', 'BookValuePerShare', 'PERatio', 'PBRatio', 'EBITDA_diff', 'EBITDA_z', 'critical_quarter', 'open_rs_QoQ', 'high_rs_QoQ', 'low_rs_QoQ', 'close_rs_QoQ', 'tradevolume_QoQ', 'sharevolume_QoQ', 'turnover_rs_QoQ', 'daily_return_QoQ', 'return_ma7_QoQ', 'return_ma30_QoQ', 'volatility_30_QoQ', 'vol_zscore_QoQ', 'vol_thresh_QoQ', 'TotalAssets_QoQ', 'CurrentAssets_QoQ', 'CashAndCashivalents_QoQ', 'AccountsReceivable_QoQ', 'Inventory_QoQ', 'PPE_QoQ', 'TotalLiabilities_QoQ', 'CurrentLiabilities_QoQ', 'LongTermDebt_QoQ', 'ShareholdersEquity_QoQ', 'RetainedEarnings_QoQ', 'WorkingCapital_QoQ', 'Revenue_QoQ', 'CostOfGoodsSold_QoQ', 'GrossProfit_QoQ', 'OperatingExpenses_QoQ', 'Depreciation_QoQ', 'OperatingIncome_QoQ', 'EBITDA_QoQ', 'NetIncome_QoQ', 'EPS_QoQ', 'OperatingCF_QoQ', 'InvestingCF_QoQ', 'FinancingCF_QoQ'
];

const METRICS_HALF = Math.ceil(METRICS.length / 2);
const METRICS_LIST_1 = METRICS.slice(0, METRICS_HALF);
const METRICS_LIST_2 = METRICS.slice(METRICS_HALF);

// const chartData = [
//   { date: "2024-04-01", desktop: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
//   { date: "2024-04-03", desktop: 167, mobile: 120 },
//   { date: "2024-04-04", desktop: 242, mobile: 260 },
//   { date: "2024-04-05", desktop: 373, mobile: 290 },
//   { date: "2024-04-06", desktop: 301, mobile: 340 },
//   { date: "2024-04-07", desktop: 245, mobile: 180 },
//   { date: "2024-04-08", desktop: 409, mobile: 320 },
//   { date: "2024-04-09", desktop: 59, mobile: 110 },
//   { date: "2024-04-10", desktop: 261, mobile: 190 },
//   { date: "2024-04-11", desktop: 327, mobile: 350 },
//   { date: "2024-04-12", desktop: 292, mobile: 210 },
//   { date: "2024-04-13", desktop: 342, mobile: 380 },
//   { date: "2024-04-14", desktop: 137, mobile: 220 },
//   { date: "2024-04-15", desktop: 120, mobile: 170 },
//   { date: "2024-04-16", desktop: 138, mobile: 190 },
//   { date: "2024-04-17", desktop: 446, mobile: 360 },
//   { date: "2024-04-18", desktop: 364, mobile: 410 },
//   { date: "2024-04-19", desktop: 243, mobile: 180 },
//   { date: "2024-04-20", desktop: 89, mobile: 150 },
//   { date: "2024-04-21", desktop: 137, mobile: 200 },
//   { date: "2024-04-22", desktop: 224, mobile: 170 },
//   { date: "2024-04-23", desktop: 138, mobile: 230 },
//   { date: "2024-04-24", desktop: 387, mobile: 290 },
//   { date: "2024-04-25", desktop: 215, mobile: 250 },
//   { date: "2024-04-26", desktop: 75, mobile: 130 },
//   { date: "2024-04-27", desktop: 383, mobile: 420 },
//   { date: "2024-04-28", desktop: 122, mobile: 180 },
//   { date: "2024-04-29", desktop: 315, mobile: 240 },
//   { date: "2024-04-30", desktop: 454, mobile: 380 },
//   { date: "2024-05-01", desktop: 165, mobile: 220 },
//   { date: "2024-05-02", desktop: 293, mobile: 310 },
//   { date: "2024-05-03", desktop: 247, mobile: 190 },
//   { date: "2024-05-04", desktop: 385, mobile: 420 },
//   { date: "2024-05-05", desktop: 481, mobile: 390 },
//   { date: "2024-05-06", desktop: 498, mobile: 520 },
//   { date: "2024-05-07", desktop: 388, mobile: 300 },
//   { date: "2024-05-08", desktop: 149, mobile: 210 },
//   { date: "2024-05-09", desktop: 227, mobile: 180 },
//   { date: "2024-05-10", desktop: 293, mobile: 330 },
//   { date: "2024-05-11", desktop: 335, mobile: 270 },
//   { date: "2024-05-12", desktop: 197, mobile: 240 },
//   { date: "2024-05-13", desktop: 197, mobile: 160 },
//   { date: "2024-05-14", desktop: 448, mobile: 490 },
//   { date: "2024-05-15", desktop: 473, mobile: 380 },
//   { date: "2024-05-16", desktop: 338, mobile: 400 },
//   { date: "2024-05-17", desktop: 499, mobile: 420 },
//   { date: "2024-05-18", desktop: 315, mobile: 350 },
//   { date: "2024-05-19", desktop: 235, mobile: 180 },
//   { date: "2024-05-20", desktop: 177, mobile: 230 },
//   { date: "2024-05-21", desktop: 82, mobile: 140 },
//   { date: "2024-05-22", desktop: 81, mobile: 120 },
//   { date: "2024-05-23", desktop: 252, mobile: 290 },
//   { date: "2024-05-24", desktop: 294, mobile: 220 },
//   { date: "2024-05-25", desktop: 201, mobile: 250 },
//   { date: "2024-05-26", desktop: 213, mobile: 170 },
//   { date: "2024-05-27", desktop: 420, mobile: 460 },
//   { date: "2024-05-28", desktop: 233, mobile: 190 },
//   { date: "2024-05-29", desktop: 78, mobile: 130 },
//   { date: "2024-05-30", desktop: 340, mobile: 280 },
//   { date: "2024-05-31", desktop: 178, mobile: 230 },
//   { date: "2024-06-01", desktop: 178, mobile: 200 },
//   { date: "2024-06-02", desktop: 470, mobile: 410 },
//   { date: "2024-06-03", desktop: 103, mobile: 160 },
//   { date: "2024-06-04", desktop: 439, mobile: 380 },
//   { date: "2024-06-05", desktop: 88, mobile: 140 },
//   { date: "2024-06-06", desktop: 294, mobile: 250 },
//   { date: "2024-06-07", desktop: 323, mobile: 370 },
//   { date: "2024-06-08", desktop: 385, mobile: 320 },
//   { date: "2024-06-09", desktop: 438, mobile: 480 },
//   { date: "2024-06-10", desktop: 155, mobile: 200 },
//   { date: "2024-06-11", desktop: 92, mobile: 150 },
//   { date: "2024-06-12", desktop: 492, mobile: 420 },
//   { date: "2024-06-13", desktop: 81, mobile: 130 },
//   { date: "2024-06-14", desktop: 426, mobile: 380 },
//   { date: "2024-06-15", desktop: 307, mobile: 350 },
//   { date: "2024-06-16", desktop: 371, mobile: 310 },
//   { date: "2024-06-17", desktop: 475, mobile: 520 },
//   { date: "2024-06-18", desktop: 107, mobile: 170 },
//   { date: "2024-06-19", desktop: 341, mobile: 290 },
//   { date: "2024-06-20", desktop: 408, mobile: 450 },
//   { date: "2024-06-21", desktop: 169, mobile: 210 },
//   { date: "2024-06-22", desktop: 317, mobile: 270 },
//   { date: "2024-06-23", desktop: 480, mobile: 530 },
//   { date: "2024-06-24", desktop: 132, mobile: 180 },
//   { date: "2024-06-25", desktop: 141, mobile: 190 },
//   { date: "2024-06-26", desktop: 434, mobile: 380 },
//   { date: "2024-06-27", desktop: 448, mobile: 490 },
//   { date: "2024-06-28", desktop: 149, mobile: 200 },
//   { date: "2024-06-29", desktop: 103, mobile: 160 },
//   { date: "2024-06-30", desktop: 446, mobile: 400 },
// ]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function TrendGraph({ companyId }: { companyId: string }) {
  const [timeRange, setTimeRange] = React.useState("all")
  const [metrics, setMetrics] = React.useState<any[]>([])
  const [selectedMetric1, setSelectedMetric1] = useState("");
  const [selectedMetric2, setSelectedMetric2] = useState("");
  const[chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await getAllCompanyMetrics(companyId)
      setMetrics(response.metrics)
      if (response.metrics && response.metrics.length > 0) {
        const half = Math.ceil(response.metrics.length / 2);
        setSelectedMetric1(response.metrics[0]);
        setSelectedMetric2(response.metrics[half] || response.metrics[0]);
      }
    }
    fetchMetrics()
  }, [companyId])

  React.useEffect(() => {

    const fetchTrendGraph = async () => {
        if (selectedMetric1 && selectedMetric2) {
        const response = await getAllCompanyTrendGraph(companyId, selectedMetric1)
        const response2 = await getAllCompanyTrendGraph(companyId, selectedMetric2)
        createChartData(response.data, response2.data)
    }
    }
    fetchTrendGraph()
  }, [selectedMetric1, selectedMetric2])

  const createChartData = (trendGraph1: any, trendGraph2: any) => {
    const chartData = trendGraph1.map((item: any, index: number) => ({
      date: item.period,
      mobile: trendGraph2[index].value,
      desktop: trendGraph1[index].value,
    }))
    setChartData(chartData)
  }

  // Split metrics into two lists
  const half = Math.ceil(metrics.length / 2);
  const metricsList1 = metrics.slice(0, half);
  const metricsList2 = metrics.slice(half);


  const filteredData = React.useMemo(() => {
    if (!chartData.length) return [];
    if (timeRange === "all") return chartData;
    let count = 6; // fallback, but should not be used
    if (timeRange === "3q") count = 3;
    else if (timeRange === "1q") count = 1;
    else if (timeRange === "6q") count = 6;
    return chartData.slice(-count);
  }, [chartData, timeRange]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>
            {selectedMetric1 && selectedMetric2
              ? `${selectedMetric1} vs ${selectedMetric2}`
              : "Area Chart - Interactive"}
          </CardTitle>
          <CardDescription>
            {selectedMetric1 && selectedMetric2
              ? `Comparing ${selectedMetric1} and ${selectedMetric2} over time`
              : "Select metrics to compare their trends over time."}
          </CardDescription>
        </div>
        <Select>
            
        </Select>
        {/* <div className="flex gap-4 mb-4"> */}
        <Select value={selectedMetric1} onValueChange={setSelectedMetric1}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {metrics.map(metric => (
              <SelectItem key={metric} value={metric}>{metric}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedMetric2} onValueChange={setSelectedMetric2}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {metrics.map(metric => (
              <SelectItem key={metric} value={metric}>{metric}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      {/* </div> */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="All Quarters" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              All Quarters
            </SelectItem>
            <SelectItem value="6q" className="rounded-lg">
              Last 6 Quarters
            </SelectItem>
            <SelectItem value="3q" className="rounded-lg">
              Last 3 Quarters
            </SelectItem>
            <SelectItem value="1q" className="rounded-lg">
              Last 1 Quarter
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
              name={selectedMetric2}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
              name={selectedMetric1}
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
