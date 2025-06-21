import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import BuyLayer from "../components/BuyLayer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NFTGrid from "../components/NFTGrid";
import Sidebar from "../components/Sidebar";
import { BuyForm } from "../typings";
import { fetchBuyForm } from "../utils/fetchBuyForm";

interface Props {
  buyform: BuyForm[];
}

const Home = ({ buyform: buyformProp }: Props) => {
  const [buyform, setBuyform] = useState<BuyForm[]>(buyformProp);

  const [xcoords, setXCoords] = useState<number>(-1);
  const [ycoords, setYCoords] = useState<number>(-1);

  const [x1coords, setX1Coords] = useState<number>(-1);
  const [y1coords, setY1Coords] = useState<number>(-1);

  const [gridOpen, setGridOpen] = useState(false);

  const [image, setImage] = useState<string>("");

  const [transaction, setTransaction] = useState<string>(
    "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce"
  );

  useEffect(() => {
      setXCoords(-1);
      setYCoords(-1);
      setX1Coords(-1);
      setY1Coords(-1);
  }, [gridOpen]);

  useEffect(() => {
    if (x1coords === -1 || y1coords === -1) {
      setX1Coords(firstXcoord.current);
      setY1Coords(firstYcoord.current);
    }
  }, [xcoords, ycoords]);

  const firstXcoord = useRef<number>(-1);
  useEffect(() => {
    firstXcoord.current = xcoords;
  }, [xcoords]);

  const firstYcoord = useRef<number>(-1);
  useEffect(() => {
    firstYcoord.current = ycoords;
  }, [ycoords]);

  return (
    <div className="mx-auto relative bg-blue-100">
      <Head>
        <title>Stratis - The Project Grid</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="description" content="Stratis.app provides easy access to the NFT and Cryptocurrency space. Stratis is an 'r/place' for NFT projects, crypto ideas, million dollar NFT projects, and a community to share your crypto projects." />
      </Head>

      <Header />
      <main className="grid grid-cols-9 sm:grid-cols-12 bg-gradient-to-r from-gray-300 via-blue-300 to-gray-300 sm:w-[1519px] w-[1150px]">
        <Sidebar buyform={buyform} />

        <NFTGrid
          getXCoords={(x: number) => setXCoords(x)}
          getYCoords={(y: number) => setYCoords(y)}
          xcoords={xcoords}
          ycoords={ycoords}
          firstXcoord={x1coords}
          firstYcoord={y1coords}
          gridOpen={gridOpen}
          image={image}
          buyform={buyform}
          transaction={transaction}
        />

        <BuyLayer
          xcoords={xcoords}
          ycoords={ycoords}
          firstXcoord={x1coords}
          firstYcoord={y1coords}
          getSelectGridOpen={(gridOpen: boolean) => setGridOpen(gridOpen)}
          getImgURL={(image: string) => setImage(image)}
          setBuyform={setBuyform}
          getTransation={(transaction: string) => setTransaction(transaction)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const buyform = await fetchBuyForm();

  return {
    props: {
      buyform,
    },
  };
};
