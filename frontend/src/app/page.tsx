"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import RecipeScrollStory from "@/components/RecipeScrollStory";
import SiteHeader from "@/components/SiteHeader";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

type CreationApiItem = { title: string; slug: string; description: string; image?: string | null; cover_image?: string | null };
type RecipeApiItem = { title: string; slug: string; excerpt?: string | null; content?: string | null; preparation_time?: string | null; difficulty?: string | null; cover_image?: string | null; og_image?: string | null };
type ProjectApiItem = { title: string; category?: string | null; images?: string[] | null; image?: string | null };
type JournalApiItem = { title: string; slug: string; created_at: string };
type GalleryApiItem = { image_url?: string | null; video_url?: string | null };

const fallbackCreations = [
  {
    title: "Thiéboudiène revisité",
    slug: "thieboudiene-revisite",
    description: "Saveurs traditionnelles, interprétation contemporaine. Un plat qui traverse les époques sans jamais perdre son âme.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Couscous aux épices du soir",
    slug: "couscous-aux-epices-du-soir",
    description: "Un parfum de terre, de mémoire et d’audace. La semoule devient le théâtre d’un récit intime.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Poisson grillé et agrumes",
    slug: "poisson-grille-et-agrumes",
    description: "Le feu, l’élégance et la finesse de la cuisine de bord de mer, sublimés par une acidité vive et franche.",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
  },
];

const fallbackRecipeHighlights = [
  {
    title: "Mafé de légumes en version maison",
    slug: "mafe-de-legumes",
    excerpt: "Une recette généreuse inspirée des tables de famille.",
    time: "40 min",
    difficulty: "Moyenne",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Riz parfumé au gingembre",
    slug: "riz-parfume-au-gingembre",
    excerpt: "Un parfum discret, un grain souple et une texture admirable.",
    time: "25 min",
    difficulty: "Facile",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Soupe aux feuilles et okra",
    slug: "soupe-aux-feuilles-et-okra",
    excerpt: "Une soupe généreuse, profonde et pleine de caractère.",
    time: "35 min",
    difficulty: "Moyenne",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  },
];

const fallbackProjects = [
  { title: "Cérémonie privée à Dakar", category: "Événement", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" },
  { title: "Atelier culinaire pour la diaspora", category: "Atelier", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" },
  { title: "Collaboration avec une maison de mode", category: "Partenariat", image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80" },
];

const fallbackJournalEntries = [
  { title: "Des épices qui racontent des familles", slug: "epices-qui-racontent-des-familles", date: "14 mars 2026" },
  { title: "La cuisine comme éducation culturelle", slug: "cuisine-comme-education-culturelle", date: "28 février 2026" },
  { title: "Les gestes simples qui changent un plat", slug: "gestes-simples-qui-changent-un-plat", date: "09 février 2026" },
];

const fallbackGalleryImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
];

const socials = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "YouTube", href: "https://youtube.com" },
  { name: "Facebook", href: "https://facebook.com" },
];

const marqueeWords = [
  "Gastronomie africaine",
  "Storytelling",
  "Innovation",
  "Authenticité",
  "Textures raffinées",
  "Mémoire & modernité",
];

