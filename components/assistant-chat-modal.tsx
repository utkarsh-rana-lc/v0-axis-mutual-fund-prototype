"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendChatMessage } from "@/lib/api";

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

const WELCOME_MESSAGE =
  "Hi! I'm the AxisMF Assistant. Ask me about Axis Mutual Fund schemes, services, or transactions.";

export function AssistantChatModal({
  isOpen,
  onClose,
}: AssistantChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Stable conversation ID for the lifetime of this modal session
  const convIdRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate a conv_id when the modal first opens
  useEffect(() => {
    if (isOpen && !convIdRef.current) {
      convIdRef.current = `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset state when modal is closed so the next open starts fresh
  useEffect(() => {
    if (!isOpen) {
      setMessages([
        { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
      ]);
      setInputValue("");
      setIsLoading(false);
      convIdRef.current = "";
    }
  }, [isOpen]);

  const buildHistory = (msgs: Message[]): string[] =>
    msgs
      .filter((m) => m.id !== "welcome")
      .map((m) =>
        m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`
      );

  const handleSendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = buildHistory([...messages, userMessage]);
      const response = await sendChatMessage(
        trimmed,
        convIdRef.current,
        history
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
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
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
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

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-sm">Thinking…</span>
                </div>
              </div>
            )}

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
                    onClick={() => handleSendMessage(chip)}
                    disabled={isLoading}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-blush disabled:opacity-50"
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
              placeholder="Ask me anything…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-full border-border bg-secondary px-5 py-3 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="size-11 shrink-0 rounded-full bg-primary p-0 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Send className="size-5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
