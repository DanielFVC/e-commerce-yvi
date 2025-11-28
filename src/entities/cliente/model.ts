import mongoose from '@/lib/mongoose';
import { Schema, models, model } from 'mongoose';

const ClienteSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { collection: 'Clientes', timestamps: true }
);

const Cliente = models.Cliente || model('Cliente', ClienteSchema);
export default Cliente;
