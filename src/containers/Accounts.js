import React, { useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Context } from '../store';
import { deleteAccount } from '../mutations';
import { getAccounts } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToAdd from '../components/DialogToAddAccount';
import DialogToDelete from '../components/DialogToDelete';
import DialogToUpdate from '../components/DialogToUpdateAccount';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Accounts = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      return navigate('/iniciar-sesion', {replace: true});
    }
  }, [state, navigate]);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    data: items,
    error,
    isError,
    isLoading,
    refetch,
  } =useQuery('accounts', getAccounts);

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

  const handleOpenUpdateDialog = (item) => {
    setItemToUpdate(item);
  };

  const handleCloseUpdateDialog = (item) => {
    setItemToUpdate(null);
  };

  const { mutate: mutateByDeleting } = useMutation(deleteAccount, {
    onSuccess: () => {
      refetch('accounts');
      handleCloseDeleteDialog();
    },
  });

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Cuentas</Typography>
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
                {!items.length
                  ? <AlertInfo message="No hay cuentas registradas" />
                  : <Table
                      columns={['ID', 'NOMBRE', 'APELLIDO', 'CORREO', 'CONTRASEÑA', 'ACCIONES']}
                      handleDelete={handleOpenDeleteDialog}
                      handleEdit={handleOpenUpdateDialog}
                      rows={items.map((row) => row.filter((cell, index) => index !== 5 && cell))}
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
                  title={`¿Estás seguro de eliminar la cuenta con ID=${itemToDelete}?`}
                />
                {itemToUpdate?.length &&
                  <DialogToUpdate
                    handleClose={handleCloseUpdateDialog}
                    handleRefetch={refetch}
                    item={itemToUpdate}
                  />
                }
              </section>
            </>
      }
    </div>
  );
}

export default Accounts;
