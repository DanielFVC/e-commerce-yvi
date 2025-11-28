import mongoose from '@/lib/mongoose';
import { Schema, models, model } from 'mongoose';

const UsuarioSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    status: { type: String },
  },
  { collection: 'Usuarios', timestamps: true }
);

const Usuario = models.Usuario || model('Usuario', UsuarioSchema);
export default Usuario;
