"use client";

import Tabs from "./Tabs.js";
import UnityGame from "./UnityGame.js";

const tabs = [
  {
    id: "info",
    label: "Info",
    content: <p>This is info</p>,
  },
  {
    id: "leaderBoard",
    label: "Leaderboard",
    content: <p>Statistics here</p>,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-white">
      <div id="header" className="bg-[#231F20] p-5 w-full flex justify-center">
        <img src="Logo.png" className="w-[20%]"/>
      </div>
      <div id="content" className="bg-[#231F20] w-full flex flex-col justify-center items-center">
        <UnityGame />
        <Tabs tabs={tabs}/>
      </div>
    </div>
  );
}