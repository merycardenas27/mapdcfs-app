import React from 'react';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';

import { getMusicalWorks } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const MusicalWorks = () => {
  const {
    data: items,
    error,
    isError,
    isLoading,
  } =useQuery('musicalWorks', getMusicalWorks);

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
                      rows={items}
                    />
                }
              </section>
            </>
      }
    </div>
  );
}

export default MusicalWorks;
