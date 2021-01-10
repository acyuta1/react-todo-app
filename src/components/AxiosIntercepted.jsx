import axios from "axios";
import { BASE_API_URL } from "../Constants";
import AuthenticationService, {
  JWT_SESSION_ATTRIBUTE,
} from "../components/AuthenticationService";

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
});

function createAxiosResponseInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use((config) => {
    if (AuthenticationService.isUserLoggedIn()) {
      config.headers.Authorization = sessionStorage.getItem(
        JWT_SESSION_ATTRIBUTE
      );
    }
    return config;
  });
}

createAxiosResponseInterceptor(instance);

export default instance;
