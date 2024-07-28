import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  const handleAuth = async () => {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (user) return <p>Welcome, {user.email}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 m-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 m-2"
      />
      <button onClick={handleAuth} className="bg-blue-500 text-white p-2 m-2">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Auth;
