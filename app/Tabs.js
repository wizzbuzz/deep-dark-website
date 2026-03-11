"use client"
import {useState} from "react";

export default function Tabs({tabs}){
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const current = tabs.find(t => t.id === activeTab);

  return (
    <div className="tab-box">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? "active bg-[#F24405]" : ""} text-[20px] px-2 py-1`}
            >
              {tab.label}
          </button>
        ))}
      </div>

    <div className="content w-[600] min-h-[500] border-2 border-[#F24405]">
        {current.content}
      </div>
    </div>
  )
}