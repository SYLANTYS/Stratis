import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center sm:px-3 sm:py-2 p-0 bg-gradient-to-r from-black via-blue-400 to-black font-light text-sm text-white font-[Inter] sm:w-[1519px] w-[1150px]">
      <div className="flex-1">
        <div className="flex items-center sm:pl-7 sm:space-x-2 justify-start">
          <a
            className="cursor-pointer rounded-full px-3 py-2 transition-all duration-200 hover:bg-blue-900 hidden sm:inline"
            href="mailto:psylantys@gmail.com"
          >
            Contact Me
          </a>
          <Link href="/testimonials">
            <a className="cursor-pointer rounded-full sm:px-3 sm:py-2 p-8 transition-all duration-200 hover:bg-blue-900 text-5xl sm:text-sm tracking-tighter sm:tracking-normal">
              Testimonials
            </a>
          </Link>
        </div>
      </div>

      <h1 className="text-8xl sm:text-4xl py-10 sm:p-0 font-normal cursor-pointer"><a href="/">STRATIS</a></h1>

      <div className="flex-1">
        <div className="flex items-center sm:p-2 p-7 space-x-2 justify-end">
          <p className="hidden sm:inline">Share Crypto Projects Here ⬇️⬇️⬇️</p>
          <button
            className="cursor-pointer rounded-full sm:px-3 sm:py-2 p-8 transition-all duration-200 hover:bg-blue-900 text-5xl sm:text-sm tracking-tighter sm:tracking-normal"
            onClick={() => (session ? signOut?.() : signIn?.())}
          >
            {session ? "Sign Out" : "Sign In"}
          </button>
          {status === "authenticated" && (
            <img
              className="sm:h-10 sm:w-10 h-16 w-16 rounded-full cursor-pointer"
              src={session.user?.image!}
              title={session.user?.name!}
              alt=""
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
