import { connectDB, DonationLog, CharityTransfer } from "../db/db.js";
import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  await runCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const donations = await DonationLog.find();
    const transfers = await CharityTransfer.find();

    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://decentralized-charity-fund-distribu-three.vercel.app"
    );
    res.status(200).json({ donations, transfers });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
}
