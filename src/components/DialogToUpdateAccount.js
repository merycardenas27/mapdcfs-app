import * as React from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { updateAccount } from '../mutations';

export default function DialogToAddAccount({
  handleClose,
  handleRefetch,
  item,
}) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: item[1],
      lastname: item[2],
      email: item[3],
      password: item[4],
    },
  });

  const { mutate } = useMutation(updateAccount, {
    onSuccess: () => {
      handleClose();
      handleRefetch('accounts');
      reset();
    },
  });

  const onSubmit = async ({
    name,
    lastname,
    email,
    password,
  }) => {
    mutate({
      Id_Cuenta: item[0],
      nombre: name,
      apellido: lastname,
      correo: email,
      contraseña: password,
    });
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog className="form" onClose={handleClose} open>
      <DialogTitle className="form-title">Editar cuenta</DialogTitle>
      <DialogContent className="form-content">
         <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                error={!!errors.name}
                fullWidth
                helperText={errors.name?.message}
                id="name"
                inputProps={{...register("name", { required: "Es requerido" })}}
                label="Nombre"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                error={!!errors.lastname}
                fullWidth
                helperText={errors.lastname?.message}
                id="lastname"
                inputProps={{...register("lastname", { required: "Es requerido" })}}
                label="Apellido"
                required
                variant="outlined"
              />
            </Grid>
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
                inputProps={{ ...register("password", {
                  required: "Es requerido",
                  pattern: {
                    value: /^[a-z0-9_-]{6}$/,
                    message: 'Debe tener 6 caracteres',
                  }
                })}}
                label="Contraseña"
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}