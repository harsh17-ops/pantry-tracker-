export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: Date;
  category: string;
  userId: string;
  createdAt: Date;
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
