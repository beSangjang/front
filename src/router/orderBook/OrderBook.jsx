import { useLoaderData } from "react-router-dom";
import { stockDataHeaderDetail } from "../../dataSet";
import { ethers } from "ethers";
import {
  browseOrderBook,
  generateOrderBookContract,
  initialAddKey,
  placeBuyOrder,
  placeSellOrder,
} from "../../api/caver";
import { useEffect, useState } from "react";
import OrderCell from "./component/orderCell";
import OrderCallPrompt from "./component/orderCallPrompt";

export default function OrderBook() {
  const { stockAddress } = useLoaderData();
  const [walletAddress, setWalletAddress] = useState("");
  const [sellOrderBookList, setSellOrderBookList] = useState([]);
  const [buyOrderBookList, setBuyOrderBookList] = useState([]);
  const [buyPrice, setBuyPrice] = useState(12);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [sellPrice, setSellPrice] = useState(14);
  const [sellQuantity, setSellQuantity] = useState(800);
  const [callPrompt, setCallPrompt] = useState(<div></div>);

  const cancelPrompt = () => {
    setCallPrompt(<div></div>);
  };
  const stockInfo = stockDataHeaderDetail.filter(
    (el) => el.walletAddress === stockAddress
  )[0];

  const getCurrentWalletConneted = async () => {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (account.length > 0) {
        setWalletAddress(account[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCurrentWalletConneted();
  }, []);

  const initOrderBook = async () => {
    const orderBookList = await browseOrderBook(stockInfo.orderBookContract);
    console.log(orderBookList[0][0]);
    setBuyOrderBookList(orderBookList[0].filter((el) => el.quantity !== "0"));
    setSellOrderBookList(orderBookList[1].filter((el) => el.quantity !== "0"));
  };

  const buyCall = async (walletPrivate) => {
    let result;
    console.log(walletAddress);
    console.log(buyPrice);
    console.log(buyQuantity);

    try {
      result = await placeBuyOrder(
        stockInfo.orderBookContract,
        "0x5eac59edadee5f59148d396c241117bbba14c220",
        stockAddress,
        buyPrice,
        buyQuantity,
        walletAddress,
        walletPrivate
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log(result);
      window.location.reload();
    }
  };

  const sellCall = async (walletPrivate) => {
    let result;
    try {
      result = await placeSellOrder(
        stockInfo.orderBookContract,
        "0x5eac59edadee5f59148d396c241117bbba14c220",
        stockAddress,
        sellPrice,
        sellQuantity,
        walletAddress,
        walletPrivate
      );
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  useEffect(() => {
    initOrderBook();
  }, []);
  // console.log(stockInfo);
  return (
    <div className="w-9/12 m-auto  rounded-md">
      {callPrompt}
      <div className="flex justify-around text-center my-2">
        <div>
          <div className="text-4xl font-semibold w-full mt-4 mb-2  ">
            Order Lists
          </div>
          <div className="text-2xl font-bold  mt-2">{stockInfo.name}</div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="text-md font-bold  ">
            wallet Address:{walletAddress}
          </div>
          <div className="text-md font-bold  ">
            stock Address:{stockInfo.walletAddress}
          </div>
          <div className="text-md font-bold  ">
            orderBook: {stockInfo.orderBookContract}
          </div>
        </div>
      </div>
      <div className="flex flex-col  text-center font-semibold m-auto mt-8 text-2xl shadow-lg">
        <div className="flex justify-around">
          <div className="py-8 w-4/12 text-red-500 ">
            <p>Best Bid</p>
            <p className="text-3xl font-extrabold">322$</p>
          </div>
          <div className="py-8 w-4/12 text-blue-500">
            <p>Best Ask</p>
            <p className="text-3xl font-extrabold ">324$</p>
          </div>
        </div>
        <div className="w-11/12 m-auto mb-8 h-80 bg-zinc-50 flex ">
          <div className="w-1/2 flex items-end justify-center">
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-200 `}
            ></div>
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100 `}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12   hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12   hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 5 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100 `}
            ></div>
          </div>
          <div className="w-1/2 flex items-end">
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100 `}
            ></div>
            <div
              style={{ height: 1 * 7 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 5 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 3 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 7 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 5 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 2 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 3 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 3 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
            <div
              style={{ height: 1 * 1 + "em" }}
              className={`bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100`}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-around my-8">
        <div className=" pl-4 py-8  rounded-xl shadow-lg w-5/12">
          <div>
            <div>Quantity</div>
            <input
              onChange={(e) => {
                setBuyQuantity(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={buyQuantity}
              className="border border-gray-300 rounded-lg w-11/12"
            ></input>
          </div>
          <div>
            <div>price</div>
            <input
              onChange={(e) => {
                setBuyPrice(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={buyPrice}
              className="border border-gray-300 rounded-lg w-11/12"
            ></input>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-8 mt-4 border  rounded-3xl hover:text-red-700 py-2 px-1 text-sm"
              onClick={() => {
                return setCallPrompt(
                  <OrderCallPrompt
                    nameOfStock={stockInfo.name}
                    isSell={false}
                    price={buyPrice}
                    quantity={buyQuantity}
                    sellCallFunction={sellCall}
                    buyCallFunction={buyCall}
                    cancelPrompt={cancelPrompt}
                  />
                );
              }}
            >
              Place Buy Call
            </button>
          </div>
        </div>
        <div className="pl-4 py-8 rounded-xl shadow-lg w-5/12">
          <div>
            <div>Quantity</div>
            <input
              onChange={(e) => {
                setSellQuantity(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={sellQuantity}
              className="border border-gray-300 rounded-lg w-11/12"
            ></input>
          </div>
          <div>
            <div>price</div>
            <input
              onChange={(e) => {
                setSellPrice(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={sellPrice}
              className="border border-gray-300 rounded-lg w-11/12"
            ></input>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-8 mt-4 border  rounded-3xl hover:text-red-700 py-2 px-1 text-sm"
              onClick={() => {
                return setCallPrompt(
                  <OrderCallPrompt
                    nameOfStock={stockInfo.name}
                    isSell={true}
                    price={sellPrice}
                    quantity={sellQuantity}
                    sellCallFunction={sellCall}
                    buyCallFunction={buyCall}
                    cancelPrompt={cancelPrompt}
                  />
                );
              }}
            >
              place Sell Call
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-4 shadow-xl">
        <div className="flex-col w-1/2">
          <div className="flex justify-around text-xl sha font-semibold border-r-2 py-1 border-black">
            <div>size</div>
            <div>bid</div>
          </div>
          {buyOrderBookList.map((el) => {
            return <OrderCell orderInfo={el} />;
          })}
        </div>
        <div className="flex-col  w-1/2">
          <div className="flex justify-around text-xl font-semibold">
            <div>size</div>
            <div>Ask</div>
          </div>
          {sellOrderBookList.map((el) => {
            return <OrderCell orderInfo={el} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function loaderForOrderBook({ params }) {
  console.log(params.stockId);
  const stockAddress = params.stockId;
  return { stockAddress };
}
