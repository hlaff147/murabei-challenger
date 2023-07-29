import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
} from '@mui/material';
import { deleteBookApi, fetchBook } from '../api/book/bookApi';
import EditBook from './EditBook';
import DeleteBook from './dialog/DeleteBook';
import AddBook from './AddBook';
import { createStyles, makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    columnActions: {
      display: 'flex',
      gap: '5px',
    }
  })
);

const ITEMS_PER_PAGE = 5;

function Book() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditBook, setOpenEditBook] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false);
  const [openAddBook, setOpenAddBook] = useState(false);

  const fetchBooks = useCallback(() => {
    fetchBook().then(setBooks);
  }, []);

  const deleteBook = useCallback((bookId) => {
    deleteBookApi(bookId).then(fetchBooks);
    setOpenDeleteBook(false);
  }, [fetchBooks]);

  const handleEditBookOpen = useCallback((book) => {
    setSelectedBook(book);
    setOpenEditBook(true);
  }, []);

  const handleDeleteBookOpen = useCallback((book) => {
    setBookToDelete(book);
    setOpenDeleteBook(true);
  }, []);

  const handleAddBookOpen = () => setOpenAddBook(true);

  const handleModalClose = () => {
    setOpenEditBook(false);
    setOpenDeleteBook(false);
    setOpenAddBook(false);
    setSelectedBook(null);
    setBookToDelete(null);
  };

  const handlePageChange = (_, newPage) => setCurrentPage(newPage);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
            <TableCell>
              <Button variant="contained" color="primary" onClick={handleAddBookOpen}>
                Add Book
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .map((book) => (
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
                  <Button variant="contained" color="primary" onClick={() => handleEditBookOpen(book)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteBookOpen(book)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <EditBook open={openEditBook} handleClose={handleModalClose} book={selectedBook} fetchBook={fetchBooks}/>
      <DeleteBook open={openDeleteBook} handleClose={handleModalClose} book={bookToDelete} handleDelete={deleteBook} />
      <AddBook open={openAddBook} handleClose={handleModalClose} fetchBooks={fetchBooks} />
      <Pagination
        count={Math.ceil(books.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </TableContainer>
  );
}

export default Book;
