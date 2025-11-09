import { connectDB, DonationLog } from "../db/db.js";
import { runCors } from "../utils/cors.js";

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

    switch (req.method) {
      case "GET":
        const donations = await DonationLog.find().sort({ timestamp: -1 });
        return res.status(200).json(donations);

      case "POST":
        const { name, amount, message, paymentId } = req.body;

        if (!amount || !paymentId) {
          return res.status(400).json({ error: "Amount and paymentId are required." });
        }

        const newDonation = new DonationLog({
          name: name || "Anonymous",
          amount,
          message,
          paymentId,
          timestamp: new Date(),
        });

        await newDonation.save();
        return res.status(201).json(newDonation);

      default:
        res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "An internal server error occurred.",
      details: error.message,
    });
  }
}
