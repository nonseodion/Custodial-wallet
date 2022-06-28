const cryptoWalletCore = require("crypto-wallet-core");

const parentAddress = process.env.xPubEth0;

const getAddress = (index) => {
  const ethAddress = cryptoWalletCore.Deriver.deriveAddress(
    "ETH",
    "testnet",
    parentAddress,
    index,
    false
  );

  return ethAddress
}

module.exports = { getAddress };
