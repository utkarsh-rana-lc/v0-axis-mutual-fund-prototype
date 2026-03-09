"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { similarFunds } from "@/lib/data";

export function SimilarFundsSection() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Similar Axis Funds
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
              <p className="text-sm text-muted-foreground">{fund.category}</p>
            </div>
            <span className="flex items-center text-sm text-primary">
              Know more
              <ChevronRight className="ml-1 size-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
