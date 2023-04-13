import * as React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function CustomAlertError({
  message = 'Esta es una alerta de error.',
  strong = 'Échale un vistazo',
}) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message} — <strong>¡{strong}!</strong>
    </Alert>
  );
}
