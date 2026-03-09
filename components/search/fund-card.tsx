"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Fund {
  id: string;
  name: string;
  category: string;
  description: string;
  risk: string;
  horizon: string;
  nav: string;
}

interface FundCardProps {
  fund: Fund;
}

export function FundCard({ fund }: FundCardProps) {
  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">{fund.name}</h3>
          <Badge
            variant="secondary"
            className="mt-2 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
          >
            {fund.category}
          </Badge>
        </div>

        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {fund.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-muted-foreground">Risk</p>
            <p className="font-medium text-foreground">{fund.risk}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Horizon</p>
            <p className="font-medium text-foreground">{fund.horizon}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">NAV</p>
            <p className="font-medium text-foreground">{fund.nav}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href={`/invest/${fund.id}`}>Invest now</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href={`/fund/${fund.id}`}>Know more</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full"
            size="sm"
          >
            <Link href={`/invest/${fund.id}`}>Start SIP</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
