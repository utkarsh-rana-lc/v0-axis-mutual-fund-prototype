// ─── API Wire Types ────────────────────────────────────────────────────────────

export interface ChatAgentRequest {
  user_message: string;
  store: string;
  conv_id: string;
  history?: string[];
  metadata?: {
    agent_mode?: "search" | "qna";
    account_id?: string;
  };
}

/** Shape returned by the API for a single fund in search mode */
export interface ApiFundObject {
  name: string;
  description: string;
  short_description: string;
  fund_type: string;
  risk: string;
  horizon: string;
  nav: string;
  aum: string;
  expense_ratio: string;
  one_year_return: string;
  three_year_return: string;
  five_year_return: string;
}

export interface SearchAgentResponse {
  agent: {
    summary: string;
    suggested_funds: ApiFundObject[];
  };
}

export interface QnAAgentResponse {
  agent: string;
}

export interface ApiErrorResponse {
  detail: string;
}

// ─── Normalised App Types ───────────────────────────────────────────────────────

/** Fund shape used throughout the UI, derived from ApiFundObject */
export interface Fund {
  /** URL-safe slug derived from the fund name */
  id: string;
  name: string;
  /** SEBI category, mapped from fund_type */
  category: string;
  /** Short description shown on search cards */
  description: string;
  /** Long description shown on the detail page */
  fullDescription: string;
  risk: string;
  horizon: string;
  nav: string;
  /** Optional — not returned by the API, present only in static/cached data */
  navDate?: string;
  aum: string;
  expenseRatio: string;
  oneYearReturn: string;
  threeYearReturn: string;
  fiveYearReturn: string;
}

export interface SearchResult {
  summary: string;
  funds: Fund[];
}
