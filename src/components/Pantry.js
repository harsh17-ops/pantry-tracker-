import { useState, useEffect } from 'react'
import { auth, db } from '../utils/firebase'
const Pantry = () => {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newExpiry, setNewExpiry] = useState('')
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const itemsRef = db.collection('users').doc(user.uid).collection('pantry')
        itemsRef.onSnapshot((snapshot) => {
          const itemsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setItems(itemsData)
        })
      }
    })
    return () => unsubscribe()
  }, [])
  const handleAddItem = async (e) => {
    e.preventDefault()
    const user = auth.currentUser
    if (user && newItem && newExpiry) {
      const itemsRef = db.collection('users').doc(user.uid).collection('pantry')
      await itemsRef.add({
        name: newItem,
        expiry: newExpiry,
      })
      setNewItem('')
      setNewExpiry('')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-6">Your Pantry</h1>
      <form onSubmit={handleAddItem} className="w-full max-w-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded"
            value={newExpiry}
            onChange={(e) => setNewExpiry(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Item</button>
      </form>
      <table className="w-full max-w-md">
        <thead>
          <tr>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Pantry
