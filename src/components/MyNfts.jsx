import { getStocksByAddress } from "../api/kasCall.js";
import { useState, useEffect } from "react";

export default function GetMyStocks({ address }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    const stocks = await getStocksByAddress(address);
    setTokens(stocks);
    console.log(stocks);
  };

  return (
    <div>
      <div>
        {tokens.map((el) => (
          <div className="flex items-center mb-8" key={el.contractAddress}>
            <div>
              <p>{el.kind}</p>
              {el.balance}
              {el.contractAddress}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
