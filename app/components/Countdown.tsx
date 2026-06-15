"use client";

import { useSyncExternalStore } from "react";
import { SparkGlyph } from "./Brand";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number, now: number): Parts {
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

// Ticking "now", SSR-safe: server + first client render return null (numerals
// reserve width but stay invisible), then the client subscribes and updates
// every second — no hydration mismatch, no setState-in-effect.
function useNow(): number | null {
  return useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, 1000);
      return () => clearInterval(id);
    },
    () => Date.now(),
    () => null,
  );
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const now = useNow();
  const parts = now == null ? null : diff(target, now);

  const units: { k: keyof Parts; label: string }[] = [
    { k: "days", label: "Days" },
    { k: "hours", label: "Hrs" },
    { k: "minutes", label: "Min" },
    { k: "seconds", label: "Sec" },
  ];

  return (
    <div className="flex items-end gap-1.5 sm:gap-3" aria-label="Countdown to Ignite Summit">
      {units.map(({ k, label }, i) => {
        const value = parts ? String(parts[k]).padStart(2, "0") : "00";
        return (
          <div key={k} className="flex items-end gap-1.5 sm:gap-3">
            <div className="flex flex-col items-center">
              <span className="block overflow-hidden">
                <span
                  // remount on change → digit-roll plays for that unit only
                  key={parts ? parts[k] : "init"}
                  className={`block font-display font-black tabular-nums leading-[0.85] tracking-[-0.02em] text-navy ${
                    parts ? "digit-roll" : "invisible"
                  }`}
                  style={{ fontSize: "clamp(2rem, 7vw, 3.85rem)" }}
                >
                  {value}
                </span>
              </span>
              <span className="eyebrow mt-1 text-[0.58rem] text-muted">{label}</span>
            </div>
            {i < units.length - 1 && (
              <SparkGlyph className="mb-5 h-2 w-2 shrink-0 self-center sm:mb-6 sm:h-3 sm:w-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}
