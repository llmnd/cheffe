from app.database import SessionLocal
from app.models import Collaboration, Creation, GalleryItem, JournalPost, Project, Recipe


def seed_demo_data() -> None:
    db = SessionLocal()
    try:
        if db.query(Recipe).count() == 0:
            db.add_all(
                [
                    Recipe(
                        title="Mafé de légumes",
                        slug="mafe-de-legumes",
                        excerpt="Une recette généreuse inspirée des tables de famille.",
                        content="Un maafé doux, parfumé et généreux, pensé pour les longues tables et les souvenirs de cuisine.",
                        cover_image="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
                        preparation_time="40 min",
                        cooking_time="30 min",
                        difficulty="Moyenne",
                        ingredients=[" légumes", "arachides", "oignon", "huile", "épis de céleri", "sel", "poivre"],
                        steps=["Faire revenir les légumes", "Ajouter les épices et la pâte d'arachides", "Laisser mijoter"],
                        tips=["Servir avec du riz parfumé", "Laisser reposer 10 minutes"],
                        published=True,
                        meta_title="Mafé de légumes | Cheffe Khadidiatou",
                        meta_description="Recette généreuse et parfumée inspirée des traditions africaines contemporaines.",
                        og_image="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
                    ),
                    Recipe(
                        title="Riz parfumé au gingembre",
                        slug="riz-parfume-au-gingembre",
                        excerpt="Un parfum discret, un grain souple et une texture admirable.",
                        content="Le riz parfumé est un classique qui gagne en profondeur avec le gingembre et quelques herbes.",
                        cover_image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                        preparation_time="25 min",
                        cooking_time="15 min",
                        difficulty="Facile",
                        ingredients=["riz", "gingembre", "oignon", "huile", "bouillon", "persil"],
                        steps=["Faire revenir l'oignon", "Ajouter le riz et le bouillon", "Cuire à feu doux"],
                        tips=["Utiliser un riz de qualité", "Laisser reposer 5 minutes avant de servir"],
                        published=True,
                        meta_title="Riz parfumé au gingembre | Cheffe Khadidiatou",
                        meta_description="Une base traditionnelle revisitée pour un plat léger et parfumé.",
                    ),
                ]
            )

        if db.query(Creation).count() == 0:
            db.add_all(
                [
                    Creation(
                        title="Thiéboudiène revisité",
                        slug="thieboudiene-revisite",
                        description="Saveurs traditionnelles, interprétation contemporaine.",
                        image="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
                        category="Signature",
                        meta_title="Thiéboudiène revisité",
                        meta_description="Une interprétation contemporaine d’un classique africain.",
                    ),
                    Creation(
                        title="Couscous aux épices du soir",
                        slug="couscous-aux-epices-du-soir",
                        description="Un parfum de terre, de mémoire et d’audace.",
                        image="https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
                        category="Création",
                    ),
                ]
            )

        if db.query(Project).count() == 0:
            db.add_all(
                [
                    Project(
                        title="Cérémonie privée à Dakar",
                        slug="ceremonie-privee-a-dakar",
                        description="Un dîner intime pensé comme un parcours sensoriel autour des épices et des textures.",
                        date="2026-03-18",
                        location="Dakar",
                        images=["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"],
                        category="Événement",
                    ),
                    Project(
                        title="Atelier culinaire pour la diaspora",
                        slug="atelier-culinaire-pour-la-diaspora",
                        description="Une expérience immersive de transmission, de gestes et de saveurs.",
                        date="2026-02-10",
                        location="Paris",
                        images=["https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"],
                        category="Atelier",
                    ),
                ]
            )

        if db.query(JournalPost).count() == 0:
            db.add_all(
                [
                    JournalPost(
                        title="Des épices qui racontent des familles",
                        slug="epices-qui-racontent-des-familles",
                        excerpt="Les saveurs portées par les gestes de la transmission.",
                        content="Une réflexion sur la mémoire, les marchés et les familles qui portent les recettes.",
                        cover_image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
                        published=True,
                    ),
                    JournalPost(
                        title="La cuisine comme éducation culturelle",
                        slug="cuisine-comme-education-culturelle",
                        excerpt="Une cuisine qui dit la culture, la mémoire et la transmission.",
                        content="La cuisine est aussi un moyen d’apprendre, de transmettre et de faire vivre les savoir-faire.",
                        cover_image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                        published=True,
                    ),
                ]
            )

        if db.query(GalleryItem).count() == 0:
            db.add_all(
                [
                    GalleryItem(
                        type="image",
                        image_url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
                        caption="Table et lumière",
                        category="Cuisine",
                    ),
                    GalleryItem(
                        type="image",
                        image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
                        caption="Atelier créatif",
                        category="Studio",
                    ),
                ]
            )

        if db.query(Collaboration).count() == 0:
            db.add_all(
                [
                    Collaboration(
                        name="Maison de mode Éthiopienne",
                        description="Collaboration sur un dîner d’exception et un concept visuel autour des saveurs africaines.",
                        logo="https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=500&q=80",
                        image="https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80",
                        link="#",
                    )
                ]
            )

        db.commit()
    finally:
        db.close()
