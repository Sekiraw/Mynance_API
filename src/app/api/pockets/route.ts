import Pocket from '@/lib/models/Pocket';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
  await connectToDatabase();
  const pockets = await Pocket.find();
  return NextResponse.json(pockets);
}

export async function POST(request: Request): Promise<Response> {
  await connectToDatabase();
  const body = await request.json();
  const { name, description } = body;
  try {
    const pocket = await Pocket.create({ name, description });
    return NextResponse.json(pocket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pocket' }, { status: 400 });
  }
}