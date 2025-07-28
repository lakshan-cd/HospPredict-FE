"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { TypographyH3 } from "@/components/typography/typography-h3"
import { TypographyP } from "@/components/typography/typography-p"
import SkeletonLoader from "@/components/loader/SkeletonLoader"
import { Upload, FileText, Calendar, Building2, Brain, TrendingUp, CheckCircle, AlertCircle, DollarSign, BarChart3, Target, Shield, TrendingDown, Activity } from "lucide-react"
import { predictNewCompanyData } from "@/service/financial-predict.service"

interface PredictionResponse {
    company_id: string
    current_period: string
    predicted_next_quarter_risk: number
    message: string
}

interface PredictionRequest {
    financial_file_base64: string
    trade_file_base64: string
    company_id: string
    period: string
    occupancy_drop: number
}

type ProgressStep = 'idle' | 'uploading' | 'processing' | 'building_knowledge' | 'predicting' | 'complete' | 'error'

export const PredictNewCompany = () => {
    const [companyName, setCompanyName] = useState("")
    const [period, setPeriod] = useState("")
    const [financialFile, setFinancialFile] = useState<File | null>(null)
    const [tradeFile, setTradeFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [progressStep, setProgressStep] = useState<ProgressStep>('idle')
    const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    const financialFileRef = useRef<HTMLInputElement>(null)
    const tradeFileRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (file: File | null, setFile: (file: File | null) => void, fileType: string) => {
        if (file) {
            if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
                setError(`${fileType} must be a CSV file`)
                return
            }
            setFile(file)
            setError(null)
        }
    }

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64 = reader.result as string
                // Remove the data URL prefix (e.g., "data:text/csv;base64,")
                const base64Data = base64.split(',')[1]
                resolve(base64Data)
            }
            reader.onerror = error => reject(error)
        })
    }

    const simulateProgressSteps = async () => {
        setProgressStep('uploading')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setProgressStep('processing')
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        setProgressStep('building_knowledge')
        await new Promise(resolve => setTimeout(resolve, 5000))
        
        setProgressStep('predicting')
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        setProgressStep('complete')
    }

    const formatCompanyName = (name: string): string => {
        // Split by spaces and filter out empty strings
        const words = name.trim().split(/\s+/).filter(word => word.length > 0)
        
        // Capitalize first letter of each word and join with underscores
        return words.map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join('_')
    }

    const handleSubmit = async () => {
        if (!companyName.trim()) {
            setError("Company name is required")
            return
        }
        if (!period) {
            setError("Period is required")
            return
        }
        if (!financialFile) {
            setError("Financial file is required")
            return
        }
        if (!tradeFile) {
            setError("Trade file is required")
            return
        }

        setIsLoading(true)
        setError(null)
        setPredictionResult(null)

        try {
            // Convert files to base64
            const financialBase64 = await convertFileToBase64(financialFile)
            const tradeBase64 = await convertFileToBase64(tradeFile)

            // Format company name: first letter capital, underscores between words
            const formattedCompanyName = formatCompanyName(companyName)

            // Prepare request payload
            const requestPayload: PredictionRequest = {
                financial_file_base64: financialBase64,
                trade_file_base64: tradeBase64,
                company_id: formattedCompanyName,
                period: period,
                occupancy_drop: 0
            }

            // console.log(requestPayload)
            const response = await predictNewCompanyData(requestPayload)
            console.log(response)
            // Simulate API call with progress steps
            await simulateProgressSteps()

            // Simulate API response (replace with actual API call)
            const mockResponse: PredictionResponse = {
                company_id: companyName,
                current_period: period,
                predicted_next_quarter_risk: response.predicted_next_quarter_risk, // Random risk value for demo
                message: `Successfully processed new data and predicted NEXT QUARTER volatility risk for ${period}`
            }

            setPredictionResult(mockResponse)
            
        } catch (err) {
            setError("An error occurred during prediction. Please try again.")
            setProgressStep('error')
        } finally {
            setIsLoading(false)
        }
    }

    const getProgressMessage = () => {
        switch (progressStep) {
            case 'uploading':
                return "Uploading files..."
            case 'processing':
                return "Processing periodical data..."
            case 'building_knowledge':
                return "Building knowledge graph..."
            case 'predicting':
                return "Predicting risk metrics..."
            case 'complete':
                return "Prediction completed!"
            default:
                return ""
        }
    }

    const getProgressIcon = () => {
        switch (progressStep) {
            case 'uploading':
                return <Upload className="w-4 h-4" />
            case 'processing':
                return <FileText className="w-4 h-4" />
            case 'building_knowledge':
                return <Brain className="w-4 h-4" />
            case 'predicting':
                return <TrendingUp className="w-4 h-4" />
            case 'complete':
                return <CheckCircle className="w-4 h-4" />
            default:
                return null
        }
    }

    const resetForm = () => {
        setCompanyName("")
        setPeriod("")
        setFinancialFile(null)
        setTradeFile(null)
        setPredictionResult(null)
        setError(null)
        setProgressStep('idle')
        if (financialFileRef.current) financialFileRef.current.value = ""
        if (tradeFileRef.current) tradeFileRef.current.value = ""
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <TypographyH2>Predict New Company</TypographyH2>
                    </CardTitle>
                </CardHeader>   
                <CardContent>
                    <div className="space-y-6">
                        {/* Company Name Input */}
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input
                                id="company-name"
                                type="text"
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Period Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="period">Period</Label>
                            <Select value={period} onValueChange={setPeriod} disabled={isLoading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a period" />
                                </SelectTrigger>
                                <SelectContent defaultValue="2024-12-31">
                                    <SelectItem value="2024-12-31">2024-12-31</SelectItem>
                                    {/* <SelectItem value="03/31/2025">Q1 2025</SelectItem>
                                    <SelectItem value="06/30/2025">Q2 2025</SelectItem>
                                    <SelectItem value="09/30/2025">Q3 2025</SelectItem>
                                    <SelectItem value="12/31/2025">Q4 2025</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* File Upload Section */}
                        <div className="space-y-4">
                            <Label>Upload Files (CSV only)</Label>
                            
                            {/* Financial File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="financial-file" className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Financial Data File
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="financial-file"
                                        ref={financialFileRef}
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, setFinancialFile, "Financial file")}
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    {financialFile && (
                                        <span className="text-sm text-green-600 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" />
                                            {financialFile.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Trade File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="trade-file" className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Trade Data File
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="trade-file"
                                        ref={tradeFileRef}
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, setTradeFile, "Trade file")}
                                        disabled={isLoading}
                                        className="flex-1"
                                    />
                                    {tradeFile && (
                                        <span className="text-sm text-green-600 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" />
                                            {tradeFile.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button 
                                onClick={handleSubmit} 
                                disabled={isLoading || !companyName || !period || !financialFile || !tradeFile}
                                className="flex-1"
                            >
                                {isLoading ? "Predicting..." : "Predict Risk"}
                            </Button>
                            {!isLoading && (
                                <Button 
                                    variant="outline" 
                                    onClick={resetForm}
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Indicator */}
            {isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            Processing Prediction
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                {getProgressIcon()}
                                <TypographyP className="font-medium">{getProgressMessage()}</TypographyP>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                        progressStep === 'complete' ? 'bg-green-500' : 
                                        progressStep === 'error' ? 'bg-red-500' : 'bg-blue-500'
                                    }`}
                                    style={{
                                        width: progressStep === 'uploading' ? '25%' :
                                               progressStep === 'processing' ? '50%' :
                                               progressStep === 'building_knowledge' ? '75%' :
                                               progressStep === 'predicting' ? '90%' :
                                               progressStep === 'complete' ? '100%' : '0%'
                                    }}
                                />
                            </div>
                            <SkeletonLoader rows={2} />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Prediction Results */}
            {predictionResult && !isLoading && (
                <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            Prediction Results
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-600">Company ID</Label>
                                    <TypographyP className="font-semibold text-black">{predictionResult.company_id}</TypographyP>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-600">Current Period</Label>
                                    <TypographyP className="font-semibold text-black">{predictionResult.current_period}</TypographyP>
                                </div>
                            </div>
                            
                            <div className="space-y-2 my-4">
                                <Label className="text-sm font-medium text-gray-600">Predicted Next Quarter Risk</Label>
                                <div className="p-4 bg-white rounded-lg border">
                                    {(() => {
                                        const info = getRiskInfo(predictionResult.predicted_next_quarter_risk);
                                        return (
                                            <>
                                                <div className="flex flex-col items-center justify-center">
                                                    <TypographyH3 className={`${parseFloat(predictionResult.predicted_next_quarter_risk.toString()) >= 0.8 ? "text-red-500" : parseFloat(predictionResult.predicted_next_quarter_risk.toString()) >= 0.5 ? "text-orange-500" : parseFloat(predictionResult.predicted_next_quarter_risk.toString()) >= 0.2 ? "text-yellow-500" : "text-green-500"}`}>{predictionResult.predicted_next_quarter_risk}</TypographyH3>
                                                </div>
                                                <div className={`rounded border px-3 py-1 mt-2 font-semibold text-sm ${info.color} text-center`}>{info.label}</div>
                                                <div className="text-sm text-muted-foreground text-center mt-1">{info.description}</div>
                                            </>
                                            );
                                        })()}
                                </div>
                            </div>

                            {/* <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-600">Message</Label>
                                <TypographyP className="text-sm bg-white p-3 rounded border">
                                    {predictionResult.message}
                                </TypographyP>
                            </div> */}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
        
    )
}

function getRiskInfo(score: number) {
    if (score >= 0.8) {
      return {
        label: "Very High Risk",
        color: "text-red-600 bg-red-100 border-red-300",
        description: "Significant risk of share-price decline expected next quarter. Immediate strategic review is strongly recommended."
      };
    } else if (score >= 0.5) {
      return {
        label: "Moderate Risk",
        color: "text-orange-600 bg-orange-100 border-orange-300",
        description: "Notable downside risk projected for the next quarter. Monitor closely and consider protective measures."
      };
    } else if (score >= 0.2) {
      return {
        label: "Low Risk",
        color: "text-yellow-700 bg-yellow-100 border-yellow-300",
        description: "Minor potential for share-price weakness in the upcoming quarter. Maintain awareness but no immediate action required."
      };
    } else {
      return {
        label: "Minimal Risk",
        color: "text-green-700 bg-green-100 border-green-300",
        description: "Limited evidence of downside risk next quarter. No specific action necessary at this time."
      };
    }
  }
  