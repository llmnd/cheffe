import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import { apiFetch, type Recipe } from "@/lib/api";

export const dynamic = "force-dynamic";

type RecipePageProps = { params: Promise<{ slug: string }> };

async function getRecipe(slug: string) {
  try {
    return await apiFetch<Recipe>(`/api/recipes/${slug}`);
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = await getRecipe((await params).slug);
  return {
    title: recipe.meta_title ?? `${recipe.title} | Cheffe Khadidiatou`,
    description: recipe.meta_description ?? recipe.excerpt,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipe((await params).slug);
  const coverImage = recipe.cover_image ?? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#111111]">
      <SiteHeader />
      <article>
        <div className="relative h-[52vh] min-h-[420px]">
          <Image src={coverImage} alt={recipe.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#111111]/45" />
          <div className="section-shell relative z-10 flex h-full items-end pb-14 text-[#f8f2ec]">
            <div className="max-w-4xl">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">Recette maison</p>
              <h1 className="mt-5 font-display text-6xl leading-[0.9] md:text-8xl">{recipe.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f8f2ec]/85">{recipe.excerpt}</p>
            </div>
          </div>
        </div>

        <div className="section-shell grid gap-12 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
          <aside className="h-fit border-t border-[#111111]/15 pt-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6659]">Le temps du plat</p>
            <div className="mt-6 grid grid-cols-2 gap-5 text-sm">
              <div><span className="block text-[#7a6659]">Préparation</span><strong className="mt-1 block">{recipe.preparation_time ?? "Selon le geste"}</strong></div>
              <div><span className="block text-[#7a6659]">Cuisson</span><strong className="mt-1 block">{recipe.cooking_time ?? "A l'intuition"}</strong></div>
              <div><span className="block text-[#7a6659]">Difficulté</span><strong className="mt-1 block">{recipe.difficulty ?? "Accessible"}</strong></div>
            </div>
            <div className="mt-10 border-t border-[#111111]/15 pt-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6659]">Ingrédients</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#40352f]">
                {recipe.ingredients.map((ingredient) => <li key={ingredient}>• {ingredient}</li>)}
              </ul>
            </div>
          </aside>

          <div className="max-w-3xl">
            <p className="font-display text-4xl leading-tight md:text-5xl">{recipe.content}</p>
            <div className="mt-12 border-t border-[#111111]/15 pt-8">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6659]">Le geste</p>
              <ol className="mt-6 space-y-6">
                {recipe.steps.map((step, index) => <li key={step} className="flex gap-5 text-base leading-8 text-[#40352f]"><span className="font-display text-3xl text-[#b9875b]">{String(index + 1).padStart(2, "0")}</span><span>{step}</span></li>)}
              </ol>
            </div>
            {recipe.tips.length > 0 && <div className="mt-12 rounded-[1.5rem] bg-[#e7dccd] p-7"><p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6659]">Astuce de la cheffe</p><ul className="mt-4 space-y-2 text-sm leading-7 text-[#40352f]">{recipe.tips.map((tip) => <li key={tip}>• {tip}</li>)}</ul></div>}
          </div>
        </div>
      </article>
    </main>
  );
}
