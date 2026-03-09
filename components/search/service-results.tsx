"use client";

import { Sparkles, CreditCard, Building2, FileCheck, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceResultsProps {
  query: string;
}

const services = [
  {
    id: "add-bank",
    icon: CreditCard,
    title: "Add New Bank Account",
    description: "Link a new bank account for investments and redemptions",
  },
  {
    id: "update-bank",
    icon: Building2,
    title: "Update Bank Details",
    description: "Modify your existing bank account information",
  },
  {
    id: "verify-bank",
    icon: FileCheck,
    title: "Verify Bank Account",
    description: "Complete pending bank verification with document upload",
  },
];

export function ServiceResults({ query }: ServiceResultsProps) {
  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <Card className="rounded-2xl border-blush-border bg-blush">
        <CardContent className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">AI-Powered Summary</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            I can help you manage your bank account details. You can add a new bank
            account, update existing details, or verify your account with document
            upload. Select an option below to get started.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Please keep your bank documents ready for verification.
          </p>
        </CardContent>
      </Card>

      {/* Service Options */}
      <Card className="rounded-2xl border-border">
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Available Actions
          </h3>
          <div className="space-y-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  className="group flex w-full items-center gap-4 rounded-xl border border-border p-4 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="size-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{service.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary" />
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Need help with something else?
        </p>
        <Button variant="outline" className="rounded-full">
          Contact Support
        </Button>
      </div>
    </div>
  );
}
