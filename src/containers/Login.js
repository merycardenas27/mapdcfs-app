import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Context } from '../store';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { verifyAccount } from '../mutations';

import AlertError from '../components/CustomAlertError';

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
  },
  btnContainer: {
    textAlign: 'center',
  },
  formContainer: {
    width: '50%',
  },
};

const Login = () => {
  const [state, setState] = useContext(Context);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({
    email,
    password,
  }) => {
    const account = await verifyAccount({ correo: email, contraseña: password });

    if (!account.length) {
      setLoginError(true);
      reset();
      return null;
    }

    setLoginError(false);
    setState({
       ...state,
       isLogged: true,
       name: account[0][1],
       lastname: account[0][2]
    });

    return navigate('/', {replace: true});
  };

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Iniciar Sesión</Typography>
      </section>
      <section className="body" style={styles.body}>
        <Box id="login-form" sx={styles.formContainer}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <TextField
                error={!!errors.email}
                fullWidth
                helperText={errors.email?.message}
                id="email"
                inputProps={{ ...register("email", {
                  required: "Es requerido",
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Debe ser un correo válido',
                  }
                })}}
                label="Correo"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                error={!!errors.password}
                fullWidth
                helperText={errors.password?.message}
                id="password"
                inputProps={{ ...register("password", { required: "Es requerido" })}}
                label="Contraseña"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} sx={styles.btnContainer}>
              <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Iniciar sesión</Button>
            </Grid>
            {loginError &&
              <Grid item md={12}>
                <AlertError message="Usuario no registrado o contraseña inválida" />
              </Grid>
            }
          </Grid>
        </Box>
      </section>
    </div>
  );
};

export default Login;