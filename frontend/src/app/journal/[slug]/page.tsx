import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import { apiFetch, type JournalPost } from "@/lib/api";

export const dynamic = "force-dynamic";
type JournalPageProps = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  try { return await apiFetch<JournalPost>(`/api/journal/${slug}`); } catch { notFound(); }
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return { title: post.meta_title ?? `${post.title} | Le Journal`, description: post.meta_description ?? post.excerpt };
}

export default async function JournalPostPage({ params }: JournalPageProps) {
  const post = await getPost((await params).slug);
  const image = post.cover_image ?? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";
  const date = new Date(post.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#111111]">
      <SiteHeader />
      <article className="section-shell max-w-5xl py-12 md:py-20">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Le Journal · {date}</p>
        <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[0.9] md:text-8xl">{post.title}</h1>
        <p className="mt-8 max-w-2xl font-display text-3xl leading-tight text-[#40352f]">{post.excerpt}</p>
        <div className="relative mt-12 h-[45vh] min-h-[320px] overflow-hidden rounded-[2rem]"><Image src={image} alt={post.title} fill priority className="object-cover" /></div>
        <div className="mx-auto max-w-2xl py-12 text-lg leading-9 text-[#40352f]"><p>{post.content}</p></div>
      </article>
    </main>
  );
}
