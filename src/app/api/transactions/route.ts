import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { Transaction } from '@/lib/models';

export async function GET() {
    await connectToDatabase();
    const transactions = await Transaction.find().populate('pocketId');
    return NextResponse.json(transactions);
}

export async function POST(req: Request) {
    await connectToDatabase();
    const body = await req.json();
    const { title, amount, date, isIncome, pocketId } = body;

    try {
        const transaction = await Transaction.create({ title, amount, date, isIncome, pocketId });
        return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 400 });
    }
}
