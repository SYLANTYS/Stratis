import React from "react";
import { BuyForm } from "../typings";
import SidebarRow from "./SidebarRow";

interface Props {
  buyform: BuyForm[];
}

export default function Sidebar({ buyform }: Props) {
  const Leaderboard: { area: number; name: string; webURL: string }[] = [];
  buyform.forEach((form) => {
    let xwidth = (form.xlastcoord! - form.xfirstcoord) * 10 + 10;
    if (form.xfirstcoord === -1) {
      xwidth = 10;
    }

    let yheight = (form.ylastcoord! - form.yfirstcoord) * 10 + 10;
    if (form.yfirstcoord === -1) {
      yheight = 10;
    }

    let area = xwidth * yheight;
    Leaderboard.push({ area: area, name: form.name, webURL: form.websiteURL });
  });

  Leaderboard.sort(function (a, b) {
    return b.area - a.area;
  });

  return (
    <div className="col-span-1 sm:col-span-2 flex flex-col items-center px-4 pt-7">
      <p className="text-lg border-b-2 border-black mb-1 hidden sm:inline">
        Leaderboard
      </p>
      <div className="hidden sm:inline">
        <div className="flex flex-col mb-7">
          <SidebarRow
            title={Leaderboard[0]?.name || "Add Project"}
            place={1}
            webURL={Leaderboard[0]?.webURL || "#"}
          />
          <SidebarRow
            title={Leaderboard[1]?.name || "Add Project"}
            place={2}
            webURL={Leaderboard[1]?.webURL || "#"}
          />
          <SidebarRow
            title={Leaderboard[2]?.name || "Add Project"}
            place={3}
            webURL={Leaderboard[2]?.webURL || "#"}
          />
          <SidebarRow
            title={Leaderboard[3]?.name || "Add Project"}
            place={4}
            webURL={Leaderboard[3]?.webURL || "#"}
          />
          <SidebarRow
            title={Leaderboard[4]?.name || "Add Project"}
            place={5}
            webURL={Leaderboard[4]?.webURL || "#"}
          />
        </div>
      </div>

      <div className="text-center flex flex-col gap-1">
        <p className="text-lg border-b-2 border-black mb-1 hidden sm:inline">
          Socials
        </p>
        <SidebarRow
          title="OpenSea"
          image="../opensea.png"
          webURL="https://opensea.io/PSylantys"
        />
        <SidebarRow
          title="Discord"
          image="../discord.png"
          webURL="https://discord.gg/Vj8kqjcY2g"
        />
        <SidebarRow
          title="Youtube"
          image="../yt.png"
          webURL="https://www.youtube.com/channel/UCDDTovZbkCovSXh9hZUw7Yg"
        />
        <SidebarRow
          title="Twitter"
          image="../twitter.png"
          webURL="https://twitter.com/sylantys"
        />
        <SidebarRow
          title="Reddit"
          image="../reddit.png"
          webURL="https://www.reddit.com/user/psylantys"
        />
        {/* <SidebarRow title="Instagram" image="../insta.png" webURL="#" />
        <SidebarRow title="TikTok" image="../tiktok.png" webURL="#" /> */}
      </div>
    </div>
  );
}
