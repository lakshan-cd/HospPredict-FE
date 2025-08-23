"use client";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getGrangerHeatmap,
  getPredictionPlot,
  getShapBarChart,
  getShapSummary,
} from "@/service/macro-economics.service";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PlotResponse {
  filename: string;
  plot: {
    data: string;
    filename: string;
    mime_type: string;
  };
}

export const PlotsTabs = ({ companyId }: { companyId: string }) => {
  const [selectedTab, setSelectedTab] = useState<string>("prediction");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionPlot, setPredictionPlot] = useState<PlotResponse | null>(
    null
  );

  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true);
      try {
        if (selectedTab == "prediction") {
          const response = await getPredictionPlot(companyId);
          console.log(response);
          setPredictionPlot(response);
        }
        if (selectedTab == "shap-summary") {
          const response = await getShapSummary(companyId);
          console.log(response);
          setPredictionPlot(response);
        }
        if (selectedTab == "shap-bar-chart") {
          const response = await getShapBarChart(companyId);
          console.log(response);
          setPredictionPlot(response);
        }
        if (selectedTab == "granger-heatmap") {
          const response = await getGrangerHeatmap(companyId);
          console.log(response);
          setPredictionPlot(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrediction();
  }, [selectedTab]);
  // const fetchPrediction = async (tab: string) => {
  //     if(tab === "prediction") {
  //     const response = await getPredictionPlot(companyId)
  //     console.log(response)
  // }
  console.log(selectedTab);
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="prediction">
        <TabsList>
          <TabsTrigger
            value="prediction"
            onClick={() => setSelectedTab("prediction")}
          >
            Price Prediction
          </TabsTrigger>
          <TabsTrigger value="shap-summary" onClick={() => setSelectedTab("shap-summary")}>SHAP Summary</TabsTrigger>
          <TabsTrigger value="shap-bar-chart" onClick={() => setSelectedTab("shap-bar-chart")}>SHAP Bar Chart</TabsTrigger>
          <TabsTrigger value="granger-heatmap" onClick={() => setSelectedTab("granger-heatmap")}>Granger Heatmap</TabsTrigger>
        </TabsList>
        <TabsContent value="prediction">
          <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>Prediction plot - Over the period</TypographyH2>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {isLoading && (
                <div className="my-2">
                  <SkeletonLoader rows={3} />
                </div>
              )}

              {!isLoading && predictionPlot && predictionPlot.plot && (
                <div className="flex flex-col items-center">
                  <Image
                    src={`data:${predictionPlot.plot.mime_type};base64,${predictionPlot.plot.data}`}
                    alt={predictionPlot.plot.filename || "prediction plot"}
                    width={800}
                    height={600}
                    className="w-full h-auto max-w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {predictionPlot.plot.filename}
                  </p>
                </div>
              )}

              {!isLoading && !predictionPlot && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  No prediction plot available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shap-summary">
        <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>SHAP Summary</TypographyH2>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {isLoading && (
                <div className="my-2">
                  <SkeletonLoader rows={3} />
                </div>
              )}

              {!isLoading && predictionPlot && predictionPlot.plot && (
                <div className="flex flex-col items-center">
                  <Image
                    src={`data:${predictionPlot.plot.mime_type};base64,${predictionPlot.plot.data}`}
                    alt={predictionPlot.plot.filename || "prediction plot"}
                    width={500}
                    height={500}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {predictionPlot.plot.filename}
                  </p>
                </div>
              )}

              {!isLoading && !predictionPlot && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  No SHAP summary available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shap-bar-chart">
        <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>SHAP Bar Chart</TypographyH2>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {isLoading && (
                <div className="my-2">
                  <SkeletonLoader rows={3} />
                </div>
              )}

              {!isLoading && predictionPlot && predictionPlot.plot && (
                <div className="flex flex-col items-center">
                  <Image
                    src={`data:${predictionPlot.plot.mime_type};base64,${predictionPlot.plot.data}`}
                    alt={predictionPlot.plot.filename || "prediction plot"}
                    width={800}
                    height={600}
                    className="w-full h-auto max-w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {predictionPlot.plot.filename}
                  </p>
                </div>
              )}

              {!isLoading && !predictionPlot && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  No SHAP bar chart available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="granger-heatmap">
        <Card>
            <CardHeader>
              <CardTitle>
                <TypographyH2>Granger Heatmap</TypographyH2>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {isLoading && (
                <div className="my-2">
                  <SkeletonLoader rows={3} />
                </div>
              )}

              {!isLoading && predictionPlot && predictionPlot.plot && (
                <div className="flex flex-col items-center">
                  <Image
                    src={`data:${predictionPlot.plot.mime_type};base64,${predictionPlot.plot.data}`}
                    alt={predictionPlot.plot.filename || "prediction plot"}
                    width={800}
                    height={600}
                    className="w-full h-auto max-w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {predictionPlot.plot.filename}
                  </p>
                </div>
              )}

              {!isLoading && !predictionPlot && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  No Granger heatmap available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
