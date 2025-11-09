import { connectDB, CharityTransfer } from "../db/db.js";
import { runCors } from "../utils/cors.js";

export default async function handler(req, res) {
  try {
    await runCors(req, res);
    if (req.method === "OPTIONS") return res.status(200).end();

    await connectDB();
    const transfers = await CharityTransfer.find().sort({ timestamp: -1 });
    return res.status(200).json(transfers);
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return res.status(500).json({ error: "Failed to fetch transfer logs", details: error.message });
  }
}
