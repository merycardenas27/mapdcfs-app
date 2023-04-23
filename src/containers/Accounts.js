import React from 'react';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';

import { getAccounts } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Accounts = () => {
  const {
    data: items,
    error,
    isError,
    isLoading,
  } =useQuery('accounts', getAccounts);

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
              <section className="body">
                {!items.length
                  ? <AlertInfo message="No hay cuentas registradas" />
                  : <Table
                      columns={['ID', 'NOMBRE', 'APELLIDO', 'CORREO', 'CONTRASEÑA', 'PRODUCTORA', 'ACCIONES']}
                      rows={items}
                    />
                }
              </section>
            </>
      }
    </div>
  );
}

export default Accounts;
