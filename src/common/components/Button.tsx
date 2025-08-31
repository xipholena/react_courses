import {ReactNode} from "react";
import {css} from "@emotion/react";
import {AppTheme} from "../../theme";

type Props = {
    type?: "button" | "submit" | "reset" | undefined;
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const button  = (theme: AppTheme) =>css({
    padding: `${theme.spacing*2.5}px ${theme.spacing*5}px`,
    borderRadius: theme.spacing*2,
    border: "none",
    backgroundColor: theme.colors.primary.blue,
    color: theme.colors.primary.white,
    cursor: "pointer",
    fontSize: theme.spacing*4,
    transition: "filter 300ms ease",
    '&:hover': {
        filter: 'brightness(0.9)'
    },
    '&:disabled': {
        backgroundColor:  theme.colors.primary.gray,
        color: theme.colors.secondary.gray,
        cursor: "not-allowed",
    }
})
const Button = ({type="button", children, disabled, onClick}: Props) => {
    return (
        <button css={button} disabled={disabled} type={type} onClick={onClick}>{children}</button>
    )
}

export default Button