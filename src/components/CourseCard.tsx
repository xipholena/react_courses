import {Course} from "../types";

type CourseCardProps  = {
    course: Course;
    //onBuy: (courseId: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const handlePurchase = (courseId: number) => {
        alert(`Куплено курс з id: ${courseId}`);
    };
    return (
        <article>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Ціна: {course.price} ₴</p>

            {/* Відео: HTML5 video */}
            <video width="320" height="180" controls>
                {/*<source src={course.videoUrl} type={course.videoUrl.endsWith('.mp4') ? 'video/mp4' : 'application/x-mpegURL'} />*/}
                {/*Ваш браузер не підтримує відтворення відео.*/}
            </video>

            <button onClick={()=> handlePurchase(course.id)}>
                Купити
            </button>
        </article>
    );
};

export default CourseCard;