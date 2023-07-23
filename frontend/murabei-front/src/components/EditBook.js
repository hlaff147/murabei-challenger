// components/EditBook.js
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { editBookApi } from '../api/book/bookApi';
import { fetchAuthors } from '../api/author/authorApi';
import { fetchSubjectsApi } from '../api/subjects/subjectsApi';

function EditBook({ open, handleClose, book, fetchBook }) {
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editedBook, setEditedBook] = useState({
    name: '',
    author: '',
    subjects: []
  });


  useEffect(() => {
    if (book) {
      setEditedBook({
        ...book,
        author: book.author.id,
        subjects: book.subjects.map((subject) => subject.id),
      });
    }
  }, [book]);

  useEffect(() => {
    fetchAuthors().then(setAuthors);
    fetchSubjectsApi().then(setSubjects);
  }, []);

  const handleAuthorChange = (event) => {
    setEditedBook({ ...editedBook, author: event.target.value });
  };

  const handleSubjectsChange = (event) => {
    setEditedBook({
      ...editedBook,
      subjects: event.target.value
    });
  };

  const handleSave = () => {
    if (editedBook) {
      editBookApi(editedBook.id, editedBook).then(() => {
        handleClose();
        fetchBook();
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Book</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Book Name"
          type="text"
          fullWidth
          value={editedBook ? editedBook.name : ''}
          onChange={(e) => setEditedBook({ ...editedBook, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel id="author-select-label">Author</InputLabel>
          <Select
            labelId="author-select-label"
            id="author-select"
            value={editedBook ? editedBook.author : ''}
            onChange={handleAuthorChange}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="subjects-select-label">Subjects</InputLabel>
          <Select
            labelId="subjects-select-label"
            id="subjects-select"
            multiple
            value={editedBook ? editedBook.subjects : []}
            onChange={handleSubjectsChange}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>{subject.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default EditBook;
