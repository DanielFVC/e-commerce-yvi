import { NextResponse } from 'next/server';
import Usuario from '@/entities/usuario/model';
import { connect } from '@/lib/mongoose';

export async function POST(request: Request) {
  try {
    await connect();
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const user = await Usuario.findOne({ email, password });

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      token: 'fake-jwt-token',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Ruta /api/login funcionando correctamente (usa POST para iniciar sesión)' 
  });
}
