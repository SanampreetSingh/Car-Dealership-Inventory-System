import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Vehicle, VehicleFilters } from '../../types';

interface VehicleState {
  vehicles: Vehicle[];
  filters: VehicleFilters;
  totalPages: number;
  currentPage: number;
  loading: boolean;
}

const initialState: VehicleState = {
  vehicles: [],
  filters: {},
  totalPages: 1,
  currentPage: 1,
  loading: false,
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles: (
      state,
      action: PayloadAction<{
        vehicles: Vehicle[];
        totalPages?: number;
        currentPage?: number;
      }>
    ) => {
      state.vehicles = action.payload.vehicles;
      state.totalPages = action.payload.totalPages ?? 1;
      state.currentPage = action.payload.currentPage ?? 1;
    },
    setFilters: (state, action: PayloadAction<VehicleFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateVehicleInList: (state, action: PayloadAction<Vehicle>) => {
      const idx = state.vehicles.findIndex(
        (v) => v._id === action.payload._id
      );
      if (idx !== -1) state.vehicles[idx] = action.payload;
    },
    removeVehicleFromList: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(
        (v) => v._id !== action.payload
      );
    },
  },
});

export const {
  setVehicles,
  setFilters,
  setLoading,
  updateVehicleInList,
  removeVehicleFromList,
} = vehicleSlice.actions;
export default vehicleSlice.reducer;