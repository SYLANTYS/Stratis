import React from "react";

interface Props {
  title: string;
  image?: string;
  place?: number;
  webURL?: string;
}

export default function SidebarRow({ title, place, webURL, image }: Props) {
  return (
    <div className="cursor-pointer sm:px-3 sm:py-2 py-8 transition-all hover:border-r-4 border-white">
      <a href={webURL} className="flex items-center gap-2">
        {image && <img src={image} alt="" className="sm:h-5 sm:w-5 h-16 w-16 brightness-0" />}
        <p className="text-lg font-light hidden sm:inline">
          {place ? place + ". " + title : title}
        </p>
      </a>
    </div>
  );
}
