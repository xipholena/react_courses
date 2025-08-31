import React, {useCallback, useState} from "react";
import {useLocalStorage} from "../../hooks";
import {css} from "@emotion/react";
import {AppTheme} from "../../theme";

const button  = (theme: AppTheme) => css({
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

const formStyle = (theme: AppTheme) => css({
    display: "flex",
    gap: theme.spacing*4,
    flexDirection: "column",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
       flexDirection: "row"
    },
});
const labelStyle = (theme: AppTheme) => css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    columnGap: theme.spacing,
    color: theme.colors.primary.teal,
    fontWeight: 500,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        flexDirection: "row"
    },
});
const inputStyle = (theme: AppTheme)=> css({
    padding: `${theme.spacing*2.5}px ${theme.spacing*3}px`,
    borderRadius: theme.spacing*2,
    border: "1px solid #cbd5e1",
    backgroundColor: "#fff",
    fontSize: theme.spacing*3.5,
    transition: "border-color 120ms ease, box-shadow 120ms ease",
    "::placeholder": { color: theme.colors.secondary.blue },
    ":focus": {
        outline: "none",
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 3px rgba(59,130,246,0.2)",
    },
});

const PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\\w\\s]).{6,}$";
const LogInForm = ({onLogin}: {onLogin: ()=> void}) => {
    const {setItem} = useLocalStorage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            // Дамо браузеру показати нативні підказки
            form.reportValidity();
            return;
        }

        setItem("user", {email, password})
        onLogin();
    },[]) ;
    return (
        <form
            css={formStyle}
            onSubmit={onSubmit}
            noValidate
        >

            <div css={labelStyle}>
                <label htmlFor="email">Email:</label>
                <input
                    css={inputStyle}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
            </div>

            <div css={labelStyle}>
                <label htmlFor="password">Password:</label>
                <input
                    css={inputStyle}
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    pattern={PASSWORD_PATTERN}
                    title="Мінімум 6 символів, щонайменше одна велика, одна мала літера і один спецсимвол"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button css={button} type="submit">Log in</button>
        </form>
    )
}
export default LogInForm;