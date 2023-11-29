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
import Loading from "../../components/loading/Loading";

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
  const [isLoading, setIsLoading] = useState(false);
  const [graphHeight, setGraphHeight] = useState(0);
  const [graphSell, setGraphSell] = useState([]);
  const [graphBuy, setGraphBuy] = useState([]);

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

  const orderAggregator = (list, isSell) => {
    if (list.length === 0) {
      return [];
    }
    const orderList = [];
    if (isSell) {
      const basePrice = parseInt(list[0].price);
      console.log(basePrice);
      for (let i = 0; i < 12; i++) {
        orderList.push({
          quantity: 0,
          price: basePrice + i,
        });
        for (let j = 0; j < list.length; j++) {
          if (orderList[i].price === parseInt(list[j].price)) {
            orderList[i].quantity += parseInt(list[j].quantity);
          }
        }
      }
      for (let j = 0; j < list.length; j++) {
        if (orderList[orderList.length - 1].price < parseInt(list[j].price)) {
          orderList[orderList.length - 1].quantity += parseInt(
            list[j].quantity
          );
        }
      }
    } else {
      const basePrice = parseInt(list[0].price);
      console.log(basePrice);
      for (let i = 0; basePrice - i > 0 && i < 12; i++) {
        orderList.push({
          quantity: 0,
          price: basePrice - i,
        });
        for (let j = 0; j < list.length; j++) {
          if (orderList[i].price === parseInt(list[j].price)) {
            orderList[i].quantity += parseInt(list[j].quantity);
          }
        }
      }
      for (let j = 0; j < list.length; j++) {
        if (orderList[orderList.length - 1].price > parseInt(list[j].price)) {
          orderList[orderList.length - 1].quantity += parseInt(
            list[j].quantity
          );
        }
      }
    }
    return orderList;
  };

  const initOrderBook = async () => {
    const orderBookList = await browseOrderBook(stockInfo.orderBookContract);
    let biggestAmount = 0;
    console.log(orderBookList);
    const sellOrders = orderBookList[1].filter((el) => el.quantity !== "0");
    const buyOrders = orderBookList[0].filter((el) => el.quantity !== "0");

    for (let i = 0; i < orderBookList[0].length; i++) {
      if (biggestAmount < orderBookList[0][i].quantity) {
        biggestAmount = orderBookList[0][i].quantity;
      }
    }
    for (let i = 0; i < orderBookList[1].length; i++) {
      if (biggestAmount <= parseInt(orderBookList[1][i].quantity)) {
        biggestAmount = orderBookList[1][i].quantity;
        console.log(biggestAmount, orderBookList[1][i].quantity);
      }
    }
    setGraphHeight(12 / biggestAmount);
    console.log(sellOrders);
    setGraphSell(orderAggregator(sellOrders, true));
    setGraphBuy(orderAggregator(buyOrders, false));
    setBuyOrderBookList(buyOrders);
    setSellOrderBookList(sellOrders);
  };

  const buyCall = async (walletPrivate) => {
    setIsLoading(true);
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
      setIsLoading(false);
      // window.location.reload();
    }
  };

  const sellCall = async (walletPrivate) => {
    setIsLoading(true);

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
      setIsLoading(false);
      // window.location.reload();
    }
  };

  useEffect(() => {
    initOrderBook();
  }, []);
  // console.log(stockInfo);
  return (
    <div className="w-9/12 m-auto  rounded-md">
      {isLoading ? <Loading /> : <div></div>}
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
      <div className="flex flex-col  text-center font-semibold m-auto mt-8 text-2xl shadow-lg rounded-lg">
        <div className="flex justify-around">
          <div className="py-8 w-4/12 text-red-500 ">
            <p>Best Bid</p>
            <p className="text-3xl font-extrabold">
              {graphBuy.length != 0 ? graphBuy[0].price : 0}$
            </p>
          </div>
          <div className="py-8 w-4/12 text-blue-500">
            <p>Best Ask</p>
            <p className="text-3xl font-extrabold ">
              {graphSell.length != 0 ? graphSell[0].price : 0}$
            </p>
          </div>
        </div>
        <div className="w-11/12 m-auto mb-8 h-80 bg-zinc-50 flex ">
          <div className="w-1/2 flex flex-row-reverse items-end justify-start">
            {graphBuy.map((el) => {
              return (
                <div
                  style={{ height: el.quantity * graphHeight + "em" }}
                  className={`border border-red-700 bg-red-500 w-1/12  hover:bg-red-600 hover:-translate-y-1 hover:scale-110 duration-100 `}
                ></div>
              );
            })}
          </div>
          <div className="w-1/2 flex items-end">
            {graphSell.map((el) => {
              return (
                <div
                  style={{ height: el.quantity * graphHeight + "em" }}
                  className={`border border-blue-700 bg-blue-500 w-1/12  hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-100 `}
                ></div>
              );
            })}
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
                if (graphSell.length === 0 || buyPrice > graphSell[0].price) {
                  return alert(
                    "price of BuyCall  shouldn't be over Best SellCall!"
                  );
                } else {
                  setCallPrompt(
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
                }
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
                if (graphSell.length === 0 || sellPrice < graphBuy[0].price) {
                  return alert(
                    "price of sellCall  shouldn't be over Best buyCall!"
                  );
                } else {
                  setCallPrompt(
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
                }
              }}
            >
              place Sell Call
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-4 shadow-xl mb-12">
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
