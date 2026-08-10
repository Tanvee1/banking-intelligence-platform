export interface RecommendedAction {
  id: string;
  title: string;
  priority: "Immediate" | "High" | "Medium" | "Low";
  expectedImpact: string;
  confidence: string;
  description: string;
  actionKey: "freeze" | "escalate" | "call" | "otp";
}

export interface NetworkNode {
  id: string;
  label: string;
  sublabel: string;
  type: "customer" | "card" | "merchant" | "device" | "location";
  risk: "high" | "medium" | "low";
  details?: string;
}

export interface NetworkLink {
  source: string;
  target: string;
  label: string;
  suspicious?: boolean;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  details: string;
  status: "normal" | "warning" | "critical";
  ip?: string;
  device?: string;
}

export interface SimilarCase {
  caseId: string;
  customer: string;
  date: string;
  outcome: string;
  recovery: string;
  similarity: string;
  risk: "High" | "Medium" | "Low";
}

export interface FraudCase {
  id: string;
  transactionId: string;
  customer: {
    name: string;
    id: string;
    tier: string;
    email: string;
    phone: string;
  };
  amount: string;
  rawAmount: number;
  merchant: {
    name: string;
    category: string;
    country: string;
    merchantId: string;
  };
  device: {
    name: string;
    ip: string;
    isVpnOrTor: boolean;
    vpnName: string;
    mac: string;
    trustScore: string;
  };
  location: {
    city: string;
    country: string;
    anomaly: string;
  };
  transactionType: string;
  risk: "High" | "Medium" | "Low" | "Critical";
  riskScore: number;
  analyst: string;
  status: "Under Review" | "Escalated" | "Frozen" | "Monitoring" | "Cleared";
  time: string;
  timestamp: string;
  aiSummary: string;
  actions: RecommendedAction[];
  networkNodes: NetworkNode[];
  networkLinks: NetworkLink[];
  timeline: TimelineEvent[];
  similarCases: SimilarCase[];
}

