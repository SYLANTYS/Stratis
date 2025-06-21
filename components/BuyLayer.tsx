import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BuyForm, BuyFormBody } from "../typings";
import { fetchBuyForm } from "../utils/fetchBuyForm";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  xcoords: number;
  ycoords: number;
  firstXcoord: number;
  firstYcoord: number;
  getSelectGridOpen: Function;
  getImgURL: Function;
  setBuyform: Dispatch<SetStateAction<BuyForm[]>>;
  getTransation: Function;
}

export default function BuyLayer({
  xcoords,
  ycoords,
  firstXcoord,
  firstYcoord,
  getSelectGridOpen,
  getImgURL,
  setBuyform,
  getTransation,
}: Props) {
  const { data: session } = useSession();

  const [buyForm, setBuyForm] = useState({ name: "", webURL: "", imgURL: "" });
  const [selectGridOpen, setSelectGridOpen] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [priceConverter, setPriceConverter] = useState<number>();

  const [transaction, setTransaction] = useState<string>(
    "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
  );
  const [value, setValue] = useState<string>("0x0");

  let gridCoords;
  if (buyForm.imgURL === "") {
    gridCoords = (
      <p>
        Enter image URL first <br></br> then click 'Reset Grid'
      </p>
    );
  } else if (xcoords === -1) {
    gridCoords = <p>Click on the grid!</p>;
  } else if (xcoords !== -1 && firstXcoord === -1) {
    gridCoords = (
      <p className="text-center">
        Coordinates: ({xcoords}, {ycoords}) <br></br>
        <br></br> Click towards bottom right <br></br> for larger image!
      </p>
    );
  } else {
    gridCoords = (
      <p className="text-center">
        Coordinates: ({firstXcoord}, {firstYcoord}) ({xcoords}, {ycoords})
      </p>
    );
  }

  let totalSpaceValueETH = 0;
  if (firstXcoord === -1) {
    totalSpaceValueETH = 10;
  } else if (firstXcoord !== -1) {
    totalSpaceValueETH =
      (1 + Math.abs(xcoords - firstXcoord)) *
      (1 + Math.abs(ycoords - firstYcoord)) *
      10;
  }

  const postBuyForm = async () => {
    const buyFormBody: BuyFormBody = {
      name: buyForm.name,
      websiteURL: buyForm.webURL,
      imageURL: buyForm.imgURL,
      xfirstcoord: firstXcoord,
      yfirstcoord: firstYcoord,
      xlastcoord: xcoords,
      ylastcoord: ycoords,
      hash: transaction,
      email: session?.user?.email || "No Email",
    };

    const result = await fetch(`/api/addBuyForm`, {
      body: JSON.stringify(buyFormBody),
      method: "POST",
    });

    const json = await result.json();

    const newBuyForm = await fetchBuyForm();
    setBuyform(newBuyForm);

    return json;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postBuyForm();

    setBuyForm((prevForm) => ({
      ...prevForm,
      name: "",
      webURL: "",
      imgURL: "",
    }));
    setSelectGridOpen(false);
    getSelectGridOpen(!selectGridOpen);
    setTransaction(
      "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
    );
    getTransation(
      "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
    );
    setValue("0x0");
  };

  //start of metamask/ethereum code

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/coins/eth-ethereum/ohlcv/today")
      .then((res) => res.json())
      .then((data) => setPriceConverter(data[0].close));
  }, [selectGridOpen]);

  // Requests access to the user's Meta Mask Account
  let accounts: any;

  async function sendTransaction() {
    if (typeof window.ethereum !== "undefined") {
      accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err: any) => {
          console.log(err);
        });
      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        }) // This should be 0x1 for MainNet Ethereum
        .then(async () => {
          let params = [
            {
              from: accounts[0],
              to: process.env.NEXT_PUBLIC_MYACCOUNT,
              gas: Number(21000).toString(16),
              gasPrice: Number(2500000).toString(16),
              value: Number(
                (totalSpaceValueETH / priceConverter!) * 1000000000000000000
              ).toString(16),
            },
          ];

          if (selectGridOpen && xcoords !== -1) {
            setTransaction("txhash");
            getTransation("txhash");
            await window.ethereum
              .request({ method: "eth_sendTransaction", params })
              .then((txhash: any) => {
                setTransaction(txhash);
                toast("Click Submit");
              })
              .catch((err: any) => {
                getTransation(
                  "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
                ),
                  setTransaction(
                    "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
                  );
              });
          } else {
            toast("Click Select Grid First");
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      toast("Add MetaMask To Your Browser");
    }
  }

  async function verifyTransaction() {
    if (typeof window.ethereum !== "undefined") {
      if (value !== "0x0") {
        toast("Submitted", {
          icon: "🚀",
        });
      } else if (
        transaction !==
        "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
      ) {
        toast("Click Submit Again To Confirm");
      } else {
        toast("You Have To Buy First");
      }

      await window.ethereum
        .request({ method: "eth_getTransactionByHash", params: [transaction] })
        .then((receipt: any) => {
          setValue(receipt.value);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      toast("Add MetaMask To Your Browser");
    }
  }

  return (
    <div className="sm:col-span-2 hidden sm:inline font-light pt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-2 gap-5"
      >
        <p className="text-lg border-b-2 border-black font-normal">
          Your Project
        </p>
        <input
          onChange={(e) =>
            setBuyForm((prevForm) => ({
              ...prevForm,
              name: e.target.value,
            }))
          }
          value={buyForm.name}
          type="text"
          placeholder="Enter Project Name"
          className="p-2 outline-none border-2 bg-transparent placeholder:text-black rounded-md hover:bg-white border-white duration-300"
          required
        />
        <input
          onChange={(e) =>
            setBuyForm((prevForm) => ({
              ...prevForm,
              webURL: e.target.value,
            }))
          }
          value={buyForm.webURL}
          type="text"
          placeholder="Enter Website URL"
          className="p-2 outline-none border-2 bg-transparent placeholder:text-black rounded-md hover:bg-white border-white duration-300"
          required
        />
        <input
          ref={imageInputRef}
          onChange={(e) =>
            setBuyForm((prevForm) => ({
              ...prevForm,
              imgURL: e.target.value,
            }))
          }
          value={buyForm.imgURL}
          type="text"
          placeholder="Enter Image URL"
          className="p-2 outline-none border-2 bg-transparent placeholder:text-black rounded-md hover:bg-white border-white duration-300"
          required
        />
        {transaction ===
          "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce" && (
          <button
            onClick={() => (
              getSelectGridOpen(!selectGridOpen),
              getImgURL(buyForm.imgURL),
              setSelectGridOpen(!selectGridOpen)
            )}
            type="button"
            className="cursor-pointer px-4 py-3 border-2 rounded-md hover:bg-white border-white hover:-translate-y-1 duration-300"
          >
            {selectGridOpen ? "Reset Grid" : "Select Grid"}
          </button>
        )}

        {selectGridOpen &&
          transaction ===
            "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce" &&
          gridCoords}

        <button
          type="button"
          onClick={sendTransaction}
          className="cursor-pointer px-4 py-3 border-2 rounded-md hover:bg-white border-white hover:-translate-y-1 duration-300"
        >
          Buy
          {selectGridOpen &&
            xcoords !== -1 &&
            (" (" + totalSpaceValueETH / priceConverter!).substring(0, 8) +
              " ETH)"}
        </button>

        <button
          type={
            xcoords !== -1 &&
            value !== "0x0" &&
            transaction !==
              "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
              ? "submit"
              : "button"
          }
          onClick={verifyTransaction}
          className="cursor-pointer px-4 py-3 border-2 rounded-md hover:bg-white border-white hover:-translate-y-1 duration-300"
        >
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}
