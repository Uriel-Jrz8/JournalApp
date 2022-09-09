import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { Journallayout } from '../layout/Journallayout';
import { NoteView, NothingSelectView } from '../views';


export const JournalPage = () => {

    const { isSaiving, active } = useSelector(state => state.journal);
    const dispatch = useDispatch();
    const onClicNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <Journallayout>
            {
            !!active
            ?<NoteView/>
            :<NothingSelectView />
            }
            <IconButton size='large' sx={{
                color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                position: 'fixed',
                right: 50,
                bottom: 50
            }}
                onClick={onClicNewNote}
                disabled={isSaiving}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
            
            
        </Journallayout>

    )
}
