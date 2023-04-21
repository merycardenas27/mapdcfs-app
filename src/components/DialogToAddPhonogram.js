import * as React from 'react';
import { useMutation, useQueries } from 'react-query';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { getGenres, getInterpreters, getMusicalWorks } from '../queries';
import { addPhonogram } from '../mutations';

import AlertError from './CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from './CustomLoader';

const today = dayjs().format('YYYY-MM-DD') ;
const queryList = [
  { key: ['genres', 1], fn: () => getGenres(), staleTime: Infinity },
  { key: ['interpreters', 2], fn: () => getInterpreters(), staleTime: Infinity },
  { key: ['musicalWorks', 3], fn: () => getMusicalWorks(), staleTime: Infinity },
];

const infoAlerts = [
  { key: 'GÉNERO', message: 'No hay GÉNEROS registrados.', strong: 'Contacta con tu administrador' },
  { key: 'INTÉRPRETES', message: 'No hay INTÉRPRETES registrados.', strong: 'Ir a registrar' },
  { key: 'OBRAS MUSICALES', message: 'No hay OBRAS MUSICALES registrados.', strong: 'Ir a registrar'}];

export default function DialogToAddPhonogram({
  handleClose,
  handleRefetch,
  open,
}) {
  const [
    { data: genres, error: genresError, isError: genresIsError, isLoading: genresIsLoading },
    { data: interpreters, error: interpretersError, isError: interpretersIsError, isLoading: interpretersIsLoding },
    { data: musicalWorks, error: musicalWorksError, isError: musicalWorksIsError, isLoading: musicalWorksIsLoding },
  ] = useQueries(queryList.map(query => ({ queryKey: query.key, queryFn: query.fn })));

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      createdAt: today,
      duration: '',
      genre: '',
      interpreter: '',
      musicalWork: '',
      title: '',
    },
  });

  const { isLoading, mutate } = useMutation(addPhonogram, {
    onSuccess: () => {
      handleRefetch('phonograms');
      handleClose();
      reset();
    },
  });

  const onSubmit = async ({
    createdAt,
    duration,
    genre,
    interpreter,
    musicalWork,
    title,
  }) => {
    mutate({
      duracion: Number(duration),
      fechacreacion: createdAt,
      genero: genre,
      interprete: interpreter,
      obramusical: musicalWork,
      titulo: title,
    });
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog className="form" onClose={handleClose} open={open}>
      <DialogTitle className="form-title">Agregar nuevo fonograma</DialogTitle>
      <DialogContent className="form-content">
      {genresIsLoading || interpretersIsLoding || musicalWorksIsLoding
        ? <Loader />
        : genresIsError || interpretersIsError || musicalWorksIsError
          ? <Stack spacing={2}>
            {[
                genresIsError && { key: 'GÉNERO', message: genresError.message },
                interpretersIsError && { key: 'INTÉRPRETE', message: interpretersError.message },
                musicalWorksIsError && { key: 'OBRA MUSICAL', message: musicalWorksError.message },
              ].map(({ key, ...errorAlert }) => <AlertError key={key} {...errorAlert} />)}
            </Stack>
          : !(genres.length && interpreters.length && musicalWorks.length)
            ? <Stack spacing={2}>
              {infoAlerts.map(({ key, ...infoAlert }) => <AlertInfo key={key} {...infoAlert} />)}
              </Stack>
            : <Box>
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
                  <Grid item md={6}>
                    <TextField
                      SelectProps={{...register("musicalWork", { required: "Es requerido" })}}
                      defaultValue=""
                      error={!!errors.musicalWork}
                      fullWidth
                      helperText={errors.musicalWork?.message}
                      id="musicalWork"
                      label="Obra Musical"
                      required
                      select
                    >
                    {musicalWorks.map(musicalWork => <MenuItem key={musicalWork[1]} value={musicalWork[0]}>{musicalWork[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      SelectProps={{...register("genre", { required: "Es requerido" })}}
                      defaultValue=""
                      error={!!errors.genre}
                      fullWidth
                      helperText={errors.genre?.message}
                      id="genre"
                      label="Género"
                      required
                      select
                    >
                      {genres.map(genre => <MenuItem key={genre[1]} value={genre[0]}>{genre[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      SelectProps={{...register("interpreter", { required: "Es requerido" })}}
                      defaultValue=""
                      error={!!errors.interpreter}
                      fullWidth
                      helperText={errors.interpreter?.message}
                      id="interpreter"
                      label="Intérprete"
                      required
                      select
                    >
                      {interpreters.map(interpreter => <MenuItem key={interpreter[1]} value={interpreter[0]}>{interpreter[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={!!errors.duration}
                      fullWidth
                      helperText={errors.duration?.message}
                      id="duration"
                      inputProps={{ ...register("duration", {
                        required: "Es requerido",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Debe ser un número entero',
                        }
                      })}}
                      label="Duración (Segundos)"
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={!!errors.createdAt}
                      fullWidth
                      helperText={errors.createdAt?.message}
                      id="createdAt"
                      inputProps={{...register("createdAt", { required: "Es requerido" })}}
                      label="Fecha de creación"
                      required
                      type="date"
                    />
                  </Grid>
                </Grid>
              </Box>
      }
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled={isLoading} type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
}
