import { Link } from "react-router-dom";
import { getStocksByAddress } from "../api/kasCall.js";
import { useState, useEffect } from "react";

export default function GetMyStocks({ address }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    const stocks = await getStocksByAddress(address);
    setTokens(stocks.slice(0, 5));
    console.log(stocks);
  };

  return (
    <div className=" w-full flex flex-col gap-2 border-t-4 border-black ">
      {tokens.map((el) => (
        <Link to="/" className="rounded-md text-center hover:bg-sky-100">
          <div className=" h-16  flex justify-between pt-4">
            <div className="w-2/12 text-xl font-bold">{el.extras.name}</div>
            <div className="w-2/12 overflow-hidden">{el.contractAddress}</div>
            <div className="w-2/12">{el.extras.symbol}</div>
            <div className="w-2/12">{parseInt(el.balance, 0)}개</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
