const mongoose = require('mongoose');
// db/db.js

const donationSchema = new mongoose.Schema({
    donor: String,
    amount: Number,
    txHash: String,
    timestamp: { type: Date, default: Date.now },
});

const DonationLog = mongoose.model('DonationLog', donationSchema);

const charityTransferSchema = new mongoose.Schema({
    recipient: String,
    totalTransferred: Number,
    txHash: String,
    timestamp: { type: Date, default: Date.now },
});

const CharityTransfer = mongoose.model('CharityTransfer', charityTransferSchema);

module.exports = { DonationLog, CharityTransfer };
