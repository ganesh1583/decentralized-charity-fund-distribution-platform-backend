import { connectDB, CharityTransfer } from "../db/db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    await connectDB();
    const transfers = await CharityTransfer.find().sort({ timestamp: -1 });
    res.status(200).json(transfers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transfer logs" });
  }
}
