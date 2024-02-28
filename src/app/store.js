import { configureStore } from '@reduxjs/toolkit';
import AdminReducer from "../features/admin/AdminSlice";

export const store = configureStore({
  reducer: {
    admin: AdminReducer,
  },
});
