"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fundResults } from "@/lib/data";

interface FundDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function FundDetailPage({ params }: FundDetailPageProps) {
  const { id } = use(params);
  
  // Find the fund from mock data
  const fund = fundResults.find((f) => f.id === id) || fundResults[0];

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

          {/* Fund Detail Card */}
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
                    NAV ({fund.navDate})
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
              <div className="mb-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">3 Year Returns</p>
                  <p className="text-lg font-semibold text-foreground">
                    {fund.returns3yr}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">5 Year Returns</p>
                  <p className="text-lg font-semibold text-foreground">
                    {fund.returns5yr}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">AUM</p>
                  <p className="text-lg font-semibold text-foreground">
                    {fund.aum}
                  </p>
                </div>
              </div>

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
                  Mutual fund investments are subject to market risks, read all
                  scheme related documents carefully. Past performance is not
                  indicative of future returns.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
