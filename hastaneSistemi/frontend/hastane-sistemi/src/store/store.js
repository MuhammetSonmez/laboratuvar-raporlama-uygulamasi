import { configureStore } from '@reduxjs/toolkit';
import { laborantApi } from '../api/laborantApi';
import { raporApi } from '../api/raporApi';
import { userApi } from '../api/userApi';

export const store = configureStore({
  reducer: {
    [laborantApi.reducerPath]: laborantApi.reducer,
    [raporApi.reducerPath]: raporApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laborantApi.middleware, raporApi.middleware, userApi.middleware),
});
