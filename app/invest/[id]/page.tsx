"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SipStepProgress } from "@/components/invest/sip-step-progress";
import { SipStep1 } from "@/components/invest/sip-step-1";
import { SipStep2 } from "@/components/invest/sip-step-2";
import { SipStep3 } from "@/components/invest/sip-step-3";
import { fundResults } from "@/lib/data";

interface InvestPageProps {
  params: Promise<{ id: string }>;
}

export interface SipFormData {
  fund: string;
  amount: string;
  date: string;
}

export default function InvestPage({ params }: InvestPageProps) {
  const { id } = use(params);
  const fund = fundResults.find((f) => f.id === id) || fundResults[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SipFormData>({
    fund: `${fund.name} - Direct Plan - Growth`,
    amount: "5000",
    date: "1st of every month",
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (data: Partial<SipFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-xl">
          {/* Back Link */}
          <Link
            href="/search?q=Best%20SIP%20fund"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Back to Results
          </Link>

          {/* Progress Indicator */}
          <SipStepProgress currentStep={currentStep} />

          {/* Step Content */}
          {currentStep === 1 && (
            <SipStep1
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <SipStep2
              formData={formData}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}

          {currentStep === 3 && <SipStep3 formData={formData} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
