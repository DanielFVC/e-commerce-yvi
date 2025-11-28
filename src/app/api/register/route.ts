import { NextResponse } from 'next/server';
import Usuario from '@/entities/usuario/model';
import { connect } from '@/lib/mongoose';

export async function POST(request: Request) {
  try {
    await connect();
    
    const body = await request.json();
    const { username, email, password } = body;

    // Validar campos requeridos
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Crear nuevo usuario
    const newUser = await Usuario.create({
      username,
      email,
      password, // En producción deberías hashear la contraseña
      role: 'user',
      status: 'active',
    });

    return NextResponse.json({ 
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Ruta /api/register funcionando correctamente (usa POST para registrar un usuario)' 
  });
}
