import { connectDB, DonationLog } from "../db/db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { donor, amount, txHash } = req.body;

    const donation = new DonationLog({ donor, amount, txHash });
    await donation.save();

    res.status(201).json({ message: "Donation log saved successfully" });
  } catch (err) {
    console.error("Error saving donation log:", err);
    res.status(500).json({ error: "Failed to save donation log" });
  }
}
