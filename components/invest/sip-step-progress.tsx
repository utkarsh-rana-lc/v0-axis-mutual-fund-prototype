"use client";

import { Check } from "lucide-react";

interface SipStepProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Details" },
  { number: 2, label: "Review" },
  { number: 3, label: "Confirm" },
];

export function SipStepProgress({ currentStep }: SipStepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                  currentStep > step.number
                    ? "border-primary bg-primary text-primary-foreground"
                    : currentStep === step.number
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="size-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-16 md:w-24 ${
                  currentStep > step.number ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
