"use client";

import { useEffect, useRef } from "react";

export default function UnityGame() {
  const canvasRef = useRef(null);
  const unityInstanceRef = useRef(null);

  useEffect(() => {
    // Load the Unity loader script
    const script = document.createElement("script");
    script.src = "/game/Build/Dungeon Keeper v0.9.3.loader.js";
    script.async = true;
    
    script.onload = () => {
      if (canvasRef.current && window.createUnityInstance) {
        window.createUnityInstance(canvasRef.current, {
          arguments: [],
          dataUrl: "/game/Build/Dungeon Keeper v0.9.3.data",
          frameworkUrl: "/game/Build/Dungeon Keeper v0.9.3.framework.js",
          codeUrl: "/game/Build/Dungeon Keeper v0.9.3.wasm",
          streamingAssetsUrl: "/game/StreamingAssets",
          companyName: "DefaultCompany",
          productName: "Manpack",
          productVersion: "0.2.0",
        }).then((unityInstance) => {
          unityInstanceRef.current = unityInstance;
        }).catch((message) => {
          console.error("Unity loading error:", message);
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="unity-canvas"
      width={1050}
      height={500}
      tabIndex={-1}
      style={{
        width: "1050px",
        height: "500px",
        background: "#231F20",
      }}
    />
  );
}
