import {Course} from "../types";
import CourseCard from "./CourseCard";

type Props = {
    courses: Course[];
}
const CourseList = ({ courses }: Props) => {

    return (
        <div>
            {courses
                ? courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))
                : 'No courses found'}
        </div>
    );
};

export default CourseList;