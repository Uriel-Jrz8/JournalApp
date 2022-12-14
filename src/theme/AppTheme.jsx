import { CssBaseline, ThemeProvider } from "@mui/material"
import { blueTheme } from "./"






export const AppTheme = ( { children } ) => {
    return (

        <ThemeProvider theme={ blueTheme }>
            <CssBaseline/>
            {children}
        </ThemeProvider>

    )
}
