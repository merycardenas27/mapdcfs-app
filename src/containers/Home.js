import React from 'react';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AudioFileIcon from '@mui/icons-material/AudioFile';
import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Home = () => {
  return (
    <div id="home" className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Menú de Opciones</Typography>
      </section>
      <section className="body">
        <Stack
          alignItems="center"
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          spacing={{ xs: 4, md: 2 }}
        >
          <Link to="interpretes/">
            <Button size="large" variant="contained" startIcon={<GroupsIcon />}>Intérpretes</Button>
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
      </section>
    </div>
  );
}

export default Home;