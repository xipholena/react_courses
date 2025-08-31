import React, {useCallback, useMemo, useState} from "react";
import {useLocalStorage} from "../../hooks";
import MyCourses from "../../courses/components/MyCourses";
import LogInForm from "../../courses/components/LogInForm";
import {AppTheme} from "../../theme";
import {css} from "@emotion/react";
import Button from "./Button";
import Container from "./Container";

const navBar = (theme: AppTheme) => css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: theme.spacing*2,
    padding: `${theme.spacing*10}px 0`,
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        justifyContent: "flex-end",
    },
});

const Navbar = () => {
    const {getItem, removeItem} = useLocalStorage();
    const [update, setUpdate] = useState<boolean>(false);

    const isLoggedIn = useMemo(() => getItem("user"), [getItem])

    const handleLogout = useCallback(() => {
        removeItem("user")
        setUpdate(!update)
    }, [])
    return (
        <Container>
            <nav css={navBar}>

                {isLoggedIn ? (
                        <>
                            <MyCourses/>
                            <Button type="button" onClick={handleLogout}>Log out</Button>
                        </>
                    ) : <LogInForm onLogin={()=>setUpdate(!update)}/>}

            </nav>
        </Container>
    )
}

export default Navbar;