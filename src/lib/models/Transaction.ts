import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  isIncome: { type: Boolean, required: true },
  pocketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pocket', required: false }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);