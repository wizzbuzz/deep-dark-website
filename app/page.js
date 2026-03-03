"use client";

import { useEffect, useState } from "react";
import Tabs from "./Tabs.js";
import UnityGame from "./UnityGame.js";

function CapitalizeFirstLetter(str){
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
        console.log("YES! " + data.result.length);
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
      content: <p className="p-5 leading-7">
        The labyrinth awakens whenever greed enters its halls. <br/>
        A soul is drawn into the labyrinth: one who believes escape lies beyond the final door. But something awakens to ensure the price is paid. <br/>
        Coins glitter in the darkness, promises of fortune scattered like bait, while the Beast prowls as judge, hunter, and former contender who once reached too far. <br/>
        Here, survival and pursuit are the same trial seen from different sides — to gather is to risk, to hunt is to remember, and the maze records every heartbeat. <br/>
        Only one will leave the ledger richer, but both are forever part of the game.
        </p>,
    },
    {
      id: "leaderBoard",
      label: "Leaderboard",
      content: (
        <div className="w-full h-full px-3">
            {leaderBoard.length === 0 ? (
              <p>No leaderboard data yet.</p>
            ) : (
              <table className="w-full h-full">
              {leaderBoard.map((player, index) => (
                <tr key={index} className="border-b-2 border-[#F24405]">
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.role}</td>
                <td>{player.score}</td>
              </tr>
            ))}
              </table>
            )}
          
        </div>
        // <div className="p-4 space-y-2">
        //   {leaderBoard.length === 0 ? (
        //     <p>No leaderboard data yet.</p>
        //   ) : (
        //     leaderBoard.map((player, index) => (
        //       <div key={player.id ?? `${player.username}-${index}`} className="flex justify-between border-b border-[#F24405] pb-1">
        //         <span>{index + 1}. {player.username}</span>
        //         <span>{CapitalizeFirstLetter(player.role)}</span>
        //         <span>{player.score}</span>
        //       </div>
        //     ))
        //   )}
        // </div>
      )
    },
  ];

  return (
    <div id="body" className="min-h-screen bg-zinc-50 font-sans text-white">
      <div id="header" className="bg-[#f0e9eb] p-5 w-full flex justify-center">
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