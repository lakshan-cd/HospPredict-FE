
import axiosInstance from "@/utils/axios";


const baseUrl = "knowledge-graph"
export const getAvailableMetricsKnowledgeGraph = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/available_metrics`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  
  export const getTimeLineDataForMetric = async (companyId: string, metric: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/metrics/timeline?metric=${metric}`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  export const getQoQChangesForMetric = async (companyId: string, metric: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/qoq_changes?metric=${metric}`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  export const getCriticalPeriods = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/critical_periods`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  export const getReasonsForCriticalPeriod = async (companyId: string, period: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/explain_risk?period=${period}`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const getAvailablePeriods = async (companyId: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/available_periods`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const getGraphData = async (companyId: string, period: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/company/${companyId}/graph_structure?period=${period}`
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }