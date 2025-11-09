import { connectDB, DonationLog } from "../db/db.js";
import { runCors } from "../utils/cors.js";

export default async function handler(req, res) {
  try {
    // 1. Run CORS and handle preflight OPTIONS request
    await runCors(req, res);
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // 2. Connect to the database
    await connectDB();

    // 3. Handle the request based on its method (GET, POST, etc.)
    switch (req.method) {
      case "GET":
        // --- HANDLE GET REQUEST ---
        // Fetches all donations, sorted by the newest first
        const donations = await DonationLog.find().sort({ timestamp: -1 });
        return res.status(200).json(donations);

      case "POST":
        // --- HANDLE POST REQUEST ---
        // Creates a new donation
        
        // Get data from the request body
        const { name, amount, message, paymentId } = req.body;

        // Basic validation
        if (!amount || !paymentId) {
          return res.status(400).json({ error: "Amount and paymentId are required." });
        }

        // Create a new donation log entry
        const newDonation = new DonationLog({
          name: name || "Anonymous", // Default to "Anonymous" if no name provided
          amount,
          message,
          paymentId,
          timestamp: new Date(),
        });

        // Save it to the database
        await newDonation.save();

        // Return a 201 (Created) status with the new donation
        return res.status(201).json(newDonation);

      default:
        // --- HANDLE OTHER METHODS ---
        // Send a "405 Method Not Allowed" response
        res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // --- HANDLE ERRORS ---
    console.error("API Error:", error);
    return res.status(500).json({
      error: "An internal server error occurred.",
      details: error.message,
    });
  }
}

// import { connectDB, DonationLog } from "../db/db.js";
// import { runCors } from "../utils/cors.js";

// export default async function handler(req, res) {
//   try {
//     await runCors(req, res);
//     if (req.method === "OPTIONS") return res.status(200).end();

//     await connectDB();
//     const donations = await DonationLog.find().sort({ timestamp: -1 });
//     return res.status(200).json(donations);
//   } catch (error) {
//     console.error("Error fetching donations:", error);
//     return res.status(500).json({ error: "Failed to fetch donation logs", details: error.message });
//   }
// }
