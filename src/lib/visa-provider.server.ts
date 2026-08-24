/**
 * Provider adapter for real visa-requirement data.
 *
 * Provider-agnostic on purpose: configure it with secrets and the normaliser
 * below maps whatever shape the provider returns onto our four access kinds.
 *
 *   VISA_API_URL          endpoint template, e.g.
 *                         https://visa-requirement.p.rapidapi.com/passport/{nationality}
 *   VISA_API_KEY          the API key
 *   VISA_API_KEY_HEADER   header name for the key (default: x-rapidapi-key)
 *   VISA_API_HOST         optional x-rapidapi-host value
 *   VISA_API_SOURCE       human label shown in the UI (default: derived from URL host)
 */

export type AccessKind = "free" | "voa" | "eta" | "required";

export interface ProviderConfig {
  url: string;
  key: string;
  keyHeader: string;
  host?: string;
  source: string;
}

export function readProviderConfig(): ProviderConfig | null {
  const url = process.env["VISA_API_URL"];
  const key = process.env["VISA_API_KEY"];
  if (!url || !key) return null;
  let source = process.env["VISA_API_SOURCE"];
  if (!source) {
    try {
      source = new URL(url.replace(/\{[^}]+\}/g, "x")).host;
    } catch {
      source = "visa-api";
    }
  }
  return {
    url,
    key,
    keyHeader: process.env["VISA_API_KEY_HEADER"] ?? "x-rapidapi-key",
    host: process.env["VISA_API_HOST"],
    source,
  };
}

/** Maps a provider's free-form requirement string onto our access kinds. */
export function normaliseAccess(raw: unknown): AccessKind | null {
  const v = String(raw ?? "")
    .toLowerCase()
    .trim();
  if (!v) return null;
  if (v.includes("e-visa") || v.includes("evisa") || v.includes("eta") || v.includes("authoris") || v.includes("authoriz") || v.includes("esta")) {
    return "eta";
  }
  if (v.includes("arrival")) return "voa";
  if (v.includes("visa required") || v.includes("visa needed") || v === "visa" || v.includes("banned") || v.includes("refused")) {
    return "required";
  }
  if (v.includes("free") || v.includes("no visa") || v.includes("not required") || v.includes("freedom of movement")) {
    return "free";
  }
  return null;
}

interface ProviderEntry {
  destination?: string;
  code?: string;
  iso?: string;
  country?: string;
  requirement?: string;
  status?: string;
  visa?: string;
  access?: string;
}

/**
 * Pulls the destination rules for one nationality. Returns a map of
 * destination ISO2 -> access kind, restricted to ISO codes we know about.
 */
export async function fetchRulesForNationality(
  config: ProviderConfig,
  nationality: string,
  knownIso: Set<string>,
): Promise<Record<string, AccessKind>> {
  const url = config.url.includes("{nationality}")
    ? config.url.replace("{nationality}", encodeURIComponent(nationality))
    : `${config.url}${config.url.includes("?") ? "&" : "?"}passport=${encodeURIComponent(nationality)}`;

  const headers: Record<string, string> = { accept: "application/json", [config.keyHeader]: config.key };
  if (config.host) headers["x-rapidapi-host"] = config.host;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`provider ${res.status} for ${nationality}`);
  const payload: unknown = await res.json();

  const out: Record<string, AccessKind> = {};

  const consider = (isoRaw: unknown, accessRaw: unknown) => {
    const iso = String(isoRaw ?? "").toUpperCase().trim();
    const access = normaliseAccess(accessRaw);
    if (!access || iso.length < 2 || !knownIso.has(iso)) return;
    out[iso] = access;
  };

  const walkList = (list: ProviderEntry[]) => {
    for (const entry of list) {
      consider(entry.code ?? entry.iso ?? entry.destination ?? entry.country, entry.requirement ?? entry.status ?? entry.visa ?? entry.access);
    }
  };

  if (Array.isArray(payload)) {
    walkList(payload as ProviderEntry[]);
  } else if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    // Shape A: { data: [...] } / { destinations: [...] }
    for (const key of ["data", "destinations", "results", "countries"]) {
      if (Array.isArray(obj[key])) walkList(obj[key] as ProviderEntry[]);
    }
    // Shape B: { visa_free: ["FR", ...], visa_on_arrival: [...], ... }
    const buckets: [string[], AccessKind][] = [
      [["visa_free", "visaFree", "vf"], "free"],
      [["visa_on_arrival", "visaOnArrival", "voa"], "voa"],
      [["eta", "e_visa", "evisa", "electronic_travel_authorisation"], "eta"],
      [["visa_required", "visaRequired", "vr"], "required"],
    ];
    for (const [keys, kind] of buckets) {
      for (const k of keys) {
        const list = obj[k];
        if (Array.isArray(list)) {
          for (const item of list) {
            const iso = typeof item === "string" ? item : ((item as ProviderEntry)?.code ?? (item as ProviderEntry)?.iso);
            consider(iso, kind === "free" ? "visa free" : kind === "voa" ? "visa on arrival" : kind === "eta" ? "eta" : "visa required");
          }
        }
      }
    }
    // Shape C: { "FR": "visa free", ... }
    for (const [k, v] of Object.entries(obj)) {
      if (k.length === 2 && (typeof v === "string" || typeof v === "number")) consider(k, v);
    }
  }

  return out;
}
