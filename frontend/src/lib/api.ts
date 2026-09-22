const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
const isLoopbackUrl = configuredApiUrl?.includes("127.0.0.1") || configuredApiUrl?.includes("localhost");

export const API_BASE_URL =
  process.env.NODE_ENV === "production" && isLoopbackUrl
    ? "/_/backend"
    : configuredApiUrl ?? "http://127.0.0.1:8000";

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
