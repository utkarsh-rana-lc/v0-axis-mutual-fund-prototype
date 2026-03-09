"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { transactions } from "@/lib/data";

export function TransactionsList() {
  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-6">
        <div className="divide-y divide-border">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{txn.fund}</p>
                  <Badge
                    variant="secondary"
                    className="rounded-full text-xs"
                  >
                    {txn.type}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{txn.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{txn.amount}</p>
                <p className="text-sm text-success">{txn.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
