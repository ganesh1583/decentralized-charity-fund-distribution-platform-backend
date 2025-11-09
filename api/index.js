import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  try {
    await runCors(req, res);
    if (req.method === "OPTIONS") return res.status(200).end();
    return res.status(200).send("Backend is live");
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
