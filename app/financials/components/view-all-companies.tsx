"use client"

import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCompanies } from "@/service/financial.service";
import { getAllEconomicsCompanies } from "@/service/macro-economics.service";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewAllCompanies = ({page}: {page: string}) => {
    const [companies, setCompanies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            setIsLoading(true);
            if(page === "financials"){
                const response = await getAllCompanies();
                setCompanies(response.companies);
            }else if(page === "economics"){
                const response = await getAllEconomicsCompanies();
                setCompanies(response.companies);
            }
            setIsLoading(false);
        }
        fetchCompanies();
    }, []);

    console.log(companies);
    return (
        <div>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8 text-primary">
                Find what company you want to invest in
            </h1>
            {isLoading && (
                <div className="my-2">
                  <SkeletonLoader rows={6} />
                </div>
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
                {companies.length === 0 && (
                    <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                        No companies found
                    </div>
                )}
                {companies?.map((company: any, index: number) => (
                    <Link href={`/${page}/company/${company.id}`} key={index}>
                        <Card className="p-4 border hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg">
                            <CardHeader>
                            <CardTitle>
                                {company.name
                                    .replace(/_/g, ' ')
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                </Link>
                ))}
            </div>
        </div>
    )
}
export default ViewAllCompanies;