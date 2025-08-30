import {Course} from "../types";
import {useState} from "react";
import Modal from "../../common/components/Modal";
import VideoModal from "./VideoModal";

type CourseCardProps  = {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const [showModal, setShowModal] = useState(false);
    const handlePurchase = (courseId: number) => {
        alert(`Куплено курс з id: ${courseId}`);
    };
    return (
        <article>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Ціна: {course.price} ₴</p>

            <button onClick={() => setShowModal(true)}>
               Дивитись відео
            </button>

            <Modal showModal={showModal}>
                <VideoModal
                    onClose={() => setShowModal(false)}
                    src={course?.videoUrl}
                />,
            </Modal>
            <button onClick={()=> handlePurchase(course.id)}>
                Купити
            </button>
        </article>
    );
};

export default CourseCard;