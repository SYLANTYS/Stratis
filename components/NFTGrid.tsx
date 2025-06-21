import React, { useRef, useState } from "react";
import { BuyForm } from "../typings";
import Gridimg from "./Gridimg";

interface Props {
  getXCoords: Function;
  getYCoords: Function;
  xcoords: number;
  ycoords: number;
  firstXcoord: number;
  firstYcoord: number;
  gridOpen: boolean;
  image: string;
  buyform: BuyForm[];
  transaction: string;
}

export default function NFTGrid({
  getXCoords,
  getYCoords,
  xcoords,
  ycoords,
  firstXcoord,
  firstYcoord,
  gridOpen,
  image,
  buyform,
  transaction,
}: Props) {
  const data = Array(100).fill(1);
  var x = data.map((v, i) => v + i);
  var y = data.map((v, i) => v + i);

  let xwidth = (xcoords - firstXcoord) * 10 + 10;
  if (xcoords - firstXcoord < 0) {
    xwidth = 10;
  }

  let yheight = (ycoords - firstYcoord) * 10 + 10;
  if (ycoords - firstYcoord < 0) {
    yheight = 10;
  }

  function gridCoordRequest(x: number, y: number) {
    if (gridOpen) {
      getXCoords(x), getYCoords(y);
    }
  }

  return (
    <div className="col-span-8 pb-20 w-[1000px]">
      <div className="bg-white shadow-gray-600 shadow-xl w-[1000px] relative">
        <img
          className="w-full opacity-5"
          useMap="#image-map"
          src="/100x100.jpg"
          alt=""
        />

        {/* link with a tag on image */}
        {xcoords !== -1 && gridOpen && (
          <img
            onClick={() => console.log("bruh")}
            className={`absolute cursor-pointer`}
            style={
              firstXcoord === -1
                ? {
                    left: xcoords * 10 - 10,
                    top: ycoords * 10 - 10,
                    width: 10,
                    height: 10,
                  }
                : {
                    left: firstXcoord * 10 - 10,
                    top: firstYcoord * 10 - 10,
                    width: xwidth,
                    height: yheight,
                  }
            }
            src={image}
            title="example project image"
            alt=""
          />
        )}
        {buyform.map((form) => (
          <Gridimg key={form._id} form={form} />
        ))}
      </div>

      {/* https://cdn.vox-cdn.com/thumbor/ZkmdkuJUTLgJh96_FWQ5zweGGxo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg */}

      {/* all grid coords with area tag */}
      {gridOpen &&
        transaction ===
          "0x08e66afc467496862b68c61e3c97027542fd31142369771c358550a343b604ce" && (
          <map name="image-map">
            {y.map((y) =>
              x.map((x) => (
                <area
                  className="cursor-pointer"
                  key={x}
                  onClick={() => gridCoordRequest(x, y)}
                  alt={"x=" + x + ", y=" + y}
                  title={"x=" + x + ", y=" + y}
                  coords={
                    x * 10 -
                    10 +
                    "," +
                    (y * 10 - 10) +
                    "," +
                    x * 10 +
                    "," +
                    y * 10
                  }
                  shape="rect"
                />
              ))
            )}
          </map>
        )}

      <div className="my-20 px-10 sm:p-0">
        <div className="text-center mb-12">
          <p className="inline sm:hidden text-4xl">(Buy Only On Desktop)</p>
        </div>
        <h4 className="text-7xl sm:text-3xl font-bold pb-1 font-[inter]">Why Share Your Project?</h4>
        <p className="my-10 sm:my-5 text-5xl sm:text-lg">
          <strong className="text-gray-700">Stratis is an online billboard and crypto community. </strong>
          Promote your work and connect by reaching out in a fun and exciting environment.
        </p>
        <p className="my-10 sm:my-5 text-5xl sm:text-lg">
          The successful projects in crypto (NFTs, DAOs, and DeFi) have outperformed in revenue compared to regular online startups and softwares.
        </p>
        <p className="my-10 sm:my-5 text-5xl sm:text-lg">
          Additionally, we are still early in the uses of crypto. When most people think of crypto, they only imagine buying or selling Bitcoin and Ethereum which is just the tip of the iceberg.
        </p>
        <p className="my-10 sm:my-5 text-5xl sm:text-lg">
          Likewise, people interested in learning more about crypto have a hard time sifting through Reddit or Twitter to find good investments and services. 
          On Stratis, people can click around, find interesting teams, and 
          <strong className="text-gray-700"> avoid FOMOing into popular projects from Youtube.</strong>
        </p>
        <p className="my-10 sm:my-5 text-5xl sm:text-lg">
          Add your project once and gain traction automatically from my efforts of promoting Stratis.
        </p>
        <p className="my-10 sm:my-5 text-5xl sm:text-lg">
          - Patrick Sylantys
        </p>
      </div>
      <div className="w-[70%] m-auto">
        <div className="bg-white shadow-gray-600 shadow-lg rounded-lg my-16">
          <h2 className="text-center text-4xl sm:text-lg font-medium text-black py-10">
            NFT History of All Submitted Projects <br /> Coming Soon...
          </h2>
        </div>
      </div>
    </div>
  );
}
