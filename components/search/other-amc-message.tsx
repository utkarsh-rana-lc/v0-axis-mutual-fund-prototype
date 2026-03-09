"use client";

import Link from "next/link";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { similarFunds } from "@/lib/data";

interface OtherAmcMessageProps {
  query: string;
}

export function OtherAmcMessage({ query }: OtherAmcMessageProps) {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <AlertCircle className="size-5 text-amber-600" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Fund Not Available
              </h3>
              <p className="mb-4 text-muted-foreground">
                {`"${query}" is managed by another Asset Management Company. As Axis Mutual Fund, we can only help you with Axis funds.`}
              </p>
              <p className="text-sm text-muted-foreground">
                However, we have some excellent alternatives that you might find
                interesting:
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border">
        <CardContent className="p-6">
          <h4 className="mb-4 text-sm font-semibold text-foreground">
            Recommended Axis Alternatives
          </h4>
          <div className="divide-y divide-border">
            {similarFunds.map((fund) => (
              <Link
                key={fund.id}
                href={`/fund/${fund.id}`}
                className="group flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary">
                    {fund.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {fund.category}
                  </p>
                </div>
                <span className="flex items-center text-sm text-primary">
                  Know more
                  <ChevronRight className="ml-1 size-4" />
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          asChild
          variant="outline"
          className="rounded-full"
        >
          <Link href="/search?q=Best%20SIP%20fund">
            Browse All Axis Funds
          </Link>
        </Button>
      </div>
    </div>
  );
}
