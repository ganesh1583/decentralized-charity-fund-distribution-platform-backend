import { connectDB, DonationLog } from "../db/db.js";
import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  await runCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

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
