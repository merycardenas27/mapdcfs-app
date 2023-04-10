import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const today = dayjs().format('YYYY-MM-DD') ;
const styles = {
  btn: {
    marginTop: '32px'
  },
  form: {
    margin: '0 auto',
    width: '50%',
  }
};

const Form = () => {
  const [interprete, setInterprete] = useState(undefined);

  const {
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      txt_nombre: '',
      date_debut: today,
      date_nacimiento: today,
      txt_twitter: '',
      txt_facebook: '',
      txt_instagram: '',
      txt_youtube: '',
      txt_tiktok: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('formulario completado', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={styles.form}
    >
      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextField
            id="txt_nombre"
            label="Nombre"
            variant="outlined"
            inputProps={{...register("txt_nombre")}}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            id="date_debut" 
            label="Fecha del debut"
            type="date"
            inputProps={{...register("date_debut")}}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            id="date_nacimiento" 
            label="Fecha de nacimiento"
            type="date"
            inputProps={{...register("date_nacimiento")}}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
          id="txt_twitter"
          label="Twitter"
          variant="outlined"
          inputProps={{...register("txt_twitter")}}
          fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
          id="txt_facebook"
          label="Facebook"
          variant="outlined"
          inputProps={{...register("txt_facebook")}}
          fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            id="txt_instagram"
            label="Instagram"
            variant="outlined"
            inputProps={{...register("txt_instagram")}}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            id="txt_youtube"
            label="Youtube"
            variant="outlined"
            inputProps={{...register("txt_youtube")}}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            id="txt_tiktok"
            label="Tiktok"
            variant="outlined"
            inputProps={{...register("txt_tiktok")}}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button
        id="btn_registrar"
        variant="contained" 
        type="submit"
        sx={styles.btn}
      >
        Registrar
      </Button>
    </form>
  );
}

export default Form;