import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { createBook } from '../api/book/bookApi';
import { fetchAuthors } from '../api/author/authorApi';
import { fetchSubjectsApi } from '../api/subjects/subjectsApi';

function AddBook({ open, handleClose, fetchBooks }) {
    const [authors, setAuthors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [newBook, setNewBook] = useState({
        name: '',
        author: '',
        subjects: []
    });

    useEffect(() => {
        fetchAuthors().then(setAuthors);
        fetchSubjectsApi().then(setSubjects);
    }, []);

    const handleAuthorChange = (event) => {
        setNewBook({ ...newBook, author: event.target.value });
    };

    const handleSubjectsChange = (event, values) => {
        setNewBook({
            ...newBook,
            subjects: values
        });
    };

    const handleSave = () => {
        if (newBook.name && newBook.author) {
            const bookToCreate = {
                ...newBook,
                subjects: newBook.subjects.map((subject) => subject.id),
            };
            createBook(bookToCreate).then(() => {
                handleClose();
                fetchBooks();
            });
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
            <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Book Name"
                    type="text"
                    fullWidth
                    value={newBook.name}
                    onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="author-select-label">Author</InputLabel>
                    <Select
                        labelId="author-select-label"
                        id="author-select"
                        value={newBook.author}
                        onChange={handleAuthorChange}
                    >
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id}>
                                {author.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Autocomplete
                    multiple
                    id="subjects-select"
                    options={subjects}
                    getOptionLabel={(option) => option.description}
                    onChange={handleSubjectsChange}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" label="Subjects" placeholder="Subjects" margin="normal" />
                    )}
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

export default AddBook;
