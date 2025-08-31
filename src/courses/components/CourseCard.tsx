import {Course} from "../types";
import {useCallback, useMemo, useState} from "react";
import Portal from "../../common/components/Portal";
import VideoModal from "./VideoModal";
import {useAppDispatch, useAppSelector, useLocalStorage} from "../../hooks";
import {addPurchasedCurse} from "../slices/courseSlice";
import ErrorModal from "../../common/components/ErrorModal";
import {RootState} from "../../store";
import Button from "../../common/components/Button";
import {css} from "@emotion/react";
import {AppTheme, theme} from "../../theme";


const card = (theme: AppTheme) =>
    css({
        position: "relative",
        backgroundColor: theme.colors.primary.white,
        border: `1px solid ${theme.colors.primary.gray}`,
        borderRadius: theme.spacing*3,
        padding: `${theme.spacing*4}px ${theme.spacing*4}px ${theme.spacing*16}px`,
        margin: `${theme.spacing*4}px 0`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    });

const title = (theme: AppTheme) =>
    css({
        color: theme.colors.primary.teal,
        fontSize: theme.spacing*5,
        marginBottom: theme.spacing*2,
    });

const text = (theme: AppTheme) =>
    css({
        color: theme.colors.secondary.gray,
        margin: `${theme.spacing}px 0`,
    });

const buttonWrapper = css({
    position: "absolute",
    bottom: theme.spacing*4,
    left: theme.spacing*4,
    right: theme.spacing*4,
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing*3,
});
type Props  = {
    course: Course;
}

const CourseCard = ({ course }:Props) => {
    const courses = useAppSelector((state: RootState) => state.coursesState?.courses);
    const dispatch = useAppDispatch();
    const {getItem, removeItem} = useLocalStorage();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null | unknown>(null);
    const purchased = useMemo(()=> courses.find(item =>  item.id === course.id), [courses, course])
    const isLoggedIn = useMemo(() => !!getItem("user"), [getItem])

    const handlePurchase = useCallback((id: number) => {
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
    }, [])


    return (
        <article css={card}>
            <h2 css={title}>{course.title}</h2>
            <p css={text}>{course.description}</p>
            <p css={text}>Ціна: {course.price} ₴</p>
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

            {!isLoggedIn && <p css={text}> Зареєструйтесь для здійснення покупки</p> }
            <div css={buttonWrapper}>
                <Button onClick={() => setShowModal(true)}>Дивитись відео</Button>
                <Button
                    disabled={loading || !!purchased || !isLoggedIn}
                    onClick={()=> handlePurchase(course.id)}
                >
                    {purchased ? 'Куплений' :  'Купити'}
                </Button>
            </div>

        </article>
    );
};

export default CourseCard;