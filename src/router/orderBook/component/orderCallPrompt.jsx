import { useState } from "react";

export default function OrderCallPrompt({
  nameOfStock,
  isSell,
  price,
  quantity,
  sellCallFunction,
  buyCallFunction,
  cancelPrompt,
}) {
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="z-10 fixed top-0 left-0 w-screen h-screen ">
      <div className="m-auto flex w-10/12 h-5/6 mt-10 z-999 py-8 bg-white rounded-xl  border border-black">
        <div className="m-auto w-7/12 px-6 h-full border border-black bg-white text-center overflow-scroll rounded-xl">
          <p className="text-2xl my-12 font-bold">SHARE TRANSFER AGREEMENT</p>
          <p className="text-xl my-12">
            this Shares Transfer Agreement (the "Agreement ") is effective xx,
            decenber, 2023
          </p>
          <div className="flex text-left my-5 mt-16">
            <div className="w-3/12 font-bold">BETWEEN</div>
            <div className="w-9/12 text-sm">
              {nameOfStock} (the "Transferor"), a company oragnized and existing
              under the laws of the [State/Province] of [State/province], with
              its head office located at: 목적
            </div>
          </div>
          <div className="flex text-left my-5 mb-16 ">
            <div className="w-3/12 font-bold">AND</div>
            <div className="w-9/12 text-sm">
              <p>
                홍길동 (the "Transferor"), a company oragnized and existing
                under the laws of the [State/Province] of [State/province], with
                its head office located at: 목적
              </p>
            </div>
          </div>
          <p className="text-xl my-8 font-bold">WHEREAS</p>
          <p className="text-left text-sm">
            1. The unsersigned is the registered and beneficial owner of
            [number] class [specify] shares in the capital stock of [company
            name] corporation ("[company name]")
          </p>
          <p className="text-left my-8 mb-12 text-sm">
            2. the undersigned wishes to sell and transfer the said shares to
            [company name](the "Transeree");
          </p>
          <p className="text-left my-8">
            NOW THEREFORE, FOR VALUE RECEIVED, the undersigned hereby sells,
            assigns and transfers unto the Transferee [number] class [specify]
            shares of [company name] regisered in the name of the undersigned on
            the books of [company name].
          </p>
          <p className="text-left my-8 mb-8">
            IN WITNESS WHEREOF, each party to this aggrement has caused it to be
            executed a [place of execution] on the date indicated above
          </p>
        </div>
        <div className="m-auto w-4/12 h-3/4  flex flex-col justify-start">
          <div className="h-4/12 text-center my-12">
            <p className=" text-3xl ">Call Order</p>
          </div>
          <div className="h-6/12">
            <p className="text-sm">
              <span className="font-bold">Company Name:</span> {nameOfStock}
            </p>
            <p className="text-sm">
              <span className="font-bold">orderbook Address:</span>{" "}
              {"0xa7087458e33d97e574c506d18029c8e3d7eafb6e"}
            </p>

            <p className="text-sm">
              <span className="font-bold">Number Of Share:</span> {quantity}
            </p>
            <p className="text-sm">
              <span className="font-bold">call Type:</span>{" "}
              {isSell ? "ASK" : "BID"}
            </p>
            <p className="text-sm">
              <span className="font-bold">Price Per Share:</span>
              {price}
            </p>
            <p className="text-sm">
              <span className="font-bold">total Price:</span>
              {price * quantity}$
            </p>
            <input
              type="text"
              placeholder="type your PrivateKey to init transaction"
              className="w-full"
              onChange={(e) => {
                setPrivateKey(e.target.value);
                console.log(privateKey);
              }}
            ></input>
          </div>
          <div className="flex w-full justify-around">
            <div
              onClick={() => {
                isSell
                  ? sellCallFunction(privateKey)
                  : buyCallFunction(privateKey);
              }}
              className="text-center font-bold hover:cursor-pointer my-8"
            >
              Make Call
            </div>
            <div
              onClick={() => {
                cancelPrompt();
              }}
              className="text-center font-bold hover:cursor-pointer my-8"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
