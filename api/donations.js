import { connectDB, DonationLog } from "../db/db.js";
import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  await runCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await connectDB();
    const donations = await DonationLog.find().sort({ timestamp: -1 });
    res.status(200).json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donation logs" });
  }
}
