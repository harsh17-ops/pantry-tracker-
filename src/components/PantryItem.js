// src/components/PantryItem.js
const PantryItem = ({ item, deleteItem }) => (
  <div>
    <p>{item.name} - {item.quantity}</p>
    <button onClick={() => deleteItem(item.id)}>Delete</button>
  </div>
);

export default PantryItem;
