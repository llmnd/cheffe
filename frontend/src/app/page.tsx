import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#recettes", label: "Recettes" },
  { href: "#creations", label: "Créations" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#journal", label: "Journal" },
  { href: "#galerie", label: "Galerie" },
  { href: "#contact", label: "Contact" },
];

const creations = [
  {
    title: "Thiéboudiène revisité",
    description: "Saveurs traditionnelles, interprétation contemporaine.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Couscous aux épices du soir",
    description: "Un parfum de terre, de mémoire et d’audace.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Poisson grillé et agrumes",
    description: "Le feu, l’élégance et la finesse de la cuisine de bord de mer.",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
  },
];

const recipeHighlights = [
  {
    title: "Mafé de légumes en version maison",
    time: "40 min",
    difficulty: "Moyenne",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Riz parfumé au gingembre",
    time: "25 min",
    difficulty: "Facile",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Soupe aux feuilles et okra",
    time: "35 min",
    difficulty: "Moyenne",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  },
];

const projects = [
  { title: "Cérémonie privée à Dakar", category: "Événement", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" },
  { title: "Atelier culinaire pour la diaspora", category: "Atelier", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" },
  { title: "Collaboration avec une maison de mode", category: "Partenariat", image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80" },
];

const journalEntries = [
  { title: "Des épices qui racontent des familles", date: "14 mars 2026" },
  { title: "La cuisine comme éducation culturelle", date: "28 février 2026" },
  { title: "Les gestes simples qui changent un plat", date: "09 février 2026" },
];

const galleryImages = [
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4efe7] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#f4efe7]/90 backdrop-blur-md">
        <div className="section-shell flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 text-sm uppercase tracking-[0.34em] text-[#111111]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#111111]/20 bg-[#111111] text-xs font-semibold text-[#f4efe7]">
              CK
            </span>
            Cheffe Khadidiatou
          </Link>

          <nav className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.24em] text-[#111111]/75 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#111111]">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#111111]/20 bg-[#111111] px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#f4efe7] transition hover:bg-[#2a211b]"
          >
            Collaborer
          </Link>
        </div>
      </header>

      <main>
        <section id="accueil" className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1800&q=80"
              alt="Chef préparant une cuisine africaine contemporaine"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0e0d0c]/50" />
          </div>

          <div className="section-shell relative z-10 flex min-h-[760px] items-end pb-16 pt-16 md:pb-24">
            <div className="max-w-3xl text-[#f8f2ec]">
              <p className="mb-6 text-[0.7rem] uppercase tracking-[0.44em] text-[#f8f2ec]/80">
                Chef • Créatrice • Storyteller
              </p>
              <h1 className="font-display text-5xl leading-[0.9] text-[#f9f5f1] md:text-7xl xl:text-[8rem]">
                CHEFFE KHADIDIATOU
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#f8f2ec]/85 md:text-xl">
                L’art de raconter l’Afrique à travers la cuisine.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#f8f2ec]/75 md:text-base">
                Une cuisine inspirée des saveurs de la mémoire, revisitée avec modernité, élégance et une profonde sensibilité aux textures, aux gestes et aux histoires.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#creations"
                  className="inline-flex items-center justify-center rounded-full bg-[#f5efe8] px-7 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#111111] transition hover:bg-white"
                >
                  Découvrir son univers
                </Link>
                <Link
                  href="#galerie"
                  className="inline-flex items-center justify-center rounded-full border border-[#f5efe8]/50 px-7 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#f5efe8] transition hover:bg-white/10"
                >
                  Voir les créations
                </Link>
              </div>

              <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/20 pt-6 text-[#f8f2ec]/80">
                <div>
                  <div className="font-display text-3xl text-white">12+</div>
                  <div className="mt-2 text-[0.62rem] uppercase tracking-[0.2em]">ans d’expérience</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-white">45</div>
                  <div className="mt-2 text-[0.62rem] uppercase tracking-[0.2em]">créations</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-white">18</div>
                  <div className="mt-2 text-[0.62rem] uppercase tracking-[0.2em]">événements</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apropos" className="section-shell py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Introduction</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] text-[#111111] md:text-6xl">
                Une cuisine qui raconte une histoire.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#40352f] md:text-lg">
              Cheffe Khadidiatou conçoit une cuisine inspirée des traditions africaines, revisitées avec une sensibilité contemporaine. Chaque plat est pensé comme un récit : des saveurs, des gestes, des souvenirs et des rencontres.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[0.82fr_1.18fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80"
                alt="Portrait de la cheffe"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb] p-8 md:p-12">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Vision</p>
              <p className="mt-6 font-display text-4xl leading-none text-[#111111] md:text-5xl">
                Cuisine de mémoire, pensée pour aujourd’hui.
              </p>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#40352f]">
                Elle travaille à la rencontre entre héritage et expérimentation, en favorisant les produits de saison, les saveurs authentiques, les textures raffinées et les matières premières généreuses.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-[0.64rem] uppercase tracking-[0.24em] text-[#111111]/80">
                <span className="rounded-full border border-[#111111]/15 px-3 py-2">Gastronomie africaine</span>
                <span className="rounded-full border border-[#111111]/15 px-3 py-2">Storytelling</span>
                <span className="rounded-full border border-[#111111]/15 px-3 py-2">Innovation</span>
                <span className="rounded-full border border-[#111111]/15 px-3 py-2">Authenticité</span>
              </div>
            </div>
          </div>
        </section>

        <section id="creations" className="bg-[#171412] py-20 text-[#f5efe8] md:py-28">
          <div className="section-shell">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">Ses créations</p>
                <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">Le goût de l’empreinte.</h2>
              </div>
              <Link href="/creations" className="text-[0.68rem] uppercase tracking-[0.2em] text-[#f5efe8]/80 transition hover:text-white">
                Voir toutes les créations
              </Link>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {creations.map((creation, index) => (
                <article key={creation.title} className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-[#201b18] ${index === 1 ? "lg:-translate-y-8" : ""}`}>
                  <div className="relative h-[460px] overflow-hidden">
                    <Image src={creation.image} alt={creation.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#110f0d]/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-4xl text-white">{creation.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#e8dfd4]">{creation.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="recettes" className="section-shell py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Recettes & astuces</p>
              <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">Les secrets de la cuisine de Cheffe Khadidiatou</h2>
            </div>
            <Link href="/recettes" className="text-[0.68rem] uppercase tracking-[0.2em] text-[#111111]/75 transition hover:text-[#111111]">
              Toutes les recettes
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {recipeHighlights.map((recipe) => (
              <article key={recipe.title} className="overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb]">
                <div className="relative h-72 overflow-hidden">
                  <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-[0.64rem] uppercase tracking-[0.2em] text-[#7a6659]">
                    <span>{recipe.time}</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl leading-none text-[#111111]">{recipe.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#40352f]">
                    Une recette construite autour des aromates, de la texture et du rythme du feu.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#e7dccd] py-20 md:py-28">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Innovation</p>
                <h2 className="mt-4 font-display text-5xl leading-none text-[#111111] md:text-6xl">
                  Tradition. Créativité. Innovation.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-[#40352f] md:text-lg">
                La créativité ne naît pas d’un rejet du patrimoine, mais d’une manière plus libre de le faire vivre. C’est dans cette interprétation délicate que se dessinent ses réinventions les plus singulières.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem]">
                <div className="relative h-[420px]">
                  <Image src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80" alt="Assiette de cuisine créative" fill className="object-cover" />
                </div>
              </div>
              <div className="grid gap-6">
                <div className="rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb] p-8">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7a6659]">Méthode</p>
                  <p className="mt-4 font-display text-4xl leading-none text-[#111111]">Des textures qui surprennent, des goûts qui restent.</p>
                </div>
                <div className="relative h-[260px] overflow-hidden rounded-[2rem]">
                  <Image src="https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80" alt="Décor de plat africain moderne" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="realisations" className="section-shell py-20 md:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Ses réalisations</p>
              <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">Un univers à travers les événements.</h2>
            </div>
            <Link href="/contact" className="text-[0.68rem] uppercase tracking-[0.2em] text-[#111111]/75 transition hover:text-[#111111]">
              Travaillons ensemble
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="overflow-hidden rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb]">
                <div className="relative h-72 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7a6659]">{project.category}</p>
                  <h3 className="mt-4 font-display text-4xl leading-none text-[#111111]">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="journal" className="bg-[#1d1816] py-20 text-[#f5efe8] md:py-28">
          <div className="section-shell">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">Le Journal</p>
                <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">Entre notes, découvertes et cuisine vivante.</h2>
              </div>
              <Link href="/journal" className="text-[0.68rem] uppercase tracking-[0.2em] text-[#f5efe8]/80 transition hover:text-white">
                Lire le journal
              </Link>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {journalEntries.map((entry, index) => (
                <article key={entry.title} className={`rounded-[2rem] border border-white/10 bg-[#251f1d] p-8 ${index === 1 ? "lg:-translate-y-6" : ""}`}>
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#d0a884]">{entry.date}</p>
                  <h3 className="mt-8 font-display text-4xl leading-none text-[#f5efe8]">{entry.title}</h3>
                  <p className="mt-6 text-sm leading-7 text-[#eadfd2]">Un regard contemplatif sur les gestes, les saisons et la cuisine comme mémoire collective.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="galerie" className="section-shell py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Galerie</p>
              <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">Des images qui gardent l’odeur.</h2>
            </div>
            <Link href="/contact" className="text-[0.68rem] uppercase tracking-[0.2em] text-[#111111]/75 transition hover:text-[#111111]">
              Partager un projet
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden rounded-[2rem] ${index === 0 || index === 3 ? "md:row-span-2" : ""} ${index === 2 ? "xl:translate-y-6" : ""}`}
              >
                <Image src={image} alt="Illustration de la cuisine de Cheffe Khadidiatou" fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-[#f8f2eb] py-20 md:py-28">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Réseaux sociaux</p>
                <h2 className="mt-4 font-display text-5xl leading-none text-[#111111] md:text-6xl">Suivre son univers.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="rounded-full border border-[#111111]/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-[#111111] transition hover:bg-[#111111] hover:text-[#f8f2eb]">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] border border-[#111111]/10 bg-[#f1e7dc] p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Collaborations</p>
                  <h3 className="mt-4 font-display text-5xl leading-none text-[#111111]">Travaillons ensemble.</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#40352f]">
                    Pour des événements, des projets culinaires, des ateliers, des rencontres ou des créations à forte identité, elle accueille les collaborations avec attention, exigence et sens du détail.
                  </p>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-[0.68rem] uppercase tracking-[0.25em] text-[#f8f2eb] transition hover:bg-[#2c241e]">
                  Écrire à la cheffe
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
