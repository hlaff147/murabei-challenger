// components/EditAuthor.js
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { editAuthorApi } from '../../api/author/authorApi';

function EditAuthor({ open, handleClose, author, onAuthorEdited }) {
  const [editedAuthor, setEditedAuthor] = useState({
    name: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    if (author) {
      setEditedAuthor({
        ...author,
      });
    }
  }, [author]);

  const handleSave = () => {
    if (editedAuthor) {
      editAuthorApi(editedAuthor.id, editedAuthor).then(() => {
        handleClose();
        onAuthorEdited();
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Author</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Author Name"
          type="text"
          fullWidth
          value={editedAuthor ? editedAuthor.name : ''}
          onChange={(e) => setEditedAuthor({ ...editedAuthor, name: e.target.value })}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={editedAuthor ? editedAuthor.email : ''}
          onChange={(e) => setEditedAuthor({ ...editedAuthor, email: e.target.value })}
        />
        <TextField
          margin="dense"
          id="age"
          label="Age"
          type="number"
          fullWidth
          value={editedAuthor ? editedAuthor.age : ''}
          onChange={(e) => setEditedAuthor({ ...editedAuthor, age: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAuthor;
