import { connectDB, DonationLog, CharityTransfer } from "../db/db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    await connectDB();
    const donations = await DonationLog.find();
    const transfers = await CharityTransfer.find();
    res.status(200).json({ donations, transfers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
}
