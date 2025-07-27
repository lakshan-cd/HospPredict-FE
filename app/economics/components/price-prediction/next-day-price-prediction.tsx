"use client"
import SkeletonLoader from "@/components/loader/SkeletonLoader"
import { TypographyH1 } from "@/components/typography/typography-h1"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { TypographyH3 } from "@/components/typography/typography-h3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { predictNextDayPrice } from "@/service/macro-economics.service"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"

const NextDayPricePrediction = ({companyId}: {companyId: string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [prediction, setPrediction] = useState<any>(null)

    useEffect(() => {
        async function fetchPrediction() {
            setIsLoading(true)
            try {
                const obj = {
                    company_name: companyId,
                    days_ahead: 1
                }
                const res = await predictNextDayPrice(obj)
                setPrediction(res)
            } catch (error) {
                enqueueSnackbar("Error fetching periods", {variant: "error"});
            } finally {
                setIsLoading(false)
            }
        }
        fetchPrediction()
    }, [companyId])
    return (
        <>
        <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>
                    Next day stock price
                </TypographyH2>
                </CardTitle>
              <CardDescription>
                Predict the stock price in next day.
              </CardDescription>
            </CardHeader>
            <CardContent >
            {isLoading && (
                <div className="my-2">
                        <SkeletonLoader rows={3}/>
                </div>
                    )}
                    {
                    prediction && (
                        <>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <div className="my-2">
                            <TypographyH1>Predicted Price : Rs.{prediction.predicted_price}</TypographyH1>
                            </div>
                        <Table className="w-full text-xs border">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead >Predicted Price</TableHead>
                                            <TableHead >Current Price</TableHead>
                                            <TableHead >Price Change</TableHead>
                                            <TableHead >Price Change Percentage</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{prediction.predicted_price}</TableCell>
                                            <TableCell>{prediction.current_price}</TableCell>
                                            <TableCell>{prediction.price_change}</TableCell>
                                            <TableCell>{prediction.price_change_percent}%</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                        </div>                                
                        </>
                    )    
            }
            </CardContent>
                </Card>
        </>
    )
}

export default NextDayPricePrediction;