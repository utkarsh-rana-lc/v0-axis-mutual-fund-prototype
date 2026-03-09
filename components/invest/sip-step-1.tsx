"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { fundOptions, sipDateOptions } from "@/lib/data";
import type { SipFormData } from "@/app/invest/[id]/page";

interface SipStep1Props {
  formData: SipFormData;
  updateFormData: (data: Partial<SipFormData>) => void;
  onNext: () => void;
}

export function SipStep1({ formData, updateFormData, onNext }: SipStep1Props) {
  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Start SIP Investment
          </h2>
          <p className="mt-1 text-muted-foreground">
            Enter your investment details to begin your systematic investment
            plan
          </p>
        </div>

        <FieldGroup className="space-y-5">
          <Field>
            <FieldLabel>Select Fund</FieldLabel>
            <Select
              value={formData.fund}
              onValueChange={(value) => updateFormData({ fund: value })}
            >
              <SelectTrigger className="w-full rounded-lg">
                <SelectValue placeholder="Select a fund" />
              </SelectTrigger>
              <SelectContent>
                {fundOptions.map((option) => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Monthly SIP Amount</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <Input
                type="text"
                value={formData.amount}
                onChange={(e) => updateFormData({ amount: e.target.value })}
                className="rounded-lg pl-7"
                placeholder="5,000"
              />
            </div>
          </Field>

          <Field>
            <FieldLabel>SIP Date</FieldLabel>
            <Select
              value={formData.date}
              onValueChange={(value) => updateFormData({ date: value })}
            >
              <SelectTrigger className="w-full rounded-lg">
                <SelectValue placeholder="Select SIP date" />
              </SelectTrigger>
              <SelectContent>
                {sipDateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <Button
          onClick={onNext}
          className="mt-8 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Next
        </Button>
      </CardContent>
    </Card>
  );
}
