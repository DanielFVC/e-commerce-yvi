import { NextResponse } from 'next/server';
import Product from '@/entities/product/model';
import { connect } from '@/lib/mongoose';

export async function GET() {
  try {
    // Ensure DB connection is established before querying
    await connect();
    const docs = await Product.find({}).limit(100).lean();
    const products = docs.map((d: any) => ({
      id: String(d._id),
      title: d.nombre || d.title || '',
      brand: d.marca || d.brand || '',
      price: d.precio ?? d.price ?? 0,
      image: d.imagen_url || d.image || '',
      discount: d.discount ?? undefined,
    }));
    return NextResponse.json(products);
  } catch (err) {
    console.error('GET /api/productos error', err);
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
  }
}
