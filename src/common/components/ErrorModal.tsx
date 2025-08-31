import {css, keyframes} from '@emotion/react'
import {AppTheme} from "../../theme";
import {useEffect, useMemo} from "react";
import Button from "./Button";

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
    backgroundColor: theme.colors.primary.black,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zInexes.overlay,
    animation: `${fadeIn} 0.3s ease-out`
})

const modal = (theme: AppTheme) => css({
    backgroundColor:  theme.colors.primary.white,
    padding: `${theme.spacing*5}px ${theme.spacing*6}px`,
    borderRadius: theme.spacing*3,
    border: `1px solid ${theme.colors.primary.black}`,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    maxWidth: theme.spacing*100,
    width: "90%",
    textAlign: "center",
    animation: `${fadeIn} 0.3s ease-out`
})

const modalTitle = (theme: AppTheme) => css({
    marginBottom: theme.spacing*5,
    fontSize: theme.spacing*5,
    fontWeight: 500
})

type Props = {
    onClose: () => void;
    error: Error | null | unknown
}

// Щоб протестувати, я додала на покупку курсу throw new Error('Purchase failed');
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
                <Button onClick={onClose}>Close</Button>
            </div>
        </div>

    );
}

export default  ErrorModal