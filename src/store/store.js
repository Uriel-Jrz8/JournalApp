import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal/thunks';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        jounal: journalSlice.reducer,
    },
}); 