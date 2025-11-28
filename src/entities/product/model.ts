import mongoose from '@/lib/mongoose';
import { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    brand: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    discount: { type: Number },
  },
  { collection: 'Productos', timestamps: true }
);

// Avoid OverwriteModelError in dev/hot reload
const Product = models.Product || model('Product', ProductSchema);
export default Product;
