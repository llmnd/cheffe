import Image from "next/image";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import { apiFetch, type JournalPost } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  let posts: JournalPost[] = [];
  try { posts = await apiFetch<JournalPost[]>("/api/journal"); } catch { posts = []; }

  return <main className="min-h-screen bg-[#f4efe7] text-[#111111]"><SiteHeader /><div className="section-shell py-16 md:py-24"><p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Le Journal</p><h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] md:text-8xl">Notes de cuisine vivante.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-[#40352f]">Des histoires de transmission, de marchés et de gestes qui donnent du relief aux jours.</p><div className="mt-14 grid gap-6 md:grid-cols-2">{posts.map((post) => <Link key={post.slug} href={`/journal/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb]"><div className="relative h-72">{post.cover_image && <Image src={post.cover_image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />}</div><div className="p-7"><p className="text-[0.64rem] uppercase tracking-[0.2em] text-[#7a6659]">{new Date(post.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p><h2 className="mt-5 font-display text-4xl leading-none">{post.title}</h2><p className="mt-4 text-sm leading-7 text-[#40352f]">{post.excerpt}</p></div></Link>)}</div></div></main>;
}
