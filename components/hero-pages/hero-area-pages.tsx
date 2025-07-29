import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Newspaper, TrendingUp, Hotel } from "lucide-react";
   
interface HeroAreaPagesProps {
    title: string
    description: string
    // hotels: {id: string, name: string}[]
    icon1: React.ReactNode
    icon2: React.ReactNode
    icon3: React.ReactNode
    icon1_name: string
    icon2_name: string
    icon3_name: string
}
const HeroAreaPages = ({title, description, icon1, icon2, icon3, icon1_name, icon2_name, icon3_name}: HeroAreaPagesProps) => {
    return (
        <>
        <div className="space-y-6">
                    <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
                        <CardContent className="p-0">
                            <div className="text-center space-y-6">
                                {/* Animated Icons */}
                                <div className="flex justify-center space-x-4">
                                    <div className="animate-bounce">
                                        <Globe className="w-12 h-12 text-blue-600" />
                                    </div>
                                    <div className="animate-pulse">
                                        <Newspaper className="w-12 h-12 text-green-600" />
                                    </div>
                                    <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
                                        <TrendingUp className="w-12 h-12 text-purple-600" />
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        AI Powered Hotel Industry Insights
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Stay updated with the latest news, social media trends, and market analysis 
                                        for Sri Lanka's premier hotel companies. Get comprehensive insights 
                                        to make informed investment decisions.
                                    </p>
                                    
                                    <div className="flex justify-center space-x-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            {/* <Hotel className="w-3 h-3 mr-1" /> */}
                                            {icon1}
                                            {icon1_name}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                            {/* <Newspaper className="w-3 h-3 mr-1" /> */}
                                            {icon2}
                                            {icon2_name}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                            {/* <TrendingUp className="w-3 h-3 mr-1" /> */}
                                            {icon3}
                                            {icon3_name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* Stats Section */}
                    {/* <div className="grid grid-cols-3 gap-4">
                        <Card className="text-center p-4">
                            <CardContent className="p-0">
                                <div className="text-2xl font-bold text-blue-600">{hotels.length}</div>
                                <div className="text-sm text-gray-600">Companies</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-4">
                            <CardContent className="p-0">
                                <div className="text-2xl font-bold text-green-600">24/7</div>
                                <div className="text-sm text-gray-600">Monitoring</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-4">
                            <CardContent className="p-0">
                                <div className="text-2xl font-bold text-purple-600">Based on the past data</div>
                                <div className="text-sm text-gray-600">Updates</div>
                            </CardContent>
                        </Card>
                    </div> */}
                </div>
        </>
    )
}
export default HeroAreaPages;