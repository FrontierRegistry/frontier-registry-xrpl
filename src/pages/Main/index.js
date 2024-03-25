import { useEffect, } from "react";
import { useLocation } from "react-router-dom";
import Research from "../../components/Research";
import Banner from "../../components/Banner";
import Setup from "../../components/Setup";
import Tutorial from "../../components/Tutorial";
import './index.scss';
import { Client, Wallet, convertStringToHex, isoTimeToRippleTime, getBalanceChanges } from "xrpl";

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

const Wallet1 = Wallet.fromSeed('sEdSx7BuUeNq6sBEZ6hzXavcymeDvY9');

const Main = () => {

    const location = useLocation();
    useEffect(() => {
      if (location.hash) {
        const elem = document.getElementById(location.hash.slice(1));
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, [location]);

    async function mintToken() {
      const client = getXrplClient()
      await client.connect()

      const transactionJson = {
        "TransactionType": "NFTokenMint",
        "Account": Wallet1.classicAddress,
        "URI": convertStringToHex("TestNFT"),
        "Flags": 8,
        "TransferFee": 1000,
        "NFTokenTaxon": 0
      }
      
      const tx = await client.submitAndWait(transactionJson, { wallet: Wallet1 })
      console.log("tx : ", tx);

      client.disconnect()
    }

    return (
        <div className="main">
            <div className="d-flex justify-content-center">
                <div className="container">
                    <Banner />
                    <button onClick={mintToken} style={{ backgroundColor: "blue", color: 'white', fontSize: '18px', borderRadius: '8px', padding: '10px 20px', }}>Mint Your NFT</button>
                    <Research />
                    <Setup />
                    <Tutorial />
                </div>
            </div>
        </div>
    )
}

export default Main;