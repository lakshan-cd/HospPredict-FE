import { PredictNewCompany } from "./components/predict-new-company";
import ViewAllCompanies from "./components/view-all-companies";

const Page = () => {
    return (
        <>
                <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
                    <ViewAllCompanies page="financials" />

                    <div className="mt-12">
                        <PredictNewCompany />
                    </div>
                </div>
        </>
    )
}
export default Page;