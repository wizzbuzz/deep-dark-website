"use client";

import { useEffect, useRef } from "react";

export default function UnityGame() {
  const canvasRef = useRef(null);
  const unityInstanceRef = useRef(null);
  const buildPath = "/game/Build/Deep Dark v1.22";

  useEffect(() => {
    // Load the Unity loader script
    const script = document.createElement("script");
    script.src = `${buildPath}.loader.js`;
    script.async = true;
    
    script.onload = () => {
      if (canvasRef.current && window.createUnityInstance) {
        window.createUnityInstance(canvasRef.current, {
          arguments: [],
          dataUrl: `${buildPath}.data.br`,
          frameworkUrl: `${buildPath}.framework.js.br`,
          codeUrl: `${buildPath}.wasm.br`,
          streamingAssetsUrl: "/game/StreamingAssets",
          companyName: "Joop",
          productName: "Deep Dark",
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
