"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, MessageCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import { FundCard } from "@/components/search/fund-card";
import { SimilarFundsSection } from "@/components/search/similar-funds";
import { TransactionsList } from "@/components/search/transactions-list";
import { OtherAmcMessage } from "@/components/search/other-amc-message";
import { ServiceResults } from "@/components/search/service-results";
import { aiSummary, fundResults } from "@/lib/data";

interface SearchPageContentProps {
  query: string;
}

export function SearchPageContent({ query }: SearchPageContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    router.push(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  // Detect query type
  const isOtherAmc = query.toLowerCase().includes("sbi");
  const isServiceQuery = query.toLowerCase().includes("bank") || query.toLowerCase().includes("account");
  const isFundQuery = !isOtherAmc && !isServiceQuery;

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
                    {aiSummary.title}
                  </h2>
                </div>
                <p className="mb-4 text-muted-foreground">{aiSummary.content}</p>
                <p className="text-xs text-muted-foreground/70">
                  {aiSummary.disclaimer}
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
                <div className="space-y-6">
                  {/* First Fund Card */}
                  <FundCard fund={fundResults[0]} />

                  {/* Similar Funds Section */}
                  <SimilarFundsSection />

                  {/* Second Fund Card */}
                  <FundCard fund={fundResults[1]} />
                </div>
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
                  Start a conversation with AxisMF Assistant for personalized help
                </p>
                <Button className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                  Ask AxisMF Assistant
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
