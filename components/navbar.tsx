"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Explore Funds", href: "#" },
  { label: "Invest", href: "#" },
  { label: "Services", href: "#" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-lg font-semibold text-foreground">
            Axis Mutual Fund
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          size="sm"
        >
          Login
        </Button>
      </div>
    </header>
  );
}
