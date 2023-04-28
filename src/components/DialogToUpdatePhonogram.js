import * as React from 'react';
import { useMutation, useQueries } from 'react-query';
import { useForm } from 'react-hook-form';

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

import { getGenres, getInterpreterPhonogram, getInterpreters, getMusicalWorks } from '../queries';
import { updatePhonogram } from '../mutations';

import AlertError from './CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from './CustomLoader';

const infoAlerts = [
  { key: 'INTÉRPRETE FONOGRAMA', message: 'No hay un INTÉRPRETE asociado a este FONOGRAMA.', strong: 'Ir a registrar' },
  { key: 'GÉNERO', message: 'No hay GÉNEROS registrados.', strong: 'Contacta con tu administrador' },
  { key: 'INTÉRPRETES', message: 'No hay INTÉRPRETES registrados.', strong: 'Ir a registrar' },
  { key: 'OBRAS MUSICALES', message: 'No hay OBRAS MUSICALES registrados.', strong: 'Ir a registrar'}];

export default function DialogToUpdatePhonogram({
  handleClose,
  handleRefetch,
  item,
}) {
  const queryList = [
    { key: ['interpreter-pronogram', 1], fn: () => getInterpreterPhonogram(item[0]), staleTime: Infinity },
    { key: ['genres', 1], fn: () => getGenres(), staleTime: Infinity },
    { key: ['interpreters', 2], fn: () => getInterpreters(), staleTime: Infinity },
    { key: ['musicalWorks', 3], fn: () => getMusicalWorks(), staleTime: Infinity },
  ];

  const [
    { data: interpreterPhonogram, error: interpreterPhonogramError, isError: interpreterPhonogramIsError, isLoading: interpreterPhonogramIsLoading, remove },
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
      createdAt: item[3],
      duration: item[2],
      title: item[1],
    },
  });

  const { isLoading, mutate } = useMutation(updatePhonogram, {
    onSuccess: () => {
      handleRefetch('phonograms');
      handleClose();
      remove('interpreter-pronogram');
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
      Id_Fonograma: item[0],
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
    remove('interpreter-pronogram');
    reset();
  };

  return (
    <Dialog className="form" onClose={handleClose} open>
      <DialogTitle className="form-title">Modificar fonograma</DialogTitle>
      <DialogContent className="form-content">
      {interpreterPhonogramIsLoading || genresIsLoading || interpretersIsLoding || musicalWorksIsLoding
        ? <Loader />
        : interpreterPhonogramIsError || genresIsError || interpretersIsError || musicalWorksIsError
          ? <Stack spacing={2}>
            {[
                interpreterPhonogramIsError && { key: 'INTÉRPRETE FONOGRAMA', message: interpreterPhonogramError.message },
                genresIsError && { key: 'GÉNERO', message: genresError.message },
                interpretersIsError && { key: 'INTÉRPRETE', message: interpretersError.message },
                musicalWorksIsError && { key: 'OBRA MUSICAL', message: musicalWorksError.message },
              ].map(({ key, ...errorAlert }) => <AlertError key={key} {...errorAlert} />)}
            </Stack>
          : !(interpreterPhonogram.length && genres.length && interpreters.length && musicalWorks.length)
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
                      defaultValue={item[5]}
                      error={!!errors.musicalWork}
                      fullWidth
                      helperText={errors.musicalWork?.message}
                      id="musicalWork"
                      inputProps={{...register("musicalWork", { required: "Es requerido" })}}
                      label="Obra Musical"
                      required
                      select
                    >
                    {musicalWorks.map(musicalWork => <MenuItem key={musicalWork[1]} value={musicalWork[0]}>{musicalWork[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      defaultValue={item[4]}
                      error={!!errors.genre}
                      fullWidth
                      helperText={errors.genre?.message}
                      id="genre"
                      inputProps={{...register("genre", { required: "Es requerido" })}}
                      label="Género"
                      required
                      select
                    >
                      {genres.map(genre => <MenuItem key={genre[1]} value={genre[0]}>{genre[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      defaultValue={interpreterPhonogram[0][1]}
                      error={!!errors.interpreter}
                      fullWidth
                      helperText={errors.interpreter?.message}
                      id="interpreter"
                      inputProps={{...register("interpreter", { required: "Es requerido" })}}
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
