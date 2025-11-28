import { NextResponse } from 'next/server';
import Venta from '@/entities/venta/model';
import { connect } from '@/lib/mongoose';

export async function POST(request: Request) {
  try {
    await connect();
    
    const body = await request.json();
    const { items, total, clienteData } = body;

    // Crear la venta en la base de datos
    const nuevaVenta = await Venta.create({
      items: items.map((item: any) => ({
        productId: item.id,
        qty: item.quantity,
        price: item.price,
        nombre: item.title,
      })),
      total,
      clienteData,
      fecha: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      ventaId: nuevaVenta._id,
      message: 'Venta registrada exitosamente' 
    });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    return NextResponse.json(
      { error: 'Error al procesar la venta' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Ruta /api/ventas funcionando correctamente (usa POST para registrar una venta)' 
  });
}
