import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import Typography from '@mui/material/Typography';

import { getMusicalWorks } from '../queries';
import { deleteMusicalWork } from '../mutations';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToDelete from '../components/DialogToDelete';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const MusicalWorks = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    data: items,
    error,
    isError,
    isLoading,
    refetch,
  } =useQuery('musicalWorks', getMusicalWorks);

  const handleOpenDeleteDialog = (itemId) => {
    setItemToDelete(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (itemId) => {
    setItemToDelete(null);
    setOpenDeleteDialog(false);
  };

  const { mutate: mutateByDeleting } = useMutation(deleteMusicalWork, {
    onSuccess: () => {
      refetch('musicalWorks');
      handleCloseDeleteDialog();
    },
  });

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Obras Musicales</Typography>
      </section>
      {isLoading
        ? <Loader />
        : isError
          ? <AlertError message={error.message} />
          : <>
              <section className="body">
                {!items.length
                  ? <AlertInfo message="No hay obras musicales registradas" />
                  : <Table
                      columns={['ID', 'TITULO', 'TIPO DE OBRA', 'ACCIONES']}
                      handleDelete={handleOpenDeleteDialog}
                      rows={items}
                    />
                }
              </section>
              <section className="dialogs">
                <DialogToDelete
                  handleClose={handleCloseDeleteDialog}
                  handleDelete={mutateByDeleting}
                  itemId={itemToDelete}
                  open={openDeleteDialog}
                  title={`¿Estás seguro de eliminar la obra musical con ID=${itemToDelete}?`}
                />
              </section>
            </>
      }
    </div>
  );
}

export default MusicalWorks;
