"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCachedFund } from "@/components/search/fund-card";
import { searchFunds } from "@/lib/api";
import type { Fund } from "@/lib/types";

interface FundDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function FundDetailPage({ params }: FundDetailPageProps) {
  const { id } = use(params);

  const [fund, setFund] = useState<Fund | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Try sessionStorage first (populated by FundCard when user navigates from search)
    const cached = getCachedFund(id);
    if (cached) {
      setFund(cached);
      setIsLoading(false);
      return;
    }

    // 2. Fallback: derive a human-readable name from the slug and search for it
    const nameQuery = id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    searchFunds(nameQuery)
      .then((result) => {
        if (result.funds.length > 0) {
          setFund(result.funds[0]);
        } else {
          setError("Fund not found.");
        }
      })
      .catch((err: Error) => {
        setError(err.message || "Failed to load fund details.");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Link
            href="/search?q=Best%20SIP%20fund"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Back to Results
          </Link>

          {isLoading && <FundDetailSkeleton />}

          {error && (
            <div className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
              <p>{error}</p>
            </div>
          )}

          {fund && !isLoading && (
            <Card className="rounded-2xl border-border">
              <CardContent className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {fund.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="mt-2 rounded-full bg-secondary text-sm font-medium text-muted-foreground"
                    >
                      {fund.category}
                    </Badge>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs text-muted-foreground">
                      NAV{fund.navDate ? ` (${fund.navDate})` : ""}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {fund.nav}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  {fund.fullDescription}
                </p>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">1Y Returns</p>
                    <p className="text-lg font-semibold text-foreground">
                      {fund.oneYearReturn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">3Y Returns</p>
                    <p className="text-lg font-semibold text-foreground">
                      {fund.threeYearReturn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">5Y Returns</p>
                    <p className="text-lg font-semibold text-foreground">
                      {fund.fiveYearReturn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AUM</p>
                    <p className="text-lg font-semibold text-foreground">
                      {fund.aum}
                    </p>
                  </div>
                </div>

                {/* Expense Ratio */}
                {fund.expenseRatio && fund.expenseRatio !== "N/A" && (
                  <div className="mb-8">
                    <p className="text-xs text-muted-foreground">
                      Expense Ratio
                    </p>
                    <p className="font-semibold text-foreground">
                      {fund.expenseRatio}
                    </p>
                  </div>
                )}

                {/* CTAs */}
                <div className="mb-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href={`/invest/${fund.id}`}>Invest Now</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/invest/${fund.id}`}>Start SIP</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    <Download className="mr-1.5 size-4" />
                    Factsheet
                  </Button>
                </div>

                {/* Disclaimer */}
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-xs text-muted-foreground">
                    Mutual fund investments are subject to market risks, read
                    all scheme related documents carefully. Past performance is
                    not indicative of future returns.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FundDetailSkeleton() {
  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-5 w-32 rounded-full" />
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
