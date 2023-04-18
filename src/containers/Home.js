import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Context } from '../store';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StarIcon from '@mui/icons-material/Star';

const Home = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      return navigate('/iniciar-sesion', {replace: true});
    }
  }, [state, navigate]);

  return (
    <div id="home" className="view">
      <section className="head">
        <Typography variant="h3" gutterBottom>{`Bienvenido ${state.name} al sistema predictor de canciones exitosas`}</Typography>
      </section>
      <section className="body">
        <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack
                  alignItems="center"
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                  spacing={{ xs: 4, md: 2 }}
                >
                  <Link to="interpretes/">
                    <Button size="large" variant="contained" startIcon={<InterpreterModeIcon />}>Intérpretes</Button>
                  </Link>
                  <Link to="obras-musicales/">
                    <Button size="large" variant="contained" startIcon={<AudioFileIcon />}>Obras Musicales</Button>
                  </Link>
                  <Link to="fonogramas/">
                    <Button size="large" variant="contained" startIcon={<MusicNoteIcon />}>Fonogramas</Button>
                  </Link>
                  <Link to="recaudaciones/">
                    <Button size="large" variant="contained" startIcon={<MonetizationOnIcon />}>Recaudaciones</Button>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  alignItems="center"
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                  spacing={{ xs: 4, md: 2 }}
                >
                  <Link to="ranking/">
                    <Button size="large" variant="contained" startIcon={<AssessmentIcon />}>Ranking</Button>
                  </Link>
                  <Link to="potenciales-exitos/">
                    <Button size="large" variant="contained" startIcon={<StarIcon />}>Potenciales éxitos</Button>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  alignItems="center"
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                  spacing={{ xs: 4, md: 2 }}
                >
                  <Link to="cuentas/">
                    <Button color="secondary" size="large" variant="contained" startIcon={<AdminPanelSettingsIcon />}>Cuentas</Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
        </Box>
      </section>
    </div>
  );
}

export default Home;