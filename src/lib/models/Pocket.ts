import mongoose from 'mongoose';

const PocketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Pocket || mongoose.model('Pocket', PocketSchema);
