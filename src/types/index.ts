import { Timestamp } from 'firebase/firestore'; 

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  category: string;
  userId: string;
  createdAt: Timestamp; 
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
  usedIngredientCount: number;
  likes: number;
}

