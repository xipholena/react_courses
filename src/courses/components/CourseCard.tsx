import {Course} from "../types";
import {useMemo, useState} from "react";
import Portal from "../../common/components/Portal";
import VideoModal from "./VideoModal";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addPurchasedCurse} from "../slices/courseSlice";
import ErrorModal from "../../common/components/ErrorModal";
import {RootState} from "../../store";


type Props  = {
    course: Course;
}

const CourseCard = ({ course }:Props) => {
    const courses = useAppSelector((state: RootState) => state.coursesState?.courses);
    //console.log('courses', courses)
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null | unknown>(null);
    const purchased = useMemo(()=> courses.find(item =>  item.id === course.id), [courses, course])

    //console.log('item, course?.id', (item as any)?.course?.id, course?.id)
    //() => courses.find((item) =>{}, [courses, course])
    // console.log('item?.id, course?.id', item?.id, course?.id)
    //return item?.id === course?.id)
    const handlePurchase = (id: number) => {
        try {
            setLoading(true);
            //throw new Error('Purchase failed');
            setTimeout(()=> {
                dispatch(addPurchasedCurse(course))
                setLoading(false)
            }, 1500)
            //TS1196: Catch clause variable type annotation must be any or unknown if specified.
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }


    return (
        <article>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Ціна: {course.price} ₴</p>

            <button onClick={() => setShowModal(true)}>
               Дивитись відео
            </button>

            <Portal showModal={showModal}>
                <VideoModal
                    onClose={() => setShowModal(false)}
                    src={course?.videoUrl}
                    courseId={course.id}
                />,
            </Portal>
            <Portal showModal={!!error}>
                <ErrorModal onClose={() => setError(null)} error={error}/>
            </Portal>

            <button disabled={loading || !!purchased} onClick={()=> handlePurchase(course.id)}>
                {purchased ? 'Куплений' :  'Купити'}
            </button>
        </article>
    );
};

export default CourseCard;