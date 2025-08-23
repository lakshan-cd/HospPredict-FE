import axiosInstance from "@/utils/axios";

const baseUrl = "macro-economic";

export const getAllEconomicsCompanies = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/companies`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const predictNextDayPrice = async (obj: any) => {
    try {
      const response = await axiosInstance.post(`${baseUrl}/predict`, obj)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export const predictFuturePrice = async (obj: any) => {
    try {
      const response = await axiosInstance.post(`${baseUrl}/predict-multiple-days`, obj)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export const getPredictionPlot = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/plots/prediction/${companyId}`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export const getShapSummary = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/plots/shap/${companyId}/summary`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export const getShapBarChart = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/plots/shap/${companyId}/bar`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export const getGrangerHeatmap = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/plots/granger/${companyId}/heatmap`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }