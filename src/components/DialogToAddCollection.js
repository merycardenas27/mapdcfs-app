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

import { getPhonograms, getPlatforms } from '../queries';
import { addCollection } from '../mutations';

import AlertError from './CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from './CustomLoader';

const queryList = [
  { key: ['phonograms', 1], fn: () => getPhonograms(), staleTime: Infinity },
  { key: ['platforms', 2], fn: () => getPlatforms(), staleTime: Infinity },
];

const infoAlerts = [
  { key: 'FONOGRAMAS', message: 'No hay FONOGRAMAS registrados.', strong: 'Ir a registrar' },
  { key: 'PLATAFORMAS', message: 'No hay PLATAFORMAS DE STREAMINGS registradas.', strong: 'Contacta con tu administrador' }];

export default function DialogToAddCollection({
  handleClose,
  handleRefetch,
  open,
}) {
  const [
    { data: phonograms, error: phonogramsError, isError: phonogramsIsError, isLoading: phonogramsIsLoading },
    { data: platforms, error: platformsError, isError: platformsIsError, isLoading: platformsIsLoding },
  ] = useQueries(queryList.map(query => ({ queryKey: query.key, queryFn: query.fn })));

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      amount: '',
      downloads: '',
      phonogram: '',
      platform: '',
      streams: '',
    },
  });

  const { isLoading, mutate } = useMutation(addCollection, {
    onSuccess: () => {
      handleRefetch('collections');
      handleClose();
      reset();
    },
  });

  const onSubmit = async ({
    amount,
    downloads,
    phonogram,
    platform,
    streams,
  }) => {
    mutate({
      fonograma: phonogram,
      monto: parseFloat(amount, 2),
      ndescargas: Number(downloads),
      nstreams: Number(streams),
      plataforma: platform,
    });
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog className="form" onClose={handleClose} open={open}>
      <DialogTitle className="form-title">Agregar nueva recaudación</DialogTitle>
      <DialogContent className="form-content">
      {phonogramsIsLoading || platformsIsLoding
        ? <Loader />
        : phonogramsIsError || platformsIsError
          ? <Stack spacing={2}>
            {[
                phonogramsIsError && { key: 'FONOGRAMAS', message: phonogramsError.message },
                platformsIsError && { key: 'PLATAFORMAS', message: platformsError.message },
              ].map(({ key, ...errorAlert }) => <AlertError key={key} {...errorAlert} />)}
            </Stack>
          : !(phonograms.length && platforms.length)
            ? <Stack spacing={2}>
              {infoAlerts.map(({ key, ...infoAlert }) => <AlertInfo key={key} {...infoAlert} />)}
              </Stack>
            : <Box>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <TextField
                      SelectProps={{...register("phonogram", { required: "Es requerido" })}}
                      defaultValue=""
                      error={!!errors.phonogram}
                      fullWidth
                      helperText={errors.phonogram?.message}
                      id="phonogram"
                      label="Fonograma"
                      required
                      select
                    >
                      {phonograms.map(phonogram => <MenuItem key={phonogram[1]} value={phonogram[0]}>{phonogram[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      SelectProps={{...register("platform", { required: "Es requerido" })}}
                      defaultValue=""
                      error={!!errors.platform}
                      fullWidth
                      helperText={errors.platform?.message}
                      id="platform"
                      label="Plataforma de streaming"
                      required
                      select
                    >
                      {platforms.map(platform => <MenuItem key={platform[1]} value={platform[0]}>{platform[1]}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={!!errors.streams}
                      fullWidth
                      helperText={errors.streams?.message}
                      id="streams"
                      inputProps={{ ...register("streams", {
                        required: "Es requerido",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Debe ser un número entero',
                        }
                      })}}
                      label="N° de streams"
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={!!errors.downloads}
                      fullWidth
                      helperText={errors.downloads?.message}
                      id="downloads"
                      inputProps={{ ...register("downloads", {
                        required: "Es requerido",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Debe ser un número entero',
                        }
                      })}}
                      label="N° de descargas"
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={!!errors.amount}
                      fullWidth
                      helperText={errors.amount?.message}
                      id="amount"
                      inputProps={{ ...register("amount", {
                        required: "Es requerido",
                        pattern: {
                          value: /^[0-9]*\.[0-9]{2}$/,
                          message: 'Debe ser un número con 2 decimales',
                        }
                      })}}
                      label="Monto total (soles)"
                      required
                      variant="outlined"
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
