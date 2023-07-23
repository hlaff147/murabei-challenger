// components/Book.js
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteBookApi, fetchBook } from '../api/book/bookApi';
import { Button, makeStyles } from '@material-ui/core';
import EditBook from './EditBook';
import DeleteBook from './dialog/DeleteBook';

function Book() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    columnActions: {
      display: 'flex',
      gap: '5px',
    }
  });
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const handleClickOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleDeleteOpen = (book) => {
    setBookToDelete(book);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const deleteBook = (bookId) => {
    deleteBookApi(bookId).then(() => {
      // Atualiza a lista de livros após a deleção
      fetchBook().then(setBooks);
      handleDeleteClose();
    });
  };

  useEffect(() => {
    fetchBook().then(setBooks);
  }, []);
  const fetchBooks = () => {
    fetchBook().then(setBooks);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!open) {
      fetchBooks();
    }
  }, [open]);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Author Email</TableCell>
            <TableCell>Author Age</TableCell>
            <TableCell>Subjects</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.id}
              </TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author.name}</TableCell>
              <TableCell>{book.author.email}</TableCell>
              <TableCell>{book.author.age}</TableCell>
              <TableCell>{book.subjects.map((subject) => subject.description).join(', ')}</TableCell>
              <TableCell className={classes.columnActions}>
                <Button variant="contained" color="primary" onClick={() => handleClickOpen(book)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteOpen(book)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditBook open={open} handleClose={handleClose} book={selectedBook} fetchBook={fetchBook} />
      <DeleteBook open={deleteOpen} handleClose={handleDeleteClose} book={bookToDelete} handleDelete={deleteBook} />

    </TableContainer>
  );
}

export default Book;
