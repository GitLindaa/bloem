"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/licensing", label: "Sourcing" },
];

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-umber/10 bg-ivory/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" className="group">
          <div className="font-serif text-2xl text-umber tracking-tight leading-none">
            Archive <span className="italic text-botanical">&amp;</span> Bloom
          </div>
          <div className="font-sans text-[10px] tracking-widest uppercase text-stone mt-1">
            Curated&nbsp;Heritage&nbsp;Prints
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-sans text-umber">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-botanical transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm font-sans text-umber hover:text-botanical transition-colors"
          aria-label={`Cart, ${itemCount} items`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7Z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="hidden sm:inline tracking-wide">Cart</span>
          <span className="text-xs text-stone">({itemCount})</span>
        </Link>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center justify-center gap-6 pb-3 text-sm font-sans text-umber">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="tracking-wide">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
