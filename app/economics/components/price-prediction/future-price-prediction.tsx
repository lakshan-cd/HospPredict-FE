"use client"

import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predictFuturePrice } from "@/service/macro-economics.service";
import { enqueueSnackbar } from "notistack";
import { useState } from "react"
import PricePredictionLineGraph from "./price-prediction-line-graph";
import { TypographyH4 } from "@/components/typography/typography-h4";
import { TypographyP } from "@/components/typography/typography-p";

const periods = ["7", "14", "21"]
const FuturePricePrediction = ({companyId}: {companyId: string}) => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [prediction, setPrediction] = useState<any>(null)

    const handlePredict = async () => {
        setPrediction(null)
        setIsLoading(true)
        try {
            const obj = {
                company_name: companyId,
                days_ahead: parseInt(selectedPeriod)
            }
            const res = await predictFuturePrice(obj)
            console.log(res)
            setPrediction(res)
        } catch (error) {
            enqueueSnackbar("Error predicting future price", {variant: "error"})
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>
                    Predict the stock price in future days
                </TypographyH2>
                </CardTitle>
              <CardDescription>
                Select the period to predict the price
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
                    <Select onValueChange={(value) => { setSelectedPeriod(value); }} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                        {periods.map((period, index) => (
                        <SelectItem key={index} value={period}>{period} days</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
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
                    {prediction && (
                        <>
                        <div className="my-2">
                        <TypographyP>{prediction.note}</TypographyP>
                        </div>
                        <div className="my-2">
                        <PricePredictionLineGraph data={prediction.predictions} />
                        </div>
                        </>
                    )}
            </CardContent>
          </Card>
    )
}

export default FuturePricePrediction;