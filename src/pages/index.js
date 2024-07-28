// src/pages/index.js
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import PantryItem from '../components/PantryItem';

const Pantry = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    if (!user) return;
    const itemsCollection = collection(db, 'users', user.uid, 'items');
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  const addItem = async () => {
    if (!name || !quantity) return;
    const itemsCollection = collection(db, 'users', user.uid, 'items');
    await addDoc(itemsCollection, { name, quantity });
    setName('');
    setQuantity('');
    fetchItems();
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, 'users', user.uid, 'items', id);
    await deleteDoc(itemDoc);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  if (!user) return <p>Please log in</p>;

  return (
    <div>
      <h1>Pantry Tracker</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
      />
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <button onClick={addItem}>Add Item</button>
      <div>
        {items.map(item => (
          <PantryItem key={item.id} item={item} deleteItem={deleteItem} />
        ))}
      </div>
    </div>
  );
};

export default Pantry;
