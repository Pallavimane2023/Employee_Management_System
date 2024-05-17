import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const AlertDialog = ({isOpen,onCancel,onConfirm,message})=> {
 

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialog;