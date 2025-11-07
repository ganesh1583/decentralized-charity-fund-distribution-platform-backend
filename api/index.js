import { runCors } from "../../utils/cors.js";

export default async function handler(req, res) {
  await runCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();
  res.status(200).send("Backend is live");
}
  