import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchResult from "./squareBlock/searchResult";
import { initialAddKey } from "../api/caver";

export default function Header() {
  const [search, setSearch] = useState("Search");
  const [searchFocus, setSearchFocus] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  let navigate = useNavigate();

  // const getWalletConnect = async () => {
  //   const enterPrivate = await prompt(
  //     "enter pivate wallt Account to use, \n !!!! you should make new wallet, without any assets in it, this app is only demonstration purpose, we didn't implement any encryption, confidential to secure your key!!!!!!"
  //   );

  //   initialAddKey(walletAddress, enterPrivate);
  // };

  useEffect(() => {
    getCurrentWalletConneted();
    addWalletListener();
    initialAddKey();
  }, []);

  const getCurrentWalletConneted = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (account != undefined && account.length > 0) {
          setWalletAddress(account[0]);
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

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      setWalletAddress("");
    }
  };

  return (
    <div className="border sticky border-b-black  w-screen z-10">
      <div className="h-16 flex justify-around items-center">
        <div className="w-15 ml-20">
          <Link to="/">
            <img src="/logo.png" className="w-14" alt="12" />
          </Link>
        </div>

        <div className="flex gap-8">
          <div>
            <input
              className="bg-gray-100 rounded-full focus:outline-none"
              type="text"
              placeholder=" search"
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
            {searchFocus && <SearchResult searchTxt={search} />}
          </div>
          <div>
            <Link to={"/aa"}>what is </Link>
          </div>
          <div>
            <Link to={"/mint"}>Information</Link>
          </div>
          <div>
            <button
              onClick={() => {
                if (walletAddress !== undefined && walletAddress !== "") {
                  navigate("/myPortfolio");
                } else {
                  alert("connect Metamask");
                }
              }}
            >
              My PortFolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
