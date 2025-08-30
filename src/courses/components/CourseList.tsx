import {Course} from "../types";
import CourseCard from "./CourseCard";

type Props = {
    courses: Course[];
}
const CourseList = ({ courses }: Props) => {
    return (
        <div>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} /*onBuy={handlePurchase}*/ />
            ))}
        </div>
    );
};

export default CourseList;