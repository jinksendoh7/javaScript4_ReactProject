
import {useState} from 'react'
import { Dialog, Button, DialogTitle, DialogActions, DialogContent,DialogContentText} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function ModalElement ({title,isOpen, handleCloseModal, element, isSaveForm}){
  const [open, setOpen] = useState(isOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 
  const handleClose = () => {
    setOpen(false);
    handleCloseModal();
  };
  return (
    <>
     
     <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          
            {element}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}