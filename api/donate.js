import { connectDB, DonationLog } from "../db/db.js";
import { runCors } from "../utils/cors.js";

export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") return res.status(200).end();

    await runCors(req, res);

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    await connectDB();

    const { donor, amount, txHash } = req.body;
    if (!donor || !amount || !txHash) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const donation = new DonationLog({ donor, amount, txHash });
    await donation.save();

    return res.status(201).json({ message: "Donation log saved successfully" });
  } catch (error) {
    console.error("Error saving donation log:", error);
    return res.status(500).json({ error: "Failed to save donation log", details: error.message });
  }
}
