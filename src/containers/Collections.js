import React, { useState } from 'react';
import { useQuery } from 'react-query';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { getCollections } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToAdd from '../components/DialogToAddCollection';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Collections = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const {
    data: collections,
    error,
    isError,
    isLoading,
    refetch,
  } =useQuery('collections', getCollections);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Recaudaciones</Typography>
      </section>
      {isLoading
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
                {!collections.length
                  ? <AlertInfo message="No hay obras musicales registradas" />
                  : <Table
                      columns={['ID', 'N° DE DESCARGAS', 'N° DE STREAMS', 'MONTO', 'PLATAFORMA STREAMING', 'FONOGRAMA', 'ACCIONES']}
                      rows={collections}
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

export default Collections;