import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Research from "../../components/Research";
import Banner from "../../components/Banner";
import Setup from "../../components/Setup";
import Tutorial from "../../components/Tutorial";
import './index.scss';
import axios from "axios";

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

    const apiCallMint = async () => {
      const response = await axios.post("http://localhost:8080/api/v1/mint", image);
      setTokenID(response.data.TokenID);
      console.log("Hash of the token:", response.data.Hash);
    };

    const apiCallIPFS = async () => {
      const response = await axios.post("http://localhost:8080/api/v1/ipfs", {}, {
        params: {
          name: name,
          description: description
        }
      });

      const url = `https://nftstorage.link/ipfs/${response.data.Metadatas.ipnft}`;
      setIpfsUri(url);
      console.log("IPFS URI:", url);

      const imgUrl = response.data.Image;
      const imgUrlGood = imgUrl.replace("ipfs://", "https://nftstorage.link/ipfs/")
      setIpfsImg(imgUrlGood);
    };

    async function handleChange(e) {
      const formData = new FormData();
      formData.append("my-file", e.target.files[0], e.target.files[0].name);

      setImage(formData);
      setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="main">
            <div className="d-flex justify-content-center">
                <div className="container">
                    <Banner />

                    <div>
                      <p>Choose your File & Mint your NFT</p>
                      <img src={file} style={{ maxWidth: "200px", maxHeight: "200px" }} />
                    </div>

                    <div>
                      <input type="file" id="file" className="inputfile" onChange={handleChange} />
                    </div>

                    <button onClick={apiCallMint} style={{ backgroundColor: "blue", color: 'white', fontSize: '18px', borderRadius: '8px', padding: '10px 20px', }}>Mint Your NFT</button>

                    {tokenID && (
                      <div style={{ color: 'blue', alignItems: 'center' }}>
                        <h3>NFT minted!</h3>
                        <p>
                          <a 
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://test.bithomp.com/nft/${tokenID}`}
                            style={{ color: 'blue' }}
                          >
                          Check your transaction on XRP Ledger here!
                          </a>
                        </p>
                      </div>
                    )}
                    <div>
                        <div>
                        <input
                            type="text"
                            value={name}
                            placeholder="Name of the NFT"
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        </div>
                        <div >
                        <input
                            type="text"
                            value={description}
                            placeholder="Description for the NFT"
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                        </div>
                        <div>
                        <label>
                        <input
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                        ></input>
                        </label>
                        </div>

                        <button onClick={apiCallIPFS} style={{ backgroundColor: "blue", color: 'white', fontSize: '18px', borderRadius: '8px', padding: '10px 20px', }}>Store on IPFS</button>
                    </div>

                    <div>
                    {ipfsUri ? (
                        <>
                            <img
                                src={ipfsImg}
                                alt="NFT Image"
                                width="15%"
                                height="15%"
                                priority="true"
                            />
                            <a target="_blank" rel="noopener noreferrer" href={ipfsUri}>Your Ipfs Link Here</a>
                        </>
                    ) : (
                      <a>Upload and get your IPFS link</a>
                    )}
                  </div>

                    <Research />
                    <Setup />
                    <Tutorial />
                </div>
            </div>
        </div>
    )
}

export default Main;
