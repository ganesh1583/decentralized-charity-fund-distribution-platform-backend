import { runCors } from "../utils/cors.js";
import { connectDB, DonationLog, CharityTransfer } from "../db/db.js";


// export default async function handler(req, res) {
//   try {
//     await runCors(req, res);
//     if (req.method === "OPTIONS") return res.status(200).end();
//     return res.status(200).send("Backend is live");
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }


export default async function handler(req, res) {
  try {
    await runCors(req, res);
    if (req.method === "OPTIONS") return res.status(200).end();

    await connectDB();
    const donations = await DonationLog.find().sort({ timestamp: -1 });
    const transfers = await CharityTransfer.find().sort({ timestamp: -1 });

    return res.status(200).json({ donations, transfers });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res.status(500).json({ error: "Failed to fetch logs", details: error.message });
  }
}