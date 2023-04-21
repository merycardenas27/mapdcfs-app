import React, { useState } from 'react';
import { useQuery } from 'react-query';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { getPhonograms } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToAdd from '../components/DialogToAddPhonogram';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Phonograms = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const {
    data: phonograms,
    error,
    isError,
    isLoading,
    refetch,
  } =useQuery('phonograms', getPhonograms);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Fonogramas</Typography>
      </section>
      { isLoading
        ? <Loader />
        : isError
          ? <AlertError message={error.message} />
          : <>
              <section className="actions">
                <Tooltip title="Agregar">
                  <IconButton aria-label="agregar" color="primary" onClick={handleOpenAddDialog}>
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
              </section>
              <section className="body">
                {!phonograms.length
                  ? <AlertInfo message="No hay fonogramas registrados" />
                  : <Table
                      columns={['ID', 'TITULO', 'DURACIÓN (seg)', 'F. DE CREACIÓN', 'GÉNERO', 'OBRA MUSICAL', 'PRODUCTORA', 'ACCIONES']}
                      rows={phonograms}
                    />
                }
              </section>
              <section className="dialogs">
                <DialogToAdd
                  handleClose={handleCloseAddDialog}
                  handleRefetch={refetch}
                  open={openAddDialog}
                />
              </section>
            </>
      }
    </div>
  );
}

export default Phonograms;