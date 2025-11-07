import { connectDB, CharityTransfer } from "../db/db.js";
import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  await runCors(req, res);

  try {
    await connectDB();
    const transfers = await CharityTransfer.find().sort({ timestamp: -1 });
    res.status(200).json(transfers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transfer logs" });
  }
}
