import { runCors } from "../utils/cors.js";
import { connectDB, DonationLog, CharityTransfer } from "../db/db.js";

export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    await runCors(req, res);

    await connectDB();

    return res.status(200).send("✅ Backend is live and reachable.");
  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
