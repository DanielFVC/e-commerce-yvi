export type Product = {
  id: string;
  brand?: string;
  title: string;
  price: number;
  image?: string;
  discount?: number; // percentage, optional
};
