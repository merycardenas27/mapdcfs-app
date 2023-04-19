import React from 'react';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';

import { getPhonograms } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from '../components/CustomLoader';
import Table from '../components/CustomTable';

const Phonograms = () => {
  const {
    data: phonograms,
    error,
    isError,
    isLoading,
  } =useQuery('phonograms', getPhonograms);

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
              <section className="body">
                {!phonograms.length
                  ? <AlertInfo message="No hay fonogramas registrados" />
                  : <Table
                      columns={['ID', 'TITULO', 'DURACIÓN (seg)', 'F. DE CREACIÓN', 'GÉNERO', 'OBRA MUSICAL', 'PRODUCTORA', 'ACCIONES']}
                      rows={phonograms}
                    />
                }
              </section>
            </>
      }
    </div>
  );
}

export default Phonograms;