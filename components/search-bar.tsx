"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, X, Wallet, FileText, ArrowUpRight, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trendingSearches, popularActions } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  FileText,
  ArrowUpRight,
  LineChart,
};

interface SearchBarProps {
  initialValue?: string;
  showDropdown?: boolean;
  onSearch?: (query: string) => void;
  variant?: "hero" | "page";
}

export function SearchBar({
  initialValue = "",
  showDropdown = true,
  onSearch,
  variant = "hero",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (showDropdown) {
      setIsOpen(true);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTrendingClick = (search: string) => {
    setQuery(search);
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-full border bg-card px-4 py-3 transition-all ${
          isFocused
            ? "border-primary ring-2 ring-primary/20"
            : "border-border"
        } ${variant === "hero" ? "shadow-sm" : "shadow-sm"}`}
      >
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, services, transactions..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none md:text-base"
        />
        {query && (
          <button
            onClick={handleClear}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
        <button className="shrink-0 text-muted-foreground hover:text-foreground">
          <Mic className="size-5" />
        </button>
        <Button
          onClick={handleSearch}
          className="shrink-0 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
          size="sm"
        >
          Search
        </Button>
      </div>

      {/* Dropdown */}
      {isOpen && showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-border bg-card p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleTrendingClick(search)}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Popular Actions
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {popularActions.map((action) => {
                const Icon = iconMap[action.icon];
                return (
                  <button
                    key={action.id}
                    className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {action.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
