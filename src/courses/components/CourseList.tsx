import {Course} from "../types";
import CourseCard from "./CourseCard";
import {css} from "@emotion/react";
import Container from "../../common/components/Container";
import {AppTheme} from "../../theme";

const grid = (theme: AppTheme) => css({
    display: "grid",
    gap: theme.spacing*4,
    gridTemplateColumns: "1fr",

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
    [`@media (min-width: ${theme.breakpoints.xxl}px)`]: {
        gridTemplateColumns: "repeat(4, 1fr)",
    },
});
type Props = {
    courses: Course[];
}
const CourseList = ({ courses }: Props) => {

    return (
        <Container>
            <div css={grid}>
                {courses
                    ? courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))
                    : 'No courses found'}
            </div>
        </Container>
    );
};

export default CourseList;