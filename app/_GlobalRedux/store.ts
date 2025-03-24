'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/app/_GlobalRedux/_store/counterSlice';
import executionReducer from '@/app/_GlobalRedux/_store/executionSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        execution:executionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;