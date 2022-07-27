import axios, { AxiosError, AxiosResponse } from 'axios';

import '../atqr/api';
import { Controller, Get, Param, Put } from '@nestjs/common';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

const getChallenge = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/todos/2',
      data: {},
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      console.log('error message: ');
      return '';
    } else {
      console.log('unexpected error: ', Error);
      return 'An unexpected error occurred';
    }
  }
};
getChallenge();

export default axiosInstance;
