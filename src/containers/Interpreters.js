import React, { useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Context } from '../store';
import { deleteInterpreter } from '../mutations';
import { getInterpreters } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import DialogToAdd from '../components/DialogToAddInterpreter';
import DialogToDelete from '../components/DialogToDelete';
import DialogToUpdate from '../components/DialogToUpdateInterpreter';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Interpreters = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      return navigate('/iniciar-sesion', {replace: true});
    }
  }, [state, navigate]);

  const [interpreterToDelete, setInterpreterToDelete] = useState(null);
  const [interpreterToUpdate, setInterpreterToUpdate] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    data: items,
    error,
    isError,
    isLoading,
    refetch,
  } =useQuery('interpreters', getInterpreters);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenDeleteDialog = (itemId) => {
    setInterpreterToDelete(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (itemId) => {
    setInterpreterToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenUpdateDialog = (item) => {
    setInterpreterToUpdate(item);
  };

  const handleCloseUpdateDialog = (item) => {
    setInterpreterToUpdate(null);
  };

  const { mutate: mutateByDeleting } = useMutation(deleteInterpreter, {
    onSuccess: () => {
      refetch('interpreters');
      handleCloseDeleteDialog();
    },
  });

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Intérpretes</Typography>
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
                  ? <AlertInfo message="No hay intérpretes registrados" />
                  : <Table
                      columns={['ID', 'NOMBRE', 'F. DE DEBUT', 'F. DE NACIMIENTO', 'ACCIONES']}
                      handleDelete={handleOpenDeleteDialog}
                      handleEdit={handleOpenUpdateDialog}
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
                  itemId={interpreterToDelete}
                  open={openDeleteDialog}
                  title={`¿Estás seguro de eliminar el intérprete con ID=${interpreterToDelete}?`}
                />
                {
                  interpreterToUpdate?.length &&
                    <DialogToUpdate
                      handleClose={handleCloseUpdateDialog}
                      handleRefetch={refetch}
                      item={interpreterToUpdate}
                    />
                }
              </section>
            </>
      }
    </div>
  );
}

export default Interpreters;