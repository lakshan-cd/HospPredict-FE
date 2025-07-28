"use client"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2, X } from "lucide-react"
import { getAllCompanyMetrics } from "@/service/financial.service"
import { useEffect, useState } from "react"
import { getAllCompanyPeriods, predictRiskForMetric } from "@/service/financial-predict.service"
import { enqueueSnackbar } from "notistack"
import SkeletonLoader from "@/components/loader/SkeletonLoader"
import { TypographyH3 } from "@/components/typography/typography-h3"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TypographyH4 } from "@/components/typography/typography-h4"
import { TopInfluencedMetricBarChart } from "./top-influenced-metric-bar-chart"

export const PredictRiskMetric = ({companyId}: {companyId: string}) => {

    const [metrics, setMetrics] = useState<any[]>([])
    const [selectedMetric1, setSelectedMetric1] = useState("")
    const [selectedMetric2, setSelectedMetric2] = useState("")
    const [metricRows, setMetricRows] = useState<{ metric: string; value: string }[]>([]);
    const [currentMetric, setCurrentMetric] = useState("");
    const [currentValue, setCurrentValue] = useState("");
    const [periods, setPeriods] = useState<any[]>([])
    const [errMsg, setErrMsg] = useState<{field: string, msg: string}[]>([])
    const [selectedPeriod, setSelectedPeriod] = useState<string>("")
    const [predictedRiskResult, setPredictedRiskResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    useEffect(() => {
        const fetchMetrics = async () => {
          const response = await getAllCompanyMetrics(companyId)
          setMetrics(response.metrics)
          if (response.metrics && response.metrics.length > 0) {
            const half = Math.ceil(response.metrics.length / 2);
            setSelectedMetric1(response.metrics[0]);
            setSelectedMetric2(response.metrics[half] || response.metrics[0]);
          }

          const res = await getAllCompanyPeriods(companyId)
        setPeriods(res.periods)
        }
        fetchMetrics()
      }, [companyId])
      
    // Compute available metrics for the select (exclude already selected)
    const availableMetrics = metrics.filter(
      (m) => !metricRows.some((row) => row.metric === m)
    );

    const handleAddRow = () => {
      if (!currentMetric) {
        setErrMsg([...errMsg, { field: "metric", msg: "Please select a metric." }]);
        return;
      }
      if (!currentValue) {
        setErrMsg([...errMsg, { field: "value", msg: "Please enter a value." }]);
        return;
      }
      setMetricRows([...metricRows, { metric: currentMetric, value: currentValue }]);
      setCurrentMetric("");
      setCurrentValue("");
      setErrMsg([]);
    };

    const handleDeleteRow = (index: number) => {
      setMetricRows(metricRows.filter((_, i) => i !== index));
    };
      
    const handlePredict = async () => {
      setPredictedRiskResult(null)
      if (!selectedPeriod || metricRows.length === 0) {
        if (!selectedPeriod) {
            setErrMsg([...errMsg, { field: "period", msg: "Please select a period." }]);
        }
        if (metricRows.length === 0) {
            setErrMsg([...errMsg, { field: "rows", msg: "Please add at least one metric and value." }]);
        }
        return;
      }
      setErrMsg([]);
      // Prediction logic here
      const obj = {
        "company_id": companyId,
        "period": selectedPeriod,
        "feature_changes": metricRows.reduce((acc, row) => {
          acc[row.metric] = parseFloat(row.value);
          return acc;
        }, {} as Record<string, number>)
      }
      try{
        setIsLoading(true)
        const res = await predictRiskForMetric(obj)
        setPredictedRiskResult(res)
      } catch (error) {         
        enqueueSnackbar("Error occurred while predicting risk", {variant: "error"})
      } finally {
        setIsLoading(false)
      }
    }

    return (
            <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <TypographyH2>
                            Predict Risk Metric
                        </TypographyH2>
                    </CardTitle>
                    <CardDescription>
                        Select the metric and change there values to predict the risk in next quarter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="flex gap-6">
                <div className="flex-1 grid gap-2">
                    <Label htmlFor="tabs-demo-name">Name</Label>
                    <Input
                    id="tabs-demo-name"
                    defaultValue={companyId.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())}
                    readOnly
                    />
                </div>
                <div className="flex-1 grid gap-2">
                    <Label htmlFor="tabs-demo-username">Period</Label>
                    <Select onValueChange={(value) => { setSelectedPeriod(value); setErrMsg([]); }} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                        {periods.map((period, index) => (
                        <SelectItem key={index} value={period}>{period}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    {errMsg.some(err => err.field === "period") && (
                      <span className="text-red-500 text-xs mt-1">{errMsg.find(err => err.field === "period")?.msg}</span>
                    )}
                </div>
                </div> 
                <div className="my-4">
                    {metricRows.map((row, idx) => (
                      <div key={idx} className="flex gap-4 items-center mb-2">
                        <div className="w-1/2 grid gap-2">
                          <Label>Metric</Label>
                          <Input value={row.metric} readOnly className="bg-muted" />
                        </div>
                        <div className="w-1/2 grid gap-2">
                          <Label>Value</Label>
                          <Input value={row.value} readOnly className="bg-muted" />
                        </div>
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteRow(idx)}
                          aria-label="Delete row"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-4 items-end">
                      <div className="grid gap-2">
                        <Label htmlFor="metric-select">Metric</Label>
                        <Select
                          value={currentMetric}
                          onValueChange={val => { setCurrentMetric(val); if (errMsg.some(err => err.field === "metric")) setErrMsg([]); }}
                          disabled={availableMetrics.length === 0}
                        >
                          <SelectTrigger id="metric-select">
                            <SelectValue placeholder="Select a metric" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableMetrics
                            .sort((a, b) => a.localeCompare(b))
                            .map((metric) => (
                              <SelectItem key={metric} value={metric}>{metric}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errMsg.some(err => err.field === "metric") && (
                          <span className="text-red-500 text-xs mt-1">{errMsg.find(err => err.field === "metric")?.msg}</span>
                        )}
                      </div>
                      <div className="w-full grid gap-2">
                        <Label htmlFor="metric-value">Enter new value</Label>
                        <Input
                          id="metric-value"
                          type="number"
                          value={currentValue}
                          onChange={e => { setCurrentValue(e.target.value); if (errMsg.some(err => err.field === "value")) setErrMsg([]); }}
                        />
                        {errMsg.some(err => err.field === "value") && (
                          <span className="text-red-500 text-xs mt-1">{errMsg.find(err => err.field === "value")?.msg}</span>
                        )}
                      </div>
                      <div className="w-auto self-end pb-1">
                        <Button
                          type="button"
                          onClick={handleAddRow}
                          disabled={!(currentMetric && currentValue)}
                        >
                          Add Metric
                        </Button>
                      </div>
                    </div>
                    {errMsg.some(err => err.field === "rows") && (
                      <span className="text-red-500 text-xs mt-1 block">{errMsg.find(err => err.field === "rows")?.msg}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
              <Button  onClick={() => {
                handlePredict()
              }}
              >Predict</Button>
            </CardFooter>

            <CardContent>
                    {isLoading && (
                <div className="my-2">
                        <SkeletonLoader rows={3}/>
                </div>
                    )}
                {
                    predictedRiskResult && (
                        <>
                        <div className="border-b-2 border-primary-foreground w-full my-2"></div>
                        <div className="flex flex-col gap-2 items-center justify-center py-4">
                            <div className="flex gap-2 items-center">
                                <TypographyH3>Original Risk: </TypographyH3>
                                <TypographyH3>{predictedRiskResult.original_risk}</TypographyH3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <TypographyH3>New Risk: </TypographyH3>
                                <TypographyH3 className={`${parseFloat(predictedRiskResult.perturbed_risk) >= 0.8 ? "text-red-500" : parseFloat(predictedRiskResult.perturbed_risk) >= 0.5 ? "text-orange-500" : parseFloat(predictedRiskResult.perturbed_risk) >= 0.2 ? "text-yellow-500" : "text-green-500"}`}>{predictedRiskResult.perturbed_risk}</TypographyH3>
                                {predictedRiskResult.delta_risk > 0 ? (
                                    <span className="text-red-500 ml-2">▲ Increased by {predictedRiskResult.delta_risk.toFixed(3)}</span>
                                ) : predictedRiskResult.delta_risk < 0 ? (
                                    <span className="text-green-500 ml-2">▼ Decreased by {Math.abs(predictedRiskResult.delta_risk).toFixed(3)}</span>
                                ) : (
                                    <span className="text-gray-500 ml-2">No change</span>
                                )}
                            </div>
                            <div className="w-full mt-4">
                                <h4 className="font-semibold mb-2">Changed Metrics</h4>
                                <Table className="w-full text-xs border">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead >Metric</TableHead>
                                            <TableHead >Original</TableHead>
                                            <TableHead >New</TableHead>
                                            <TableHead >Δ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(predictedRiskResult.changed_features).map(metric => (
                                            <TableRow key={metric}>
                                                <TableCell>{metric}</TableCell>
                                                <TableCell>{predictedRiskResult.changed_features_original[metric]}</TableCell>
                                                <TableCell>{predictedRiskResult.changed_features[metric]}</TableCell>
                                                <TableCell>
                                                    {(predictedRiskResult.changed_features[metric] - predictedRiskResult.changed_features_original[metric]).toFixed(3)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                  <div className="my-4">
                                <TypographyH4>Top influencing metrics</TypographyH4>
                                  </div>

                                <div className="w-full my-4">
                                <TopInfluencedMetricBarChart data={predictedRiskResult.top_influential_features} />
                                </div>
                            </div>
                        </div>
                        </>
                    )    
            }
            </CardContent>
            </Card>
            </>
    )
}

function getRiskInfo(score: number) {
    if (score >= 0.8) {
      return {
        label: "Very High Influence",
        color: "text-red-600 bg-red-100 border-red-300",
        description: "This metric is showing a very strong influence on recent share-price declines. Immediate attention is warranted."
      };
    } else if (score >= 0.5) {
      return {
        label: "Moderate Influence",
        color: "text-orange-600 bg-orange-100 border-orange-300",
        description: " This factor has a meaningful influence on share-price performance. Keep a close watch and evaluate hedging or defensive actions."
      };
    } else if (score >= 0.2) {
      return {
        label: "Low Influence",
        color: "text-yellow-700 bg-yellow-100 border-yellow-300",
        description: "This metric currently plays a limited role in predicting price declines. Review periodically but no urgent action needed."
      };
    } else {
      return {
        label: "Negligible Influence",
        color: "text-green-700 bg-green-100 border-green-300",
        description: "This metric has a negligible impact on current market risk. No action needed."
      };
    }
  }