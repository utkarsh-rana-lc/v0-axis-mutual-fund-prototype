import { trustMetrics } from "@/lib/data";

export function TrustMetrics() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-foreground md:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
