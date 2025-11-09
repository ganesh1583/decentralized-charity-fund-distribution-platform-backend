import cors from "cors";

const corsMiddleware = cors({
  origin: [
    "https://decentralized-charity-fund-distribu-three.vercel.app",
    "http://localhost:5173"
  ],  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
export async function runCors(req, res) {
  await new Promise((resolve) => corsMiddleware(req, res, resolve));
}
