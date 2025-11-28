import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Keep only /api/productos as the canonical endpoint.
  const base = new URL(request.url).origin;
  return NextResponse.redirect(`${base}/api/productos`, 307);
}
