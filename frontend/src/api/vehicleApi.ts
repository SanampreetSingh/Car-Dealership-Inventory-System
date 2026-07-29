import axiosInstance from './axiosInstance';
import type {
  VehicleListResponse,
  VehicleSearchResponse,
  VehicleFilters,
} from '../types';

export const getVehicles = async (
  filters: VehicleFilters = {}
): Promise<VehicleListResponse> => {
  const res = await axiosInstance.get('/vehicles', { params: filters });
  return res.data;
};

export const searchVehicles = async (
  keyword: string
): Promise<VehicleSearchResponse> => {
  const res = await axiosInstance.get('/vehicles/search', {
    params: { keyword },
  });
  return res.data;
};

export const purchaseVehicle = async (id: string) => {
  const res = await axiosInstance.post(`/vehicles/${id}/purchase`);
  return res.data;
};

export const createVehicle = async (formData: FormData) => {
  const res = await axiosInstance.post('/admin/vehicles', formData);
  return res.data;
};

export const updateVehicle = async (id: string, formData: FormData) => {
  const res = await axiosInstance.put(`/admin/vehicles/${id}`, formData);
  return res.data;
};

export const deleteVehicle = async (id: string) => {
  const res = await axiosInstance.delete(`/admin/vehicles/${id}`);
  return res.data;
};

export const restockVehicle = async (id: string, addedQuantity: number) => {
  const res = await axiosInstance.post(`/admin/vehicles/${id}/restock`, {
    addedQuantity,
  });
  return res.data;
};