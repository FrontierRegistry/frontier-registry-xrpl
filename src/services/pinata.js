import axios from 'axios';

const key = process.env.REACT_APP_PINATA_API_KEY;
const secret = process.env.REACT_APP_PINATA_API_SECRET;
const gateway = process.env.REACT_APP_PINATA_GATEWAY_URL;

export const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            const pinataUrl = `${gateway}/ipfs/` + response.data.IpfsHash
            console.log("url: ", pinataUrl);
            return {
                success: true,
                pinataUrl,
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

        });
};

// export const pinFileToIPFS = async (imagePath) => {
//     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

//     let data = new FormData();

//     return axios.post(url,
//         data,
//         {
//             maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
//             timeout: 60000,
//             headers: {
//                 'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
//                 'pinata_api_key': key,
//                 'pinata_secret_api_key': secret
//             }
//         }
//     ).then(function (response) {
//         console.log("ipfs hash: ", response.data.IpfsHash);
//         const ipfsUrl = `${gateway}/ipfs/${response.data.IpfsHash}`;
//         return { success: true, ipfsUrl }
//     }).catch(function (error) {
//         console.log("error: ", error);
//         return { success: false, message: "pinning File failed" }
//     });
// };