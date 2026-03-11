"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface AssistantChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestionChips = [
  "Show top holdings",
  "Returns for 1Y/3Y/5Y",
  "Rolling returns (3Y)",
  "Risk metrics",
  "Download factsheet",
  "Compare with similar Axis funds",
];

const mockResponses: Record<string, string> = {
  "show top holdings":
    "Top holdings of Axis Bluechip Fund:\n\n1. Reliance Industries (8.2%)\n2. HDFC Bank (7.5%)\n3. ICICI Bank (6.8%)\n4. Infosys (5.9%)\n5. TCS (5.2%)\n\nThese holdings represent quality large-cap companies with strong fundamentals and consistent growth track records.",
  "returns for 1y/3y/5y":
    "Axis Bluechip Fund Returns:\n\n1 Year: 18.5% p.a.\n3 Year: 15.2% p.a.\n5 Year: 14.8% p.a.\n\nThe fund has consistently outperformed its benchmark (Nifty 50 TRI) across all time periods, demonstrating strong fund management.",
  "rolling returns (3y)":
    "Rolling Returns Analysis (3 Year):\n\nMinimum: 8.2%\nMaximum: 22.4%\nAverage: 14.6%\nMedian: 14.9%\n\nThe fund has shown consistent performance with positive rolling returns in 98% of the 3-year periods analyzed.",
  "risk metrics":
    "Risk Metrics for Axis Bluechip Fund:\n\nStandard Deviation: 14.2%\nBeta: 0.92\nSharpe Ratio: 1.24\nAlpha: 2.8%\nSortino Ratio: 1.56\n\nThe fund demonstrates lower volatility than the benchmark while generating superior risk-adjusted returns.",
  "download factsheet":
    "I can help you access the factsheet. The Axis Bluechip Fund factsheet is available for download on the Axis Mutual Fund website.\n\nYou can also click 'Factsheet' button on the fund detail page to download the latest document with complete scheme information, portfolio composition, and performance data.",
  "compare with similar axis funds":
    "Comparing Axis Bluechip Fund with similar funds:\n\n**vs Axis Focused 25 Fund:**\n- Bluechip: Large-cap focused, lower risk\n- Focused 25: Multi-cap, concentrated portfolio, higher potential returns\n\n**vs Axis Growth Opportunities Fund:**\n- Bluechip: Large-cap stability\n- Growth Opp: Large & Mid-cap blend, more growth-oriented\n\nFor conservative investors, Axis Bluechip is ideal. For higher risk appetite, consider Axis Focused 25 Fund.",
  returns:
    "Axis Bluechip Fund Returns:\n\n1 Year: 18.5% p.a.\n3 Year: 15.2% p.a.\n5 Year: 14.8% p.a.\n\nThe fund has consistently delivered strong performance across market cycles.",
  risk: "Risk Profile: Moderately High\n\nThe fund invests in large-cap equity stocks which typically have lower volatility compared to mid and small caps. Ideal investment horizon is 5+ years for wealth creation.",
  factsheet:
    "The Axis Bluechip Fund factsheet is available for download. It contains detailed information about portfolio composition, sector allocation, fund manager commentary, and historical performance data.",
  compare:
    "I can compare Axis Bluechip Fund with other Axis equity funds. Which fund would you like to compare it with?\n\n- Axis Focused 25 Fund (Multi-cap)\n- Axis Growth Opportunities Fund (Large & Mid Cap)\n- Axis Midcap Fund (Mid Cap)",
  sip: "SIP (Systematic Investment Plan) in Axis Bluechip Fund:\n\nMinimum SIP: Rs. 500\nSIP Dates: 1st, 7th, 14th, 21st, 28th\nRecommended tenure: 5+ years\n\nRegular SIP helps in rupee cost averaging and building wealth over time. You can start your SIP from the fund detail page.",
  nav: "Current NAV of Axis Bluechip Fund: Rs. 48.52 (as of 25 Feb 2026)\n\nNAV is updated at the end of each business day based on the closing market prices of the underlying securities.",
};

function getAssistantResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Check for exact or partial matches
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key) || key.includes(lowerMessage)) {
      return response;
    }
  }

  // Default response
  return "Thank you for your question. I'm the AxisMF Assistant, here to help you with information about Axis Mutual Fund schemes, services, and transactions.\n\nCould you please be more specific about what you'd like to know? I can help you with:\n- Fund performance and returns\n- Portfolio holdings\n- Risk metrics\n- SIP information\n- Comparing funds";
}

export function AssistantChatModal({ isOpen, onClose }: AssistantChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm the AxisMF Assistant. Ask me about Axis Mutual Fund schemes, services, or transactions.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: getAssistantResponse(content),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  const showSuggestions = messages.length === 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 flex h-[580px] w-full max-w-[960px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-success"></span>
            </span>
            <h2 className="text-lg font-semibold text-foreground">
              AxisMF Assistant
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          {showSuggestions && (
            <div className="mt-6">
              <p className="mb-3 text-sm text-muted-foreground">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-blush"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 rounded-full border-border bg-secondary px-5 py-3 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="size-11 shrink-0 rounded-full bg-primary p-0 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="size-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
