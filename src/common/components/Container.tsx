import {AppTheme} from "../../theme";
import {css} from "@emotion/react";
import {ReactNode} from "react";

const container = (theme: AppTheme) => css({
    paddingLeft: theme.spacing*4,
    paddingRight: theme.spacing*4,
    maxWidth: theme.spacing*340,
    margin: "0 auto",
    [`@media (min-width: ${theme.breakpoints.xxl}px)`]: {
        paddingLeft: theme.spacing*10,
        paddingRight: theme.spacing*10,
    },

});
// Зробила окремим, щоб дотриматись принципу "separation of concerns"
const Container = ({children}: {children: ReactNode}) => {
    return (
        <div css={container}>{children}</div>
    )
}
export default Container