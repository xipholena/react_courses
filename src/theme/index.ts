
export const theme = {
    zInexes: {
        base: 0,
        dropdown: 100,
        sticky: 200,
        overlay: 1000,
        modal: 1100,
        toast: 1200,
        tooltip: 1300
    },
    colors: {
        primary: {
            white: "#fff",
            black: "#000",
            blue: "#007bff",
            gray: "#ccc",
            teal: "#19404a"
        },
        secondary: {
            blue: "#94a3b8",
            gray: "#494949",
            teal: "#235768"
        },

    },
    breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1360,
    },
    spacing: 4
}

export type AppTheme = typeof theme;

declare module "@emotion/react" {
    export interface Theme extends AppTheme {}
}