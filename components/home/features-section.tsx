"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Settings,
  AlertCircle,
  MessageCircle,
  FileText,
  TrendingUp,
  CreditCard,
  Phone,
  Mail,
  Download,
  Palette,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { featureCards, keyInteractions } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Search,
  Settings,
  AlertCircle,
  MessageCircle,
  FileText,
  TrendingUp,
  CreditCard,
  Phone,
  Mail,
  Download,
  Palette,
};

export function FeaturesSection() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Card className="overflow-hidden rounded-2xl border-border shadow-sm">
          <CardContent className="p-0">
            <div className="border-b border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground md:text-2xl">
                Explore All Features
              </h2>
              <p className="mt-1 text-muted-foreground">
                Navigate through the complete prototype with all screens and
                interactions
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featureCards.map((feature) => {
                  const Icon = iconMap[feature.icon];
                  return (
                    <Link
                      key={feature.id}
                      href={feature.href}
                      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <Icon className="size-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">
                          {feature.title}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {feature.subtitle}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mx-6 mb-6 rounded-xl border border-blush-border bg-blush p-6 md:mx-8 md:mb-8">
              <h3 className="mb-3 font-semibold text-foreground">
                Key Interactions to Try:
              </h3>
              <ul className="space-y-2">
                {keyInteractions.map((interaction, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {interaction}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
