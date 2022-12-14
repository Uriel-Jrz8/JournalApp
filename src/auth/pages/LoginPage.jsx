import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
    email:'',
    password:''
}

export const LoginPage = () => {

    
    const { status,errorMessage } = useSelector( state => state.auth);
    
    const dispatch = useDispatch();
    
    const { email, password, onInputChange, formState } = useForm(formData);

    const isAutenthicate = useMemo( () => status === 'checking', [status]) //guardadon el valor de autenticacion si esta login o no 

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch( startLoginWithEmailPassword(formState));
    }

    const onGoogleSigIn = () =>{
        console.log('login con Google');
        dispatch(startGoogleSignIn());
    }


    return (

        <AuthLayout title='Login'>

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo"
                            type="email"
                            placeholder="correo@dominio.com"
                            name="email"
                            fullWidth
                            value={email}
                            onChange={onInputChange}
                            autoComplete="off"
                            >
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña"
                            type="password"
                            placeholder="contraseña"
                            name="password"
                            fullWidth
                            value={password}
                            onChange={onInputChange}
                            autoComplete="off"
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} display={ !!errorMessage ? '' : 'none'}>
                    <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth type="submit" disabled={isAutenthicate}>
                                <Typography>Iniciar Sesión</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth onClick={ onGoogleSigIn } disabled={isAutenthicate}>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register"> {/* teniendo el estilo mediante <Link, para no causar conflicto se renombra Link del Router para usarlo */}
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
