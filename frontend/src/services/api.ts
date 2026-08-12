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

export async function fetchTimeSeriesTelemetry(customerId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/timeseries/${customerId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn("FastAPI Backend offline, using local time-series fallback", error);
    return null;
  }
}

export async function loginUser(email: string, password: string = "password123", role?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { error: errData.detail || "Authentication failed. Invalid email or password." };
    }
    return await res.json();
  } catch (error) {
    console.warn("FastAPI Auth offline", error);
    return null;
  }
}
