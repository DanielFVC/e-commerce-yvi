import mongoose from '@/lib/mongoose';
import { Schema, models, model } from 'mongoose';

const VentaSchema = new Schema(
  {
    items: [{ 
      productId: String, 
      qty: Number, 
      price: Number,
      nombre: String 
    }],
    total: { type: Number },
    clienteData: {
      nombre: String,
      email: String,
      telefono: String,
      direccion: String,
      ciudad: String,
      metodoPago: String,
    },
    fecha: { type: Date, default: Date.now },
  },
  { collection: 'Ventas', timestamps: true }
);

const Venta = models.Venta || model('Venta', VentaSchema);
export default Venta;
