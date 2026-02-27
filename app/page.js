import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-white">
      <div id="header" className="flex justify-center p-2 bg-gray-900 w-full h-10%">
        <img src="Logo.png" className="w-[20%]"/>
      </div>
      <div id="header" className="bg-gray-900 w-full flex justify-center">
        <div id="game" className="w-200 h-100 bg-white p-10">
            <p>
              Game
            </p>
          </div>
          
      </div>
    </div>
  );
}