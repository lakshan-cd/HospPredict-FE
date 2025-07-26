"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAvailablePeriods, getGraphData } from "@/service/financial-knowledgegraph.service";
import { Button } from "@/components/ui/button";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import GraphVisualizer from "./GraphVisualizer";

export const ViewGraphForQuaters = ({companyId}: {companyId: string}) => {

    const [availableQuarters, setAvailableQuarters] = useState<string[]>([]);
    const [currentQuarter, setCurrentQuarter] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [graphData, setGraphData] = useState<any>(null);
    useEffect(() => {
        const fetchMetrics = async () => {
            const response = await getAvailablePeriods(companyId);
            setAvailableQuarters(response.available_periods);
        }
        fetchMetrics();
    }, [companyId]);

    const handleGetGraphData = async () => {
        setIsLoading(true);
        setGraphData(null);
        // Convert MM/DD/YYYY to YYYY-MM-DD
        const [month, day, year] = currentQuarter.split("/");
        const formattedQuarter = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        const response = await getGraphData(companyId, formattedQuarter);
        setGraphData(response);
        setIsLoading(false);
    }
    console.log(graphData);
    return (
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
              <Label htmlFor="metric-select">Quarter</Label>
              <Select
                value={currentQuarter}
                onValueChange={(val) => {
                  setCurrentQuarter(val);
                }}
                disabled={availableQuarters.length === 0}
              >
                <SelectTrigger id="metric-select">
                  <SelectValue placeholder="Select a metric" />
                </SelectTrigger>
                <SelectContent>
                  {availableQuarters.map((quarter) => (
                    <SelectItem key={quarter} value={quarter}>
                      {quarter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex mt-4">
            <Button
              disabled={isLoading || !currentQuarter}
              onClick={() => handleGetGraphData()}
            >
              View Graph
            </Button>
          </div>
        </CardContent>
        <CardContent>

        {isLoading && (
            <div className="my-6">
                <SkeletonLoader rows={3}/>
            </div>
        )}
        {graphData && (
            <GraphVisualizer graphData={graphData} />
        )}
        </CardContent>
        </Card>
    )
}