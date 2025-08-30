
export const theme = {
    colors: {
        primary: 'hotpink'
    },
    zInexes: {
        base: 0,
        dropdown: 100,
        sticky: 200,
        overlay: 1000,
        modal: 1100,
        toast: 1200,
        tooltip: 1300
    }
}

export type AppTheme = typeof theme;

declare module "@emotion/react" {
    export interface Theme extends AppTheme {}
}