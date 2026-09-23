const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
const serverProductionApiUrl = "https://cheffe-chi.vercel.app/_/backend";
const isLocalApiUrl = configuredApiUrl?.includes("127.0.0.1") || configuredApiUrl?.includes("localhost");

function resolveApiBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return typeof window === "undefined" ? serverProductionApiUrl : "/_/backend";
  }

  if (isLocalApiUrl && typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return "/_/backend";
  }

  return configuredApiUrl ?? "";
}

export const API_BASE_URL = resolveApiBaseUrl();

export type Recipe = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  preparation_time?: string | null;
  cooking_time?: string | null;
  difficulty?: string | null;
  ingredients: string[];
  steps: string[];
  tips: string[];
  published: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
};

export type Creation = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  category: string;
  meta_title?: string | null;
  meta_description?: string | null;
};

export type JournalPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  published: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: string;
};

export async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
