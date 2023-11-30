import { Link, useLoaderData } from "react-router-dom";
import { stockDataHeaderDetail } from "../../dataSet";
import StockGraph from "./components/stockGraph";
import JaemooGraph from "./components/jaemooGraph";
import OctagonGraph from "./components/octagonGraph";
import { getStockDetail } from "../../api/kasCall";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

export default function StockDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { stockAddress } = useLoaderData();
  const [stockDetail, setStockDetail] = useState("");
  const [fold, setFold] = useState(true);
  const stockData = stockDataHeaderDetail.filter(
    (el) => el.walletAddress === stockAddress
  )[0];

  const getDetail = async () => {
    setIsLoading(true);
    const CID = await getStockDetail(stockAddress);
    const jsonData = await fetch(
      `https://coffee-generous-tahr-8.mypinata.cloud/ipfs/${CID}`
    ).then((res) => {
      setIsLoading(false);
      return res.json();
    });
    console.log(jsonData);
    setStockDetail(jsonData);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="flex flex-col w-8/12 m-auto mt-8">
      {isLoading ? <Loading /> : <div></div>}
      <p className="text-3xl font-bold">{stockData.name}</p>
      <p className="text-4xl font-bold ">{stockData.price}₩</p>
      <p
        className={`text-lg font-bold ${
          stockData.isPositive ? "text-blue-500" : "text-red-500"
        }`}
      >
        {stockData.isPositive ? "+" : "-"}
        {241}₩
      </p>
      <div className="flex justify-between gap-8 h-96 my-4">
        <div className="w-8/12 border">
          <StockGraph></StockGraph>
        </div>
        <div className="w-4/12 border-2 pl-2 py-3 border-black rounded-md text-md flex flex-col ">
          <p className="border-b py-3">
            Prev.Close:
            <span className="font-bold"> {stockData.endPointWon}</span>
          </p>
          <p className="border-b py-3">
            Current Price:
            <span className="font-bold">{stockData.price}</span>
          </p>
          <p className="border-b py-3">
            Day's Range:
            <span className="font-bold">
              {stockData.bounderyStart}~{stockData.bounderyEnd}
            </span>
          </p>
          <p className="border-b py-3">
            Market Cap:
            <span className="font-bold">
              {" "}
              {stockData.price * stockData.totalShare}
            </span>
          </p>
          <p className="border-b py-3">
            EPS:
            <span className="font-bold"> {stockData.incomeByStock}</span>
          </p>
          <p className="border-b py-3">
            Earning Rate:
            <span className="font-bold"> {stockData.incomeBySalary}</span>
          </p>
          <p className="pt-3">
            Recent Transactions:
            <span className="font-bold"> {3}</span>
          </p>
          <Link
            className="border border-black rounded-md self-end mr-4 py-1 px-2 bg-amber-300"
            to={`/stockDetail/orderBook/${stockAddress}`}
          >
            go Trade
          </Link>
        </div>
      </div>
      <div className="border border-black rounded-lg w-full mt-3 flex flex-col pl-4 py-4">
        <p className="text-3xl py-3 font-bold">company Info</p>
        <p className="text-lg text-gray-700 px-4 mb-4">
          {stockDetail.introduction}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold">Index:</span>
          {stockDetail.index}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold">company name:</span>
          {stockDetail.companyName}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold">business No:</span>
          {stockDetail.businessNo}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold"> established date:</span>
          {stockDetail.establishDate}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold">CEO:</span>
          {stockDetail.CEO}
        </p>

        <p className="pb-2 border-b border-1 ">
          <span className="font-bold"> industry:</span>
          {stockDetail.industry}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold">number of employees:</span>
          {stockDetail.numberOfEmployees}
        </p>
        <p className="pb-2 border-b border-1 ">
          <span className="font-bold">location of HR:</span>
          {stockDetail.location}
        </p>
        <p className="">
          <span className="font-bold">website:</span>
          {stockDetail.website}
        </p>
      </div>
      <div className="border border-black rounded-lg w-full mt-3 flex flex-col  pl-4 py-4">
        <div className="flex  justify-around">
          <p className="text-2xl font-semibold">Finance Statement</p>
          {fold ? (
            <div
              className="hover:cursor-pointer w-16 text-xl border border-black rounded-lg"
              onClick={() => {
                setFold(!fold);
              }}
            >
              unfold
            </div>
          ) : (
            <div
              className="hover:cursor-pointer w-16 text-xl border border-black rounded-lg"
              onClick={() => {
                setFold(!fold);
              }}
            >
              fold
            </div>
          )}
        </div>
        {stockData.financialStatement ? (
          fold ? (
            <div className=" text-2xl my-12 h-40 bg-white">
              unfold to see financial Statment
            </div>
          ) : (
            <JaemooGraph
              jaemooJson={stockData.financialStatement}
            ></JaemooGraph>
          )
        ) : (
          <div className="text-2xl font-semibold my-4">
            This firm hasn't opened its financial statements.
          </div>
        )}
      </div>
      <div className="border border-black rounded-lg w-full mt-3 flex flex-col h-80 pl-4 py-4">
        <OctagonGraph></OctagonGraph>
        OctagonGraph with test value
      </div>
    </div>
  );
}

export async function loaderForDetail({ params }) {
  //fetch("서버",{});
  console.log(params.stockId);
  const stockAddress = params.stockId;
  return { stockAddress };
}
