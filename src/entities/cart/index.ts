import type { Product } from '@/entities/product';

export type CartItem = {
  id: string; // usually product id
  product: Product;
  quantity: number;
};

export default CartItem;
