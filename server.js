const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { DonationLog, CharityTransfer } = require('./db/db');
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.post("/api/donate", async (req, res) => {
  const { donor, amount, txHash } = req.body;

  try {
    const donation = new DonationLog({ donor, amount, txHash });
    await donation.save();
    res.status(201).json({ message: "Donation log saved successfully" });
  } catch (err) {
    console.error("Error saving donation log:", err);
    res.status(500).json({ error: "Failed to save donation log" });
  }
});

app.post("/api/charity-transfer", async (req, res) => {
  const { recipient, totalTransferred, txHash } = req.body;

  try {
    const transfer = new CharityTransfer({ recipient, totalTransferred, txHash });
    await transfer.save();
    res.status(201).json({ message: "Charity transfer log saved" });
  } catch (err) {
    console.error("Error saving transfer log:", err);
    res.status(500).json({ error: "Failed to save charity transfer log" });
  }
});

app.get("/api/donations", async (req, res) => {
  try {
    const donations = await DonationLog.find().sort({ timestamp: -1 });
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch donation logs" });
  }
});

app.get("/api/transfers", async (req, res) => {
  try {
    const transfers = await CharityTransfer.find().sort({ timestamp: -1 });
    res.status(200).json(transfers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transfer logs" });
  }
});

app.get("/api/logs/all", async (req, res) => {
  try {
    const donations = await DonationLog.find();
    const transfers = await CharityTransfer.find();

    // console.log(donations);
    // console.log(transfers);

    res.status(200).json({ donations, transfers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(process.env.PORT);
    console.log("Listening on port 5000");
  }

main()
