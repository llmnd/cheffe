import LegalPage from "@/components/LegalPage";

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro="La confidentialité est traitée avec la même attention que les produits : avec mesure, transparence et respect."
      sections={[
        { title: "Données collectées", paragraphs: ["Nous limitons la collecte aux informations nécessaires pour répondre à vos demandes et assurer le fonctionnement du site."] },
        { title: "Utilisation des messages", paragraphs: ["Les messages envoyés via le formulaire de contact servent uniquement à traiter votre demande. Ils ne sont pas vendus ni utilisés à des fins publicitaires."] },
        { title: "Vos droits", paragraphs: ["Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant via la page Contact."] },
      ]}
    />
  );
}
