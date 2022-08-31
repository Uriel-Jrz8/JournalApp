import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";




export const blueTheme  = createTheme( {
    palette: {
        primary:{
            main: '#0A1929'
        },
        secondary:{
            main: '#001E3C'
        },
        error: {
            main: red.A400
        }
    }
})