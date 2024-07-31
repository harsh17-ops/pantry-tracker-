import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PantryItem } from '../types';
import { useAuth } from './useAuth';

export function usePantryItems() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'pantryItems'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const pantryItems: PantryItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PantryItem, 'id'>),
        }));
        console.log('Fetched items:', pantryItems); // Debug line
        setItems(pantryItems);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Snapshot error:', err); // Debug line
        setLoading(false);
        setError('Failed to load items. Please try again.');
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { items, loading, error };
}
