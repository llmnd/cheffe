from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cheffe Khadidiatou API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "service": "cheffe-api"}


@app.get("/api/recipes")
def list_recipes() -> list[dict]:
    return [
        {
            "id": 1,
            "title": "Mafé de légumes",
            "slug": "mafe-de-legumes",
            "excerpt": "Une recette généreuse inspirée des tables de famille.",
            "preparation_time": "40 min",
            "difficulty": "Moyenne",
        },
        {
            "id": 2,
            "title": "Riz parfumé au gingembre",
            "slug": "riz-parfume-au-gingembre",
            "excerpt": "Un parfum discret, un grain souple et une texture admirable.",
            "preparation_time": "25 min",
            "difficulty": "Facile",
        },
    ]


@app.get("/api/creations")
def list_creations() -> list[dict]:
    return [
        {
            "id": 1,
            "title": "Thiéboudiène revisité",
            "slug": "thieboudiene-revisite",
            "description": "Saveurs traditionnelles, interprétation contemporaine.",
            "category": "Signature",
        },
        {
            "id": 2,
            "title": "Couscous aux épices du soir",
            "slug": "couscous-aux-epices-du-soir",
            "description": "Un plat inspiré des odeurs des marchés nocturnes.",
            "category": "Création",
        },
    ]


@app.get("/api/journal")
def list_journal_posts() -> list[dict]:
    return [
        {
            "id": 1,
            "title": "Des épices qui racontent des familles",
            "slug": "epices-qui-racontent-des-familles",
            "excerpt": "Les saveurs portées par les gestes de la transmission.",
        },
        {
            "id": 2,
            "title": "La cuisine comme éducation culturelle",
            "slug": "cuisine-comme-education-culturelle",
            "excerpt": "Une cuisine qui dit la culture, la mémoire et la transmission.",
        },
    ]


@app.get("/api/gallery")
def list_gallery() -> list[dict]:
    return [
        {"id": 1, "type": "image", "caption": "Table et lumière", "category": "Cuisine"},
        {"id": 2, "type": "image", "caption": "Atelier créatif", "category": "Studio"},
    ]


@app.post("/api/contact")
def submit_contact(payload: dict) -> dict:
    return {
        "status": "success",
        "message": "Votre message a bien été reçu. La cheffe reviendra vers vous très prochainement.",
        "payload": payload,
    }
