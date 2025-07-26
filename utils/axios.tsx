import axios from "axios";
// import { enqueueSnackbar } from "notistack";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface ErrorResponse {
  title: string;
  status: number;
  detail?: string;
}

const unhandledError: ErrorResponse = {
  title: "Something Went Wrong, Please Contact Technical Team.",
  status: 500,
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;

      let errorResp = { ...unhandledError };

      switch (status) {
        case 400:
          errorResp = {
            ...errorResp,
            detail: data.detail || "Bad Request",
          };
          break;
        case 401:
          errorResp = {
            ...errorResp,
            detail: data.detail || "Unauthorized",
          };
          break;
        case 402:
          errorResp = {
            ...errorResp,
            detail: data.detail || "Payment Required",
          };
          break;
        case 403:
          errorResp = {
            ...errorResp,
            detail: data.detail || "Forbidden",
          };
          break;
        case 404:
          errorResp = {
            ...errorResp,
            detail: data.detail || "Not Found",
          };
          break;
        case 405:
          errorResp = {
            ...errorResp,
            detail: data.detail || "Method Not Allowed",
          };
          break;
        case 408:
          errorResp = {
            ...errorResp,
            detail: data.message || "Request Timeout",
          };
          break;
        case 409:
          errorResp = {
            ...errorResp,
            detail: data.message || "Conflict",
          };
          break;
        case 429:
          errorResp = {
            ...errorResp,
            detail: data.message || "Too Many Requests",
          };
          break;
        case 500:
          errorResp = {
            ...errorResp,
            detail: data.message || "Internal Server Error",
          };
          break;
        case 502:
          errorResp = {
            ...errorResp,
            detail: data.message || "Bad Gateway",
          };
          break;
        case 503:
          errorResp = {
            ...errorResp,
            detail: data.message || "Service Unavailable",
          };
          break;
        case 504:
          errorResp = {
            ...errorResp,
            detail: data.message || "Gateway Timeout",
          };
          break;
        default:
          errorResp = {
            ...errorResp,
            detail: data.message || data || "An error occurred",
          };
          break;
      }

      // data.errors.forEach((err: string) => {
      //   enqueueSnackbar(err, { variant: "error" });
      // });
      throw errorResp;
    } else {
      // enqueueSnackbar(unhandledError.title, { variant: "error" });
      throw error;
    }
  }
);

export const post = async (url: string, data: any, auth = false) => {
  const options: any = {
    data,
    url,
    method: "post",
    responseType: "json",
  };

  return axiosInstance(options);
};

export const put = async (url: string, data: any) => {
  const options: any = {
    data,
    url,
    method: "put",
    responseType: "json",
  };

  return axiosInstance(options);
};

export const deleteReq = async (url: string, data: any) => {
  const options: any = {
    data,
    url,
    method: "delete",
    responseType: "json",
  };

  return axiosInstance(options);
};

export const patch = async (url: string, data: any) => {
  const options: any = {
    data,
    url,
    method: "patch",
    responseType: "json",
  };

  return axiosInstance(options);
};

export const get = async (url: string, auth = false) => {
  const options: any = {
    url,
    method: "get",
    responseType: "json",
  };

  return axiosInstance(options);
};

export const remove = async (url: string) => {
  const options: any = {
    url,
    method: "delete",
    responseType: "json",
  };

  return axiosInstance(options);
};



export default axiosInstance;
