import { Link, useLoaderData } from "react-router-dom";
import { stockDataHeaderDetail } from "../../dataSet";
import StockGraph from "./components/stockGraph";
import JaemooGraph from "./components/jaemooGraph";
import OctagonGraph from "./components/octagonGraph";

export default function StockDetail() {
  const { stockDetail } = useLoaderData();

  console.log(stockDetail);
  return (
    <div className="flex flex-col w-8/12 m-auto mt-8">
      <p className="text-2xl font-bold">{stockDetail.name}</p>
      <p className="text-3xl font-bold ">{stockDetail.price}</p>
      <p
        className={`text-md font-bold ${
          stockDetail.isPositive ? "text-blue-500" : "text-red-500"
        }`}
      >
        {stockDetail.isPositive ? "+" : "-"}
        {3241}₩
      </p>
      <div className="flex justify-between gap-8 h-96 my-4">
        <div className="w-8/12 border">
          <StockGraph></StockGraph>
        </div>
        <div className="w-4/12 border-2 pl-2 py-3 border-black rounded-md text-md flex flex-col ">
          <p className="border-b py-3">
            Prev.Close:
            <span className="font-bold"> {stockDetail.endPointWon}</span>
          </p>
          <p className="border-b py-3">
            Current Price:
            <span className="font-bold">{stockDetail.price}</span>
          </p>
          <p className="border-b py-3">
            Day's Range:
            <span className="font-bold">
              {stockDetail.bounderyStart}~{stockDetail.bounderyEnd}
            </span>
          </p>
          <p className="border-b py-3">
            Market Cap:
            <span className="font-bold"> {stockDetail.totalPrice}</span>
          </p>
          <p className="border-b py-3">
            EPS:
            <span className="font-bold"> {stockDetail.incomeByStock}</span>
          </p>
          <p className="border-b py-3">
            Earning Rate:
            <span className="font-bold"> {stockDetail.incomeBySalary}</span>
          </p>
          <p className="pt-3">
            Recent Transactions:
            <span className="font-bold"> {3}</span>
          </p>
          <Link
            className="border border-black rounded-md self-end mr-4 py-1 px-2 bg-amber-300"
            to={`/stockDetail/${stockDetail.index}/orderBook`}
          >
            go Trade
          </Link>
        </div>
      </div>
      <div className="border border-black rounded-lg w-full mt-3 flex flex-col pl-4 py-4">
        <p className="text-xl font-bold">company Info</p>
        <p className="texl-sm px-4 mb-4">
          퓨처웍스 컴퍼니는 혁신과 미래를 위한 솔루션을 제공하는 글로벌
          기업입니다. 우리는 최첨단 기술과 창의적인 아이디어를 결합하여 다양한
          분야에서 고객의 비즈니스를 향상시키고 지속 가능한 성장을 돕는 데
          전념하고 있습니다.
        </p>
        <p className="pb-2 border-b border-1 ">
          인덱스 번호:{stockDetail.index}
        </p>
        <p className="pb-2 border-b border-1 ">기업이름:{stockDetail.name}</p>
        <p className="pb-2 border-b border-1 ">
          사업자 번호:{stockDetail.businessNum}
        </p>
        <p className="pb-2 border-b border-1 ">
          설립일:{stockDetail.establishment}
        </p>
        <p className="pb-2 border-b border-1 ">대표자:{stockDetail.ceo}</p>
        <p className="pb-2 border-b border-1 ">산업:{stockDetail.industry}</p>
        <p className="pb-2 border-b border-1 ">
          기업형태:{stockDetail.typeofCompany}
        </p>
        <p className="pb-2 border-b border-1 ">
          종업원수:{stockDetail.Employees}
        </p>
        <p className="pb-2 border-b border-1 ">
          본사주소:{stockDetail.companyAddress}
        </p>
        <p className="">홈페이지:{stockDetail.websiteAddress}</p>
      </div>
      <div className="border border-black rounded-lg w-full mt-3 flex flex-col h-80 pl-4 py-4">
        <JaemooGraph></JaemooGraph>
        재무재표
      </div>
      <div className="border border-black rounded-lg w-full mt-3 flex flex-col h-80 pl-4 py-4">
        <OctagonGraph></OctagonGraph>
        오각형 그래프
      </div>
    </div>
  );
}

export async function loaderForDetail({ params }) {
  //fetch("서버",{});
  console.log(params);
  const stockDetail = stockDataHeaderDetail[params.stockId];
  return { stockDetail };
}
