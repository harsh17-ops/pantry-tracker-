import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { usePantryItems } from '../hooks/usePantryItems';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const StyledTableContainer = styled(TableContainer, { shouldForwardProp: (prop) => prop !== 'component' })(({ theme }) => ({
  maxHeight: 440,
  marginTop: theme.spacing(3),
}));

const AnimatedTableRow = motion(TableRow);

const PantryItemList: React.FC = () => {
  const { items, loading } = usePantryItems();

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  if (loading) {
    return <Typography>Loading pantry items...</Typography>;
  }

  return (
    <StyledTableContainer component={Paper}>
      <Table stickyHeader aria-label="pantry items table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <AnimatedTableRow
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.expirationDate}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </AnimatedTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default PantryItemList;
