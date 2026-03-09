"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SipFormData } from "@/app/invest/[id]/page";

interface SipStep2Props {
  formData: SipFormData;
  onPrevious: () => void;
  onNext: () => void;
}

export function SipStep2({ formData, onPrevious, onNext }: SipStep2Props) {
  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Review & Confirm
          </h2>
          <p className="mt-1 text-muted-foreground">
            Please review your investment details
          </p>
        </div>

        {/* Review Panel */}
        <div className="mb-6 rounded-xl bg-muted p-5">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fund Name</span>
              <span className="text-right font-medium text-foreground">
                {formData.fund}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SIP Amount</span>
              <span className="font-medium text-foreground">
                ₹ {Number(formData.amount).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SIP Date</span>
              <span className="font-medium text-foreground">
                {formData.date}
              </span>
            </div>
          </div>
        </div>

        {/* Warning Panel */}
        <div className="mb-8 rounded-xl border border-blush-border bg-blush p-4">
          <p className="text-sm text-muted-foreground">
            By proceeding, you agree to the terms and conditions. Mutual fund
            investments are subject to market risks, read all scheme related
            documents carefully.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex-1 rounded-full"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirm & Proceed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
