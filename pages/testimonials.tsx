import Head from "next/head";
import React from "react";

export default function testimonials() {
  return (
    <div className="bg-gradient-to-r from-gray-400 via-blue-600 to-gray-400 h-screen flex justify-center items-center flex-col font-medium text-2xl">
      <Head>
        <title>Testimonials/Reviews</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-gray-100 h-[75%] rounded-md relative w-[85%] sm:w-[550px] md:w-[550px] lg:w-[55%]">
        <p className="text-center py-4">Testimonials/Reviews</p>
        <div className="flex px-[10%] gap-4">
          <img
            src="https://lh3.googleusercontent.com/a-/AFdZucpythTeSKc6O0nbVFvIg9F1NK2LM3YKjHvheG_y=s96-c"
            className="h-10 w-10 rounded-full"
            alt="Patrick Sylantys"
            title="Patrick Sylantys"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <p className="text-lg border-b border-gray-300 pb-1">Patrick Sylantys</p>
            <p className="font-normal text-sm">
              This is the best website for advertising your crypto/nft projects!{" "}
              <br /> Hope you like it!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 flex flex-col justify-center items-center p-5 rounded-md w-full gap-2">
          <p className="text-sm text-center">
            Send me an Email if you like this website idea!
          </p>
          <a
            href="mailto:psylantys@gmail.com"
            className="text-blue-500 text-sm"
          >
            psylantys@gmail
          </a>
        </div>
      </div>
    </div>
  );
}
