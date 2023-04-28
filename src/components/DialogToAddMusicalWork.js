import * as React from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { uploadFile } from 'react-s3';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { addMusicalWork } from '../mutations';
import {
  S3_BUCKET,
  REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
} from '../credentials';

const config = {
  accessKeyId: ACCESS_KEY,
  bucketName: S3_BUCKET,
  region: REGION,
  secretAccessKey: SECRET_ACCESS_KEY,
}

const types = ['Amor', 'Desamor', 'Lugar de Nacimiento', 'Mamá', 'Papá'];
const filePattern = /([a-zA-Z0-9\s_\\.\-:()])+(.txt|.TXT)$/;

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
    watch,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      file: '',
      title: '',
      type: '',
    },
  });

  const selectedFile = watch('file');

  const { isLoading, mutate } = useMutation(addMusicalWork, {
    onSuccess: () => {
      handleRefetch('musicalWorks');
      handleClose();
      reset();
    },
  });

  const onSubmit = async ({ file, title, type }) => {
    uploadFile(file[0], config)
    // .then(data => console.log(data))
    .then(() => mutate({ titulo: title, tipoobra: type }))
    .catch(err => console.error(err));
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
                inputProps={{...register('title', { required: 'Es requerido' })}}
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
                inputProps={{...register('type', { required: 'Es requerido' })}}
                label="Tipo de Obra"
                required
                select
              >
                {types.map(genre => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item md={12}>
              <label htmlFor="file">
                <input
                  accept=".txt"
                  id="file"
                  style={{ display: 'none' }}
                  type="file"
                  {...register('file', {
                    required: 'Es requerido',
                    validate: (value) => {
                      const { name } = value[0];
                      return filePattern.test(name) || 'Debe ser un archivo .txt';
                    }
                  })}
                />
                <Button color="secondary" variant="contained" component="span" startIcon={<UploadFileIcon />}>
                  Letra musical
                </Button>
              </label>
              <FormHelperText component="span" error={!!errors.file}   sx={{marginLeft: '8px'}}>
                {errors.file
                  ? errors.file.message
                  : selectedFile && selectedFile[0]
                    ? selectedFile[0].name
                    : 'Subir archivo .txt'}
              </FormHelperText>
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