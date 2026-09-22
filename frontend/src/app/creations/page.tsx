import Image from "next/image";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import { apiFetch, type Creation } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CreationsPage() {
  let creations: Creation[] = [];
  try { creations = await apiFetch<Creation[]>("/api/creations"); } catch { creations = []; }

  return <main className="min-h-screen bg-[#171412] text-[#f5efe8]"><SiteHeader /><div className="section-shell py-16 md:py-24"><p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">Créations</p><h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] md:text-8xl">Le goût de l’empreinte.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-[#e8dfd4]">Des interprétations personnelles, entre héritage, saison et imagination.</p><div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{creations.map((creation) => <Link key={creation.slug} href={`/creations/${creation.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#201b18]"><div className="relative h-[28rem]">{creation.image && <Image src={creation.image} alt={creation.title} fill className="object-cover transition duration-500 group-hover:scale-105" />}</div><div className="p-6"><p className="text-[0.64rem] uppercase tracking-[0.2em] text-[#d0a884]">{creation.category}</p><h2 className="mt-4 font-display text-4xl">{creation.title}</h2><p className="mt-3 text-sm leading-7 text-[#e8dfd4]">{creation.description}</p></div></Link>)}</div></div></main>;
}
