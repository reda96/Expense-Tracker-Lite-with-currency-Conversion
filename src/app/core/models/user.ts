export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string; // URL to user's profile image
  income:number;
  expenses:number;
}