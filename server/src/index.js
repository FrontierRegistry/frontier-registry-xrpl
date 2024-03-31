import express from 'express';
import cors from "cors";
import multer from 'multer';
import mintToken from "./mintNFT.js";
import sendToIPFS from "./sendToIPFS.js";

const app = express();

app.use(cors());

let fileName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "img/");
    },

    filename: function (req, file, cb) {
      fileName = file.originalname;
      cb(null, `${fileName}`);
    },
  });

const multerFile = multer({ storage: storage });

app.listen(8080, () => console.log('Server started. Listening on port 8080!'));


app.post("/api/v1/ipfs", async (req, res) => {
    let metadatas;
    let img;

    try {
        console.log(req.query.name);
        console.log(req.query.description);
        [metadatas, img] = await sendToIPFS();
        console.log(metadatas);
        console.log(img);
    } catch (error) {
        console.error(error);
    }

    res.status(200).json( { Metadatas: metadatas, Image: img } );
});

app.post("/api/v1/mint", multerFile.array("my-file"),  async (req, res) => {
    let hash, tokenID, metadatas, img;

    try {
        [hash, tokenID, metadatas, img] = await mintToken(fileName);
    } catch (error) {
        console.error(error);
    }

    res.status(200).json( { Hash: hash, TokenID: tokenID, Metadatas: metadatas, Image: img } );
});
