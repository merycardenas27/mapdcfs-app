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
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { addMusicalWork } from '../mutations';

const types = ['Amor', 'Desamor', 'Lugar de Nacimiento', 'Mamá', 'Papá'];

export default function DialogToAddMusicalWork({
  handleClose,
  handleRefetch,
  open,
}) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { title: '', type: '' },
  });

  const { isLoading, mutate } = useMutation(addMusicalWork, {
    onSuccess: () => {
      handleRefetch('musicalWorks');
      handleClose();
      reset();
    },
  });

  const onSubmit = async ({ title, type }) => {
    mutate({ titulo: title, tipoobra: type });
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog className="form" onClose={handleClose} open={open}>
      <DialogTitle className="form-title">Agregar nueva obra musical</DialogTitle>
      <DialogContent className="form-content">
         <Box>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <TextField
                error={!!errors.title}
                fullWidth
                helperText={errors.title?.message}
                id="title"
                inputProps={{...register("title", { required: "Es requerido" })}}
                label="Título"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                defaultValue=""
                error={!!errors.type}
                fullWidth
                helperText={errors.type?.message}
                id="type"
                inputProps={{...register("type", { required: "Es requerido" })}}
                label="Tipo de Obra"
                required
                select
              >
                {types.map(genre => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)}
              </TextField>
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