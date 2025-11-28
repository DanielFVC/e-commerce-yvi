import mongoose from '@/lib/mongoose';
import { Schema, models, model } from 'mongoose';

const ProveedorSchema = new Schema(
  {
    name: { type: String, required: true },
    contact: { type: String },
  },
  { collection: 'Proveedores', timestamps: true }
);

const Proveedor = models.Proveedor || model('Proveedor', ProveedorSchema);
export default Proveedor;
