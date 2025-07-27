import Transaction from '@/lib/models/Transaction';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(_: any, { params }: any) {
  await connectToDatabase();
  const transaction = await Transaction.findById(params.id).populate('pocketId');
  if (!transaction) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(transaction);
}

export async function PUT(req: any, { params }: any) {
  await connectToDatabase();
  const data = await req.json();
  try {
    const updated = await Transaction.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 });
  }
}

export async function DELETE(_: any, { params }: any) {
  await connectToDatabase();
  try {
    await Transaction.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}
