"use client";

import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/search-bar";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-4 pb-8 pt-16 sm:px-6 md:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="mb-6 rounded-full border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground"
        >
          <Sparkles className="mr-1.5 size-3.5 text-primary" />
          AI-Powered Search
        </Badge>

        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          How can we help you today?
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-muted-foreground md:text-lg">
          Search for funds, services, transactions, or start a conversation
          with our AI assistant.
        </p>

        <div className="mx-auto max-w-2xl">
          <SearchBar variant="hero" />
        </div>
      </div>
    </section>
  );
}
