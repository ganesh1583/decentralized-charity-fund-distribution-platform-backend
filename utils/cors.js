import cors from "cors";

const corsMiddleware = cors({
  origin: ["*"],
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
  await runMiddleware(req, res, corsMiddleware);
}
