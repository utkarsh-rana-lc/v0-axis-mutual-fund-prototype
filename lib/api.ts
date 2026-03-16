import type {
  ApiFundObject,
  ChatAgentRequest,
  Fund,
  QnAAgentResponse,
  SearchAgentResponse,
  SearchResult,
} from "./types";

const STORE_ID = "29087";

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatNav(raw: string): string {
  if (!raw) return "N/A";
  const n = parseFloat(raw);
  return isNaN(n) ? "N/A" : `₹${n.toFixed(2)}`;
}

function formatAum(raw: string): string {
  if (!raw) return "N/A";
  const n = parseFloat(raw);
  if (isNaN(n)) return "N/A";
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr`;
}

function formatReturn(raw: string): string {
  if (!raw) return "N/A";
  return `${raw}% p.a.`;
}

function normalizeFund(fund: ApiFundObject): Fund {
  return {
    id: nameToSlug(fund.name),
    name: fund.name,
    category: fund.fund_type,
    description: fund.short_description || fund.description,
    fullDescription: fund.description || fund.short_description,
    risk: fund.risk,
    horizon: fund.horizon || "5+ years",
    nav: formatNav(fund.nav),
    aum: formatAum(fund.aum),
    expenseRatio: fund.expense_ratio ? `${fund.expense_ratio}%` : "N/A",
    oneYearReturn: formatReturn(fund.one_year_return),
    threeYearReturn: formatReturn(fund.three_year_return),
    fiveYearReturn: formatReturn(fund.five_year_return),
  };
}

async function post<T>(body: ChatAgentRequest): Promise<T> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Request failed with status ${res.status}`);
  }

  return res.json();
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Search for funds matching the user's query.
 * Uses agent_mode: "search" which returns structured fund objects + a summary.
 */
export async function searchFunds(query: string): Promise<SearchResult> {
  const data = await post<SearchAgentResponse>({
    user_message: query,
    store: STORE_ID,
    conv_id: `search-${Date.now()}`,
    history: [],
    metadata: {
      agent_mode: "search",
      account_id: STORE_ID,
    },
  });

  return {
    summary: data.agent.summary,
    funds: data.agent.suggested_funds.map(normalizeFund),
  };
}

/**
 * Send a chat message to the QnA agent.
 * Pass the full conversation history so the agent has context.
 * History entries should alternate: "User: …" / "Assistant: …"
 */
export async function sendChatMessage(
  message: string,
  convId: string,
  history: string[]
): Promise<string> {
  const data = await post<QnAAgentResponse>({
    user_message: message,
    store: STORE_ID,
    conv_id: convId,
    history,
    metadata: {
      agent_mode: "qna",
      account_id: STORE_ID,
    },
  });

  return data.agent;
}
