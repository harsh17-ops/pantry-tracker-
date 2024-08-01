// src/pages/profile.tsx
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase'; // Make sure this is correctly imported
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          {/* Additional user details */}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
