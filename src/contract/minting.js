import {
    REACT_APP_ADDRESS,
    REACT_APP_RPC_URL,
    REACT_APP_PRIVATE_KEY,
  } from "../config.js";
  import CryptoJS from "crypto-js";
import {ethers} from "ethers";
import { AttendCA, AttendABI } from "./getAbiData.js";
// caver
import Caver from "caver-js";
const caver = new Caver(REACT_APP_RPC_URL);
// contract
const AttendContract = new caver.klay.Contract(AttendABI, AttendCA);

export const minting = async (tokenURI, to) => {
    const mint = AttendContract.methods.mintNFT(to, tokenURI).encodeABI();
  
    const estimate = await AttendContract.methods
      .mintNFT(to, tokenURI)
      .estimateGas({
        from: REACT_APP_ADDRESS,
      });
  
    const result = await SendTransactionNoValue(mint, AttendCA, estimate);
    return result;
  };
  
  // Transaction for Data
  export const SendTransactionNoValue = async (data, to, estimateGas) => {
    const privateKey = CryptoJS.AES.decrypt(
      REACT_APP_PRIVATE_KEY,
      REACT_APP_ADDRESS
    ).toString(CryptoJS.enc.Utf8);
  
    const signTx = await caver.klay.accounts
      .signTransaction(
        {
          from: REACT_APP_ADDRESS,
          to: to,
          gas: estimateGas,
          gasPrice: await caver.klay.getGasPrice(),
          data: data,
        },
        privateKey
      )
      .then((res) => res.rawTransaction);
  
    const txHash = caver.utils.soliditySha3(signTx);
  
    const result = {
      hash: txHash,
      tx: signTx,
    };
  
    return result;
  };

  // 사인된 트랜잭션을 전송
export const sendSignTx = async (signTx) =>
await caver.klay.sendSignedTransaction(signTx).then((hash, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("완료되었습니다.", hash);
  }
});

