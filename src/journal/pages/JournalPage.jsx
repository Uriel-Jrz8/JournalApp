import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material"
import { Journallayout } from "../layout/Journallayout";
import { NoteView, NothingSelectView } from "../views";





export const JournalPage = () => {
    return (
        <Journallayout>

            <NothingSelectView />

            <IconButton size='large' sx={{
                color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                position: 'fixed',
                right: 50,
                bottom: 50
            }}>
                <AddOutlined sx={{fontSize:30}}/>

            </IconButton>

            {/* <NoteView/> */}


        </Journallayout>

    )
}
