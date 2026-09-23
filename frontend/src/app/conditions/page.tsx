import LegalPage from "@/components/LegalPage";

export default function ConditionsPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Conditions d’utilisation"
      intro="Les règles qui encadrent une expérience claire, respectueuse et cohérente sur le site de Cheffe Khadidiatou."
      sections={[
        { title: "Accès au site", paragraphs: ["Ce site présente l’univers, les recettes et les activités de Cheffe Khadidiatou. En le consultant, vous acceptez de l’utiliser dans le respect des lois applicables."] },
        { title: "Propriété des contenus", paragraphs: ["Les textes, photographies, recettes et éléments graphiques sont protégés. Toute reproduction ou utilisation commerciale nécessite une autorisation préalable."] },
        { title: "Évolution des informations", paragraphs: ["Les informations publiées peuvent évoluer afin de rester pertinentes. Les liens externes sont proposés à titre informatif et restent soumis aux conditions de leurs éditeurs."] },
      ]}
    />
  );
}
