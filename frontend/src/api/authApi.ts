import axiosInstance from './axiosInstance';
import type { AuthResponse } from '../types';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await axiosInstance.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post('/auth/login', data);
  return res.data; // note: login response is flat, not nested under `user`
};