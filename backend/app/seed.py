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

        featured_recipes = [
            {
                "title": "Courge - disque rôti au miel, caramel & praliné",
                "slug": "courge-disque-roti-au-miel-caramel-praline",
                "excerpt": "La courge déclinée dans toutes ses textures, entre rôtissage lent, douceur du miel et éclat du praliné.",
                "content": "Un plat autour d'un seul produit, travaillé comme une composition : la courge devient fondante, caramélisée et délicatement acidulée.",
                "cover_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790093767/cim5mhtkiyjzt0615esx.jpg",
                "preparation_time": "35 min",
                "cooking_time": "40 min",
                "difficulty": "Créative",
                "ingredients": ["courge", "miel", "beurre", "praliné", "vinaigre de cidre", "sel", "poivre"],
                "steps": ["Tailler la courge en disques réguliers", "Rôtir doucement avec le miel et le beurre", "Terminer avec le caramel, le praliné et une pointe d'acidité"],
                "tips": ["Choisir une courge dense et mûre", "Servir aussitôt pour garder le contraste des textures"],
                "published": True,
                "meta_title": "Courge rôtie au miel, caramel & praliné | Cheffe Khadidiatou",
                "meta_description": "Une recette signature autour de la courge, entre douceur rôtie, caramel et praliné.",
                "og_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790093767/cim5mhtkiyjzt0615esx.jpg",
            },
            {
                "title": "Thiéré bissap",
                "slug": "tiere-bissap",
                "excerpt": "Le grain de mil roulé à la main, enveloppé d'un voile d'hibiscus acidulé et vibrant.",
                "content": "Le thiéré rencontre le bissap dans une assiette fraîche et profonde, pensée comme une respiration entre mémoire et création.",
                "cover_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790093938/eat1dxbao0ac0pjw39kl.jpg",
                "preparation_time": "25 min",
                "cooking_time": "20 min",
                "difficulty": "Moyenne",
                "ingredients": ["thiéré", "fleurs de bissap", "sucre", "citron", "menthe", "sel"],
                "steps": ["Infuser les fleurs de bissap", "Cuire et détacher le thiéré", "Assembler avec l'infusion, le citron et la menthe"],
                "tips": ["Garder une acidité nette", "Servir frais ou légèrement tiède selon le moment"],
                "published": True,
                "meta_title": "Thiéré bissap | Cheffe Khadidiatou",
                "meta_description": "Une création au mil et à l'hibiscus, acidulée, profonde et vibrante.",
                "og_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790093938/eat1dxbao0ac0pjw39kl.jpg",
            },
            {
                "title": "Thiéré tamkharite",
                "slug": "tiere-tamkharite",
                "excerpt": "Un hommage aux tables de fête, entre épices douces, mémoire du mil et chaleur du rituel.",
                "content": "Cette assiette associe le grain de mil aux parfums de la tamkharite pour retrouver la générosité des grandes tables.",
                "cover_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790094000/uehcjlmidnfq2w4dobcx.jpg",
                "preparation_time": "30 min",
                "cooking_time": "20 min",
                "difficulty": "Moyenne",
                "ingredients": ["thiéré", "lait", "épices douces", "dattes", "beurre", "noix de muscade"],
                "steps": ["Parfumer le lait avec les épices", "Cuire le thiéré jusqu'à obtenir une texture souple", "Ajouter les dattes et le beurre avant de servir"],
                "tips": ["Infuser les épices sans les brusquer", "Ajouter les fruits secs au dernier moment"],
                "published": True,
                "meta_title": "Thiéré tamkharite | Cheffe Khadidiatou",
                "meta_description": "Une recette de fête au mil, aux épices douces et aux parfums de tamkharite.",
                "og_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790094000/uehcjlmidnfq2w4dobcx.jpg",
            },
            {
                "title": "Mouhamsa choco",
                "slug": "mouhamsa-choco",
                "excerpt": "La galette de mil rencontre le cacao, entre texture fondante et amertume délicate.",
                "content": "Une gourmandise de mémoire où le cacao apporte sa profondeur à une base de mil tendre et généreuse.",
                "cover_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790094081/chxacgqz5pirqhormtrq.jpg",
                "preparation_time": "20 min",
                "cooking_time": "15 min",
                "difficulty": "Facile",
                "ingredients": ["mouhamsa", "cacao noir", "lait", "sucre", "beurre", "vanille"],
                "steps": ["Préparer la pâte de mil et de cacao", "Former les galettes", "Cuire doucement puis laisser reposer avant de servir"],
                "tips": ["Choisir un cacao peu sucré", "Servir avec une crème légère ou des fruits frais"],
                "published": True,
                "meta_title": "Mouhamsa choco | Cheffe Khadidiatou",
                "meta_description": "Une galette de mil au cacao, fondante et délicatement amère.",
                "og_image": "https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790094081/chxacgqz5pirqhormtrq.jpg",
            },
        ]
        for recipe_data in featured_recipes:
            if not db.query(Recipe).filter(Recipe.slug == recipe_data["slug"]).first():
                db.add(Recipe(**recipe_data))

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
