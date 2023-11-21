import React, { useState } from "react";
import { jsonToPinata } from "../../api/pinataCall.js";
import { uploadImgToPinata } from "../../api/pinataCall.js";
import { minting, sendSignTx } from "../../contract/minting.js";

const FormData = require("form-data");

export default function MintingPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [mintingStatus, setMintingStatus] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    setSelectedImage(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

  const mintNFT = async () => {
    // 1. 이미지를 Pinata에 업로드합니다.
    const formData = new FormData();
    formData.append("file", selectedImage);
    const ipfsHash = await uploadImgToPinata(formData);
    console.log(ipfsHash);
    // 2. NFT 메타데이터를 작성합니다.
    const metadata = {
      name: nftName,
      description: nftDescription,
      image: ipfsHash,
    };
    jsonToPinata(metadata);

    // 3. NFT를 생성합니다.
    const tokenURI = await jsonToPinata(metadata);
    const address = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(address[0]);
    if (tokenURI) {
      const result = await minting(tokenURI, address[0]);
      if (result.hash) {
        await result.wait();
        sendSignTx(result.hash);
      }
    }
  };

  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSdnNK-18zAdW1NQXKqA2fzezO4pc6gL0WlX1ElEhVvMHnyUAg/viewform?embedded=true"
      width="640"
      height="700"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      로드 중…
    </iframe>
  );
}
