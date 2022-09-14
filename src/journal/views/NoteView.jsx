import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


//import Swal from 'sweetalert2/dist/sweetalert2.css';






export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: notaActiva, messageSaved, isSaving } = useSelector(state => state.journal);
    const { title, body, date, onInputChange, formState } = useForm(notaActiva);


    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);


    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);


    useEffect(() => { // se dispara cada ves que detecta un cambio en la nota 
        dispatch(setActiveNote(formState));
    }, [formState]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const fileInputRef = useRef();
    const onFileInputchange = ({ target }) => {
        if (target.files === 0) return;
        console.log('subiendo archivos');
        dispatch( startUploadingFiles( target.files ))
    };

    const onDelate = () =>{
        dispatch(startDeletingNote() );
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }} className="animate__animated animate__fadeIn animate__faster">
            <Grid item >
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <input type="file" multiple onChange={onFileInputchange} style={{ display: 'none ' }} ref={fileInputRef} />

                <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>
                <Button
                    disabled={isSaving}
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
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
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth multiline
                    placeholder="Que sucedio"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid>
                <Button
                    onClick= {onDelate}
                    sx={{ mt:2 }}
                    color= "error"
                    >
                    <DeleteOutline/>
                    Eliminar Nota
                </Button>
            </Grid>

            <ImageGallery images={ notaActiva.imagesUrls } />

        </Grid>
    )
}
