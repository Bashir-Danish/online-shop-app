import { getToken } from '@/utils/jwt';

const token = getToken();
const headers = new Headers();

if (token) {
  headers.append('Authorization', token);
} else {
  headers.append('Authorization', '');
}

const config = {
  baseURL: 'http://api.kdanish.com/api/v1',
  withCredentials: false,
  headers,
};

const _fetch = (url: RequestInfo | URL, options: RequestInit | undefined) => fetch(url, options);

const fetchApi = async (url: string, options = {}) => {
    const fullUrl = `${config.baseURL}${url}`;
    const fetchOptions = {
      ...config,
      ...options,
    };
  
    try {
      const response = await _fetch(fullUrl, fetchOptions);
      const data = await response.json();
  
      return { response, data };
    } catch (error) {
      return { response: null, data: null, error };
    }
  };

export default fetchApi;
