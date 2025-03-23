import { AppError } from '@utils/AppError';
import axios, { AxiosInstance } from 'axios';

type SignOutProps = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManger: (signOut: SignOutProps) => void;
};

const api = axios.create({
  baseURL: 'http://192.168.0.128:3333',
}) as ApiInstanceProps;

api.registerInterceptTokenManger = (signOut: SignOutProps) => {
  const interceptTokenManger = api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
      }

      return Promise.reject(error);
    },
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManger);
  };
};

export { api };
