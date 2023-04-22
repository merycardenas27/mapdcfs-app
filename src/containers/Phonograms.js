import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { deletePhonogram } from '../mutations';
import { getPhonograms } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToAdd from '../components/DialogToAddPhonogram';
import DialogToDelete from '../components/DialogToDelete';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Phonograms = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  const handleOpenDeleteDialog = (itemId) => {
    setItemToDelete(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (itemId) => {
    setItemToDelete(null);
    setOpenDeleteDialog(false);
  };

  const { mutate: mutateByDeleting } = useMutation(deletePhonogram, {
    onSuccess: () => {
      refetch('phonograms');
      handleCloseDeleteDialog();
    },
  });

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
                      handleDelete={handleOpenDeleteDialog}
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
                <DialogToDelete
                  handleClose={handleCloseDeleteDialog}
                  handleDelete={mutateByDeleting}
                  itemId={itemToDelete}
                  open={openDeleteDialog}
                  title={`¿Estás seguro de eliminar el fonograma con ID=${itemToDelete}?`}
                />
              </section>
            </>
      }
    </div>
  );
}

export default Phonograms;