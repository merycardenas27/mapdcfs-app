import React from 'react';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';

import { getCollections } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Collections = () => {
  const {
    data: collections,
    error,
    isError,
    isLoading,
  } =useQuery('collections', getCollections);

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
              <section className="body">
                {!collections.length
                  ? <AlertInfo message="No hay obras musicales registradas" />
                  : <Table
                      columns={['ID', 'N° DE DESCARGAS', 'N° DE STREAMS', 'MONTO', 'PLATAFORMA STREAMING', 'FONOGRAMA', 'ACCIONES']}
                      rows={collections}
                    />
                }
              </section>
            </>
      }
    </div>
  );
}

export default Collections;