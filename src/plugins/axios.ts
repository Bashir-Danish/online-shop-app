import axios from "axios";
import {getToken} from '@/utils/jwt'

const token = getToken()
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
} else {
  axios.defaults.headers.common["Authorization"] = "";
}

let config = {
  baseURL: "http://localhost:4000/api/v1",
  
};

const _axios = axios.create(config);



_axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {

  return Promise.reject(error);
});


_axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  
  return Promise.reject(error);
});
export default _axios;