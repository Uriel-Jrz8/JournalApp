import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUser } from '../../store/auth/thunks';



    const formData= {
        email: '',
        password: '',
        displayName: '',
    }

    const formValidations = {
        email: [ ( value ) =>  value.includes('@') , 'El correo debe tener un @'],
        password: [ ( value ) =>  value.length >= 6 , 'El password debe tener más de 6 caracteres'],
        displayName: [ ( value ) =>  value.length >= 1 , 'El nombre es obligatorio'],        
    }

export const RegisterPage = () => { 

    const dispatch = useDispatch();
    const [formSubmitted, setformSubmitted] = useState(false);
    
    const { status, errorMessage } = useSelector( state => state.auth);
    const  isChekingAuthentication = useMemo( () => status === 'checking', [status] ); 


    const { formState, displayName, email, password, onInputChange,
            isFormValid, displayNameValid, emailValid, passwordValid,
        } = useForm(formData, formValidations);

    const onSubmitRegister = ( event ) => {
        event.preventDefault();
        setformSubmitted(true);
        if( !isFormValid ) return;
        console.log(formState);
        dispatch(startCreatingUser(formState));
    }


    return (
        <AuthLayout title='Crear una Cuenta'>
            <form onSubmit={ onSubmitRegister } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                        label="Nombre Completo"
                        type="text"
                        placeholder="Nombre Completo"
                        fullWidth
                        name="displayName"
                        value={ displayName }
                        onChange={onInputChange}
                        error= { !!displayNameValid && formSubmitted}
                        helperText = { displayNameValid }
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                        label="Correo Electronico"
                        type="email"
                        placeholder="correo@dominio.com"
                        fullWidth
                        name="email"
                        value={ email }
                        onChange={onInputChange}
                        error= { !!emailValid && formSubmitted }
                        helperText = { emailValid }
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                        label="Contraseña"
                        type="password"
                        placeholder="contraseña"
                        fullWidth
                        name="password"
                        value={ password }
                        onChange={onInputChange}
                        error= { !!passwordValid && formSubmitted }
                        helperText = { passwordValid }
                        >
                        </TextField>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={12} display={ !!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled = {isChekingAuthentication}
                                variant="contained"
                                fullWidth
                                type="submit"
                                >
                                <Typography>Crear Cuenta</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login"> {/* teniendo el estilo mediante <Link, para no causar conflicto se renombra Link del Router para usarlo */}
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
