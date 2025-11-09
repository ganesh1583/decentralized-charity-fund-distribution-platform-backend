import { connectDB, CharityTransfer } from "../db/db.js";
import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  try {
    await runCors(req, res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    await connectDB();
    const { recipient, totalTransferred, txHash } = req.body;
    if (!recipient || !totalTransferred || !txHash) return res.status(400).json({ error: "Missing required fields" });

    const transfer = new CharityTransfer({ recipient, totalTransferred, txHash });
    await transfer.save();

    return res.status(201).json({ message: "Charity transfer log saved successfully" });
  } catch (error) {
    console.error("Error saving transfer log:", error);
    return res.status(500).json({ error: "Failed to save charity transfer log", details: error.message });
  }
}
