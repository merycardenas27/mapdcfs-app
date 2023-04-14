import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { getInterpreterProfiles } from '../queries';
import { updateInterpreter } from '../mutations';

import AlertError from './CustomAlertError';
import Loader from './CustomLoader';

export default function DialogToUpdateInterpreter({
  handleClose,
  handleRefetch,
  item: interpreter,
  open,
}) {
  const {
    data: profiles,
    error,
    isError,
    isLoading,
    remove,
  } = useQuery('interpreter-profiles', () => getInterpreterProfiles(interpreter[0]));

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      debut: interpreter[2],
      birthday: interpreter[3],
      name: interpreter[1],
    },
  });

  const { mutate } = useMutation(updateInterpreter, {
    onSuccess: () => {
      handleRefetch('interpreters');
      handleClose();
      remove('interpreter-profiles');
      reset();
    },
  });

  const onSubmit = async (editedInterpreter) => {
    const {
      birthday,
      debut,
      name,
      ...data
    } = editedInterpreter;

    mutate({
      Id_Interprete: interpreter[0],
      fechadebut: debut,
      fechanacimiento: birthday,
      nombre: name,
      ...data,
    });
  };

  const onCancel = () => {
    handleClose();
    reset();
    remove('interpreter-profiles');
  };

return (
  <Dialog className="form" onClose={handleClose} open>
    <DialogTitle className="form-title">Agregar nuevo intérprete</DialogTitle>
    <DialogContent className="form-content">
    {isLoading
      ? <Loader />
      : isError
        ? <AlertError error={error} />
        : (
          <Box>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  error={!!errors.name}
                  fullWidth
                  helperText={errors.name?.message}
                  id="name"
                  inputProps={{...register("name", { required: "Nombre es requerido" })}}
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
                  inputProps={{...register("debut", { required: "Fecha del debut es requerido" })}}
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
                    required: "Fecha de nacimiento es requerido",
                    validate: birthday => getValues()['debut'] > birthday || 'Nacimiento debe ser menor que debut',
                  })}}
                  label="Fecha de nacimiento"
                  required
                  type="date"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="twitter"
                  label="Twitter"
                  defaultValue={profiles[0]?.length && profiles[0][1]}
                  variant="outlined"
                  inputProps={{ ...register("twitter")}}
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="facebook"
                  label="Facebook"
                  defaultValue={profiles[1]?.length && profiles[1][1]}
                  variant="outlined"
                  inputProps={{...register("facebook")}}
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="instagram"
                  label="Instagram"
                  defaultValue={profiles[2]?.length && profiles[2][1]}
                  variant="outlined"
                  inputProps={{...register("instagram")}}
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="youtube"
                  label="Youtube"
                  defaultValue={profiles[3]?.length && profiles[3][1]}
                  variant="outlined"
                  inputProps={{...register("youtube")}}
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="tiktok"
                  label="Tiktok"
                  defaultValue={profiles[4]?.length && profiles[4][1]}
                  variant="outlined"
                  inputProps={{...register("tiktok")}}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        )
    }
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button
        disabled={isLoading || isError}
        onClick={handleSubmit(onSubmit)}
        type="submit"
        variant="contained"
      >
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
);
}