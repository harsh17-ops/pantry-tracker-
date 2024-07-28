// src/components/Home.js
import { motion } from 'framer-motion';
import Link from 'next/link';

const Home = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold mb-6">Welcome to Pantry Tracker</h1>
      <p className="text-xl mb-6">The best way to keep track of your pantry items.</p>
      <Link href="/auth">
        <motion.button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Home;
