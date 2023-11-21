import { Link } from "react-router-dom";

export default function RawStockBlock({ stockInfo, changeDetail }) {
  return (
    <div
      onClick={() => {
        changeDetail(stockInfo.index);
      }}
      className="flex  justify-between rounded-md h-6 hover:bg-slate-200 hover:cursor-pointer "
    >
      <div className="text-xl">{stockInfo.name}</div>
      <div
        className={`${
          stockInfo.isPositive ? "text-red-500" : "text-blue-400"
        } flex justify-between text-xl gap-10`}
      >
        <div>
          {(stockInfo.isPositive ? "▲" : "▼") + stockInfo.percentage + "%"}
        </div>
        <div className="w-24 text-right">{"₩" + stockInfo.price}</div>
      </div>
    </div>
  );
}
