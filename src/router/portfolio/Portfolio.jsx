import { stockDataForPortfolio } from "../../dataSet";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import GetMyStocks from "../../components/MyStocks";
import { claimPUSD, SearchSTOURI } from "../../api/caver";

export default function PortfolioPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [chainId, setChainId] = useState(0);
  const [pseudoDollar, setPseudoDollar] = useState(0);
  const [claimPUSDState, setClaimPUSDState] = useState(true);
  const changePseudoBalance = (balance) => {
    setPseudoDollar(balance);
  };

  useEffect(() => {
    getCurrentWalletConneted();
  }, []);
  useEffect(() => {
    addWalletListener();
  }, [walletAddress, chainId]);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const getCurrentWalletConneted = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (account.length > 0) {
          // setNfts(<GetMyNFTs address={account[0]}></GetMyNFTs>);
          //alert 뜸
          setWalletAddress(account[0]);
          const balance = await provider.getBalance(account[0]);
          setWalletBalance(ethers.formatEther(balance));
          setChainId(chainId);
        } else {
          console.log("connectMetamask error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No metamask");
    }
  };

  const handleAccountChange = async (accounts) => {
    setWalletAddress(accounts[0]);
    const balance = await provider.getBalance(accounts[0]);
    setWalletBalance(ethers.formatEther(balance));
  };

  const hadleChainChanged = async (chainId) => window.location.reload();

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccountChange(accounts);
      });
      window.ethereum.removeListener("accountsChanged", (accounts) => {
        handleAccountChange(accounts);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        hadleChainChanged(chainId);
      });

      window.ethereum.removeListener("chainChanged", (chainId) => {
        hadleChainChanged(chainId);
      });
    } else {
    }
  };

  return (
    <div className="flex flex-col w-8/12 mx-auto">
      <div className="w-full border-black border-2 mt-12 px-12 py-10 rounded-lg flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-3xl font-bold ">My Wallet</p>
          <div className=" flex gap-20">
            <div className="px-2 py-1 border border-black rounded-2xl hover:cursor-pointer hover:bg-yellow-200">
              see Previous Transactions
            </div>
            <div className="px-2 py-1 border border-black rounded-2xl hover:cursor-pointer hover:bg-yellow-200">
              Portfolio
            </div>
          </div>
        </div>
        <p className="text-xl pt-4">
          <span className=" font-bold">Current Chain:</span>
          {chainId === "0x3e9"
            ? "Klay BaoBaB"
            : "make sure to connect with Klaytn Baobob to Use Service"}
        </p>
        <div className="flex justify-between">
          <p className="text-xl ">
            <span className=" font-bold">pseudo Dollar:</span>
            {pseudoDollar} PSDC
          </p>
          <div
            onClick={async () => {
              if (claimPUSDState) {
                setClaimPUSDState(false);
                await claimPUSD(walletAddress).then((Res) => console.log(Res));
                setClaimPUSDState(true);
              }
            }}
            className={`border border-black py-2 px-4 rounded-xl ${
              claimPUSDState
                ? "hover:cursor-pointer hover:bg-cyan-300"
                : "bg-slate-300"
            }`}
          >
            {claimPUSDState
              ? "claim PUSD for Test!!"
              : "Sending....., Reload the Page when its done"}
          </div>
        </div>
        <p className="text-xl pb-4 ">
          <span className=" font-bold">wallet Address</span>
          {walletAddress}
        </p>

        <div className="text-mg flex">
          <div className="w-1/2">
            <span className="font-bold">Klay:</span>
            {walletBalance}
          </div>
          <div className="w-1/2">
            <span className="font-bold">dividend:</span>
            {
              walletBalance + 32 //배당
            }
          </div>
        </div>
        <div className="text-mg flex">
          <div className="w-1/2">
            <span className="font-bold">total earn:</span>
            {walletBalance + 33}%
          </div>
          <div className="w-1/2">
            <span className="font-bold">fee rate:</span>
            {walletBalance + 34}
          </div>
        </div>
        <div className="text-mg flex">
          <div className="w-1/2">
            <span className="font-bold">total buy</span>
            {walletBalance + 35}
          </div>
          <div className="w-1/2">
            <span className="font-bold">total sell</span>
            {walletBalance + 36}
          </div>
        </div>
      </div>

      <div className="w-full border-black border-2 mt-12 px-12 py-8 rounded-lg flex flex-col gap-2">
        <p className="text-2xl font-bold my-4">My STO List</p>
        <div className="flex flex-col">
          <div className="flex font-bold text-xl justify-between  text-center my-2">
            <div className="w-1/6">name</div>
            <div className="w-1/6">contractAddress</div>
            <div className="w-1/6">ticker</div>
            <div className="w-1/6">amount</div>
          </div>
          <div className="flex flex-col text-center w-full">
            {
              // nfts
              // GetMyNFTs(walletAddress)
              walletAddress === "" ? (
                <div></div>
              ) : (
                <GetMyStocks
                  address={walletAddress}
                  upDateBalance={changePseudoBalance}
                />
              )
            }
          </div>
        </div>
      </div>

      <div className="w-full border-black border-2 mt-12 px-12 py-8 rounded-lg flex flex-col gap-2">
        <p className="text-2xl font-bold ">주주총회</p>
        <div className="flex flex-col text-xl justify-between   my-2">
          <div className="w-1/6">삼성전자</div>
          <div className="w-1/6">ibm</div>
          <div className="w-1/6">Johnson & Johnson</div>
          <div className="w-1/6">Walmart</div>
          <div className="w-1/6">Alphabet</div>
          <div className="w-1/6">Netflix</div>
        </div>
      </div>
    </div>
  );
}
