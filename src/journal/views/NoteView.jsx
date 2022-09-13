import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startSaveNote } from "../../store/journal"
import { ImageGallery } from "../components"
//import Swal from 'sweetalert2/dist/sweetalert2.css';






export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: notaActiva, messageSaved, isSaving } = useSelector( state => state.journal);
    const {title, body, date, onInputChange, formState} = useForm( notaActiva ); 
   
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    },[date])

    useEffect(() => {
        if( messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])

    useEffect(() => { // se dispara cada ves que detecta un cambio en la nota 
        dispatch(setActiveNote(formState));
    }, [formState])

    const onSaveNote = () =>{
        dispatch( startSaveNote() );
    } 


    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mb:1}} className="animate__animated animate__fadeIn animate__faster">
            <Grid item >
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <input type="file"/>
                <Button
                    disabled = {isSaving}
                    color="primary"
                    sx={{padding:2}}
                    onClick={onSaveNote}
                    >
                    <SaveOutlined sx= {{ fontSize:30, mr:1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth 
                    placeholder="Ingresa un titulo"
                    label="Titulo"
                    sx={{border: 'none', mb:1}}
                    name="title"
                    value={title}
                    onChange= {onInputChange}
                    />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth multiline 
                    placeholder="Que sucedio"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange= {onInputChange}
                    />
            </Grid>

            <ImageGallery/>

        </Grid>
    )
}
