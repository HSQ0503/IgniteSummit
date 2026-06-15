"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { event } from "@/lib/event";

// Day-epoch (integer) is stable across renders within a day, so it's a valid
// useSyncExternalStore snapshot — and null on the server avoids a hydration
// mismatch on the "days left" count.
function useDayEpoch(): number | null {
  return useSyncExternalStore(
    () => () => {},
    () => Math.floor(Date.now() / 86_400_000),
    () => null,
  );
}

export function StickyCTA() {
  const [show, setShow] = useState(false);
  const dayEpoch = useDayEpoch();
  const days =
    dayEpoch == null
      ? null
      : Math.max(0, Math.ceil(new Date(event.startsAtISO).getTime() / 86_400_000) - dayEpoch);

  useEffect(() => {
    const register = document.getElementById("register");
    let pastHero = false;
    let registerVisible = false;
    const update = () => setShow(pastHero && !registerVisible);

    const onScroll = () => {
      pastHero = window.scrollY > 600;
      update();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let obs: IntersectionObserver | null = null;
    if (register) {
      obs = new IntersectionObserver(
        ([e]) => {
          registerVisible = e.isIntersecting;
          update();
        },
        { threshold: 0 },
      );
      obs.observe(register);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-cream/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="ignite-container flex items-center justify-between gap-3 py-3">
        <div className="leading-tight">
          <div className="font-display text-base font-bold text-navy">Ignite Summit</div>
          <div className="font-mono text-[0.62rem] uppercase tracking-widest text-ember">
            {days == null ? event.dateLabel : `${days} days left`}
          </div>
        </div>
        <a href="#register" className="btn btn-flame focus-ring px-6 py-3 text-sm">
          Reserve seat
        </a>
      </div>
    </div>
  );
}
