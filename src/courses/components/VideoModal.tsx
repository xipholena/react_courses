import {css, keyframes} from '@emotion/react'
import {AppTheme} from "../../theme";
import {useCallback, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addPauseInfo} from "../slices/courseSlice";
import {RootState} from "../../store";

const fadeIn = keyframes({
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
})
const modalOverlay = (theme: AppTheme) => css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zInexes.overlay,
    animation: `${fadeIn} 0.3s ease-out`
})

const modal = (theme: AppTheme) => css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: theme.spacing*4,
    backgroundColor: theme.colors.primary.white,
    padding: `${theme.spacing*5}px ${theme.spacing*7.5}px`,
    borderRadius: theme.spacing*3,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    maxWidth: theme.spacing*100,
    width: "90%",
    textAlign: "center",
    animation: `${fadeIn} 0.3s ease-out`,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        maxWidth: theme.spacing*150,
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        maxWidth: theme.spacing*200,
    },
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
        maxWidth: theme.spacing*300,
    },
})

const modalTitle =  (theme: AppTheme) => css({
    marginBottom: theme.spacing*5,
    fontSize: theme.spacing*4.5,
    fontWeight: 500
})

const modalButton = (theme: AppTheme) => css({
    padding: `${theme.spacing*2.5}px ${theme.spacing*5}px`,
    borderRadius: theme.spacing*2,
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: theme.spacing*4
})

type Props = {
    onClose: () => void;
    src: string;
    courseId: number;
}

const  VideoModal = ({ onClose, src, courseId }:Props) => {
    const pausedAt = useAppSelector((state: RootState) => state.coursesState.pausedAt);
    const timing = pausedAt.find(item => item?.courseId === courseId)?.value ?? 0
    const dispatch = useAppDispatch();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current) {
            dispatch(addPauseInfo({courseId: courseId, value: videoRef.current?.currentTime}))
        }
        onClose()
    }, [videoRef]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleTimeUpdate();
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [handleTimeUpdate]);


    //Повертаю в останню переглянуту секунду
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => {
            video.currentTime = timing;
        };

        video.addEventListener("loadedmetadata", handleLoaded);

        return () => video.removeEventListener("loadedmetadata", handleLoaded);
    }, [timing]);

    return (
        <div  css={modalOverlay} onClick={handleTimeUpdate}>
            <div css={modal} onClick={(e) => e.stopPropagation()} >
                <p css={modalTitle}>Приємнного перегляду!</p>
                    <video ref={videoRef} controls>
                        <source src={src} type="video/mp4"  />
                        Ваш браузер не підтримує відтворення відео.
                    </video>
                <button css={modalButton} onClick={handleTimeUpdate}>Close</button>
            </div>
        </div>

    );
}

export default VideoModal