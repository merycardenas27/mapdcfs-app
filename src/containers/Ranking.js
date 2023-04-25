import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TableViewIcon from '@mui/icons-material/TableView';

import { Context } from '../store';
import { getRanking } from '../queries';

import AlertError from '../components/CustomAlertError';
import AlertInfo from '../components/CustomAlertInfo';
import Loader from '../components/CustomLoader';
import Table from '../components/RankingTable';

const Ranking = () => {
  const [state] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      return navigate('/iniciar-sesion', {replace: true});
    }
  }, [state, navigate]);

  const [items, setItems] = useState(null);
  const [showRanking, setShowRanking] = useState(false);

  const {
    data,
    error,
    isError,
    isLoading,
  } =useQuery('ranking', getRanking);


  const handleClick = async () => {
    setItems(data);
    setShowRanking(true);
  };

  return (
    <div className="view">
      <section className="head">
        <Typography variant="h1" gutterBottom>Ranking Musical</Typography>
      </section>
      <section className="actions" style={{ textAlign: 'center' }}>
        <Button size="large" variant="contained" startIcon={<TableViewIcon />} onClick={handleClick}>Generar Ranking</Button>
      </section>
      <section className="body">
        {showRanking
          ? isLoading
            ? <Loader />
            : isError
              ? <AlertError message={error.message} />
              : Array.isArray(items)
                ? !items.length
                  ? <AlertInfo message="No hay fonogramas registrados con su respectiva recaudación." />
                  : <Table rows={items} />
                : ''
          : ''
        }
      </section>
    </div>
  );
};

export default Ranking;