export const fraudCases: FraudCase[] = [
  {
    id: "CASE-8942-TXN",
    transactionId: "TXN-90482103",
    customer: {
      name: "Maya Iyer",
      id: "CUST-40921",
      tier: "Affluent Banking",
      email: "m.iyer@corporate.com",
      phone: "+91 98765 43210",
    },
    amount: "₹4,20,000",
    rawAmount: 420000,
    merchant: {
      name: "LuxPay Global Exch",
      category: "Crypto / Currency Exch (MCC 6051)",
      country: "United Arab Emirates",
      merchantId: "MER-99210",
    },
    device: {
      name: "Generic Linux x86_64",
      ip: "185.220.101.5",
      isVpnOrTor: true,
      vpnName: "Tor Exit Node (Relay #412)",
      mac: "4A:8B:19:C2:90:FF",
      trustScore: "12/100 (Untrusted)",
    },
    location: {
      city: "Dubai",
      country: "United Arab Emirates",
      anomaly: "Velocity Anomaly: 1,920 km in 42 mins from previous session in Mumbai",
    },
    transactionType: "High-Value Outbound Wire Transfer (IMPS/RTGS)",
    risk: "High",
    riskScore: 94,
    analyst: "Sarah Jenkins (Lead Specialist)",
    status: "Under Review",
    time: "2 mins ago",
    timestamp: "2026-08-09 11:42:08 UTC",
    aiSummary:
      "Aegis Neural Risk Engine flagged this transaction due to a severe composite velocity and device fingerprint anomaly. At 11:00 UTC, the customer's authenticated mobile banking session was active in Mumbai, India via an iOS device registered under primary hardware MFA. Only 42 minutes later, a separate session initiated an un-biometric password reset request from an unrecognized Linux user-agent routing through a documented Tor exit node IP in Dubai, UAE.\n\nThe transaction amount of ₹4,20,000 represents a 14x deviation from Maya Iyer's trailing 90-day daily outbound transfer baseline of ₹30,000. Furthermore, the receiving merchant (LuxPay Global Exch, MCC 6051) was added as a beneficiary less than 3 minutes prior to execution, completely bypassing standard 24-hour beneficiary cooling periods through an exploited API legacy endpoint.\n\nGraph telemetry indicates the target wallet address associated with LuxPay Global Exch has been flagged in 3 recent cross-institutional suspicious activity reports (SARs) linked to account takeover (ATO) syndicates operating out of Eastern Europe.",
    actions: [
      {
        id: "act-1",
        title: "Freeze Debit Card & Account",
        actionKey: "freeze",
        priority: "Immediate",
        expectedImpact: "Prevents downstream fraudulent transfers of remaining ₹18.4M portfolio balance.",
        confidence: "98% AI Confidence",
        description: "Instantly restrict outbound wire transfers, card transactions, and net banking access.",
      },
      {
        id: "act-2",
        title: "Escalate to Tier-2 Fraud Squad",
        actionKey: "escalate",
        priority: "High",
        expectedImpact: "Triggers senior investigator review & cross-bank SAR draft within 60 mins.",
        confidence: "95% AI Confidence",
        description: "Assign case to Financial Crime Unit and prepare regulatory FIU-IND disclosure.",
      },
      {
        id: "act-3",
        title: "Initiate Out-of-Band Call",
        actionKey: "call",
        priority: "Medium",
        expectedImpact: "Verifies customer identity via secure voice biometric callback.",
        confidence: "91% AI Confidence",
        description: "Reach Maya Iyer at registered primary number +91 98765 43210.",
      },
      {
        id: "act-4",
        title: "Request Step-Up OTP & Biometric",
        actionKey: "otp",
        priority: "High",
        expectedImpact: "Forces mandatory hardware key push verification on trusted iOS device.",
        confidence: "94% AI Confidence",
        description: "Invalidate current session tokens and send push challenge to registered iPhone.",
      },
    ],
    networkNodes: [
      {
        id: "n-cust",
        label: "Maya Iyer",
        sublabel: "CUST-40921 (Affluent)",
        type: "customer",
        risk: "high",
        details: "Portfolio: ₹18.4M • Account Age: 6 yrs",
      },
      {
        id: "n-card",
        label: "Visa Infinite *4921",
        sublabel: "Primary Debit Card",
        type: "card",
        risk: "medium",
        details: "Issued: HDFC Wealth • Active Status",
      },
      {
        id: "n-merch",
        label: "LuxPay Global",
        sublabel: "MCC 6051 (Crypto Exch)",
        type: "merchant",
        risk: "high",
        details: "Flagged in 3 SARs • High-risk MCC",
      },
      {
        id: "n-dev",
        label: "Linux x86_64",
        sublabel: "MAC: 4A:8B:19:C2:90:FF",
        type: "device",
        risk: "high",
        details: "Unrecognized Device • Trust 12/100",
      },
      {
        id: "n-loc",
        label: "Dubai, UAE",
        sublabel: "IP 185.220.101.5 (Tor)",
        type: "location",
        risk: "high",
        details: "Impossible Travel: 1,920km in 42m",
      },
    ],
    networkLinks: [
      { source: "n-cust", target: "n-card", label: "Owns Account" },
      { source: "n-card", target: "n-merch", label: "₹4,20,000 Transfer", suspicious: true },
      { source: "n-dev", target: "n-merch", label: "Session Route", suspicious: true },
      { source: "n-dev", target: "n-loc", label: "IP Geolocation", suspicious: true },
      { source: "n-cust", target: "n-dev", label: "Unauthed Binding", suspicious: true },
    ],
    timeline: [
      {
        id: "t-1",
        timestamp: "11:00:14 UTC",
        event: "Authentic Mobile Login",
        details: "Successful FaceID biometric login via iOS app",
        status: "normal",
        ip: "122.170.42.18 (Mumbai, IN)",
        device: "iPhone 15 Pro",
      },
      {
        id: "t-2",
        timestamp: "11:35:40 UTC",
        event: "Password Reset Request",
        details: "Web portal password reset triggered via SMS OTP",
        status: "warning",
        ip: "185.220.101.5 (Dubai, UAE)",
        device: "Linux x86_64",
      },
      {
        id: "t-3",
        timestamp: "11:38:02 UTC",
        event: "New Device Registered",
        details: "Linux desktop registered to mobile session token",
        status: "warning",
        ip: "185.220.101.5 (Dubai, UAE)",
        device: "Linux x86_64 (Tor)",
      },
      {
        id: "t-4",
        timestamp: "11:39:15 UTC",
        event: "Beneficiary Added",
        details: "LuxPay Global Exch added with 0-min cooldown bypass",
        status: "critical",
        ip: "185.220.101.5 (Dubai, UAE)",
        device: "Linux x86_64",
      },
      {
        id: "t-5",
        timestamp: "11:42:08 UTC",
        event: "High-Value IMPS Transfer",
        details: "Initiated ₹4,20,000 wire transfer to LuxPay Global",
        status: "critical",
        ip: "185.220.101.5 (Dubai, UAE)",
        device: "Linux x86_64",
      },
      {
        id: "t-6",
        timestamp: "11:42:09 UTC",
        event: "Aegis AI Engine Flag",
        details: "Transaction placed on Hold. Risk Score: 94/100",
        status: "critical",
      },
    ],
    similarCases: [
      {
        caseId: "CASE-7712-TXN",
        customer: "Rohan Kapoor",
        date: "14 Jul 2026",
        outcome: "Confirmed ATO Fraud",
        recovery: "100% (₹3,80,000 Saved)",
        similarity: "96% match",
        risk: "High",
      },
      {
        caseId: "CASE-6590-TXN",
        customer: "Anita Desai",
        date: "02 Jun 2026",
        outcome: "Confirmed ATO Fraud",
        recovery: "85% (₹5,10,000 Recovered)",
        similarity: "91% match",
        risk: "High",
      },
      {
        caseId: "CASE-5104-TXN",
        customer: "Siddharth Verma",
        date: "18 Apr 2026",
        outcome: "False Positive (Verified Travel)",
        recovery: "N/A (Legitimate)",
        similarity: "74% match",
        risk: "Medium",
      },
    ],
  },
  {
    id: "CASE-8943-TXN",
    transactionId: "TXN-90482188",
    customer: {
      name: "Arjun Sharma",
      id: "CUST-38104",
      tier: "Private Banking",
      email: "a.sharma@invest.com",
      phone: "+91 98200 11223",
    },
    amount: "₹1,85,000",
    rawAmount: 185000,
    merchant: {
      name: "Apple Store Regent St",
      category: "Electronics & Tech (MCC 5732)",
      country: "United Kingdom",
      merchantId: "MER-44102",
    },
    device: {
      name: "MacBook Air M2",
      ip: "86.14.220.91",
      isVpnOrTor: false,
      vpnName: "Residential Broadband (Virgin Media UK)",
      mac: "8C:85:90:11:44:A1",
      trustScore: "45/100 (Unusual Location)",
    },
    location: {
      city: "London",
      country: "United Kingdom",
      anomaly: "New Country Location: Customer reported travel starting Aug 10, transaction occurred Aug 9",
    },
    transactionType: "Card-Not-Present International E-commerce",
    risk: "Medium",
    riskScore: 68,
    analyst: "David Chen (Fraud Investigator)",
    status: "Under Review",
    time: "18 mins ago",
    timestamp: "2026-08-09 11:26:15 UTC",
    aiSummary:
      "Aegis Risk Engine detected a moderate anomaly triggered by a high-value Card-Not-Present transaction in London, UK. The cardholder, Arjun Sharma, has a registered travel plan on file commencing August 10, 2026; however, this authorization attempt occurred 24 hours prior to scheduled departure.\n\nThe billing address matches registered card records, and the device fingerprint matches a secondary browser profile last seen 30 days ago. The transaction value of ₹1,85,000 for luxury electronics is within 1.5x of the customer's typical overseas shopping activity during previous European trips.\n\nWhile the transaction carries risk due to the timing mismatch, no credential stuffing or session hijacking signals were detected. Risk models recommend soft-challenging via 3DS Push Notification to verify cardholder authorization.",
    actions: [
      {
        id: "act-1",
        title: "Request Step-Up OTP & Biometric",
        actionKey: "otp",
        priority: "High",
        expectedImpact: "Instantly verifies cardholder authorization via 3DS Push on primary phone.",
        confidence: "96% AI Confidence",
        description: "Send 3D Secure push authorization to registered mobile app.",
      },
      {
        id: "act-2",
        title: "Initiate Out-of-Band Call",
        actionKey: "call",
        priority: "Medium",
        expectedImpact: "Confirms early flight arrival or pre-authorization with customer.",
        confidence: "88% AI Confidence",
        description: "Attempt automated voice call to cardholder phone +91 98200 11223.",
      },
      {
        id: "act-3",
        title: "Freeze Debit Card & Account",
        actionKey: "freeze",
        priority: "Low",
        expectedImpact: "Temporary hold on international card transactions pending confirmation.",
        confidence: "65% AI Confidence",
        description: "Block international CNP authorizations only.",
      },
      {
        id: "act-4",
        title: "Escalate to Tier-2 Fraud Squad",
        actionKey: "escalate",
        priority: "Low",
        expectedImpact: "Hands off to international card risk team if unverified in 2 hours.",
        confidence: "70% AI Confidence",
        description: "Flag case for secondary review after 120 mins.",
      },
    ],
    networkNodes: [
      {
        id: "n-cust",
        label: "Arjun Sharma",
        sublabel: "CUST-38104 (Private)",
        type: "customer",
        risk: "medium",
        details: "Portfolio: ₹42.1M • Travel Plan On File",
      },
      {
        id: "n-card",
        label: "Mastercard World *1102",
        sublabel: "Credit Card",
        type: "card",
        risk: "low",
        details: "Issued: HDFC Imperial • Clean Record",
      },
      {
        id: "n-merch",
        label: "Apple Store London",
        sublabel: "MCC 5732 (Electronics)",
        type: "merchant",
        risk: "low",
        details: "Verified Retailer • Low Chargeback",
      },
      {
        id: "n-dev",
        label: "MacBook Air M2",
        sublabel: "MAC: 8C:85:90:11:44:A1",
        type: "device",
        risk: "medium",
        details: "Secondary Device • Recognized Profile",
      },
      {
        id: "n-loc",
        label: "London, UK",
        sublabel: "IP 86.14.220.91 (Virgin UK)",
        type: "location",
        risk: "medium",
        details: "Travel Plan Mismatch (-24 Hours)",
      },
    ],
    networkLinks: [
      { source: "n-cust", target: "n-card", label: "Primary Holder" },
      { source: "n-card", target: "n-merch", label: "₹1,85,000 Purchase" },
      { source: "n-dev", target: "n-merch", label: "Web Checkout" },
      { source: "n-dev", target: "n-loc", label: "Residential IP" },
      { source: "n-cust", target: "n-dev", label: "Known Laptop", suspicious: true },
    ],
    timeline: [
      {
        id: "t-1",
        timestamp: "08:15:00 UTC",
        event: "Travel Notice Filed",
        details: "Customer filed travel notice for UK & EU (Aug 10 - Aug 25)",
        status: "normal",
      },
      {
        id: "t-2",
        timestamp: "11:20:10 UTC",
        event: "Merchant Session Started",
        details: "Visited apple.com/uk via desktop Safari browser",
        status: "normal",
        ip: "86.14.220.91 (London, UK)",
        device: "MacBook Air M2",
      },
      {
        id: "t-3",
        timestamp: "11:26:15 UTC",
        event: "CNP Authorization Attempt",
        details: "Initiated £1,750 (₹1,85,000) transaction",
        status: "warning",
        ip: "86.14.220.91 (London, UK)",
        device: "MacBook Air M2",
      },
      {
        id: "t-4",
        timestamp: "11:26:16 UTC",
        event: "Aegis Rule Engine Warning",
        details: "Early travel timing anomaly detected. Risk Score: 68/100",
        status: "warning",
      },
    ],
    similarCases: [
      {
        caseId: "CASE-6119-TXN",
        customer: "Vikram Malhotra",
        date: "22 May 2026",
        outcome: "Verified Genuine (Early Flight)",
        recovery: "N/A (Legitimate)",
        similarity: "89% match",
        risk: "Low",
      },
      {
        caseId: "CASE-4902-TXN",
        customer: "Neha Gupta",
        date: "04 Mar 2026",
        outcome: "Confirmed Card Theft",
        recovery: "100% (₹1,20,000 Blocked)",
        similarity: "81% match",
        risk: "Medium",
      },
    ],
  },
  {
    id: "CASE-8944-TXN",
    transactionId: "TXN-90482201",
    customer: {
      name: "Priya Nair",
      id: "CUST-19283",
      tier: "Preferred Retail",
      email: "p.nair@techfirm.io",
      phone: "+91 97110 88392",
    },
    amount: "₹58,000",
    rawAmount: 58000,
    merchant: {
      name: "Flipkart Internet Pvt Ltd",
      category: "Online General Retail (MCC 5311)",
      country: "India",
      merchantId: "MER-10029",
    },
    device: {
      name: "Samsung Galaxy S24",
      ip: "49.37.112.44",
      isVpnOrTor: false,
      vpnName: "Jio Cellular Network",
      mac: "12:34:56:78:9A:BC",
      trustScore: "98/100 (Trusted)",
    },
    location: {
      city: "Bangalore",
      country: "India",
      anomaly: "None - Matches primary residence and regular network subnet",
    },
    transactionType: "Domestic UPI Outbound Payment",
    risk: "Low",
    riskScore: 22,
    analyst: "Sarah Jenkins (Lead Specialist)",
    status: "Monitoring",
    time: "1 hour ago",
    timestamp: "2026-08-09 10:30:00 UTC",
    aiSummary:
      "Aegis Risk Engine evaluates this transaction as low risk (Score 22/100). The purchase was conducted on Priya Nair's primary registered mobile device via biometric UPI authentication in Bangalore, India.\n\nThe transaction amount of ₹58,000 is slightly above her median purchase threshold (₹15,000); however, seasonal promotional shopping patterns on Flipkart during festival sales match historical spend trends for this customer segment.\n\nAll security signals (SIM binding, device ID, IP subnet, device orientation, and gesture cadence) match baseline telemetry perfectly. Flagged solely for routine high-value audit threshold compliance.",
    actions: [
      {
        id: "act-1",
        title: "Clear & Approve Transaction",
        actionKey: "freeze",
        priority: "Low",
        expectedImpact: "Releases routine monitoring hold and completes settlement.",
        confidence: "99% AI Confidence",
        description: "Mark case as false positive / legitimate purchase.",
      },
      {
        id: "act-2",
        title: "Request Step-Up OTP & Biometric",
        actionKey: "otp",
        priority: "Low",
        expectedImpact: "Optional verification if customer raises query.",
        confidence: "95% AI Confidence",
        description: "Send standard transaction SMS alert.",
      },
      {
        id: "act-3",
        title: "Initiate Out-of-Band Call",
        actionKey: "call",
        priority: "Low",
        expectedImpact: "Not recommended for low risk score.",
        confidence: "30% AI Confidence",
        description: "Call customer only if requested.",
      },
      {
        id: "act-4",
        title: "Escalate to Tier-2 Fraud Squad",
        actionKey: "escalate",
        priority: "Low",
        expectedImpact: "No escalation required.",
        confidence: "10% AI Confidence",
        description: "Close investigation file.",
      },
    ],
    networkNodes: [
      {
        id: "n-cust",
        label: "Priya Nair",
        sublabel: "CUST-19283 (Preferred)",
        type: "customer",
        risk: "low",
        details: "Portfolio: ₹3.2M • Good Standing",
      },
      {
        id: "n-card",
        label: "UPI handle @okaxis",
        sublabel: "Savings Account Link",
        type: "card",
        risk: "low",
        details: "Linked to Primary Account",
      },
      {
        id: "n-merch",
        label: "Flipkart India",
        sublabel: "MCC 5311 (E-commerce)",
        type: "merchant",
        risk: "low",
        details: "Verified Enterprise Merchant",
      },
      {
        id: "n-dev",
        label: "Samsung S24",
        sublabel: "MAC: 12:34:56:78:9A:BC",
        type: "device",
        risk: "low",
        details: "Primary Registered Phone",
      },
      {
        id: "n-loc",
        label: "Bangalore, IN",
        sublabel: "IP 49.37.112.44 (Jio 5G)",
        type: "location",
        risk: "low",
        details: "Home Base • Zero Anomaly",
      },
    ],
    networkLinks: [
      { source: "n-cust", target: "n-card", label: "Primary Account" },
      { source: "n-card", target: "n-merch", label: "₹58,000 Payment" },
      { source: "n-dev", target: "n-merch", label: "App Checkout" },
      { source: "n-dev", target: "n-loc", label: "5G Cellular" },
      { source: "n-cust", target: "n-dev", label: "Biometric Bound" },
    ],
    timeline: [
      {
        id: "t-1",
        timestamp: "10:28:12 UTC",
        event: "App Launch & Biometric Unlock",
        details: "Fingerprint unlock on Android app",
        status: "normal",
        ip: "49.37.112.44 (Bangalore, IN)",
        device: "Samsung Galaxy S24",
      },
      {
        id: "t-2",
        timestamp: "10:30:00 UTC",
        event: "UPI Payment Authorization",
        details: "Entered valid 6-digit UPI PIN",
        status: "normal",
        ip: "49.37.112.44 (Bangalore, IN)",
        device: "Samsung Galaxy S24",
      },
      {
        id: "t-3",
        timestamp: "10:30:01 UTC",
        event: "Aegis Rule Engine Audit Pass",
        details: "Transaction approved under routine monitoring. Risk Score: 22/100",
        status: "normal",
      },
    ],
    similarCases: [
      {
        caseId: "CASE-3091-TXN",
        customer: "Priya Nair",
        date: "12 Oct 2025",
        outcome: "Verified Genuine Sale",
        recovery: "N/A",
        similarity: "98% match",
        risk: "Low",
      },
    ],
  },
  {
    id: "CASE-8945-TXN",
    transactionId: "TXN-90482390",
    customer: {
      name: "Karan Mehta",
      id: "CUST-88391",
      tier: "Corporate Treasury",
      email: "k.mehta@globalcorp.com",
      phone: "+91 99301 77481",
    },
    amount: "₹1,25,00,000",
    rawAmount: 12500000,
    merchant: {
      name: "Apex Offshore Holdings LLC",
      category: "Financial Intermediary (MCC 6211)",
      country: "Cayman Islands",
      merchantId: "MER-88091",
    },
    device: {
      name: "Windows Server 2022 / RDP",
      ip: "103.224.180.12",
      isVpnOrTor: true,
      vpnName: "Proxy Mesh / Unregistered ISP",
      mac: "00:15:5D:01:A2:3F",
      trustScore: "05/100 (Critical Suspicion)",
    },
    location: {
      city: "George Town",
      country: "Cayman Islands",
      anomaly: "Offshore Shell Recipient + Unrecognized RDP Session",
    },
    transactionType: "High-Value SWIFT International Wire Transfer",
    risk: "Critical",
    riskScore: 99,
    analyst: "Sarah Jenkins (Lead Specialist)",
    status: "Escalated",
    time: "3 mins ago",
    timestamp: "2026-08-09 11:41:00 UTC",
    aiSummary:
      "CRITICAL ALERT: Aegis Autonomous Defense System intercepted an unauthorized ₹1.25 Crore ($150,000 USD equivalent) corporate treasury wire transfer targeting a high-risk offshore entity in the Cayman Islands.\n\nThe session was established via Remote Desktop Protocol (RDP) using compromised C-suite corporate credentials obtained through an active spear-phishing campaign. Dual-control authorization rules were bypassed by leveraging a compromised CFO secondary token.\n\nGraph analysis ties the beneficiary account Apex Offshore Holdings LLC to a known money laundering network previously flagged by FinCEN and Interpol. Instant freeze protocols have been automatically triggered to hold funds prior to SWIFT release.",
    actions: [
      {
        id: "act-1",
        title: "Freeze Debit Card & Account",
        actionKey: "freeze",
        priority: "Immediate",
        expectedImpact: "Halts SWIFT wire transmission instantly; freezes corporate account.",
        confidence: "100% AI Confidence",
        description: "Emergency block on all corporate treasury ledger operations.",
      },
      {
        id: "act-2",
        title: "Escalate to Tier-2 Fraud Squad",
        actionKey: "escalate",
        priority: "Immediate",
        expectedImpact: "Notify Chief Risk Officer, Cyber Incident Response & Legal Counsel.",
        confidence: "99% AI Confidence",
        description: "Activate Enterprise Crisis Protocol Level 1.",
      },
      {
        id: "act-3",
        title: "Initiate Out-of-Band Call",
        actionKey: "call",
        priority: "High",
        expectedImpact: "Direct executive callback to Corporate Treasurer & CEO.",
        confidence: "95% AI Confidence",
        description: "Call Karan Mehta at +91 99301 77481 and Corporate Risk Desk.",
      },
      {
        id: "act-4",
        title: "Request Step-Up OTP & Biometric",
        actionKey: "otp",
        priority: "High",
        expectedImpact: "Forces mandatory YubiKey hardware token verification.",
        confidence: "97% AI Confidence",
        description: "Revoke all active enterprise SSO sessions.",
      },
    ],
    networkNodes: [
      {
        id: "n-cust",
        label: "Karan Mehta",
        sublabel: "GlobalCorp Treasury",
        type: "customer",
        risk: "high",
        details: "Corporate Account: ₹240M • C-Suite Privileges",
      },
      {
        id: "n-card",
        label: "Treasury Wire Ledger",
        sublabel: "SWIFT / RTGS Direct",
        type: "card",
        risk: "high",
        details: "High-Limit Treasury Account",
      },
      {
        id: "n-merch",
        label: "Apex Offshore LLC",
        sublabel: "MCC 6211 (Cayman)",
        type: "merchant",
        risk: "high",
        details: "FinCEN / Interpol Flagged Entity",
      },
      {
        id: "n-dev",
        label: "RDP Server (Win2022)",
        sublabel: "MAC: 00:15:5D:01:A2:3F",
        type: "device",
        risk: "high",
        details: "RDP Compromise • Proxy Mesh",
      },
      {
        id: "n-loc",
        label: "Cayman Islands",
        sublabel: "IP 103.224.180.12",
        type: "location",
        risk: "high",
        details: "High Risk Jurisdiction",
      },
    ],
    networkLinks: [
      { source: "n-cust", target: "n-card", label: "Corporate Signatory" },
      { source: "n-card", target: "n-merch", label: "₹1.25 Cr Transfer", suspicious: true },
      { source: "n-dev", target: "n-merch", label: "RDP Exploit", suspicious: true },
      { source: "n-dev", target: "n-loc", label: "Proxy Tunnel", suspicious: true },
      { source: "n-cust", target: "n-dev", label: "Phished SSO Session", suspicious: true },
    ],
    timeline: [
      {
        id: "t-1",
        timestamp: "11:15:00 UTC",
        event: "Credential Phishing Alert",
        details: "Targeted spear-phishing email opened by C-suite assistant",
        status: "critical",
        ip: "103.224.180.12",
        device: "RDP Client",
      },
      {
        id: "t-2",
        timestamp: "11:32:04 UTC",
        event: "SSO Hijack & MFA Override",
        details: "Stolen session token reused to bypass dual approval",
        status: "critical",
        ip: "103.224.180.12",
        device: "Windows Server RDP",
      },
      {
        id: "t-3",
        timestamp: "11:41:00 UTC",
        event: "SWIFT Wire Initiated",
        details: "₹1,25,00,000 wire targeted to Apex Offshore Cayman",
        status: "critical",
      },
      {
        id: "t-4",
        timestamp: "11:41:01 UTC",
        event: "Aegis Critical Interception",
        details: "Automated Hold & Account Quarantine Triggered. Risk Score: 99/100",
        status: "critical",
      },
    ],
    similarCases: [
      {
        caseId: "CASE-8012-TXN",
        customer: "Zenith Logistics",
        date: "04 Jun 2026",
        outcome: "Intercepted BEC Fraud",
        recovery: "100% (₹2.1 Cr Saved)",
        similarity: "99% match",
        risk: "High",
      },
    ],
  },
];