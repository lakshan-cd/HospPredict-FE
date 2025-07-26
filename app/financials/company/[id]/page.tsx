import BreadcrumbComponent from "@/components/layout/breadcrumb/breadcrumb";
import { TrendGraph } from "../../components/company/trend-graph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { PredictRisk } from "../../components/company/predict-risk";
import { ExploreKnowledgeBase } from "../../components/company/knowledge-base-components/explore-knowledge-base";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  console.log(id);
  return (
    <>
      <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
        <BreadcrumbComponent
          items={[
            { label: "Financials", href: "/financials", isCurrent: false },
            {
              label: "Company",
              href: `/financials/company/${id}`,
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
        <div className="my-12">
          <TrendGraph companyId={id} />
        </div>
        <div className="">
          <TypographyH1>Predict the stock risk in next quarter</TypographyH1>
          <div className="my-4 text-center">
            <TypographyP>
              You can predict the stock risk in quarters by using advanced AI
              models. <br />
              Select the period or the metric change - The predicted result will
              be shown.
            </TypographyP>
          </div>
          <div className="my-12">
            <PredictRisk companyId={id} />
          </div>
        </div>
        <div>
          <TypographyH1>Explore the knowledge base</TypographyH1>
          <div className="my-12">
            <ExploreKnowledgeBase companyId={id} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
