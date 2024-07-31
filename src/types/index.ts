export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  category: string;
  userId: string;
  createdAt: any; // Changed to 'any' to accommodate Firebase timestamp
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

