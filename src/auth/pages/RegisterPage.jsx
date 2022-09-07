import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';



    const formData= {
        email: 'urieljuarez@gmail.com',
        password: '123456',
        displayName: 'Alexis Uriel',
    }

export const RegisterPage = () => { 

    const { displayName, email, password, onInputChange, formState } = useForm(formData);

    const onSubmitRegister = ( event ) => {
        event.preventDefault();
        console.log(formState)
    }



    return (
        <AuthLayout title='Crear una Cuenta'>
            <form onSubmit={ onSubmitRegister }>
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
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                        label="Correo"
                        type="email"
                        placeholder="correo@dominio.com"
                        fullWidth
                        name="email"
                        value={ email }
                        onChange={onInputChange}
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
                        >
                        </TextField>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button
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
