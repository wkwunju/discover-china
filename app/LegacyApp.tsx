"use client";

import { useState } from "react";
import Script from "next/script";
import markup from "./legacy-markup.html";

/**
 * The original map-first trip planner, kept as a self-contained "island".
 * The markup is injected verbatim and the existing vanilla logic
 * (public/content.js + public/app.js) wires it imperatively — exactly as it
 * ran on the static site. New, dynamic features should be built as proper
 * Next.js routes/components rather than added here.
 *
 * Scripts are chained (maplibre → deck.gl → content.js → app.js) so load
 * order is deterministic: content.js defines the data globals before app.js
 * runs, and both map libraries are present before app.js initialises the map.
 */
export default function LegacyApp() {
  const [step, setStep] = useState(0);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />

      <Script
        src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"
        strategy="afterInteractive"
        onLoad={() => setStep((s) => Math.max(s, 1))}
      />
      {step >= 1 && (
        <Script
          src="https://unpkg.com/deck.gl@9.0.38/dist.min.js"
          strategy="afterInteractive"
          onLoad={() => setStep((s) => Math.max(s, 2))}
        />
      )}
      {step >= 2 && (
        <Script
          src="/content.js"
          strategy="afterInteractive"
          onLoad={() => setStep((s) => Math.max(s, 3))}
        />
      )}
      {step >= 3 && <Script src="/app.js" strategy="afterInteractive" />}
    </>
  );
}
