import * as React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function CustomAlertInfo({
  message = 'Esta es una alerta de información.',
  strong = 'Échale un vistazo',
}) {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      {message} — <strong>¡{strong}!</strong>
    </Alert>
  );
}

