import { CopilotResponse } from "@/lib/copilot-engine";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchCopilotQuery(query: string, domainFilter: string = "all"): Promise<CopilotResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/copilot/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, domainFilter }),
    });

    if (!res.ok) return null;
    const data: CopilotResponse = await res.json();
    return data;
  } catch (error) {
    console.warn("FastAPI Backend offline, utilizing local multi-agent fallback engine", error);
    return null;
  }
}
