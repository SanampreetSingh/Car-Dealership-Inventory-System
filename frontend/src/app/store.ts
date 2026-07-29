import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import vehicleReducer from '../features/vehicles/vehicleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;