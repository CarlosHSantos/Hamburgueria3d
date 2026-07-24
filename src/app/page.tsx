"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HtmlOverlay from "@/components/HtmlOverlay";

// Dynamic import with SSR disabled (video uses browser APIs)
const ScrollVideo = dynamic(() => import("@/components/ScrollVideo"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      {/* Fixed video background — z-index 1 */}
      <ScrollVideo />

      {/* Fixed Navbar — z-index 50 */}
      <Navbar />

      {/* Scrollable HTML overlay — z-index 10 */}
      <div className="html-overlay">
        <HtmlOverlay />
      </div>
    </main>
  );
}
