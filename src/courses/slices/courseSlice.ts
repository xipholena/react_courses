import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import {Course} from "../types";

interface CoursesState {
    pausedAt: { courseId: number, value: number }[];
    courses: Course[];
}

const initialState: CoursesState = {
    pausedAt: [],
    courses: [],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addPauseInfo: (state, action) => {
            const index = state.pausedAt.findIndex(item => item.courseId === action.payload.courseId);
            if (index === -1) {
                // можна мутувати напряму — Immer під капотом сам зробить копію
                state.pausedAt.push(action.payload);
            } else {
                state.pausedAt.splice(index, 1, action.payload);
            }
        },
        addPurchasedCurse: (state,action) => {
            state.courses  = [...state.courses, action.payload];
        },
    },
});

export const { addPauseInfo, addPurchasedCurse } = coursesSlice.actions;
export default coursesSlice.reducer;