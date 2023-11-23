import { useLoaderData } from "react-router-dom";
import { stockDataHeaderDetail } from "../../dataSet";
import { browseOrderBook } from "../../api/caver";
import { useEffect } from "react";

export default function OrderBook() {
  const { stockAddress } = useLoaderData();

  const stockInfo = stockDataHeaderDetail.filter(
    (el) => el.walletAddress === stockAddress
  )[0];

  const initOrderBook = async () => {
    const orderContract = await browseOrderBook(stockInfo.orderBookContract);
    console.log(orderContract);
  };

  useEffect(() => {
    initOrderBook();
  });
  console.log(stockInfo);
  return (
    <div className="w-9/12 m-auto  rounded-md">
      <button>aa</button>
      <button>bb</button>

      <div className="flex justify-around text-center my-2">
        <div>
          <div className="text-4xl font-semibold w-full mt-4 mb-2  ">
            Order Lists
          </div>
          <div className="text-2xl font-bold  mt-2">{stockInfo.name}</div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="text-md font-bold  ">
            wallet:{stockInfo.walletAddress}
          </div>
          <div className="text-md font-bold  ">
            orderBook: {stockInfo.orderBookContract}
          </div>
        </div>
      </div>
      <div className="flex flex-col  text-center font-semibold m-auto mt-8 text-2xl shadow-lg">
        <div className="flex justify-around">
          <div className="py-8 w-4/12 text-red-500">
            <p>Best Bid</p>
            <p className="text-3xl font-extrabold">322$</p>
          </div>
          <div className="py-8 w-4/12 text-blue-500">
            <p>Best Ask</p>
            <p className="text-3xl font-extrabold ">324$</p>
          </div>
        </div>
        <div className="w-11/12 m-auto mb-8 h-80 bg-zinc-50 flex ">
          <div className="w-1/2 flex items-end">
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  `}
            ></div>
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-red-500 w-1/12`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 5 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 12 + "em" }}
              className={`bg-red-500 w-1/12 `}
            ></div>
          </div>
          <div className="w-1/2 flex items-end">
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 7 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 5 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 3 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 7 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 5 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 3 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 3 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12 `}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex mt-4 shadow-xl">
        <div className="flex-col w-1/2">
          <div className="flex justify-around text-xl sha font-semibold border-r-2 py-1 border-black">
            <div>size</div>
            <div>bid</div>
          </div>
          <div className="flex justify-around text-xl ">
            <div>1</div>
            <div>1</div>
          </div>
        </div>
        <div className="flex-col  w-1/2">
          <div className="flex justify-around text-xl font-semibold">
            <div>size</div>
            <div>Ask</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loaderForOrderBook({ params }) {
  //fetch("서버",{});
  console.log(params.stockId);
  const stockAddress = params.stockId;
  return { stockAddress };
}
