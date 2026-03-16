"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, MessageCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from "@/components/search-bar";
import { FundCard } from "@/components/search/fund-card";
import { SimilarFundsSection } from "@/components/search/similar-funds";
import { TransactionsList } from "@/components/search/transactions-list";
import { OtherAmcMessage } from "@/components/search/other-amc-message";
import { ServiceResults } from "@/components/search/service-results";
import { AssistantChatModal } from "@/components/assistant-chat-modal";
import { searchFunds } from "@/lib/api";
import type { Fund } from "@/lib/types";

interface SearchPageContentProps {
  query: string;
}

export function SearchPageContent({ query }: SearchPageContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [summary, setSummary] = useState<string>("");
  const [funds, setFunds] = useState<Fund[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    router.push(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  // Detect query type
  const isOtherAmc = query.toLowerCase().includes("sbi");
  const isServiceQuery =
    query.toLowerCase().includes("bank") ||
    query.toLowerCase().includes("account");
  const isFundQuery = !isOtherAmc && !isServiceQuery;

  useEffect(() => {
    if (!isFundQuery) return;

    setIsLoading(true);
    setError(null);
    setFunds([]);
    setSummary("");

    searchFunds(query)
      .then((result) => {
        setSummary(result.summary);
        setFunds(result.funds);
      })
      .catch((err: Error) => {
        setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, [query, isFundQuery]);

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            initialValue={query}
            showDropdown={false}
            onSearch={handleSearch}
            variant="page"
          />
        </div>

        {/* Other AMC Refusal */}
        {isOtherAmc && <OtherAmcMessage query={query} />}

        {/* Service Results */}
        {isServiceQuery && <ServiceResults query={query} />}

        {/* Fund Results */}
        {isFundQuery && (
          <>
            {/* AI Summary */}
            <Card className="mb-6 rounded-2xl border-blush-border bg-blush">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <h2 className="font-semibold text-foreground">
                    AI-Powered Summary
                  </h2>
                </div>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ) : error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : (
                  <p className="mb-4 text-muted-foreground">{summary}</p>
                )}
                <p className="text-xs text-muted-foreground/70">
                  Mutual fund investments are subject to market risks, read all
                  scheme related documents carefully.
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="funds" className="mb-6">
              <TabsList className="h-auto rounded-full bg-secondary p-1">
                <TabsTrigger
                  value="funds"
                  className="rounded-full px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  Funds
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="rounded-full px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="funds" className="mt-6">
                {isLoading ? (
                  <div className="space-y-6">
                    <FundCardSkeleton />
                    <FundCardSkeleton />
                  </div>
                ) : error ? (
                  <div className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
                    <p>Unable to load funds. Please try your search again.</p>
                  </div>
                ) : funds.length === 0 ? (
                  <div className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
                    <p>No funds found for your query.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <FundCard fund={funds[0]} />
                    {funds.length > 1 && (
                      <>
                        <SimilarFundsSection />
                        {funds.slice(1).map((fund) => (
                          <FundCard key={fund.id} fund={fund} />
                        ))}
                      </>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="transactions" className="mt-6">
                <TransactionsList />
              </TabsContent>
            </Tabs>

            {/* Help Card */}
            <Card className="rounded-2xl border-border">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Have more questions?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Start a conversation with AxisMF Assistant for personalised
                  help
                </p>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                >
                  Ask AxisMF Assistant
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Assistant Chat Modal */}
      <AssistantChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

function FundCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border p-6 space-y-4">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-24 rounded-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex gap-6 pt-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}
