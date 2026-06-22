"use client";

import { useEffect, useState } from "react";

/* Minimum on-screen time so the animation reads as intentional, and a hard
   cap so we never delay the page (LCP) beyond ~1.5s. */
const MIN_MS = 600;
const MAX_MS = 1500;

/* Brand splash shown once per session (first visit). The overlay markup is
   always server-rendered but stays `display:none` unless the inline script
   below adds `.preloading` to <html> — so crawlers and repeat visits get the
   real content with no splash, and there's no content flash on first paint. */
export default function Preloader() {
  const [hiding, setHiding] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    // Not a first visit (or no JS path): the class was never added — do nothing.
    if (!html.classList.contains("preloading")) {
      setRemoved(true);
      return;
    }

    const start = Date.now();
    let done = false;

    const hide = () => {
      if (done) return;
      done = true;
      setHiding(true); // CSS fade-out
      try {
        sessionStorage.setItem("nk_preloaded", "1");
      } catch {}
      window.setTimeout(() => {
        html.classList.remove("preloading");
        setRemoved(true);
      }, 500); // matches the CSS opacity transition
    };

    const scheduleHide = () => {
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      window.setTimeout(hide, wait);
    };

    if (document.readyState === "complete") {
      scheduleHide();
    } else {
      window.addEventListener("load", scheduleHide, { once: true });
    }
    const cap = window.setTimeout(hide, MAX_MS);

    return () => {
      window.removeEventListener("load", scheduleHide);
      window.clearTimeout(cap);
    };
  }, []);

  if (removed) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(!sessionStorage.getItem('nk_preloaded')){document.documentElement.classList.add('preloading')}}catch(e){}",
        }}
      />
      <div
        className={"preloader-overlay" + (hiding ? " is-hiding" : "")}
        aria-hidden="true"
        role="presentation"
      >
        <div className="preloader-mark">N</div>
      </div>
    </>
  );
}
