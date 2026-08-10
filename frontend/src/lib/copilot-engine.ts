import { fraudCases, FraudCase } from "./fraud-data";
import { customers } from "./customer-data";

export interface Citation {
  type: "customer" | "fraud" | "sop";
  label: string;
  link: string;
  detail: string;
}

export interface CopilotResponse {
  markdownText: string;
  citations: Citation[];
  domainsCovered: ("Customer Intelligence" | "Fraud Telemetry" | "Regulatory SOPs")[];
  riskLevel?: "Critical" | "High" | "Medium" | "Low";
}

export function generateCrossFieldResponse(query: string, domainFilter: string = "all"): CopilotResponse {
  const q = query.toLowerCase();

  // Scenario 1: Maya Iyer / Portfolio Churn + Wire Fraud + FIU-IND Disclosure
  if (q.includes("maya") || q.includes("churn") || (q.includes("risk") && q.includes("exposure"))) {
    const mayaCase = fraudCases.find((c) => c.customer.name.includes("Maya")) || fraudCases[0];
    return {
      domainsCovered: ["Customer Intelligence", "Fraud Telemetry", "Regulatory SOPs"],
      riskLevel: "Critical",
      markdownText: `### 🛡️ Cross-Field Intelligence Analysis: Maya Iyer (CUST-40921)

**1. Customer Relationship Telemetry**:
- **Portfolio AUM**: ₹18.4 Crore ($2.2M USD) across 6 wealth management products.
- **Predicted Churn Risk**: **92% (High Risk)** due to recent net deposit outflows of -₹45L and unresolved wire fee disputes (#8849).

**2. Real-Time Fraud Intercept**:
- **Case Reference**: \`${mayaCase.id}\` (Risk Score: **${mayaCase.riskScore}/100**).
- **Flagged Anomaly**: Outbound wire transfer of **₹4,20,000** to *LuxPay Global Exch* (Dubai, UAE).
- **Session Telemetry**: Session established via Tor exit node in Dubai only 42 minutes after an authentic mobile login in Mumbai (Velocity anomaly: 1,920 km in 42 mins).

**3. Regulatory SOP & Compliance Directives**:
- **Citation**: *SOP-2026-WIRE (Section 7.1 — Dual Approval)* & *SOP-2026-AML (Section 2.4)*.
- **Mandatory Disclosure**: 24-hour window to file an electronic **FIU-IND Suspicious Activity Report (SAR)** due to un-biometric device binding.
- **Recommended Action**: Hold wire execution, offer +0.75% deposit bonus rate to retain liquid funds, and issue 3DS biometric hardware push challenge.`,
      citations: [
        {
          type: "customer",
          label: "Maya Iyer (CUST-40921)",
          link: "/customer",
          detail: "₹18.4M Portfolio • 92% Churn Risk Alert",
        },
        {
          type: "fraud",
          label: mayaCase.id,
          link: "/fraud",
          detail: `₹4.2L Wire Intercept • Tor IP Anomaly (Dubai)`,
        },
        {
          type: "sop",
          label: "SOP-2026-AML (Section 2.4)",
          link: "/knowledge",
          detail: "24-Hour Mandatory FIU-IND Disclosure Window",
        },
      ],
    };
  }

  // Scenario 2: SWIFT Wire / High-Value Corporate Fraud (Karan Mehta / Apex Offshore)
  if (q.includes("swift") || q.includes("wire") || q.includes("karan") || q.includes("cayman") || q.includes("1.25")) {
    const karanCase = fraudCases.find((c) => c.id === "CASE-8945-TXN") || fraudCases[3];
    return {
      domainsCovered: ["Fraud Telemetry", "Customer Intelligence", "Regulatory SOPs"],
      riskLevel: "Critical",
      markdownText: `### ⚡ Cross-Field Synthesis: High-Value SWIFT Wire Intercept

**1. Enterprise Corporate Fraud Telemetry**:
- **Case Reference**: \`${karanCase.id}\` (Risk Score: **99/100 — CRITICAL**).
- **Customer**: Karan Mehta (GlobalCorp Treasury Signatory).
- **Target Entity**: *Apex Offshore Holdings LLC* (Cayman Islands, MCC 6211).
- **Attempted Outflow**: **₹1,25,00,000 ($150,000 USD)**.
- **Threat Vector**: Windows Server RDP compromise following spear-phishing credential theft; bypassed dual CFO authorization.

**2. Regulatory SOP Enforcement**:
- **Citation**: *CBTM-4.2 (Cross-Border Transaction Monitoring)* & *FCEM-1.3 (Financial Crime Matrix)*.
- **Sanctions Match**: Target wallet address is flagged in 3 cross-institutional SARs linked to Eastern European ATO syndicates.

**3. Actionable Defense Mandate**:
- Emergency account freeze auto-triggered. Direct executive callback required to Corporate Treasurer before SWIFT gateway release.`,
      citations: [
        {
          type: "fraud",
          label: "CASE-8945-TXN",
          link: "/fraud",
          detail: "₹1.25 Cr Cayman Islands SWIFT Wire Intercept",
        },
        {
          type: "customer",
          label: "Karan Mehta (GlobalCorp)",
          link: "/customer",
          detail: "Corporate Treasury • ₹240M Managed Balance",
        },
        {
          type: "sop",
          label: "CBTM-4.2 Cross-Border Standard",
          link: "/knowledge",
          detail: "Mandatory Sanctions & OFAC Cross-Check Protocol",
        },
      ],
    };
  }

  // Scenario 3: Regulatory Compliance / KYC / 24-hr SAR Disclosure
  if (q.includes("kyc") || q.includes("sar") || q.includes("fiu") || q.includes("policy") || q.includes("sop")) {
    return {
      domainsCovered: ["Regulatory SOPs", "Fraud Telemetry"],
      riskLevel: "High",
      markdownText: `### 📋 Regulatory Compliance & Policy Synthesis

**1. High-Value KYC & UBO Mandates (SOP-2026-KYC)**:
- Mandatory Enhanced Due Diligence (EDD) applies to all individual & commercial accounts exceeding **₹1 Crore**.
- Ultimate Beneficial Owners (UBO) controlling **≥10% equity** must submit verified tax residency and Interpol sanctions cross-check clearances.

**2. Suspicious Activity Reporting (SOP-2026-AML Section 2.4)**:
- Any transaction involving un-biometric device binding, Tor exit node routing, or legacy cooling period bypass triggers a **mandatory 24-Hour FIU-IND SAR filing window**.

**3. Active Portfolio Impact**:
- Currently **2 active high-priority cases** (\`CASE-8942-TXN\` & \`CASE-8945-TXN\`) require regulatory disclosure drafts today.`,
      citations: [
        {
          type: "sop",
          label: "SOP-2026-KYC (Section 4.2)",
          link: "/knowledge",
          detail: "Enhanced Due Diligence & 10% UBO Ownership Verification",
        },
        {
          type: "sop",
          label: "SOP-2026-AML (Section 2.4)",
          link: "/knowledge",
          detail: "24-Hour Mandatory FIU-IND Disclosure Filing",
        },
        {
          type: "fraud",
          label: "Pending SAR Filings (2 Cases)",
          link: "/fraud",
          detail: "CASE-8942-TXN (Maya Iyer) & CASE-8945-TXN (Karan Mehta)",
        },
      ],
    };
  }

  // Default General Cross-Field Response
  return {
    domainsCovered: ["Customer Intelligence", "Fraud Telemetry", "Regulatory SOPs"],
    riskLevel: "Medium",
    markdownText: `### 🤖 Aegis Neural Intelligence Workspace Overview

**Portfolio & Risk Synthesis Summary**:
- **Total Portfolio Monitored**: **₹480.5M** across 4 primary customer tiers.
- **Active Fraud Intercepts**: **4 alerts total** (1 Critical SWIFT wire, 1 High velocity anomaly, 1 Medium travel mismatch, 1 Low UPI audit).
- **Regulatory SOP Standing**: **100% compliance** with RBI master directions and FIU-IND 24-hour reporting protocols.

*Ask specific questions about customers (e.g., Maya Iyer), fraud alerts (e.g., CASE-8945-TXN), or compliance policies (e.g., KYC thresholds).*`,
    citations: [
      {
        type: "customer",
        label: "Customer Portfolio",
        link: "/customer",
        detail: "4 Active Accounts Monitored",
      },
      {
        type: "fraud",
        label: "Fraud Workstation",
        link: "/fraud",
        detail: "4 Live Intercept Telemetry Alerts",
      },
      {
        type: "sop",
        label: "Knowledge Repository",
        link: "/knowledge",
        detail: "SOP-2026 Edition Indexed",
      },
    ],
  };
}
