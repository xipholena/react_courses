import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from "./courses/slices/courseSlice";

export const store = configureStore({
    reducer: {
        coursesState: coursesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch