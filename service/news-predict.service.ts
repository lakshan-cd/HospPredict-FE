import axiosInstance from "@/utils/axios";


const baseUrl = "news"

export const predictNewsImpact = async (newsArticle: any) => {
    try {
        const response = await axiosInstance.post(`${baseUrl}/predict`, newsArticle)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const predictBatchNewsImpact = async (newsArticle: any) => {
    try {
        const response = await axiosInstance.post(`${baseUrl}/predict/batch`, newsArticle)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}