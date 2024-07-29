import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", expirationDate: "" });

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "pantryItems"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setPantryItems(items);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "pantryItems"), newItem);
      setPantryItems([...pantryItems, { ...newItem, id: docRef.id }]);
      setNewItem({ name: "", quantity: "", expirationDate: "" });
    } catch (err) {
      console.error("Error adding item: ", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "pantryItems", id));
      setPantryItems(pantryItems.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting item: ", err);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        label="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Expiration Date"
        type="date"
        value={newItem.expirationDate}
        onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
        fullWidth
        required
        sx={{ mt: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={handleAddItem} variant="contained" sx={{ mt: 2 }}>
        Add Item
      </Button>
      <List>
        {pantryItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}, Expiration Date: ${item.expirationDate}`}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Pantry;
