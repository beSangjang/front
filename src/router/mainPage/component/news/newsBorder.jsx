import NewsComp from "./newsComp";
import { section } from "../../../../dataSet";

export default function NewsBorder() {
  return (
    <div className="border border-black my-8 rounded-xl w-full">
      <div className="flex flex-col w-11/12 ml-8 mb-12 gap-2 ">
        <p className="text-2xl font-bold my-6">News</p>
        <div className="flex w-full justify-around gap-2 ">
          <div className="w-5/12">
            <div className="flex justify-between">
              <p className="text-2xl">total</p>
              <a href="/" className="text-red-700">
                see more
              </a>
            </div>
            <NewsComp section={section.total} />
          </div>
          <div className="w-5/12">
            <div className="flex justify-between">
              <p className="text-2xl">ipo</p>
              <a href="/" className="text-red-700">
                see more
              </a>
            </div>
            <NewsComp section={section.ipo} />
          </div>
        </div>

        <div className="flex justify-around  w-full gap-2">
          <div className="w-5/12">
            <div className="flex justify-between">
              <p className="text-2xl">sto</p>
              <a href="/" className="text-red-700">
                see more
              </a>
            </div>

            <NewsComp section={section.sto} />
          </div>
          <div className="w-5/12">
            <div className="flex justify-between">
              <p className="text-2xl">web3</p>
              <a href="/" className="text-red-700">
                see more
              </a>
            </div>

            <NewsComp section={section.web3} />
          </div>
        </div>
      </div>
    </div>
  );
}
