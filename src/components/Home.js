import { motion } from 'framer-motion';
import Link from 'next/link';

const Home = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Pantry Tracker by Jeet
      </h1>
      <p className="text-xl mb-6">Track your pantry items efficiently and effortlessly.</p>
      <div className="space-x-4">
        <Link href="/about">
          <motion.button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            About
          </motion.button>
        </Link>
        <Link href="/feedback">
          <motion.button
            className="bg-green-500 text-white py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Feedback
          </motion.button>
        </Link>
        <Link href="/login">
          <motion.button
            className="bg-red-500 text-white py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Login to My Portal
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
