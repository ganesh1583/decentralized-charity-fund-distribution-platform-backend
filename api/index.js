import { runCors } from "../../utils/cors.js";

export default function handler(req, res) {
  await runCors(req, res);
  res.status(200).send("Backend is live");
}
  