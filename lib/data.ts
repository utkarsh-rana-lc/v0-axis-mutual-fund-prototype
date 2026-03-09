// Mock data for Axis Mutual Fund app

export const trendingSearches = [
  "Best SIP fund",
  "Tax saving funds",
  "Equity funds",
  "Debt funds",
  "Axis Bluechip Fund",
  "Flexi cap funds",
  "Small cap funds",
  "International funds",
  "Liquid funds",
  "ELSS funds",
];

export const popularActions = [
  {
    id: "invest",
    icon: "Wallet",
    title: "Invest in Fund",
    description: "Start SIP or lump sum",
  },
  {
    id: "statement",
    icon: "FileText",
    title: "Account Statement",
    description: "View transaction history",
  },
  {
    id: "redeem",
    icon: "ArrowUpRight",
    title: "Redeem Units",
    description: "Withdraw your investments",
  },
  {
    id: "portfolio",
    icon: "LineChart",
    title: "Portfolio Analysis",
    description: "Track your returns",
  },
];

export const aiSummary = {
  title: "AI-Powered Summary",
  content:
    "Based on your search for the best SIP fund, I recommend diversified equity funds with strong long-term performance. Axis Bluechip Fund and Axis Focused 25 Fund are excellent choices for systematic investment plans, offering a balanced approach to wealth creation with professional fund management.",
  disclaimer:
    "Mutual fund investments are subject to market risks, read all scheme related documents carefully.",
};

export const fundResults = [
  {
    id: "axis-bluechip",
    name: "Axis Bluechip Fund",
    category: "Equity – Large Cap",
    description:
      "A large-cap equity fund that invests in fundamentally strong companies with sustainable competitive advantages. Ideal for long-term wealth creation through SIP.",
    risk: "Moderately High",
    horizon: "5+ years",
    nav: "₹48.52",
    navDate: "25 Feb 2026",
    fullDescription:
      "A large-cap equity fund that invests in fundamentally strong companies with sustainable competitive advantages. The fund follows a value-oriented investment approach and aims to generate long-term capital appreciation.",
    returns3yr: "15.2% p.a.",
    returns5yr: "14.8% p.a.",
    aum: "₹28,450 Cr",
  },
  {
    id: "axis-focused-25",
    name: "Axis Focused 25 Fund",
    category: "Equity – Multi Cap",
    description:
      "A concentrated portfolio of 25 high-conviction stocks across market caps, offering focused exposure to quality businesses for superior long-term returns.",
    risk: "Very High",
    horizon: "5+ years",
    nav: "₹62.18",
    navDate: "25 Feb 2026",
    fullDescription:
      "A concentrated portfolio of 25 high-conviction stocks across market caps, offering focused exposure to quality businesses for superior long-term returns with professional management.",
    returns3yr: "18.5% p.a.",
    returns5yr: "16.2% p.a.",
    aum: "₹15,820 Cr",
  },
];

export const similarFunds = [
  {
    id: "axis-focused-25",
    name: "Axis Focused 25 Fund",
    category: "Equity - Multi Cap",
  },
  {
    id: "axis-growth",
    name: "Axis Growth Opportunities Fund",
    category: "Equity - Large & Mid Cap",
  },
  {
    id: "axis-midcap",
    name: "Axis Midcap Fund",
    category: "Equity - Mid Cap",
  },
];

export const transactions = [
  {
    id: "txn-1",
    type: "SIP",
    fund: "Axis Bluechip Fund",
    amount: "₹5,000",
    date: "01 Feb 2026",
    status: "Completed",
  },
  {
    id: "txn-2",
    type: "SIP",
    fund: "Axis Focused 25 Fund",
    amount: "₹3,000",
    date: "01 Feb 2026",
    status: "Completed",
  },
  {
    id: "txn-3",
    type: "Redemption",
    fund: "Axis Liquid Fund",
    amount: "₹25,000",
    date: "28 Jan 2026",
    status: "Completed",
  },
];

