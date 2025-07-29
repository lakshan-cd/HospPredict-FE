"use client"

import { useState } from "react"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { TypographyH3 } from "@/components/typography/typography-h3"
import { TypographyP } from "@/components/typography/typography-p"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SkeletonLoader from "@/components/loader/SkeletonLoader"
import { 
    TrendingUp, 
    TrendingDown, 
    Minus, 
    AlertTriangle, 
    CheckCircle, 
    Clock, 
    FileText, 
    Globe, 
    BarChart3,
    Target,
    Zap,
    Activity,
    ChevronDown,
    ChevronUp
} from "lucide-react"
import { predictNewsImpact } from "@/service/news-predict.service"

interface NewsArticleRequest {
    date: string
    heading: string
    text: string
    source: string
}

interface HotelPrediction {
    prediction: "up" | "down" | "neutral"
    confidence: number
    probabilities: {
        up: number
        down: number
        neutral: number
    }
}

interface SpikePredictionResponse {
    article_id: string
    date: string
    heading: string
    source: string
    spike_prediction: "SPIKE" | "NO_SPIKE"
    spike_confidence: number
    hotel_predictions: {
        [hotelId: string]: HotelPrediction
    }
}

const PredictSpikesNews = ({hotels}: {hotels: {id: string, name: string}[]}) => {
    const [formData, setFormData] = useState<NewsArticleRequest>({
        date: "",
        heading: "",
        text: "",
        source: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [predictionResult, setPredictionResult] = useState<SpikePredictionResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isResultsExpanded, setIsResultsExpanded] = useState(false)

    const handleInputChange = (field: keyof NewsArticleRequest, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const getPredictionIcon = (prediction: string) => {
        switch (prediction) {
            case "up":
                return <TrendingUp className="w-4 h-4 text-green-600" />
            case "down":
                return <TrendingDown className="w-4 h-4 text-red-600" />
            case "neutral":
                return <Minus className="w-4 h-4 text-gray-600" />
            default:
                return <Minus className="w-4 h-4 text-gray-600" />
        }
    }

    const getPredictionColor = (prediction: string) => {
        switch (prediction) {
            case "up":
                return "text-green-600 bg-green-50 border-green-200"
            case "down":
                return "text-red-600 bg-red-50 border-red-200"
            case "neutral":
                return "text-gray-600 bg-gray-50 border-gray-200"
            default:
                return "text-gray-600 bg-gray-50 border-gray-200"
        }
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return "text-green-600"
        if (confidence >= 0.6) return "text-yellow-600"
        return "text-red-600"
    }

    const handleSubmit = async () => {
        if (!formData.date || !formData.heading || !formData.text || !formData.source) {
            setError("All fields are required")
            return
        }

        setIsLoading(true)
        setError(null)
        setPredictionResult(null)

        try {
            const response = await predictNewsImpact(formData)

            setPredictionResult(response)
        } catch (err) {
            setError("An error occurred during prediction. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            date: "",
            heading: "",
            text: "",
            source: ""
        })
        setPredictionResult(null)
        setError(null)
        setIsResultsExpanded(false)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="my-5">
                <TypographyH2>Predict News Impact on Hotel Stocks</TypographyH2>
                </div>
                <TypographyP className="text-gray-600 max-w-2xl mx-auto">
                    Enter news article details to predict potential stock price spikes and their impact on individual hotel companies
                </TypographyP>
            </div>

            {/* Input Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        News Article Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date Input */}
                        <div className="space-y-2">
                            <Label htmlFor="date">Publication Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange("date", e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Source Input */}
                        <div className="space-y-2">
                            <Label htmlFor="source">News Source</Label>
                            <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)} disabled={isLoading}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select news source" />
                                </SelectTrigger>
                                <SelectContent defaultValue="economynext">
                                    <SelectItem value="economynext">Economy Next</SelectItem>
                                    <SelectItem value="dailynews">Daily News</SelectItem>
                                    <SelectItem value="sundaytimes">Sunday Times</SelectItem>
                                    <SelectItem value="island">The Island</SelectItem>
                                    <SelectItem value="colombopage">Colombo Page</SelectItem>
                                    <SelectItem value="newsfirst">News First</SelectItem>
                                    <SelectItem value="adaderana">Ada Derana</SelectItem>
                                    <SelectItem value="hirunews">Hiru News</SelectItem>

                                    <SelectItem value="lankadeepa">Lanka Deepa</SelectItem>
                                    <SelectItem value="ceylontoday">Ceylon Today</SelectItem>
                                    <SelectItem value="news.lk">News.lk</SelectItem>
                                    <SelectItem value="srilankamirror">Sri Lanka Mirror</SelectItem>
                                    <SelectItem value="asianmirror">Asian Mirror</SelectItem>
                                    <SelectItem value="srilankaguardian">Sri Lanka Guardian</SelectItem>
                                    <SelectItem value="groundviews">Ground Views</SelectItem>
                                    <SelectItem value="colombotelegraph">Colombo Telegraph</SelectItem>

                                    <SelectItem value="srilankabrief">Sri Lanka Brief</SelectItem>
                                    <SelectItem value="tamilguardian">Tamil Guardian</SelectItem>
                                    <SelectItem value="jdslanka">JDS Lanka</SelectItem>
                                    <SelectItem value="srilankamirror">Sri Lanka Mirror</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Heading Input - Full Width */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="heading">Article Heading</Label>
                            <Input
                                id="heading"
                                type="text"
                                placeholder="Enter the news article heading"
                                value={formData.heading}
                                onChange={(e) => handleInputChange("heading", e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Text Input - Full Width */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="text">Article Content</Label>
                            <textarea
                                id="text"
                                placeholder="Enter the full news article text..."
                                value={formData.text}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("text", e.target.value)}
                                disabled={isLoading}
                                rows={6}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            />
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600 text-sm flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <Button 
                            onClick={handleSubmit} 
                            disabled={isLoading || !formData.date || !formData.heading || !formData.text || !formData.source}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Target className="w-4 h-4 mr-2" />
                                    Predict Impact
                                </>
                            )}
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
                </CardContent>
            </Card>

            {/* Loading State */}
            {isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Analyzing News Impact
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Activity className="w-4 h-4 animate-spin" />
                                <TypographyP className="font-medium">Processing article and predicting market impact...</TypographyP>
                            </div>
                            <SkeletonLoader rows={4} />
                        </div>
                    </CardContent>
                </Card>
            )}


            {/* Results Display */}
            {predictionResult && !isLoading && (
                <div className="space-y-6">
                    {/* Overall Spike Prediction - Always Visible */}
                    <Card className={predictionResult.spike_prediction === "SPIKE" ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    {predictionResult.spike_prediction === "SPIKE" ? (
                                        <TrendingUp className="w-5 h-5 text-orange-600" />
                                    ) : (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                    <div className="text-lg font-bold text-gray-800">
                                        Overall Market Prediction
                                    </div>
                                </CardTitle>
                                <Button
                                    // variant="outline"
                                    size="sm"
                                    onClick={() => setIsResultsExpanded(!isResultsExpanded)}
                                    className="flex items-center gap-2"
                                >
                                    {isResultsExpanded ? (
                                        <>
                                            <ChevronUp className="w-4 h-4" />
                                            Hide Details
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4" />
                                            View Details
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-800">
                                        {predictionResult.spike_prediction}
                                    </div>
                                    <div className="text-sm text-gray-600">Prediction</div>
                                </div>
                                <div className="text-center">
                                    <div className={`text-2xl font-bold ${getConfidenceColor(predictionResult.spike_confidence)}`}>
                                        {(predictionResult.spike_confidence * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-gray-600">Confidence</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-800">
                                        {hotels.length}
                                    </div>
                                    <div className="text-sm text-gray-600">Companies Analyzed</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Collapsible Detailed Results */}
                    {isResultsExpanded && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">

                    {/* Article Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Article Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Article ID</Label>
                                    <TypographyP className="font-mono text-sm">{predictionResult.article_id}</TypographyP>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Publication Date</Label>
                                    <TypographyP>{predictionResult.date}</TypographyP>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Source</Label>
                                    <TypographyP className="capitalize">{predictionResult.source.replace('_', ' ')}</TypographyP>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Heading</Label>
                                    <TypographyP className="font-medium">{predictionResult.heading}</TypographyP>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hotel Predictions Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Individual Hotel Predictions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Hotel Company</TableHead>
                                            <TableHead>Prediction</TableHead>
                                            <TableHead>Confidence</TableHead>
                                            <TableHead>Up Probability</TableHead>
                                            <TableHead>Down Probability</TableHead>
                                            <TableHead>Neutral Probability</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {hotels.map((hotel) => {
                                            const prediction = predictionResult.hotel_predictions[hotel.id]
                                            if (!prediction) return null

                                            return (
                                                <TableRow key={hotel.id} className="">
                                                    <TableCell className="font-medium">
                                                        {hotel.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {getPredictionIcon(prediction.prediction)}
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPredictionColor(prediction.prediction)}`}>
                                                                {prediction.prediction.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className={`font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                                                            {(prediction.confidence * 100).toFixed(1)}%
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-green-600 font-medium">
                                                            {(prediction.probabilities.up * 100).toFixed(1)}%
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-red-600 font-medium">
                                                            {(prediction.probabilities.down * 100).toFixed(1)}%
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-gray-600 font-medium">
                                                            {(prediction.probabilities.neutral * 100).toFixed(1)}%
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PredictSpikesNews