export default function Home() {
  const [creations, setCreations] = useState(fallbackCreations);
  const [recipeHighlights, setRecipeHighlights] = useState(fallbackRecipeHighlights);
  const [projects, setProjects] = useState(fallbackProjects);
  const [journalEntries, setJournalEntries] = useState(fallbackJournalEntries);
  const [galleryImages, setGalleryImages] = useState(fallbackGalleryImages);

  useEffect(() => {
    let active = true;

    async function loadHomepageContent() {
      try {
        const [recipesRes, creationsRes, projectsRes, journalRes, galleryRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/recipes`),
          fetch(`${API_BASE_URL}/api/creations`),
          fetch(`${API_BASE_URL}/api/projects`),
          fetch(`${API_BASE_URL}/api/journal`),
          fetch(`${API_BASE_URL}/api/gallery`),
        ]);

        if (!active) return;

        const [recipes, nextCreations, nextProjects, nextJournal, nextGallery] = await Promise.all([
          recipesRes.ok ? recipesRes.json() : Promise.resolve([]),
          creationsRes.ok ? creationsRes.json() : Promise.resolve([]),
          projectsRes.ok ? projectsRes.json() : Promise.resolve([]),
          journalRes.ok ? journalRes.json() : Promise.resolve([]),
          galleryRes.ok ? galleryRes.json() : Promise.resolve([]),
        ]);

        if (nextCreations.length > 0) {
          setCreations(
            nextCreations.map((item: CreationApiItem) => ({
              title: item.title,
              description: item.description,
              slug: item.slug,
              image: item.image ?? item.cover_image ?? fallbackCreations[0].image,
            })),
          );
        }

        if (recipes.length > 0) {
          setRecipeHighlights(
            recipes.slice(0, 3).map((item: RecipeApiItem) => ({
              title: item.title,
              slug: item.slug,
              excerpt: item.excerpt ?? item.content ?? "",
              time: item.preparation_time ?? "35 min",
              difficulty: item.difficulty ?? "Moyenne",
              image: item.cover_image ?? item.og_image ?? fallbackRecipeHighlights[0].image,
            })),
          );
        }

        if (nextProjects.length > 0) {
          setProjects(
            nextProjects.slice(0, 3).map((item: ProjectApiItem) => ({
              title: item.title,
              category: item.category ?? "Événement",
              image: Array.isArray(item.images) ? item.images[0] : item.image ?? fallbackProjects[0].image,
            })),
          );
        }

        if (nextJournal.length > 0) {
          setJournalEntries(
            nextJournal.slice(0, 3).map((item: JournalApiItem) => ({
              title: item.title,
              slug: item.slug,
              date: new Date(item.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            })),
          );
        }

        if (nextGallery.length > 0) {
          setGalleryImages(
            nextGallery.slice(0, 6).map((item: GalleryApiItem) => item.image_url ?? item.video_url ?? fallbackGalleryImages[0]),
          );
        }
      } catch (error) {
        console.warn("Homepage content fallback used:", error);
      }
    }

    loadHomepageContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4efe7] text-[#111111]">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section id="accueil" className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790091561/dwavcbbsjey1wuiwyumo.jpg"
              alt="Chef préparant une cuisine africaine contemporaine"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,7,0.9)_0%,rgba(10,8,7,0.64)_42%,rgba(10,8,7,0.24)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,8,7,0.88)_0%,rgba(10,8,7,0.3)_52%,rgba(10,8,7,0.42)_100%)]" />
          </div>

          <div className="section-shell relative z-10 flex min-h-[86vh] items-end pb-16 pt-32 sm:min-h-[92vh] sm:pb-20 md:pb-24">
            <div className="max-w-3xl text-[#f8f2ec]">

              <h1 className="animate-fade-up mt-6 max-w-[12ch] font-display text-[3.6rem] leading-[0.88] text-[#f9f5f1] sm:text-7xl md:text-8xl xl:text-[7.5rem]">
                Cheffe Khadidiatou
              </h1>

              <p className="animate-fade-up mt-6 max-w-md text-base leading-7 text-[#f8f2ec]/85 sm:text-lg sm:leading-8">
                L’art de raconter l’Afrique à travers la cuisine.
              </p>

              <div className="animate-fade-up mt-10">
                <Link
                  href="#creations"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#f5efe8] px-7 py-3.5 text-[0.68rem] uppercase tracking-[0.22em] text-[#111111] transition hover:bg-white"
                >
                  Découvrir son univers
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        

        {/* INTRO */}
        <section id="apropos" className="section-shell py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="reveal">
              <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Introduction</p>
              <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.9] text-[#111111] md:text-6xl">
                Une cuisine qui raconte une histoire.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#40352f] md:text-lg">
              Cheffe Khadidiatou conçoit une cuisine inspirée des traditions africaines, revisitées avec une sensibilité
              contemporaine. Chaque plat est pensé comme un récit : des saveurs, des gestes, des souvenirs et des
              rencontres.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-[0.82fr_1.18fr]">
            <div className="reveal relative min-h-[440px] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80"
                alt="Portrait de la cheffe"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0a09]/70 to-transparent p-6">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[#f5efe8]/80">Dakar · Sénégal</p>
              </div>
            </div>

            <div className="reveal-slow flex flex-col justify-center rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb] p-8 md:p-12">
              <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Vision</p>
              <p className="mt-6 font-display text-4xl leading-none text-[#111111] md:text-5xl">
                Cuisine de mémoire, pensée pour aujourd’hui.
              </p>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#40352f]">
                Elle travaille à la rencontre entre héritage et expérimentation, en favorisant les produits de saison,
                les saveurs authentiques, les textures raffinées et les matières premières généreuses.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5 text-[0.62rem] uppercase tracking-[0.24em] text-[#111111]/80">
                {["Gastronomie africaine", "Storytelling", "Innovation", "Authenticité"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#111111]/15 px-3.5 py-2 transition hover:border-[#8b5e3c] hover:text-[#8b5e3c]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CRÉATIONS — refonte éditoriale 2 colonnes */}
        <section id="creations" className="relative bg-[#171412] py-24 text-[#f5efe8] md:py-32">
          <div className="section-shell">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="reveal max-w-2xl">
                <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">
                  Ses créations
                </p>
                <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
                  Le goût de <em className="italic text-[#d0a884]">l’empreinte</em>.
                </h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-[#c9bdb0] md:text-base md:leading-8">
                  Trois plats, trois récits. Chacun porte la trace d’un geste, d’un territoire, d’une mémoire
                  transmise puis réinventée.
                </p>
              </div>
              <Link
                href="/creations"
                className="link-underline self-start text-[0.68rem] uppercase tracking-[0.2em] text-[#f5efe8]/80 transition hover:text-white md:self-auto"
              >
                Voir toutes les créations
              </Link>
            </div>

            {/* Grille 2 colonnes, cartes à hauteur égale */}
            <div className="mt-16 grid gap-7 lg:grid-cols-2 lg:gap-8">
              {creations.map((creation, index) => (
                <Link
                  href={`/creations/${creation.slug}`}
                  key={creation.title}
                  className="card-lift reveal group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#1c1815] transition-colors duration-700 hover:border-[#d0a884]/35"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={creation.image}
                      alt={creation.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110f]/90 via-[#14110f]/15 to-transparent" />

                    {/* Bandeau haut : numéro + label */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between px-7 py-6">
                      <span className="font-display text-xl italic text-[#f5efe8]/75">
                        0{index + 1}
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#f5efe8]/55">
                        Création
                      </span>
                    </div>

                    {/* Filet doré qui se déploie au hover */}
                    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#d0a884] to-transparent transition-all duration-700 group-hover:w-full" />
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <h3 className="font-display text-3xl leading-[1.05] text-white md:text-[2.4rem]">
                      {creation.title}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-7 text-[#c9bdb0] md:text-[0.95rem] md:leading-8">
                      {creation.description}
                    </p>

                    <div className="mt-auto flex items-center gap-3 pt-8 text-[0.66rem] uppercase tracking-[0.28em] text-[#f5efe8]/60 transition-colors duration-500 group-hover:text-[#d0a884]">
                      <span>Découvrir la création</span>
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* RECETTES */}
        <RecipeScrollStory recipes={recipeHighlights} />

        {/* INNOVATION */}
        <section className="bg-[#e7dccd] py-24 md:py-32">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="reveal">
                <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Innovation</p>
                <h2 className="mt-5 font-display text-5xl leading-none text-[#111111] md:text-6xl">
                  Tradition.<br />Créativité.<br />Innovation.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-[#40352f] md:text-lg">
                La créativité ne naît pas d’un rejet du patrimoine, mais d’une manière plus libre de le faire vivre.
                C’est dans cette interprétation délicate que se dessinent ses réinventions les plus singulières.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="reveal overflow-hidden rounded-[2rem]">
                <div className="relative h-[440px]">
                  <Image
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
                    alt="Assiette de cuisine créative"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid gap-6">
                <div className="reveal-slow rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb] p-8">
                  <p className="eyebrow text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6659]">Méthode</p>
                  <p className="mt-5 font-display text-4xl leading-none text-[#111111]">
                    Des textures qui surprennent, des goûts qui restent.
                  </p>
                </div>
                <div className="reveal-slow relative h-[260px] overflow-hidden rounded-[2rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80"
                    alt="Décor de plat africain moderne"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RÉALISATIONS */}
        <section id="realisations" className="section-shell py-24 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="reveal max-w-2xl">
              <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">
                Ses réalisations
              </p>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-6xl">
                Un univers à travers <em className="italic text-[#8b5e3c]">les événements</em>.
              </h2>
            </div>
            <Link
              href="/contact"
              className="link-underline self-start text-[0.68rem] uppercase tracking-[0.2em] text-[#111111]/75 transition hover:text-[#111111] md:self-auto"
            >
              Travaillons ensemble
            </Link>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="card-lift reveal group overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/45 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-[#8b5e3c]" />
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#7a6659]">
                      {project.category}
                    </p>
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-[1.1] text-[#111111]">
                    {project.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* JOURNAL — refonte éditoriale */}
        <section id="journal" className="relative bg-[#1d1816] py-24 text-[#f5efe8] md:py-32">
          <div className="section-shell">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="reveal max-w-2xl">
                <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">
                  Le Journal
                </p>
                <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
                  Entre notes, découvertes
                  <br className="hidden md:block" /> et <em className="italic text-[#d0a884]">cuisine vivante</em>.
                </h2>
              </div>
              <Link
                href="/journal"
                className="link-underline self-start text-[0.68rem] uppercase tracking-[0.2em] text-[#f5efe8]/80 transition hover:text-white md:self-auto"
              >
                Lire le journal
              </Link>
            </div>

            {/* Grille magazine avec séparateurs 1px */}
            <div className="reveal mt-16 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {journalEntries.map((entry, index) => (
                <Link
                  key={entry.title}
                  href={`/journal/${entry.slug}`}
                  className={`group relative flex min-h-[340px] flex-col justify-between gap-10 bg-[#1d1816] p-8 transition-colors duration-500 hover:bg-[#231d1a] md:p-10 ${
                    index === journalEntries.length - 1 && journalEntries.length % 2 === 1
                      ? "md:col-span-2 lg:col-span-1"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-display text-xl italic text-[#d0a884]">
                      N°0{index + 1}
                    </span>
                    <span className="text-right text-[0.62rem] uppercase tracking-[0.22em] text-[#f5efe8]/55">
                      {entry.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl leading-[1.1] text-[#f5efe8] transition-colors duration-500 group-hover:text-white md:text-[2.1rem]">
                      {entry.title}
                    </h3>

                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                      <span className="text-[0.62rem] uppercase tracking-[0.28em] text-[#f5efe8]/55 transition-colors duration-500 group-hover:text-[#d0a884]">
                        Lire l’article
                      </span>
                      <span className="text-[#d0a884] transition-transform duration-500 group-hover:translate-x-1.5">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section id="galerie" className="section-shell py-24 md:py-32">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="reveal">
              <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Galerie</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-6xl">
                Des images qui gardent <em className="italic text-[#8b5e3c]">l’odeur</em>.
              </h2>
            </div>
            <Link
              href="/contact"
              className="link-underline self-start text-[0.68rem] uppercase tracking-[0.2em] text-[#111111]/75 transition hover:text-[#111111] md:self-auto"
            >
              Partager un projet
            </Link>
          </div>

          <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className={`group relative overflow-hidden rounded-[2rem] ${
                  index === 0 || index === 3 ? "md:row-span-2" : ""
                } ${index === 2 ? "xl:translate-y-6" : ""}`}
              >
                <Image
                  src={image}
                  alt="Illustration de la cuisine de Cheffe Khadidiatou"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/55 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 text-[0.6rem] uppercase tracking-[0.3em] text-[#f5efe8] opacity-0 transition duration-500 group-hover:opacity-100">
                  Cuisine · 0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-[#f8f2eb] py-24 md:py-32">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div className="reveal">
                <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">
                  Réseaux sociaux
                </p>
                <h2 className="mt-5 font-display text-5xl leading-none text-[#111111] md:text-6xl">
                  Suivre son univers.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#111111]/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-[#111111] transition hover:border-[#111111] hover:bg-[#111111] hover:text-[#f8f2eb]"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="reveal-slow mt-14 rounded-[2rem] border border-[#111111]/10 bg-[#f1e7dc] p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div>
                  <p className="eyebrow text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">
                    Collaborations
                  </p>
                  <h3 className="mt-5 font-display text-5xl leading-none text-[#111111]">
                    Travaillons ensemble.
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-[#40352f]">
                    Pour des événements, des projets culinaires, des ateliers, des rencontres ou des créations à forte
                    identité, elle accueille les collaborations avec attention, exigence et sens du détail.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#111111] px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.25em] text-[#f8f2eb] transition hover:bg-[#2c241e]"
                >
                  Écrire à la cheffe
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}