import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import { apiFetch, type Creation } from "@/lib/api";

export const dynamic = "force-dynamic";
type CreationPageProps = { params: Promise<{ slug: string }> };

async function getCreation(slug: string) {
  try { return await apiFetch<Creation>(`/api/creations/${slug}`); } catch { notFound(); }
}

export async function generateMetadata({ params }: CreationPageProps): Promise<Metadata> {
  const creation = await getCreation((await params).slug);
  return { title: creation.meta_title ?? `${creation.title} | Cheffe Khadidiatou`, description: creation.meta_description ?? creation.description };
}

export default async function CreationPage({ params }: CreationPageProps) {
  const creation = await getCreation((await params).slug);
  const image = creation.image ?? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";

  return (
    <main className="min-h-screen bg-[#171412] text-[#f5efe8]">
      <SiteHeader />
      <div className="section-shell grid min-h-[78vh] items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">{creation.category}</p>
          <h1 className="mt-5 font-display text-6xl leading-[0.9] md:text-8xl">{creation.title}</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#e8dfd4]">{creation.description}</p>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-[#f5efe8] px-6 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-[#111111]">Parler d'un projet</Link>
        </div>
        <div className="relative order-1 h-[62vh] min-h-[420px] overflow-hidden rounded-[2rem] lg:order-2"><Image src={image} alt={creation.title} fill priority className="object-cover" /></div>
      </div>
    </main>
  );
}
