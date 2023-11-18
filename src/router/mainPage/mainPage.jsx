import FlowChart from "../../components/flowChart/flowChart";
import { useState } from "react";
import RawStockBlock from "../../components/rawStockBlock/rawStockBlock";

import {
  stockDataHeader,
  CategoryData,
  dummyStocks,
  stockDataHeaderDetail,
} from "../../dataSet";

import Category from "./component/categori";
import { Link } from "react-router-dom";
import NewsBorder from "./component/news/newsBorder";

export default function MainPage() {
  const tenStock = stockDataHeader.slice(0, 9);

  const [stockData, setStockData] = useState(dummyStocks.recentUpdate);
  const [selCategory, setSelCategory] = useState("recentUpdate");

  const [currentDetail, setCurrentDetail] = useState(
    stockDataHeaderDetail[tenStock[1].index]
  );
  const callCategory = (e) => {
    //console.log(e.target.id+"클릭됨")
    if (e.target.id === "recentUpdate") {
      setStockData(dummyStocks.recentUpdate);
      setSelCategory("recentUpdate");
    } else if (e.target.id === "mostPopular") {
      setStockData(dummyStocks.mostPopular);
      setSelCategory("mostPopular");
    } else if (e.target.id === "ipo") {
      setStockData(dummyStocks.ipo);
      setSelCategory("ipo");
    } else if (e.target.id === "dividend") {
      setStockData(dummyStocks.dividend);
      setSelCategory("dividend");
    } else if (e.target.id === "marketCap") {
      setStockData(dummyStocks.marketCap);
      setSelCategory("marketCap");
    }
  };

  function changeDetail(data) {
    setCurrentDetail(stockDataHeaderDetail[data]);
  }

  return (
    <div className="flex flex-col w-8/12 m-auto mt-4">
      <FlowChart></FlowChart>

      <div className="w-full  flex gap-4 mt-8  ">
        <div className="w-8/12 border border-black py-3 px-6  rounded-2xl">
          <div className="text-2xl font-bold  pt-2 pb-4   ">
            <p className="text-2xl py-2">You may be interested in</p>
          </div>
          <div className="flex justify-between border-b border-black mb-4 pb-2 text-xl font-semibold">
            <div className="">name</div>
            <div className="flex gap-10 justify-between w-44">
              <div>Ratio</div>
              <div lassName="w-24 text-right">price</div>
            </div>
          </div>
          {tenStock.map((el) => {
            return (
              <div className="pb-4 ">
                <RawStockBlock
                  stockInfo={el}
                  changeDetail={changeDetail}
                ></RawStockBlock>
              </div>
            );
          })}
        </div>
        <div className="w-4/12 border border-black rounded-2xl">
          <div className="w-11/12 m-auto mt-6">
            <img
              src="https://coinsect-production.s3.ap-northeast-2.amazonaws.com/boards/free_board/0f374ad1-c336-4f65-9c4b-9e1c4f485152_%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-05-30%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25204.19.12.png"
              alt=""
            ></img>
            <div className="flex flex-col gap-3">
              <div className="mt-2 text-2xl font-semibold">
                {currentDetail.name}
              </div>
              <div>
                Prev.Close :$
                {
                  currentDetail.endPointWon //전일 종가
                }
              </div>
              <div>
                Day's Range :${currentDetail.bounderyStart} - $
                {
                  currentDetail.bounderyEnd //일일 등락
                }
              </div>
              <div>
                Market Cap :$
                {
                  currentDetail.totalPrice
                  //  시가 총액
                }
              </div>
              <div>
                PER :
                {
                  currentDetail.incomeBySalary //주당 순이익 대비 주가 수준
                }
                $
              </div>
              <div>
                EPS :
                {
                  currentDetail.incomeByStock //주당 순이익
                }
                $
              </div>
              <Link
                className="border bg-red-200 py-1 mb-1 border-black self-end w-24 rounded-md"
                to={`/stockDetail/${currentDetail.index}`}
              >
                <div className="text-center">see More</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 border border-black rounded-2xl flex gap-4 mt-8  min-h-max flex-col">
        <div>
          <p className="my-4 text-2xl font-bold">Category</p>
          <div className="flex gap-4 my-4 ">
            <button
              className={`border-solid rounded-md px-2 py-1 text-lg ${
                selCategory === "recentUpdate" ? "font-bold" : "nomal"
              } hover:bg-sky-100`}
              id="recentUpdate"
              onClick={(e) => callCategory(e)}
            >
              Recently Uploaded
            </button>
            <button
              className={`border-solid rounded-md px-2 py-1 text-lg ${
                selCategory === "mostPopular" ? "font-bold" : "nomal"
              } hover:bg-sky-100`}
              id="mostPopular"
              onClick={(e) => callCategory(e)}
            >
              High Volume
            </button>
            <button
              className={`border-solid rounded-md px-2 py-1 text-lg  ${
                selCategory === "ipo" ? "font-bold" : "nomal"
              } hover:bg-sky-100`}
              id="ipo"
              onClick={(e) => callCategory(e)}
            >
              IPO Scheduled
            </button>
            <button
              className={`border-solid rounded-md px-2 py-1 text-lg  ${
                selCategory === "dividend" ? "font-bold" : "nomal"
              } hover:bg-sky-100`}
              id="dividend"
              onClick={(e) => callCategory(e)}
            >
              Close Earning Date
            </button>
            <button
              className={`border-solid rounded-md px-2 py-1 text-lg  ${
                selCategory === "marketCap" ? "font-bold" : "nomal"
              } hover:bg-sky-100`}
              id="marketCap"
              onClick={(e) => callCategory(e)}
            >
              High MarketCap
            </button>
          </div>
          <Category data={stockData}></Category>
          {/*카테고리를 누르면 해당 카테고리에 맞는 STO를 보여줘야 함*/}
        </div>
      </div>

      <NewsBorder />
    </div>
  );
}
