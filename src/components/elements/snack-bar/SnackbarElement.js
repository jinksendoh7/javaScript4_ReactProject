import { useState } from 'react'
import { Snackbar, Button, Slide } from '@mui/material';

export default function SnackbarElement({ isOpen, message }) {
  const [open, setOpen] = useState(isOpen);

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        TransitionComponent={SlideTransition}
        message={message}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        action={
          <Button color="warning" size="small" sx={{ ml: 5 }} onClick={() => setOpen(false)}>
            Dismiss
          </Button>
        }
      />
    </div>
  );
}