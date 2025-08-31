import React from "react";
import { Course } from "../types";
import {useAppSelector} from "../../hooks";
import {RootState} from "../../store";


const MyCourses = () => {
    const courses = useAppSelector((state: RootState) => state.coursesState?.courses);
    return (
        <p>
            Мої курси: {courses.length}
        </p>
    );
};

export default MyCourses;