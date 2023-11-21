import { Link } from "react-router-dom";

export default function FlowChartEl({ stockInfo }) {
  return (
    <div className="w-68 px-8 ">
      <Link
        to={`stockDetail/${stockInfo.walletAddress}`}
        className="flex h-16 rounded-md hover:bg-slate-200 hover:cursor-pointer"
      >
        <div className="flex flex-col justify-between">
          <div className="text-xl">{stockInfo.name}</div>
          <div
            className={`${
              stockInfo.isPositive ? "text-red-500" : "text-blue-400"
            } flex justify-between text-md  gap-8`}
          >
            <div>
              {(stockInfo.isPositive ? "+" : "-") + stockInfo.percentage + "%"}
            </div>
            <div className=" text-right">{stockInfo.price + "₩"}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