export const featureCards = [
  {
    id: "homepage",
    icon: "Home",
    title: "Homepage",
    subtitle: "AI-powered search with trending suggestions",
    href: "/",
  },
  {
    id: "search-funds",
    icon: "Search",
    title: "Search Results - Funds",
    subtitle: "Fund search with AI summary and similar funds",
    href: "/search?q=Best%20SIP%20fund",
  },
  {
    id: "search-services",
    icon: "Settings",
    title: "Search Results - Services",
    subtitle: "Service actions and account management",
    href: "/search?q=Add%20bank%20account",
  },
  {
    id: "other-amc",
    icon: "AlertCircle",
    title: "Other AMC Refusal",
    subtitle: "Axis-only guardrail with alternatives",
    href: "/search?q=SBI%20Small%20Cap",
  },
  {
    id: "chat",
    icon: "MessageCircle",
    title: "Inline Chat Mode",
    subtitle: "ChatGPT-style assistant with blur background",
    href: "#",
  },
  {
    id: "fund-detail",
    icon: "FileText",
    title: "Fund Detail Page",
    subtitle: "Complete fund information and CTAs",
    href: "/fund/axis-bluechip",
  },
  {
    id: "sip-journey",
    icon: "TrendingUp",
    title: "SIP Investment Journey",
    subtitle: "3-step investment flow",
    href: "/invest/axis-bluechip",
  },
  {
    id: "bank-update",
    icon: "CreditCard",
    title: "Bank Account Update",
    subtitle: "Add/update bank details with document upload",
    href: "#",
  },
  {
    id: "mobile-change",
    icon: "Phone",
    title: "Mobile Number Change",
    subtitle: "OTP-based mobile update",
    href: "#",
  },
  {
    id: "email-update",
    icon: "Mail",
    title: "Email Update",
    subtitle: "Email verification flow",
    href: "#",
  },
  {
    id: "statement",
    icon: "Download",
    title: "Account Statement",
    subtitle: "Download or email statements",
    href: "#",
  },
  {
    id: "design-system",
    icon: "Palette",
    title: "Design System",
    subtitle: "Complete component library and style guide",
    href: "#",
  },
];

export const keyInteractions = [
  "Click search bar on homepage to see trending searches and popular actions",
  "Search for \"Best SIP fund\" to see fund results with similar funds cross-sell",
  "Search for \"Add bank account\" to see service journey options",
  "Click \"Ask AxisMF Assistant\" on results page to open inline chat with blur background",
  "Search for \"SBI Small Cap Fund\" to see other AMC refusal message",
  "Navigate through multi-step journeys for investing, bank updates, and more",
];

export const trustMetrics = [
  {
    value: "₹1.5L Cr+",
    label: "Assets Under Management",
  },
  {
    value: "50L+",
    label: "Investors Trust Us",
  },
  {
    value: "25+ Years",
    label: "of Excellence",
  },
];

export const footerLinks = {
  about: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
  ],
  invest: [
    { label: "Explore Funds", href: "#" },
    { label: "SIP Calculator", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  resources: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Design System", href: "#" },
  ],
};

export const sipDefaults = {
  fund: "Axis Bluechip Fund - Direct Plan - Growth",
  amount: "5000",
  date: "1st of every month",
};

export const sipConfirmation = {
  referenceNumber: "AMF2026123456",
  firstDebitDate: "01 Mar 2026",
};

export const fundOptions = [
  { value: "axis-bluechip-direct", label: "Axis Bluechip Fund - Direct Plan - Growth" },
  { value: "axis-focused-direct", label: "Axis Focused 25 Fund - Direct Plan - Growth" },
  { value: "axis-midcap-direct", label: "Axis Midcap Fund - Direct Plan - Growth" },
];

export const sipDateOptions = [
  { value: "1", label: "1st of every month" },
  { value: "5", label: "5th of every month" },
  { value: "10", label: "10th of every month" },
  { value: "15", label: "15th of every month" },
  { value: "20", label: "20th of every month" },
  { value: "25", label: "25th of every month" },
];
