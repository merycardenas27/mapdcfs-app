import * as React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function CustomAlertWarning({
  message = 'Esta es una alerta de advertencia.',
  strong = 'Échale un vistazo',
}) {
  return (
    <Alert severity="warning">
      <AlertTitle>Advertencia</AlertTitle>
      {message} — <strong>¡{strong}!</strong>
    </Alert>
  );
}
