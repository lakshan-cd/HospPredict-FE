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
import { predictBatchNewsImpact, predictNewsImpact } from "@/service/news-predict.service"

interface NewsArticleRequest {
    date: string
    heading: string
    text: string
    source: string
}

interface MultipleNewsRequest {
    articles: NewsArticleRequest[]
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

interface BatchPredictionResponse {
    predictions: SpikePredictionResponse[]
    summary: {
        total_articles: number
        successful_predictions: number
        failed_predictions: number
        spike_predictions: number
        no_spike_predictions: number
        average_spike_confidence: number
    }
}

const PredictMultipleNews = ({hotels}: {hotels: {id: string, name: string}[]}) => {
    const [articles, setArticles] = useState<NewsArticleRequest[]>([
        {
            date: "",
            heading: "",
            text: "",
            source: ""
        }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [predictionResult, setPredictionResult] = useState<BatchPredictionResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isResultsExpanded, setIsResultsExpanded] = useState(false)

    const handleInputChange = (index: number, field: keyof NewsArticleRequest, value: string) => {
        setArticles(prev => prev.map((article, i) => 
            i === index ? { ...article, [field]: value } : article
        ))
    }

    const addArticle = () => {
        setArticles(prev => [...prev, {
            date: "",
            heading: "",
            text: "",
            source: ""
        }])
    }

    const removeArticle = (index: number) => {
        if (articles.length > 1) {
            setArticles(prev => prev.filter((_, i) => i !== index))
        }
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
        // Validate all articles have required fields
        const hasEmptyFields = articles.some(article => 
            !article.date || !article.heading || !article.text || !article.source
        )
        
        if (hasEmptyFields) {
            setError("All fields are required for each article")
            return
        }

        setIsLoading(true)
        setError(null)
        setPredictionResult(null)

        try {
            const requestData: MultipleNewsRequest = {
                articles: articles
            }
            
            const response = await predictBatchNewsImpact(requestData)

            setPredictionResult(response)
        } catch (err) {
            setError("An error occurred during prediction. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setArticles([{
            date: "",
            heading: "",
            text: "",
            source: ""
        }])
        setPredictionResult(null)
        setError(null)
        setIsResultsExpanded(false)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="my-5">
                <TypographyH2>Predict Multiple News Impact on Hotel Stocks</TypographyH2>
                </div>
                <TypographyP className="text-gray-600 max-w-2xl mx-auto">
                    Enter multiple news articles to predict potential stock price spikes and their impact on individual hotel companies
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
                    <div className="space-y-6">
                        {articles.map((article, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Article {index + 1}</h3>
                                    {articles.length > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeArticle(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Date Input */}
                                    <div className="space-y-2">
                                        <Label htmlFor={`date-${index}`}>Publication Date</Label>
                                        <Input
                                            id={`date-${index}`}
                                            type="date"
                                            value={article.date}
                                            onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    {/* Source Input */}
                                    <div className="space-y-2">
                                        <Label htmlFor={`source-${index}`}>News Source</Label>
                                        <Select value={article.source} onValueChange={(value) => handleInputChange(index, "source", value)} disabled={isLoading}>
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
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Heading Input - Full Width */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor={`heading-${index}`}>Article Heading</Label>
                                        <Input
                                            id={`heading-${index}`}
                                            type="text"
                                            placeholder="Enter the news article heading"
                                            value={article.heading}
                                            onChange={(e) => handleInputChange(index, "heading", e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    {/* Text Input - Full Width */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor={`text-${index}`}>Article Content</Label>
                                        <textarea
                                            id={`text-${index}`}
                                            placeholder="Enter the full news article text..."
                                            value={article.text}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(index, "text", e.target.value)}
                                            disabled={isLoading}
                                            rows={4}
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Add Article Button */}
                        <div className="flex justify-center">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addArticle}
                                disabled={isLoading}
                                className="flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Add Another Article
                            </Button>
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
                            disabled={isLoading}
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
                    {/* Summary Card - Always Visible */}
                    <Card className="border-blue-200 bg-blue-50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    <div className="text-lg font-bold text-gray-800">
                                        Batch Analysis Summary
                                    </div>
                                </CardTitle>
                                <Button
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {predictionResult.summary.total_articles}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Articles</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {predictionResult.summary.successful_predictions}
                                    </div>
                                    <div className="text-sm text-gray-600">Successful</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">
                                        {predictionResult.summary.spike_predictions}
                                    </div>
                                    <div className="text-sm text-gray-600">Spike Predictions</div>
                                </div>
                                <div className="text-center">
                                    <div className={`text-2xl font-bold ${getConfidenceColor(predictionResult.summary.average_spike_confidence)}`}>
                                        {(predictionResult.summary.average_spike_confidence * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-gray-600">Avg Confidence</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Collapsible Detailed Results */}
                    {isResultsExpanded && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                            {/* Individual Article Predictions */}
                            {predictionResult.predictions.map((prediction, index) => (
                                <Card key={prediction.article_id} className="border-l-4 border-l-blue-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            Article {index + 1}: {prediction.heading}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Article Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="text-sm font-medium text-gray-600">Article ID</Label>
                                                    <TypographyP className="font-mono text-sm">{prediction.article_id}</TypographyP>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-gray-600">Publication Date</Label>
                                                    <TypographyP>{prediction.date}</TypographyP>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-gray-600">Source</Label>
                                                    <TypographyP className="capitalize">{prediction.source.replace('_', ' ')}</TypographyP>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-gray-600">Spike Prediction</Label>
                                                    <div className="flex items-center gap-2">
                                                        {prediction.spike_prediction === "SPIKE" ? (
                                                            <TrendingUp className="w-4 h-4 text-orange-600" />
                                                        ) : (
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                        )}
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                                            prediction.spike_prediction === "SPIKE" 
                                                                ? "text-orange-600 bg-orange-50 border-orange-200" 
                                                                : "text-green-600 bg-green-50 border-green-200"
                                                        }`}>
                                                            {prediction.spike_prediction}
                                                        </span>
                                                        <span className={`font-semibold ${getConfidenceColor(prediction.spike_confidence)}`}>
                                                            ({(prediction.spike_confidence * 100).toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hotel Predictions Table */}
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
                                                            const hotelPrediction = prediction.hotel_predictions[hotel.id]
                                                            if (!hotelPrediction) return null

                                                            return (
                                                                <TableRow key={hotel.id} className="">
                                                                    <TableCell className="font-medium">
                                                                        {hotel.name}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="flex items-center gap-2">
                                                                            {getPredictionIcon(hotelPrediction.prediction)}
                                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPredictionColor(hotelPrediction.prediction)}`}>
                                                                                {hotelPrediction.prediction.toUpperCase()}
                                                                            </span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <span className={`font-semibold ${getConfidenceColor(hotelPrediction.confidence)}`}>
                                                                            {(hotelPrediction.confidence * 100).toFixed(1)}%
                                                                        </span>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <span className="text-green-600 font-medium">
                                                                            {(hotelPrediction.probabilities.up * 100).toFixed(1)}%
                                                                        </span>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <span className="text-red-600 font-medium">
                                                                            {(hotelPrediction.probabilities.down * 100).toFixed(1)}%
                                                                        </span>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <span className="text-gray-600 font-medium">
                                                                            {(hotelPrediction.probabilities.neutral * 100).toFixed(1)}%
                                                                        </span>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PredictMultipleNews