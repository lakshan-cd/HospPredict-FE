import axiosInstance from "@/utils/axios";

const baseUrl = "predict";

export const getAllCompanyPeriods = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/periods`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const predictRiskForPeriod = async (obj: any) => {
    try {
      const response = await axiosInstance.post(
        `predict-risk`,
        obj
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const predictRiskForMetric = async (obj: any) => {
    try {
      const response = await axiosInstance.post(
        `${baseUrl}`,
        obj
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }