import { Link } from "react-router-dom";
import { getStocksByAddress } from "../api/kasCall.js";
import { useState, useEffect } from "react";

export default function GetMyStocks({ address, upDateBalance }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    const stocks = await getStocksByAddress(address);
    const balanStock = stocks.filter(
      (el) =>
        el.contractAddress === "0xd8cb493ab47d173cb7ecf9952f39fa78055b775d"
    );
    const stockOutbalan = stocks.filter(
      (el) =>
        el.contractAddress !== "0xd8cb493ab47d173cb7ecf9952f39fa78055b775d"
    );
    if (balanStock) upDateBalance(parseInt(balanStock[0].balance));
    setTokens(stockOutbalan.slice(0, 5));
  };

  return (
    <div className=" w-full flex flex-col gap-2 border-t-2 border-black ">
      {tokens.map((el) => (
        <Link
          to={`/stockDetail/${el.contractAddress}`}
          key={el.contractAddress}
          className="rounded-md text-center hover:bg-sky-100"
        >
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
