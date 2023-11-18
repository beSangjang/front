import axios from "axios";
const PinataAccessKey = process.env.REACT_APP_PINATA_ACCESS_KEY;
const pinataSecretKey = process.env.REACT_APP_PINATA_SECRET_KEY;

const fs = require("fs");
const FormData = require("form-data");

axios.defaults.withCredentials = true;

export const uploadImgToPinata = async (data) => {
  try {
    const res = await axios
      .post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: `${PinataAccessKey}`,
          pinata_secret_api_key: `${pinataSecretKey}`,
        },
      })
      .then((res) => {
        return `ipfs://${res.data.IpfsHash}`;
      })
      .catch((err) => {
        console.log(err);
      });

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const jsonToPinata = async (metaData) => {
  try {
    const baseUrl = "https://gateway.pinata.cloud/ipfs/";
    const data = JSON.stringify({
      pinataMetadata: {
        name: metaData.name,
      },
      pinataContent: metaData,
    });

    const res = await axios
      .post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: `${PinataAccessKey}`,
          pinata_secret_api_key: `${pinataSecretKey}`,
        },
      })
      .then((res) => {
        const result = `${baseUrl}${res.data.IpfsHash}`;
        return result;
      });

    return res;
  } catch (err) {
    console.error(err);
  }
};
