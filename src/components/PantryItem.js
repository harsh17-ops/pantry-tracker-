const PantryItem = ({ item, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 m-2 rounded">
      <div>
        <p className="text-xl">{item.name}</p>
        <p className="text-gray-600">{item.quantity}</p>
      </div>
      <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white p-2 rounded">
        Delete
      </button>
    </div>
  );
};

export default PantryItem;
