import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { fetchAuthors } from '../api/author/authorApi';

//...
import EditAuthor from './dialog/EditAuthor';

function Author() {
  const classes = makeStyles();
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchAuthors().then(setAuthors);
  }, []);

  const handleAuthorEdited = () => {
    fetchAuthors().then(setAuthors);
  };

  const editAuthor = (author) => {
    setEditingAuthor(author);
    setOpenEditDialog(true);
  }

  const deleteAuthor = (id) => {
    console.log('delete author', id)
  }

  const handleClose = () => {
    setOpenEditDialog(false);
    setEditingAuthor(null);
  }

  return (
    <>
      <EditAuthor open={openEditDialog} handleClose={handleClose} author={editingAuthor} onAuthorEdited={handleAuthorEdited} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.email}</TableCell>
                <TableCell>{author.age}</TableCell>
                <TableCell className={classes.columnActions}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => editAuthor(author)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => deleteAuthor(author.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Author;
