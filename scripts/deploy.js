const hre = require("hardhat");
const fs = require("fs");



async function main() {
  const CharityFund = await hre.ethers.getContractFactory("CharityFund");
  const charityFund = await CharityFund.deploy();

  await charityFund.waitForDeployment();

  console.log("CharityFund deployed to:", await charityFund.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


//0x15C48ee7E0429e840691ec37B80F69264d782980






/*

async function main() {
  const CharityFund = await hre.ethers.getContractFactory("CharityFund");
  const charityFund = await CharityFund.deploy();
  await charityFund.waitForDeployment();

  // Get the deployed contract address
  const address = await charityFund.getAddress();
  console.log("Contract deployed to Sepolia at:", address);

  // // Save ABI + Address for frontend
  // const abi = JSON.stringify(CharityFund.interface.format("json"));
  // const output = {
  //   address,
  //   abi: JSON.parse(abi),
  // };

  // const frontendPath = "../frontend/src/contracts/charityFund.js";
  // fs.writeFileSync(
  //   frontendPath,
  //   `export const CONTRACT_ADDRESS = "${address}";\n` +
  //   `export const CONTRACT_ABI = ${JSON.stringify(output.abi, null, 2)};`
  // );

  // console.log("ABI and address written to frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

*/