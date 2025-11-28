import { NextResponse } from 'next/server';
import Usuario from '@/entities/usuario/model';
import { connect } from '@/lib/mongoose';

export async function GET() {
  return NextResponse.json({
    message: "Ruta /api/login funcionando correctamente (usa POST para iniciar sesión)"
  });
}

// ===============================
// POST → Login real
// ===============================
export async function POST(req: Request) {
  try {
    // 1. Conexión a la base de datos
    await connect();

    // 2. Obtener email y password del body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    // 3. Buscar usuario por email
    const user = await Usuario.findOne({ email }).lean();

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // 4. Comparar contraseña (sin hash, igual que en tu BD)
    if (String(user.password) !== String(password)) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // 5. Respuesta EXITOSA
    return NextResponse.json({
      token: "fake-jwt-token",
      user: {
        id: user.id || String(user._id),
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      }
    });

  } catch (error: any) {
    console.error("🔥 Error en /api/login:", error.message || error);

    return NextResponse.json(
      { error: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}