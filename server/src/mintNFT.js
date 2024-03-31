import { Client, Wallet, convertStringToHex } from "xrpl";
import sendToIPFS from "./sendToIPFS.js";
import hashFile from "./hashFile.js";

const networks = {
    RIPPLE_TESTNET: "wss://s.altnet.rippletest.net:51233"
}

let xrplClient;

const getXrplClient = () => {
    if (!xrplClient) {
      xrplClient = new Client(networks.RIPPLE_TESTNET)
    }

    return xrplClient
}

const Wallet1 = Wallet.fromSeed(process.env.XRPL_WALLET_SEED);

export default async function mintToken(fileName) {
    const fileHash = await hashFile(fileName);

    const [metadatas, img] = await sendToIPFS(fileHash);

    const ipfsURL = metadatas.url;
    console.log(ipfsURL)

    const client = getXrplClient()
    await client.connect()

    const transactionJson = {
      "TransactionType": "NFTokenMint",
      "Account": Wallet1.classicAddress,
      "URI": convertStringToHex(ipfsURL),
      "Flags": 8,
      "TransferFee": 1000,
      "NFTokenTaxon": 0
    }

    const tx = await client.submitAndWait(transactionJson, { wallet: Wallet1 })

    const tokenID = tx.result.meta.nftoken_id;
    const hash = tx.result.hash;
    console.log("tx hash: ", hash);

    client.disconnect()

    return [hash, tokenID, metadatas, img];
}
