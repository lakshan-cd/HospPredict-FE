"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis } from "recharts";

interface PricePredictionData {
    day: number;
    date: string;
    predicted_price: number;
    price_change: number;
    price_change_percent: number;
}

const PricePredictionLineGraph = ({ data }: { data: PricePredictionData[] }) => {

    const chartConfig = {
        predicted_price: {
            label: "Predicted Price",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    // Format the data for the chart
    const chartData = data.map((item) => {
        const date = new Date(item.date);
        return {
            ...item,
            displayDate: date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            formattedPrice: item.predicted_price.toFixed(2)
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Price Prediction Line Graph</CardTitle>
            </CardHeader>
            <CardContent>
                {data && data.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[200px] w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                                top: 12,
                                bottom: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="displayDate"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ active, payload, label }: any) => {
                                    if (active && payload && payload.length) {
                                        const d = payload[0].payload;
                                        return (
                                            <div className="bg-background/90 border border-border rounded-lg px-3 py-2 text-xs text-foreground shadow">
                                                <div className="font-semibold">
                                                    Date: {d.displayDate}
                                                </div>
                                                <div>Predicted Price: Rs.{d.formattedPrice}</div>
                                                <div>Price Change: Rs.{d.price_change.toFixed(2)}</div>
                                                <div>Change %: {d.price_change_percent.toFixed(2)}%</div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                dataKey="predicted_price"
                                type="natural"
                                stroke="var(--color-primary)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: "var(--color-primary)", strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ChartContainer>
                ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                        No prediction data available
                    </div>
                )}
            </CardContent>
            {data && data.length > 0 && (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="text-muted-foreground leading-none">
                        Showing price predictions for the next {data.length} days
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Starting from {data[0]?.date} to {data[data.length - 1]?.date}
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default PricePredictionLineGraph;