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
import { fetchSubjectsApi } from '../api/subjects/subjectsApi';

const useStyles = makeStyles({
  table: {},
  columnActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

function Subject() {
  const classes = useStyles();
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchSubjectsApi().then(setSubjects);
  }, []);

  const handleSubjectEdited = () => {
    fetchSubjectsApi().then(setSubjects);
  };

  const deleteSubject = (id) => {
    console.log('delete subject', id);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
    setEditingSubject(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.id}</TableCell>
                <TableCell>{subject.description}</TableCell>
                <TableCell className={classes.columnActions}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteSubject(subject.id)}
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

export default Subject;
