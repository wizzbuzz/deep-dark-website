"use client";

import { useEffect, useState } from "react";
import Tabs from "./Tabs.js";
import UnityGame from "./UnityGame.js";

export default function Home() {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/db', {
          method: 'POST'
        });
        const data = await response.json();
        setLeaderBoard(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const tabs = [
    {
      id: "info",
      label: "Info",
      content: <p>This is info</p>,
    },
    {
      id: "leaderBoard",
      label: "Leaderboard",
      content: (
        <div className="p-4 space-y-2">
          {leaderBoard.length === 0 ? (
            <p>No leaderboard data yet.</p>
          ) : (
            leaderBoard.map((player, index) => (
              <div key={player.id ?? `${player.username}-${index}`} className="flex justify-between border-b border-[#F24405] pb-1">
                <span>{index + 1}. {player.username}</span>
                <span>{player.score}</span>
              </div>
            ))
          )}
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-white">
      <div id="header" className="bg-[#231F20] p-5 w-full flex justify-center">
        <img src="Logo.png" className="w-[20%]"/>
      </div>
      <div id="content" className="bg-[#231F20] w-full flex flex-col justify-center items-center">
        <UnityGame />
        <div className="py-2">

          <Tabs tabs={tabs}/>
        </div>
      </div>
    </div>
  );
}