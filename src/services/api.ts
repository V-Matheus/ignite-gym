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
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.message === 'token.expired' ||
          requestError.response.data.message === 'token.invalid'
        ) {
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      }

      return Promise.reject(requestError);
    },
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManger);
  };
};

export { api };
