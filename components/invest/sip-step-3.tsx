"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sipConfirmation } from "@/lib/data";
import type { SipFormData } from "@/app/invest/[id]/page";

interface SipStep3Props {
  formData: SipFormData;
}

export function SipStep3({ formData }: SipStep3Props) {
  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-6 text-center md:p-8">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="size-10 text-success" />
        </div>

        {/* Success Message */}
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          SIP Setup Successful!
        </h2>
        <p className="mb-8 text-muted-foreground">
          Your SIP has been successfully set up. You will receive a confirmation
          email shortly.
        </p>

        {/* Confirmation Details */}
        <div className="mb-8 rounded-xl bg-muted p-5">
          <div className="space-y-4 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reference Number</span>
              <span className="font-medium text-foreground">
                {sipConfirmation.referenceNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">First Debit Date</span>
              <span className="font-medium text-foreground">
                {sipConfirmation.firstDebitDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          asChild
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
