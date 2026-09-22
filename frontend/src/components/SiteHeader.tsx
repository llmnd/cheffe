"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const CHEFFE_PROFILE_IMAGE = process.env.NEXT_PUBLIC_CHEFFE_PROFILE_IMAGE;

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/#apropos", label: "À propos" },
  { href: "/recettes", label: "Recettes" },
  { href: "/creations", label: "Créations" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/journal", label: "Journal" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#f4efe7]/95 backdrop-blur-md">
        <div className="section-shell flex h-[4.25rem] items-center justify-between gap-3 sm:h-[4.5rem]">
          {/* Logo / Identité */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3 text-[#111111]"
            aria-label="Cheffe Khadidiatou — Accueil"
          >
            <span className="relative inline-flex h-10 w-10 items-center justify-center">
              {CHEFFE_PROFILE_IMAGE ? (
                <Image
                  src={CHEFFE_PROFILE_IMAGE}
                  alt="Portrait de Cheffe Khadidiatou"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-[#111111]/15 ring-offset-2 ring-offset-[#f4efe7]"
                />
              ) : (
                <>
                  <span className="absolute inset-0 rounded-full border border-dashed border-[#8b5e3c]/40" />
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] font-display text-[0.7rem] font-semibold tracking-[0.05em] text-[#f4efe7]">
                    CK
                  </span>
                </>
              )}
            </span>

            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.95rem] tracking-[0.02em] text-[#111111] sm:text-[1.05rem]">
                Cheffe Khadidiatou
              </span>
              <span className="mt-1 hidden text-[0.55rem] uppercase tracking-[0.32em] text-[#7a6659] sm:inline">
                Cuisine africaine contemporaine
              </span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden text-[0.64rem] uppercase tracking-[0.24em] text-[#111111]/80 sm:inline-flex"
            >
              Connexion
            </Link>

            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-[0.62rem] uppercase tracking-[0.22em] text-[#f4efe7] sm:inline-flex"
            >
              Collaborer
              <span>→</span>
            </Link>

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="site-navigation"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#111111]/20 text-[#111111]"
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
                <span
                  className={`block h-px w-full bg-current ${
                    isOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current ${
                    isOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay + Panneau mobile */}
      <div
        className={`fixed inset-0 z-40 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-[#0b0a09]/40 backdrop-blur-sm"
        />

        <aside
          id="site-navigation"
          className={`absolute right-0 top-0 flex h-full w-[min(92vw,26rem)] flex-col border-l border-[#111111]/10 bg-[#f4efe7] shadow-[0_30px_80px_-20px_rgba(17,17,17,0.5)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#111111]/10 px-6 py-5">
            <p className="text-[0.58rem] uppercase tracking-[0.34em] text-[#7a6659]">Navigation</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[0.62rem] uppercase tracking-[0.24em] text-[#111111]/70"
            >
              Fermer
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-2 py-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-baseline justify-between gap-4 border-b border-[#111111]/8 px-4 py-4"
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-6 text-[0.58rem] uppercase tracking-[0.28em] text-[#8b5e3c]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl text-[#111111]">
                    {item.label}
                  </span>
                </span>
                <span className="text-[#111111]/30">
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-[#111111]/10 px-6 py-5">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between gap-3 rounded-full bg-[#111111] px-5 py-3 text-[0.62rem] uppercase tracking-[0.24em] text-[#f4efe7]"
            >
              Écrire à la cheffe
              <span>→</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center rounded-full border border-[#111111]/20 px-5 py-3 text-[0.62rem] uppercase tracking-[0.24em] text-[#111111]"
            >
              Connexion
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}