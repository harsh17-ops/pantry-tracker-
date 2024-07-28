// src/pages/auth.js
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { motion } from 'framer-motion';

const Auth = () => {
  const [user, loading, error] = useAuthState(auth);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {!user ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Please log in</h1>
          <motion.button
            onClick={signIn}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign in with Google
          </motion.button>
        </>
      ) : (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-2xl font-bold mb-6">Welcome, {user.displayName}</h1>
          <p className="text-xl">You are now logged in.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Auth;
