import axiosInstance from "@/utils/axios";

const baseUrl = "company";
export const getAllCompanies = async () => {
    try {
      const response = await axiosInstance.get(
        `companies`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const getAllCompanyMetrics = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/${companyId}/metrics`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  

  export const getAllCompanyTrendGraph = async (companyId: string, metric: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/${companyId}/trend/${metric}`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  