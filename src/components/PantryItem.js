import { motion } from 'framer-motion';

const PantryItem = ({ id, name, quantity, onDelete }) => {
  return (
    <motion.div
      className="flex justify-between items-center p-2 m-2 border-b"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <div>
        <h3 className="font-bold">{name}</h3>
        <p>Quantity: {quantity}</p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="bg-red-500 text-white p-2 rounded"
      >
        Delete
      </button>
    </motion.div>
  );
};

export default PantryItem;
