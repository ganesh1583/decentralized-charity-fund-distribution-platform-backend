import { connectDB, DonationLog } from "../db/db.js";
import { runCors } from "../utils/cors.js";

export default async function handler(req, res) {
  try {
    await runCors(req, res);
    if (req.method === "OPTIONS") return res.status(200).end();

    await connectDB();
    const donations = await DonationLog.find().sort({ timestamp: -1 });
    return res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return res.status(500).json({ error: "Failed to fetch donation logs", details: error.message });
  }
}
