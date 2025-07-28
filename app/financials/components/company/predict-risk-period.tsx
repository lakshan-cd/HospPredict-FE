"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TypographyH1 } from "@/components/typography/typography-h1"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { useEffect, useState } from "react"
import { getAllCompanyPeriods, predictRiskForPeriod } from "@/service/financial-predict.service"
import { enqueueSnackbar } from "notistack"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TypographyH3 } from "@/components/typography/typography-h3"
import SkeletonLoader from "@/components/loader/SkeletonLoader"
import { TypographyH4 } from "@/components/typography/typography-h4"
import { TopInfluencedMetricBarChart } from "./top-influenced-metric-bar-chart"

export const PredictRiskPeriod = ({companyId}: {companyId: string}) => {
    const [periods, setPeriods] = useState<any[]>([])
    const [selectedPeriod, setSelectedPeriod] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showRequired, setShowRequired] = useState<boolean>(false)
    const [predictedRisk, setPredictedRisk] = useState<string>("")
    const [predictedRiskResult, setPredictedRiskResult] = useState<any>(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getAllCompanyPeriods(companyId)
                setPeriods(res.periods)
            } catch (error) {
                enqueueSnackbar("Error fetching periods", {variant: "error"});
            }
        }
        fetchData()
    }, [])
    const handlePredict = async () => {
        setPredictedRisk("")
        setIsLoading(true)
        if (!selectedPeriod) {
            setShowRequired(true)
        } else {
            setShowRequired(false)
            const obj = {
                "company_id": companyId,
                "period": selectedPeriod    
            }
            try{
                const res = await predictRiskForPeriod(obj)
                setPredictedRisk(res.predicted_risk)
                setPredictedRiskResult(res)
            } catch (error) {
                enqueueSnackbar("Error predicting risk", {variant: "error"})
            } finally {
                setIsLoading(false)
            }
        }
    }
    // Helper to interpret risk
    function getRiskInfo(score: number) {
      if (score >= 0.8) {
        return {
          label: "Very High Risk",
          color: "text-red-600 bg-red-100 border-red-300",
          description: "Significant risk of share-price decline expected next quarter. Immediate strategic review is strongly recommended."
        };
      } else if (score >= 0.5) {
        return {
          label: "Moderate Risk",
          color: "text-orange-600 bg-orange-100 border-orange-300",
          description: "Notable downside risk projected for the next quarter. Monitor closely and consider protective measures."
        };
      } else if (score >= 0.2) {
        return {
          label: "Low Risk",
          color: "text-yellow-700 bg-yellow-100 border-yellow-300",
          description: "Minor potential for share-price weakness in the upcoming quarter. Maintain awareness but no immediate action required."
        };
      } else {
        return {
          label: "Minimal Risk",
          color: "text-green-700 bg-green-100 border-green-300",
          description: "Limited evidence of downside risk next quarter. No specific action necessary at this time."
        };
      }
    }
    
    
    return (
        <>
        <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>
                    Predict the risk in next quarter
                </TypographyH2>
                </CardTitle>
              <CardDescription>
                Select the period to predict the risk in next quarter.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
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
                    <Select onValueChange={(value) => { setSelectedPeriod(value); setShowRequired(false); }} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                        {periods.map((period, index) => (
                        <SelectItem key={index} value={period}>{period}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    {showRequired && (
                      <span className="text-red-500 text-xs mt-1">Please select a period before predicting.</span>
                    )}
                </div>
                </div>    
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} onClick={() => {
                handlePredict()
              }}>Predict</Button>
            </CardFooter>
            <CardContent>
                    {isLoading && (
                <div className="my-2">
                        <SkeletonLoader rows={3}/>
                </div>
                    )}
                {
                    predictedRisk && (
                        <>
                        <div className="border-b-2 border-primary-foreground w-full my-2"></div>
                        <div className="flex flex-col gap-2 items-center justify-center py-4">
                            <div className="flex gap-2 items-center">
                                <TypographyH3>Predicted Risk : </TypographyH3>
                                <TypographyH3 className={`${parseFloat(predictedRisk) >= 0.8 ? "text-red-500" : parseFloat(predictedRisk) >= 0.5 ? "text-orange-500" : parseFloat(predictedRisk) >= 0.2 ? "text-yellow-500" : "text-green-500"}`}>{predictedRisk}</TypographyH3>
                            </div>
                            {(() => {
                              const score = parseFloat(predictedRisk);
                              if (!isNaN(score)) {
                                const info = getRiskInfo(score);
                                return (
                                  <>
                                    <div className={`rounded border px-3 py-1 mt-2 font-semibold text-sm ${info.color}`}>{info.label}</div>
                                    <div className="text-sm text-muted-foreground text-center max-w-md mt-1">{info.description}</div>
                                  </>
                                );
                              }
                              return null;
                            })()}
                        </div>

                        <div className="my-4">
                                <TypographyH4>Top influencing metrics</TypographyH4>
                                  </div>

                                <div className="w-full my-4">
                                <TopInfluencedMetricBarChart data={predictedRiskResult.top_influential_features} />
                                </div>
                        </>
                    )    
            }
            </CardContent>
          </Card>
        </>
    )
}
