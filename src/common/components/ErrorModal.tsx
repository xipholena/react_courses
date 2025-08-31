import {css, keyframes} from '@emotion/react'
import {AppTheme} from "../../theme";
import {useEffect, useMemo} from "react";


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
    backgroundColor: "#ffbaba",
    padding: "20px 30px",
    borderRadius: "12px",
    border: "1px solid #910000",
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
    error: Error | null | unknown
}

const ErrorModal = ({ onClose, error}:Props) => {

    const errorMessage = useMemo(() => {
        if (error instanceof Error) {
            return error.message;
        } else {
            console.error(error);
            return 'Невідома помилка'
        }
    }, [error])

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        <div  css={modalOverlay} onClick={onClose}>
            <div css={modal} onClick={(e) => e.stopPropagation()} >
                <p css={modalTitle}>Щось пішло не за  планом...</p>
                <p>{errorMessage}</p>
                <button css={modalButton} onClick={onClose}>Close</button>
            </div>
        </div>

    );
}

export default  ErrorModal