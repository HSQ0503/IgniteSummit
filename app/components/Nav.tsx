"use client";

import { useEffect, useState } from "react";
import { IgniteLogo } from "./Brand";

const links = [
  { href: "#about", label: "The Show" },
  { href: "#schedule", label: "Run of Show" },
  { href: "#speakers", label: "Speakers" },
  { href: "#hosts", label: "Hosts" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-navy/10 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="ignite-container flex h-16 items-center justify-between">
        <a href="#top" className="focus-ring rounded-lg" aria-label="Ignite Summit home">
          <IgniteLogo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring rounded text-sm font-medium text-body transition-colors hover:text-navy"
            >
              {l.label}
            </a>
          ))}
          <a href="#register" className="btn btn-flame focus-ring py-2.5 text-sm">
            Register
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring -mr-2 rounded-lg p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-navy transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-navy transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-navy transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy/10 bg-cream md:hidden">
          <div className="ignite-container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-body hover:bg-navy/5 hover:text-navy"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="btn btn-flame mt-2"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
