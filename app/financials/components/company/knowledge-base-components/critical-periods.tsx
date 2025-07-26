"use client"
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH3 } from "@/components/typography/typography-h3";
import { TypographyP } from "@/components/typography/typography-p";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCriticalPeriods, getReasonsForCriticalPeriod } from "@/service/financial-knowledgegraph.service";
import { enqueueSnackbar } from "notistack";
import { use, useEffect, useState } from "react";

export const CriticalPeriods = ({companyId}: {companyId: string}) => {
    const [criticalPeriods, setCriticalPeriods] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [criticalExplainLoading, setCriticalExplainLoading] = useState(false);
    const [criticalExplainResponse, setCriticalExplainResponse] = useState<any>(null);
    useEffect(() => {
        
        const fetchCriticalPeriods = async () => {
            try {
                setIsLoading(true);
                const response = await getCriticalPeriods(companyId);
                setCriticalPeriods(response.critical_periods);
            } catch (error: any) {
                enqueueSnackbar(`Error fetching critical periods : ${error.detail}`, {
                    variant: "error",
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchCriticalPeriods();
    }, [companyId]);

    const handleExplainRisk = async (period: any) => {
        setCriticalExplainResponse(null);
        try {
            setCriticalExplainLoading(true);
            const response = await getReasonsForCriticalPeriod(companyId, period.period);
            setCriticalExplainResponse(response.large_qoq_changes);
            setCriticalExplainLoading(false);
        } catch (error: any) {
            enqueueSnackbar(`Error explaining risk : ${error.detail}`, {
                variant: "error",
            });
        } finally {
            setCriticalExplainLoading(false);
        }
    }
    console.log(criticalExplainResponse);
    return (
        <Card>
            <CardHeader>
                <CardTitle><TypographyH2>Critical Periods</TypographyH2></CardTitle>
                <CardDescription>The critical periods are the periods that had the highest risk. Click on a period and explain why a period is risky by tracing contributing metrics and events.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="my-2">
                        <SkeletonLoader rows={3}/>
                    </div>
                )}
                {criticalPeriods.length > 0 && !isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {
                            criticalPeriods
                            .sort((a, b) => new Date(b.period).getTime() - new Date(a.period).getTime())
                            .map((period , index) => (
                                <Card key={index} onClick={() => {
                                    handleExplainRisk(period);
                                }} className="bg-destructive/40 hover:bg-destructive/60 transition-all duration-300">
                                    <CardContent className="text-center">
                                    <CardDescription>
                                        {(() => {
                                            const [month, day, year] = period.period.split("/");
                                            const monthNames = [
                                            "January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"
                                            ];
                                            return `${day.padStart(2, "0")} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
                                        })()}
                                        </CardDescription>
                                </CardContent>

                                </Card>
                            ))
                        }
                    </div>
                )}

                {criticalExplainLoading && (
                    <div className="my-6">
                        <SkeletonLoader rows={3}/>
                    </div>
                )}

                {criticalExplainResponse && (
                    <>
                    <div className="my-4">
                        <TypographyH3>Largest Quarter over Quarter changes</TypographyH3>
                        <TypographyP>A list of metrics with large QOQ changes. Which are the main drivers of the risk.</TypographyP>
                    </div>
                    <div>
                    <Table>
                        <TableCaption>A list of metrics with large QOQ changes. Which are the main drivers of the risk.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead>QoQ Change</TableHead>
                            <TableHead>From</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {criticalExplainResponse.map((metric: any) => (
                            <TableRow key={metric.metric}>
                                <TableCell className="font-medium">{metric.metric}</TableCell>
                                <TableCell>{metric.qoq_change}</TableCell>
                                <TableCell>{metric.from_period}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>                    
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
        
    )
}