import BreadcrumbComponent from "@/components/layout/breadcrumb/breadcrumb";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import PricePredictionTab from "../../components/price-prediction/price-prediction-tab";
import { PlotsTabs } from "../../components/price-prediction/plots-tabs";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <>
        <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
        <BreadcrumbComponent
          items={[
              { label: "Economics", href: "/economics", isCurrent: false },
              {
                  label: "Company",
              href: `/economics/company/${id}`,
              isCurrent: true,
              color: "primary",
            },
          ]}
          />
        <div className="text-center my-8">
          <TypographyH2>
            {id
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char: string) => char.toUpperCase())}
          </TypographyH2>
        </div>
        <div className="">
          <TypographyH1>Predict the stock price in future</TypographyH1>
          <div className="my-4 text-center">
            <TypographyP>
              You can predict the stock price in future by using advanced AI
              models. <br />
            </TypographyP>
          </div>
          <div className="my-12">
            <PricePredictionTab companyId={id} />
          </div>

          <TypographyH1>Different Plots for the company</TypographyH1>

          <div className="my-12">
            <PlotsTabs companyId={id} />
          </div>
        </div>
        </div>

        </>
    )
}

export default Page;