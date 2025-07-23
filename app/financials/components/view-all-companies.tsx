"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCompanies } from "@/service/financial.service";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewAllCompanies = () => {
    const [companies, setCompanies] = useState<any[]>([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await getAllCompanies();
            setCompanies(response.companies);
        }
        fetchCompanies();
    }, []);

    console.log(companies);
    return (
        <div>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-8 text-primary">
                Find what company you want to invest in
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {companies?.map((company: any, index: number) => (
                    <Link href={`/financials/company/${company.id}`} key={index}>
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