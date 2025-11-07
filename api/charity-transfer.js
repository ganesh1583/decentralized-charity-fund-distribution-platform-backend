import { connectDB, CharityTransfer } from "../db/db.js";
import { runCors } from "../../utils/cors.js";


export default async function handler(req, res) {
  await runCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { recipient, totalTransferred, txHash } = req.body;

    const transfer = new CharityTransfer({ recipient, totalTransferred, txHash });
    await transfer.save();

    res.status(201).json({ message: "Charity transfer log saved" });
  } catch (err) {
    console.error("Error saving transfer log:", err);
    res.status(500).json({ error: "Failed to save charity transfer log" });
  }
}
