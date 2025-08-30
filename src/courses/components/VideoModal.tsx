import "../styles/index.css";
import {css, keyframes} from '@emotion/react'
import {AppTheme} from "../../theme";
import {RefObject, useCallback, useEffect, useRef, useState} from "react";

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

const modal = css({
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
    animation: `${fadeIn} 0.3s ease-out`
})

const modalTitle = css({
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: 500
})

const modalButton  = css({
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px"
})


type Props = {
    onClose: () => void;
    src: string;
}

const  VideoModal = ({ onClose, src }:Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current) {
            console.log(videoRef.current?.currentTime)
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
    }, [onClose]);

    useEffect(() => {
        if (videoRef.current) {
            console.log(videoRef.current?.currentTime)
        }
    }, [videoRef]);



    return (
        <div  css={modalOverlay} onClick={handleTimeUpdate}>
            <div css={modal} onClick={(e) => e.stopPropagation()} >
                <p css={modalTitle}>Приємнного перегляду!</p>
                    <video ref={videoRef} width="320" height="180" controls>
                        <source src={src} type="video/mp4"  />
                        Ваш браузер не підтримує відтворення відео.
                    </video>
                <button css={modalButton} onClick={handleTimeUpdate}>Close</button>
            </div>
        </div>

    );
}

export default VideoModal