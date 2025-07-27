import Pocket from '@/lib/models/Pocket';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { id: string } }
): Promise<Response> {
  await connectToDatabase();
  const { id } = context.params;
  const pocket = await Pocket.findById(id);
  if (!pocket) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(pocket);
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
): Promise<Response> {
  await connectToDatabase();
  const { id } = context.params;
  const data = await request.json();
  try {
    const updated = await Pocket.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
): Promise<Response> {
  await connectToDatabase();
  const { id } = context.params;
  try {
    await Pocket.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}