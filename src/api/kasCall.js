import { SearchSTOURI } from "./caver";
const accessKey = process.env.REACT_APP_KAS_ACCESS_KEY;
const secretKey = process.env.REACT_APP_KAS_SECRET_KEY;
// EOA로 NFTs 가져오기

export const getAllStocks = async () => {
  try {
    let dataFetch = await fetch(
      "https://th-api.klaytnapi.com/v2/account/0xa7087458E33D97e574C506D18029C8e3d7EafB6e/token?kind=ft&size=100",
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Basic ` + btoa(`${accessKey}:${secretKey}`),
          "x-chain-id": 1001,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.items;
      });
    return dataFetch;
  } catch (e) {
    console.log(e);
  }
};

export const getStockDetail = async (stockAddress) => {
  try {
    const getURI = await SearchSTOURI(stockAddress);
    return getURI;
  } catch {
    console.log("ERROR!");
  }
};
// 0xd8cB493ab47d173cB7ecF9952f39Fa78055B775D
export const getStocksByAddress = async (walletAddress) => {
  try {
    let dataFetch = await fetch(
      `https://th-api.klaytnapi.com/v2/account/${walletAddress}/token?kind=ft&size=10`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Basic ` + btoa(`${accessKey}:${secretKey}`),
          "x-chain-id": 1001,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data.items;
      });
    return dataFetch;
  } catch (e) {
    console.log(e);
  }
};

// timeStamp 계산
const timeStamp = (input) => {
  const milliseconds = input * 1000;
  const date = new Date(milliseconds);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

// Metadata 가져오기
const getMetadata = async (uri) => {
  try {
    const data = await fetch(uri)
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 오류 또는 HTTP 오류");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return data;
  } catch (e) {
    console.log(e);
  }
};

// const url = `https://th-api.klaytnapi.com/v2/account/${address}/token`;
// const nftsByKas = await axios
//   .get(url, {
//     auth: {
//       username: accessKey,
//       password: secretKey,
//     },
//     headers: {
//       "Content-Type": `application/json`,
//       "x-chain-id": "1001",
//     },
//   })
//   .then((res) => {
//     console.log(res);
//     return res.data.items;
//   });

// const queryOptions = {
//   size: 5,
//   status: caver.kas.kip7.queryOptions.status.DEPLOYED,
// };
// const result = await caver.kas.kip7.getContractList(queryOptions);

// for (let i = 0; i < nftsByKas.length; i++) {
//   if (nftsByKas[i].kind !== "nft") {
//     continue;
//   } else {
//     const nftInfo = {
//       contractAddress: nftsByKas[i].contractAddress,
//       tokenId: toNumber(nftsByKas[i].extras.tokenId),
//       createdAt: timeStamp(nftsByKas[i].updatedAt),
//       chain: "Klaytn Baobab",
//       transactionHash: nftsByKas[i].lastTransfer.transactionHash,
//     };
//     const metaData = await getMetadata(nftsByKas[i].extras.tokenUri);
//     nftInfo.name = metaData.name;
//     nftInfo.description = metaData.description;

//     if (metaData.image.slice(0, 4) === "ipfs") {
//       const ipfsHash = metaData.image.slice(7);
//       const checkUri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
//       nftInfo.image = checkUri;
//     } else {
//       nftInfo.image = metaData.image;
//     }

//     if (metaData.attributes) {
//       nftInfo.attributes = metaData.attributes;
//     }

//     NFTList.push(nftInfo);
//   }
// }
