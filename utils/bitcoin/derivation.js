const cryptoWalletCore = require("crypto-wallet-core");

const parentAddress = process.env.xPubBtc0;

const getAddress = (index) => {
  const btcAddress = cryptoWalletCore.Deriver.deriveAddress(
    "BTC",
    "testnet",
    parentAddress,
    index,
    false
  );

  return btcAddress;
}

modules.export = { getAddress };
