import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { FinancialChart } from "./feature-section-sub-components/financial-chart";
import { EconomicChart } from "./feature-section-sub-components/economic-chart";
import { NewsChart } from "./feature-section-sub-components/news-chart";

const FeaturesSection = () => {
    return (
        <>
        <div className="px-4 sm:px-4 md:px-8 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Financial Insights</CardTitle>
                <CardDescription>Get real-time financial insights and analysis to make informed decisions.</CardDescription>
                <CardAction>
                    <Button>Explore</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="my-4">
                <FinancialChart />
                </div>
                <p>1. Upload your financial data</p>
                <p>2. Get real-time insights</p>
                <p>3. Make informed decisions</p>
            </CardContent>
            {/* <CardFooter>
                <p>See how unseen trends can impact your portfolio</p>
            </CardFooter> */}
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Economic Insights</CardTitle>
                <CardDescription>Get real-time economic insights and analysis to make informed decisions.</CardDescription>
                <CardAction>
                    <Button>Explore</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="my-4">
                    <EconomicChart />
                </div>
                <ul className="list-disc list-inside">
                    <li>Get company vise price movements</li>
                    <li>Get most important economic indicators</li>
                    <li>Get real-time economic insights</li>
                </ul>
            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>What dose news can do to stock price?</CardTitle>
                <CardDescription>Get impact of news on stock price and analysis to make informed decisions.</CardDescription>
                <CardAction>
                    <Button>Explore</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="my-4">
                    <NewsChart />
                </div>
                <ul className="list-disc list-inside">
                    <li>Get stock price movements</li>
                    <li>Get what news is driving the stock price</li>
                </ul>
            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
        </div>
        </div>
        </>
    )
}

export default FeaturesSection;