import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TableViewIcon from '@mui/icons-material/TableView';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Context } from '../store';
import ConverToObjectArray from '../utils/convertToObjectArray';

import Table from '../components/PotentialProccessTable';

const filePattern = /([a-zA-Z0-9\s_\\.\-:()])+(.xls|.XLS|.xlsx|.XLSX)$/;

const PotentialSuccesses = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      return navigate('/iniciar-sesion', {replace: true});
    }
  }, [state, navigate]);

  const [sheets, setSheets] = useState(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { file: '' },
  });

  const selectedFile = watch('file');

  const onSubmit = async ({ file }) => {
    const selectedSheets = await ConverToObjectArray(file[0]);
    setSheets(selectedSheets);
    reset();
  };

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Potenciales Éxitos</Typography>
      </section>
      <section className="actions">
        <Grid container spacing={2}>
          <Grid item md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label htmlFor="file">
              <input
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                id="file"
                style={{ display: 'none' }}
                type="file"
                {...register('file', {
                  required: 'Es requerido',
                  validate: (value) => {
                    const { name } = value[0];
                    return filePattern.test(name) || 'Debe ser un archivo: .xlsx, .xls';
                  }
                })}
              />
              <Button
                color="secondary"
                component="span"
                size="large"
                startIcon={<UploadFileIcon />}
                variant="contained"
              >
                Nuevos Lanzamientos
              </Button>
            </label>
            <FormHelperText component="span" error={!!errors.file}   sx={{marginLeft: '8px'}}>
              {errors.file
                ? errors.file.message
                : selectedFile && selectedFile[0]
                  ? selectedFile[0].name
                  : 'Subir archivo .xlsx, .xls'}
            </FormHelperText>
          </Grid>
          <Grid item md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              disabled={!!errors.file}
              onClick={handleSubmit(onSubmit)}
              size="large"
              startIcon={<TableViewIcon />}
              type="submit"
              variant="contained"
            >
              Generar predicción
            </Button>
          </Grid>
        </Grid>
      </section>
      <section className="body">
        {sheets?.length && <Table rows={sheets[0]} />}
      </section>
    </div>
  );
};

export default PotentialSuccesses;