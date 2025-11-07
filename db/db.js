import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: String,
  amount: Number,
  txHash: String,
  timestamp: { type: Date, default: Date.now },
});

export const DonationLog = mongoose.models.DonationLog || mongoose.model("DonationLog", donationSchema);

const charityTransferSchema = new mongoose.Schema({
  recipient: String,
  totalTransferred: Number,
  txHash: String,
  timestamp: { type: Date, default: Date.now },
});

export const CharityTransfer = mongoose.models.CharityTransfer || mongoose.model("CharityTransfer", charityTransferSchema);

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URL);
}
