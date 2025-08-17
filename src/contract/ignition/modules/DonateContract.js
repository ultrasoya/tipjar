const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DonateModule = buildModule("DonateModule", (m) => {
  const token = m.contract("DonateContract");

  return { token };
});

module.exports = DonateModule;