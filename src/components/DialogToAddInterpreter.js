import * as React from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { addInterpreter } from '../mutations';

const today = dayjs().format('YYYY-MM-DD') ;

export default function DialogToAddInterpreter({
  handleClose,
  handleRefetch,
  open,
}) {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      birthday: today,
      debut: today,
      facebook: '',
      instagram: '',
      name: '',
      tiktok: '',
      twitter: '',
      youtube: '',
    },
  });

  const { isLoading, mutate } = useMutation(addInterpreter, {
    onSuccess: () => {
      handleRefetch('interpreters');
      handleClose();
      reset();
    },
  });

  const onSubmit = async ({
    birthday,
    debut,
    name,
    ...data
  }) => {
    mutate({
      nombre: name,
      fechanacimiento: birthday,
      fechadebut: debut,
      ...data,
    });
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog className="form" onClose={handleClose} open={open}>
      <DialogTitle className="form-title">Agregar nuevo intérprete</DialogTitle>
      <DialogContent className="form-content">
         <Box>
          <Grid container spacing={2}>
            <Grid item md={12}>
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
                error={!!errors.debut}
                fullWidth
                helperText={errors.debut?.message}
                id="debut"
                inputProps={{...register("debut", { required: "Es requerido" })}}
                label="Fecha del debut"
                required
                type="date"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                error={!!errors.birthday}
                fullWidth
                helperText={errors.birthday?.message}
                id="birthday"
                inputProps={{...register("birthday", {
                  required: "Es requerido",
                  validate: birthday => getValues()['debut'] > birthday || 'Debe ser antes que el debut',
                })}}
                label="Fecha de nacimiento"
                required
                type="date"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="twitter"
                inputProps={{...register("twitter")}}
                label="Twitter"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="facebook"
                inputProps={{...register("facebook")}}
                label="Facebook"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="instagram"
                inputProps={{...register("instagram")}}
                label="Instagram"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="youtube"
                inputProps={{...register("youtube")}}
                label="Youtube"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="tiktok"
                inputProps={{...register("tiktok")}}
                label="Tiktok"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled={isLoading} type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
}