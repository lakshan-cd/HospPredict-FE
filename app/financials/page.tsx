import ViewAllCompanies from "./components/view-all-companies";

const Page = () => {
    return (
        <>
                <div className="px-4 sm:px-4 md:px-8 lg:px-16 my-12">
                    <ViewAllCompanies page="financials" />
                </div>
        </>
    )
}
export default Page;