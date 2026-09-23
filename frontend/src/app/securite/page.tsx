import LegalPage from "@/components/LegalPage";

export default function SecuritePage() {
  return (
    <LegalPage
      eyebrow="Protection du site"
      title="Sécurité"
      intro="Des mesures simples et concrètes pour protéger le site, les échanges et la confiance qui nous est accordée."
      sections={[
        { title: "Protection technique", paragraphs: ["Nous mettons en place des mesures raisonnables pour protéger le site, ses formulaires et les informations qui nous sont transmises."] },
        { title: "Accès maîtrisés", paragraphs: ["Les échanges avec le site sont servis via une connexion sécurisée lorsque celle-ci est disponible. L’accès aux outils d’administration est limité aux personnes autorisées."] },
        { title: "Signaler un problème", paragraphs: ["Si vous découvrez une vulnérabilité, merci de la signaler rapidement via la page Contact en décrivant le problème sans transmettre de données sensibles."] },
      ]}
    />
  );
}
