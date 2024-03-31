import { NFTStorage } from "nft.storage";
import mime from 'mime'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

export default async function sendToIPFS(fileHash) {
  const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;

  const image = await fileFromPath("img/certificate/certificate.png")

  const nft = {
    image: image,
    name: "Name",
    description: "Raw Description",
    properties: {
      Proof: fileHash,
      University: "Harvard",
      Type: "Scientific paper",
      Pages: "11",
      Authors: "John, Mike & Kelly"
    }
  };

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = await client.store(nft);
  const img = metadata.data.image.href;
  console.log("Metadata URI: ", metadata.url);

  return [metadata, img];
};
