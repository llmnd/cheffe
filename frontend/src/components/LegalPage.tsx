import Link from "next/link";

type LegalSection = {
  readonly title: string;
  readonly paragraphs: readonly string[];
};

type LegalPageProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
};

const legalLinks = [
  { href: "/conditions", label: "Conditions" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/securite", label: "Sécurité" },
];

export default function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#171412]">
      <header className="border-b border-[#171412]/10 bg-[#f4efe7]/90 backdrop-blur-md">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl text-[#171412]">
            Cheffe Khadidiatou
          </Link>
          <Link href="/" className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8b5e3c] transition hover:text-[#171412]">
            Retour à l’accueil
          </Link>
        </div>
      </header>

      <div className="section-shell grid gap-14 py-16 md:grid-cols-[0.7fr_1.3fr] md:gap-20 md:py-24">
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#8b5e3c]">{eyebrow}</p>
          <p className="mt-5 max-w-xs font-display text-2xl leading-tight text-[#40352f]">Une maison de cuisine, de transmission et de confiance.</p>
          <p className="mt-6 text-[0.62rem] uppercase tracking-[0.2em] text-[#7a6659]">Mis à jour le 22 septembre 2026</p>
          <nav aria-label="Pages d’information" className="mt-10 border-t border-[#171412]/10 pt-5">
            <p className="mb-3 text-[0.6rem] uppercase tracking-[0.24em] text-[#7a6659]">À consulter</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.16em]">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-[#8b5e3c] transition hover:text-[#171412]">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <article className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#8b5e3c]">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-[0.92] md:text-7xl">{title}</h1>
          <p className="mt-8 max-w-2xl border-l-2 border-[#b9875b] pl-5 text-lg leading-8 text-[#40352f]">{intro}</p>

          <div className="mt-14 divide-y divide-[#171412]/10 border-y border-[#171412]/10">
            {sections.map((section, index) => (
              <section key={section.title} className="grid gap-4 py-8 md:grid-cols-[0.24fr_1fr] md:gap-8">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#b9875b]">0{index + 1}</p>
                <div>
                  <h2 className="font-display text-3xl leading-none">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-[#40352f]">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border border-[#171412]/10 bg-[#eee2d5] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8b5e3c]">Une question ?</p>
              <p className="mt-2 text-sm leading-6 text-[#40352f]">Notre équipe peut vous répondre depuis la page Contact.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#171412] px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-[#f8f2eb] transition hover:bg-[#8b5e3c]">
              Nous contacter
            </Link>
          </div>
        </article>
      </div>

      <footer className="border-t border-[#171412]/10 bg-[#171412] py-7 text-[#f5efe8]">
        <div className="section-shell flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl">Cheffe Khadidiatou</p>
          <p className="text-[#f5efe8]/55">© {new Date().getFullYear()} Tous droits réservés</p>
        </div>
      </footer>
    </main>
  );
}
