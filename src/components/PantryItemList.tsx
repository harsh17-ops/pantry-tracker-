import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, TextField, InputAdornment } from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import { usePantryItems } from '../hooks/usePantryItems';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import SearchBar from './SearchBar';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 440,
  marginTop: theme.spacing(3),
}));

const AnimatedTableRow = motion(TableRow);

const PantryItemList: React.FC = () => {
  const { items, loading, error } = usePantryItems();
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  if (loading) {
    return <Typography>Loading pantry items...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (items.length === 0) {
    return <Typography>No items in your pantry. Add some items to get started!</Typography>;
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search pantry items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
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
            <AnimatePresence>
              {filteredItems.map((item) => (
                <AnimatedTableRow
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
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
            </AnimatePresence>
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default PantryItemList;
