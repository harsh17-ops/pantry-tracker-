import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import PantryItem from '../components/PantryItem';
import { motion, AnimatePresence } from 'framer-motion';
import Home from '../components/Home';

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Pantry Tracker</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        className="border p-2 m-2"
      />
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="border p-2 m-2"
      />
      <button onClick={addItem} className="bg-blue-500 text-white p-2 m-2">
        Add Item
      </button>
      <AnimatePresence>
        {items.map((item) => (
          <PantryItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            onDelete={deleteItem}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Pantry;
