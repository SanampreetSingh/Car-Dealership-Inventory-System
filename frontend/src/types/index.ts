export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  year: number;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleListResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  vehicles: Vehicle[];
}

export interface VehicleSearchResponse {
  success: boolean;
  count: number;
  vehicles: Vehicle[];
}

export interface VehicleFilters {
  category?: string;
  make?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}