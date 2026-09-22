import Image from "next/image";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import { apiFetch, type Recipe } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function RecipesPage() {
  let recipes: Recipe[] = [];
  try { recipes = await apiFetch<Recipe[]>("/api/recipes"); } catch { recipes = []; }

  return <main className="min-h-screen bg-[#f4efe7] text-[#111111]"><SiteHeader /><div className="section-shell py-16 md:py-24"><p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Recettes & astuces</p><h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] md:text-8xl">Les recettes de la maison.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-[#40352f]">Des plats généreux, des gestes transmis et quelques secrets pour cuisiner avec mémoire et liberté.</p><div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{recipes.map((recipe) => <Link key={recipe.slug} href={`/recettes/${recipe.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb]"><div className="relative h-72">{recipe.cover_image && <Image src={recipe.cover_image} alt={recipe.title} fill className="object-cover transition duration-500 group-hover:scale-105" />}</div><div className="p-6"><p className="text-[0.64rem] uppercase tracking-[0.2em] text-[#7a6659]">{recipe.preparation_time ?? "Recette"} · {recipe.difficulty ?? "Maison"}</p><h2 className="mt-4 font-display text-4xl leading-none">{recipe.title}</h2><p className="mt-4 text-sm leading-7 text-[#40352f]">{recipe.excerpt}</p></div></Link>)}</div></div></main>;
}
