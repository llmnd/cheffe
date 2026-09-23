"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type RecipeStoryItem = {
  title: string;
  slug: string;
  excerpt: string;
  time: string;
  difficulty: string;
  image: string;
};

type RecipeScrollStoryProps = {
  recipes: RecipeStoryItem[];
};

export default function RecipeScrollStory({ recipes }: RecipeScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSlides, setVisibleSlides] = useState<Record<string, boolean>>({});

  const slugsKey = useMemo(() => recipes.map((r) => r.slug).join("|"), [recipes]);

  useEffect(() => {
    if (recipes.length === 0) return;

    setVisibleSlides((current) => {
      const first = recipes[0].slug;
      if (current[first]) return current;
      return { ...current, [first]: true };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-recipe-slug");
            if (slug) {
              setVisibleSlides((current) =>
                current[slug] ? current : { ...current, [slug]: true },
              );
            }
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    const root = containerRef.current ?? document;
    const slides = root.querySelectorAll<HTMLElement>("[data-recipe-slug]");
    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [slugsKey, recipes]);

  if (recipes.length === 0) return null;

  return (
    <section id="recettes" className="relative bg-[#e6d9ca] text-[#171412]">
      <div className="section-shell py-24 md:py-32">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-[0.65rem] uppercase tracking-[0.28em] text-[#8b5e3c]">
            Recettes &amp; astuces
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[0.9] sm:text-6xl md:text-7xl">
            Chaque plat a sa propre histoire.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#40352f] sm:text-base sm:leading-8">
            Un plat après l’autre, comme une page que l’on tourne doucement dans le carnet de la maison.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="recipe-scroll-story snap-none overscroll-y-contain md:snap-y md:snap-mandatory">
        {recipes.map((recipe, index) => (
          <article
            data-recipe-slug={recipe.slug}
            key={recipe.slug}
            className={`recipe-slide relative flex min-h-[78svh] snap-none items-center overflow-hidden border-t border-[#171412]/10 py-16 md:min-h-[84svh] md:snap-start md:py-24 ${
              visibleSlides[recipe.slug] ? "is-visible" : ""
            }`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#171412]/8 md:block" />

            <div className="section-shell relative grid w-full gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-20">
              <div
                className={`recipe-dish relative order-1 mx-auto aspect-square w-[min(78vw,26rem)] md:mx-0 md:w-full ${
                  index % 2 ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="animate-spin-slow absolute inset-[1%] rounded-full border border-dashed border-[#8b5e3c]/30" />
                <div className="absolute inset-[8%] rounded-full bg-[#f8f2eb] shadow-[0_25px_60px_rgba(36,25,18,0.18)]" />
                <div className="absolute inset-[13%] overflow-hidden rounded-full border-[10px] border-[#f8f2eb] shadow-inner md:border-[14px]">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 78vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 rounded-full bg-[#171412] px-5 py-2 text-[0.55rem] uppercase tracking-[0.24em] text-[#f8f2ec] shadow-lg">
                  Plat {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`recipe-copy order-2 max-w-xl ${index % 2 ? "md:order-1" : "md:order-2"}`}>
                <p className="eyebrow text-[0.62rem] uppercase tracking-[0.24em] text-[#8b5e3c]">
                  {recipe.time} · {recipe.difficulty}
                </p>
                <h3 className="mt-6 font-display text-5xl leading-[0.9] sm:text-6xl">{recipe.title}</h3>
                <p className="mt-6 text-base leading-8 text-[#40352f]">{recipe.excerpt}</p>

                <Link
                  href={`/recettes/${recipe.slug}`}
                  className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#171412] px-6 py-3.5 text-[0.64rem] uppercase tracking-[0.2em] text-[#f8f2ec] transition hover:bg-[#8b5e3c]"
                >
                  Découvrir la recette
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}