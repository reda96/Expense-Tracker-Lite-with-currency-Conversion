export interface Expense {
  id: string;
  userId: string;
  category: string;
  icon: string; // mat-icon name, e.g., 'shopping_cart'
  originalAmount: number;
  originalCurrency: string; // e.g., 'usd', 'eur'
  convertedAmount: number;
  date: string; // ISO 8601 format
  imageReceipt?: {
    url: string;        // Image URL or base64 string
    fileName?: string;  // Optional original file name
    uploadedAt?: string; // Optional upload date (ISO string)
  };
}