import Cors from "cors";

const cors = Cors({
  origin: ["https://decentralized-charity-fund-distribu-three.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export async function runCors(req, res) {
  await runMiddleware(req, res, cors);
}
