import React, { useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Context } from '../store';
import { deleteMusicalWork } from '../mutations';
import { getMusicalWorks } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToAdd from '../components/DialogToAddMusicalWork';
import DialogToDelete from '../components/DialogToDeleteMusicalWork';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const MusicalWorks = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      return navigate('/iniciar-sesion', {replace: true});
    }
  }, [state, navigate]);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    data: items,
    error,
    isError,
    isLoading,
    refetch,
  } =useQuery('musicalWorks', getMusicalWorks);

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
              <section className="actions">
                <Tooltip title="Agregar">
                  <IconButton aria-label="agregar" color="primary" onClick={handleOpenAddDialog}>
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
              </section>
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
                  title={`¿Estás seguro de eliminar la obra musical con ID=${itemToDelete}?`}
                />
              </section>
            </>
      }
    </div>
  );
}

export default MusicalWorks;
