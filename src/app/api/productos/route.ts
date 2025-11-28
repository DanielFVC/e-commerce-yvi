import { NextResponse } from 'next/server';
import Product from '@/entities/product/model';
import { connect } from '@/lib/mongoose';

export async function GET() {
  try {
    await connect();
    
    const products = await Product.find({}).limit(100).lean();
    
    const mappedProducts = products.map((p: any) => ({
      id: p._id.toString(),
      title: p.nombre,
      brand: p.marca,
      price: p.precio,
      image: p.imagen_url,
    }));

    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
