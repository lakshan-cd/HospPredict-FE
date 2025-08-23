"use client"

import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCompanies } from "@/service/financial.service";
import { getAllEconomicsCompanies } from "@/service/macro-economics.service";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Building2, TrendingUp, DollarSign, BarChart3, Factory, ShoppingCart, Car, Plane, Ship, Wifi, Zap, Leaf, Heart, Shield } from "lucide-react";

const ViewAllCompanies = ({page , hotels}: {page: string , hotels?: {id: string , name: string}[]}) => {
    const [companies, setCompanies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(hotels && page === "news"){
            setCompanies(hotels);
        }
    }, [hotels]);

    // Function to get appropriate icon based on company name
    const getCompanyIcon = (companyName: string) => {
        const name = companyName.toLowerCase();
        
        if (name.includes('bank') || name.includes('finance') || name.includes('investment')) {
            return <DollarSign className="w-6 h-6 text-blue-600" />;
        } else if (name.includes('tech') || name.includes('software') || name.includes('digital')) {
            return <Zap className="w-6 h-6 text-purple-600" />;
        } else if (name.includes('health') || name.includes('medical') || name.includes('pharma')) {
            return <Heart className="w-6 h-6 text-red-600" />;
        } else if (name.includes('auto') || name.includes('car') || name.includes('motor')) {
            return <Car className="w-6 h-6 text-gray-600" />;
        } else if (name.includes('air') || name.includes('airline') || name.includes('aviation')) {
            return <Plane className="w-6 h-6 text-sky-600" />;
        } else if (name.includes('ship') || name.includes('marine') || name.includes('cargo')) {
            return <Ship className="w-6 h-6 text-blue-700" />;
        } else if (name.includes('retail') || name.includes('store') || name.includes('shop')) {
            return <ShoppingCart className="w-6 h-6 text-green-600" />;
        } else if (name.includes('energy') || name.includes('power') || name.includes('electric')) {
            return <Zap className="w-6 h-6 text-yellow-600" />;
        } else if (name.includes('oil') || name.includes('gas') || name.includes('petroleum')) {
            return <Zap className="w-6 h-6 text-orange-600" />;
        } else if (name.includes('food') || name.includes('beverage') || name.includes('restaurant')) {
            return <Leaf className="w-6 h-6 text-green-700" />;
        } else if (name.includes('insurance') || name.includes('security') || name.includes('defense')) {
            return <Shield className="w-6 h-6 text-indigo-600" />;
        } else if (name.includes('telecom') || name.includes('communication') || name.includes('network')) {
            return <Wifi className="w-6 h-6 text-cyan-600" />;
        } else if (name.includes('manufacturing') || name.includes('industrial') || name.includes('factory')) {
            return <Factory className="w-6 h-6 text-gray-700" />;
        } else {
            return <Building2 className="w-6 h-6 text-gray-500" />;
        }
    };

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
                        <Card className="p-4 border hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg group">
                            <div className="flex items-center space-x-4">
                                {/* Icon Section - 30% width */}
                                <div className="flex-shrink-0 w-[30%] flex justify-center">
                                    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-200">
                                        {getCompanyIcon(company.name)}
                                    </div>
                                </div>
                                
                                {/* Company Name Section - 70% width */}
                                <div className="flex-1 w-[70%]">
                                    <CardTitle className="text-lg font-semibold text-primary-foreground group-hover:text-primary transition-colors duration-200">
                                        {company.name
                                            .replace(/_/g, ' ')
                                            .toLowerCase()
                                            .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Click to view details
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default ViewAllCompanies;