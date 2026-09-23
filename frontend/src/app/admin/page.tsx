"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { API_BASE_URL } from "@/lib/api";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

type ContentType =
  | "recipes"
  | "creations"
  | "journal"
  | "gallery"
  | "projects"
  | "collaborations"
  | "contact";

type AdminItem = {
  id: number;
  title?: string;
  slug?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  status?: string;
  request_type?: string;
  description?: string;
  excerpt?: string;
  content?: string;
  image?: string | null;
  image_url?: string | null;
  cover_image?: string | null;
  preparation_time?: string | null;
  cooking_time?: string | null;
  difficulty?: string | null;
  ingredients?: string[];
  steps?: string[];
  tips?: string[];
  category?: string;
  date?: string;
  location?: string;
  images?: string[];
  logo?: string | null;
  link?: string | null;
  published?: boolean;
  created_at?: string;
};

type EditorState = Record<string, string | boolean>;

const emptyEditor: EditorState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  description: "",
  image: "",
  cover_image: "",
  category: "Signature",
  preparation_time: "",
  cooking_time: "",
  difficulty: "Facile",
  ingredients: "",
  steps: "",
  tips: "",
  published: true,
};

const fieldsByType: Record<ContentType, string[]> = {
  recipes: ["title", "slug", "excerpt", "content", "cover_image", "preparation_time", "cooking_time", "difficulty", "ingredients", "steps", "tips"],
  creations: ["title", "slug", "description", "category", "image"],
  journal: ["title", "slug", "excerpt", "content", "cover_image"],
  gallery: ["image_url", "category"],
  projects: ["title", "slug", "description", "date", "location", "category", "images"],
  collaborations: ["name", "description", "link", "image"],
  contact: ["name", "email", "phone", "request_type", "message", "status"],
};

const labels: Record<ContentType, string> = {
  recipes: "Recettes",
  creations: "Créations",
  journal: "Journal",
  gallery: "Galerie",
  projects: "Réalisations",
  collaborations: "Collaborations",
  contact: "Messages",
};

const fieldLabels: Record<string, string> = {
  title: "Titre",
  slug: "Adresse de la page",
  name: "Nom",
  email: "Adresse e-mail",
  phone: "Téléphone",
  message: "Message",
  status: "Statut",
  request_type: "Type de demande",
  description: "Description",
  excerpt: "Résumé",
  content: "Contenu",
  image: "Image",
  image_url: "Image",
  cover_image: "Image de couverture",
  preparation_time: "Temps de préparation",
  cooking_time: "Temps de cuisson",
  difficulty: "Difficulté",
  ingredients: "Ingrédients",
  steps: "Étapes",
  tips: "Conseils",
  category: "Catégorie",
  date: "Date",
  location: "Lieu",
  images: "Images",
  logo: "Logo",
  link: "Lien",
};

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  read: "Lu",
  archived: "Archivé",
};

const icons: Record<ContentType, string> = {
  recipes: "🍲",
  creations: "✦",
  journal: "✎",
  gallery: "◫",
  projects: "◈",
  collaborations: "✧",
  contact: "✉",
};

function lines(value: string | undefined) {
  return value?.split("\n").map((i) => i.trim()).filter(Boolean) ?? [];
}

function itemThumb(item: AdminItem): string | null {
  return (
    item.cover_image ??
    item.image ??
    item.image_url ??
    (Array.isArray(item.images) ? item.images[0] : null) ??
    item.logo ??
    null
  );
}

function itemTitle(item: AdminItem): string {
  return item.title ?? item.name ?? item.email ?? `#${item.id}`;
}

function itemSubtitle(item: AdminItem): string {
  if (item.slug) return `/${item.slug}`;
  if (item.category) return item.category;
  if (item.status) return statusLabels[item.status] ?? item.status;
  if (item.request_type) return item.request_type.replaceAll("_", " ");
  if (item.created_at) return new Date(item.created_at).toLocaleDateString("fr-FR");
  return "";
}

export default function AdminPage() {
  const router = useRouter();
  const [activeType, setActiveType] = useState<ContentType>("recipes");
  const [items, setItems] = useState<Record<ContentType, AdminItem[]>>({
    recipes: [],
    creations: [],
    journal: [],
    gallery: [],
    projects: [],
    collaborations: [],
    contact: [],
  });
  const [editor, setEditor] = useState<EditorState>(emptyEditor);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pendingImages, setPendingImages] = useState<Record<string, File>>({});
  const [pendingPreviews, setPendingPreviews] = useState<Record<string, string>>({});

  /* null = pas encore lu depuis localStorage ; "" = pas de token */
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let stored = "";
    try {
      stored = window.localStorage.getItem("cheffe_admin_token") ?? "";
    } catch {
      stored = "";
    }
    if (!stored) {
      stored = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("cheffe_admin_token="))
        ?.split("=")[1] ?? "";
      stored = decodeURIComponent(stored);
    }
    setToken(stored);
  }, []);

  async function request(path: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  }

  async function loadItems(type: ContentType) {
    const response = await request(`/api/${type}`);
    if (!response.ok) throw new Error("Impossible de charger les contenus");
    const data = (await response.json()) as AdminItem[];
    setItems((current) => ({ ...current, [type]: data }));
  }

  useEffect(() => {
    if (token === null) return; // ← on attend d'avoir lu le localStorage
    if (!token) {
      router.replace("/login");
      return;
    }
    setIsLoading(true);
    Promise.all((Object.keys(items) as ContentType[]).map(loadItems))
      .catch(() => router.replace("/login"))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, router]);

  function selectType(type: ContentType) {
    setActiveType(type);
    setEditingId(null);
    setEditor(emptyEditor);
    setStatusMessage("");
    setSearch("");
  }

  function openCreate() {
    setEditingId(null);
    setEditor(emptyEditor);
    setPendingImages({});
    setPendingPreviews({});
    setStatusMessage("");
    setDrawerOpen(true);
  }

  function editItem(item: AdminItem) {
    setEditingId(item.id);
    setEditor({
      ...emptyEditor,
      title: item.title ?? "",
      slug: item.slug ?? "",
      name: item.name ?? "",
      email: item.email ?? "",
      phone: item.phone ?? "",
      message: item.message ?? "",
      status: item.status ?? "new",
      request_type: item.request_type ?? "collaboration",
      description: item.description ?? "",
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      image: item.image ?? "",
      image_url: item.image_url ?? "",
      cover_image: item.cover_image ?? "",
      preparation_time: item.preparation_time ?? "",
      cooking_time: item.cooking_time ?? "",
      difficulty: item.difficulty ?? "Facile",
      category: item.category ?? "Signature",
      date: item.date ?? "",
      location: item.location ?? "",
      ingredients: item.ingredients?.join("\n") ?? "",
      steps: item.steps?.join("\n") ?? "",
      tips: item.tips?.join("\n") ?? "",
      images: item.images?.join("\n") ?? "",
      logo: item.logo ?? "",
      link: item.link ?? "",
      published: item.published ?? true,
    });
    setPendingImages({});
    setPendingPreviews({});
    setStatusMessage("");
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingId(null);
    setEditor(emptyEditor);
    setPendingImages({});
    setPendingPreviews({});
    setStatusMessage("");
  }

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = event.target;
    setEditor((current) => ({
      ...current,
      [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value,
    }));
  }

  function selectImage(event: ChangeEvent<HTMLInputElement>, targetField: string) {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPendingImages((current) => ({ ...current, [targetField]: file }));
    setPendingPreviews((current) => {
      if (current[targetField]) URL.revokeObjectURL(current[targetField]);
      return { ...current, [targetField]: preview };
    });
    setStatusMessage("Image sélectionnée. Elle sera envoyée à la création.");
    event.target.value = "";
  }

  async function uploadPendingImages(payload: Record<string, unknown>) {
    if (Object.keys(pendingImages).length === 0) return;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Configuration d’upload manquante.");
    }

    for (const [target, file] of Object.entries(pendingImages)) {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body });
      if (!response.ok) throw new Error("Import impossible");
      const data = (await response.json()) as { secure_url: string };
      payload[target] = target === "images"
        ? [...lines(String(payload[target] ?? "")), data.secure_url]
        : data.secure_url;
    }
  }

  async function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);
    setStatusMessage("");
    const payload: Record<string, unknown> = { ...editor };

    if (activeType === "recipes") {
      payload.ingredients = lines(String(editor.ingredients));
      payload.steps = lines(String(editor.steps));
      payload.tips = lines(String(editor.tips));
    }
    if (activeType === "projects") payload.images = lines(String(editor.images));

    if (activeType === "contact") {
      const response = await request(`/api/contact/${editingId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: editor.status }),
      });
      if (response.ok) {
        await loadItems(activeType);
        setStatusMessage("Message mis à jour.");
        setIsBusy(false);
        closeDrawer();
        return;
      }
      setStatusMessage("Impossible de mettre à jour.");
      setIsBusy(false);
      return;
    }

    if (activeType === "creations") {
      delete payload.excerpt;
      delete payload.content;
      delete payload.cover_image;
    } else if (activeType !== "projects" && activeType !== "collaborations") {
      delete payload.description;
    }
    if (!["creations", "collaborations", "gallery"].includes(activeType)) delete payload.image;
    if (activeType !== "projects") delete payload.images;

    const path = editingId ? `/api/${activeType}/${editingId}` : `/api/${activeType}`;
    try {
      setStatusMessage("Envoi du contenu et de l’image...");
      await uploadPendingImages(payload);
      const response = await request(path, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error();
      await loadItems(activeType);
      setStatusMessage("Contenu enregistré.");
      closeDrawer();
    } catch {
      setStatusMessage("Enregistrement impossible. Vérifiez les champs.");
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteItem(id: number) {
    if (!window.confirm("Supprimer définitivement ce contenu ?")) return;
    setIsBusy(true);
    try {
      const response = await request(`/api/${activeType}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      await loadItems(activeType);
      if (editingId === id) closeDrawer();
      setStatusMessage("Contenu supprimé.");
    } catch {
      setStatusMessage("Suppression impossible.");
    } finally {
      setIsBusy(false);
    }
  }

  function logout() {
    try {
      window.localStorage.removeItem("cheffe_admin_token");
    } catch {
      // Continue with the cookie fallback when localStorage is unavailable.
    }
    document.cookie = "cheffe_admin_token=; Path=/; Max-Age=0; SameSite=Lax";
    router.replace("/login");
  }

  const filteredItems = useMemo(() => {
    const list = items[activeType];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((item) => {
      const t = itemTitle(item).toLowerCase();
      const s = itemSubtitle(item).toLowerCase();
      return t.includes(q) || s.includes(q);
    });
  }, [items, activeType, search]);

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#111111]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#111111]/10 bg-[#f8f2eb]/95 backdrop-blur-md">
        <div className="section-shell flex h-[4.5rem] items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dcs9vkwe0/image/upload/v1790105611/jb9pawid1l772ui0nnks.jpg"
              alt="Profil de la cheffe"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#8b5e3c]/25"
            />
            <div>
              <Link
                href="/"
                className="block text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              >
                Cheffe Khadidiatou
              </Link>
              <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[#7a6659]">
                Console d’administration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-full border border-[#111111]/15 px-4 py-2 text-[0.64rem] uppercase tracking-[0.18em] transition hover:border-[#111111] sm:inline-flex"
            >
              Voir le site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-[#111111]/20 px-4 py-2 text-[0.64rem] uppercase tracking-[0.18em] transition hover:border-red-900/50 hover:text-red-900"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="section-shell grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#7a6659]">
            Gestion éditoriale
          </p>
          <h1 className="mt-3 font-display text-4xl leading-none lg:text-5xl">
            Votre maison.
          </h1>

          <nav className="mt-8 grid gap-1.5">
            {(Object.keys(labels) as ContentType[]).map((type) => {
              const active = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => selectType(type)}
                  className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition ${
                    active
                      ? "bg-[#171412] text-[#f5efe8] shadow-lg"
                      : "hover:bg-[#e7dccd]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md text-xs ${
                        active ? "bg-[#f5efe8]/15" : "bg-[#111111]/5"
                      }`}
                    >
                      {icons[type]}
                    </span>
                    <span className="text-sm">{labels[type]}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.62rem] tabular-nums ${
                      active ? "bg-[#f5efe8]/15 text-[#f5efe8]" : "bg-[#111111]/8 text-[#7a6659]"
                    }`}
                  >
                    {items[type].length}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN */}
        <section className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#7a6659]">
                {labels[activeType]}
              </p>
              <h2 className="mt-2 font-display text-4xl leading-none">
                {filteredItems.length} contenu{filteredItems.length > 1 ? "s" : ""}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="search"
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full border border-[#111111]/15 bg-[#f8f2eb] px-4 py-2.5 text-sm outline-none transition focus:border-[#8b5e3c]"
              />
              {activeType !== "contact" && (
                <button
                  type="button"
                  onClick={openCreate}
                  className="rounded-full bg-[#111111] px-5 py-3 text-[0.64rem] uppercase tracking-[0.18em] text-[#f4efe7] transition hover:bg-[#8b5e3c]"
                >
                  + Nouveau
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl border border-[#111111]/8 bg-[#f8f2eb]"
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-[#111111]/15 bg-[#f8f2eb] p-12 text-center">
              <p className="font-display text-3xl text-[#7a6659]">Rien ici pour l’instant.</p>
              {activeType !== "contact" && (
                <button
                  type="button"
                  onClick={openCreate}
                  className="mt-6 rounded-full bg-[#111111] px-5 py-3 text-[0.64rem] uppercase tracking-[0.18em] text-[#f4efe7] transition hover:bg-[#8b5e3c]"
                >
                  Créer le premier contenu
                </button>
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => {
                const thumb = itemThumb(item);
                return (
                  <article
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#f8f2eb] transition hover:-translate-y-0.5 hover:border-[#8b5e3c]/40 hover:shadow-[0_20px_40px_-25px_rgba(17,17,17,0.35)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#e7dccd]">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={itemTitle(item)}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-3xl opacity-40">
                          {icons[activeType]}
                        </div>
                      )}
                      {item.published === false && (
                        <span className="absolute left-3 top-3 rounded-full bg-[#171412]/85 px-3 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-[#f5efe8]">
                          Brouillon
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-2xl leading-tight">
                        {itemTitle(item)}
                      </h3>
                      {itemSubtitle(item) && (
                        <p className="mt-1 truncate text-[0.72rem] uppercase tracking-[0.14em] text-[#7a6659]">
                          {itemSubtitle(item)}
                        </p>
                      )}
                      {activeType === "contact" && item.message && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#40352f]">
                          {item.message}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-2 border-t border-[#111111]/8 pt-4">
                        <button
                          type="button"
                          onClick={() => editItem(item)}
                          className="rounded-full border border-[#111111]/15 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.15em] transition hover:border-[#111111] hover:bg-[#111111] hover:text-[#f4efe7]"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                          disabled={isBusy}
                          className="ml-auto rounded-full border border-red-900/20 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.15em] text-red-900/80 transition hover:border-red-900 hover:text-red-900 disabled:opacity-40"
                        >
                          Suppr.
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {statusMessage && !drawerOpen && (
            <p
              role="status"
              className="mt-6 rounded-xl border border-[#111111]/10 bg-[#f8f2eb] px-4 py-3 text-sm text-[#40352f]"
            >
              {statusMessage}
            </p>
          )}
        </section>
      </div>

      {/* DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            aria-label="Fermer"
            onClick={closeDrawer}
            className="absolute inset-0 bg-[#171412]/50 backdrop-blur-sm"
          />

          <aside className="admin-drawer relative ml-auto flex h-full w-full max-w-xl flex-col bg-[#f8f2eb] shadow-2xl">
            <header className="flex items-center justify-between border-b border-[#111111]/10 px-6 py-5">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#7a6659]">
                  {labels[activeType]}
                </p>
                <h3 className="mt-1 font-display text-2xl leading-none">
                  {editingId ? "Modifier le contenu" : "Nouveau contenu"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Fermer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#111111]/15 transition hover:border-[#111111]"
              >
                ×
              </button>
            </header>

            <form
              onSubmit={saveItem}
              className="flex flex-1 flex-col overflow-y-auto"
            >
              <div className="grid flex-1 gap-5 px-6 py-6 sm:grid-cols-2">
                {fieldsByType[activeType].map((field) => {
                  const isLongText = [
                    "excerpt",
                    "content",
                    "description",
                    "ingredients",
                    "steps",
                    "tips",
                    "message",
                  ].includes(field);
                  const isImage = [
                    "cover_image",
                    "image",
                    "image_url",
                    "logo",
                    "images",
                  ].includes(field);
                  const value = String(editor[field] ?? "");

                  if (isImage) {
                    return (
                      <div
                        key={field}
                        className={`${field === "images" ? "sm:col-span-2" : ""} text-[0.62rem] uppercase tracking-[0.18em] text-[#7a6659]`}
                      >
                          <span>{fieldLabels[field] ?? field.replaceAll("_", " ")}</span>
                        <div className="mt-2 flex items-center gap-4 rounded-2xl border border-dashed border-[#111111]/20 bg-[#f4efe7] p-4">
                          {(pendingPreviews[field] || (value && field !== "images")) && (
                            <img
                              src={pendingPreviews[field] ?? value}
                              alt="Aperçu"
                              className="h-20 w-20 rounded-xl object-cover"
                            />
                          )}
                          <label className="inline-flex cursor-pointer items-center rounded-full bg-[#171412] px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.16em] text-[#f8f2ec] transition hover:bg-[#8b5e3c]">
                            {value || pendingPreviews[field] ? "Changer l’image" : "Sélectionner une image"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => selectImage(e, field)}
                              className="hidden"
                              disabled={isBusy}
                            />
                          </label>
                        </div>
                        {field === "images" && (value || pendingPreviews[field]) && (
                          <p className="mt-2 text-xs normal-case tracking-normal text-[#7a6659]">
                            Aperçu prêt. L’image sera envoyée avec l’enregistrement.
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <label
                      key={field}
                      className={`${isLongText ? "sm:col-span-2" : ""} text-[0.62rem] uppercase tracking-[0.18em] text-[#7a6659]`}
                    >
                      {fieldLabels[field] ?? field.replaceAll("_", " ")}
                      {field === "status" ? (
                        <select
                          name={field}
                          value={value || "new"}
                          onChange={updateField}
                          className="mt-2 w-full rounded-xl border border-[#111111]/15 bg-[#f4efe7] px-3 py-2.5 text-base normal-case tracking-normal outline-none focus:border-[#8b5e3c]"
                        >
                          <option value="new">{statusLabels.new}</option>
                          <option value="read">{statusLabels.read}</option>
                          <option value="archived">{statusLabels.archived}</option>
                        </select>
                      ) : isLongText ? (
                        <textarea
                          readOnly={activeType === "contact"}
                          required={field !== "tips" && activeType !== "contact"}
                          name={field}
                          value={value}
                          onChange={updateField}
                          rows={field === "content" ? 6 : 3}
                          className="mt-2 w-full rounded-xl border border-[#111111]/15 bg-[#f4efe7] px-3 py-2.5 text-base normal-case tracking-normal outline-none focus:border-[#8b5e3c]"
                        />
                      ) : (
                        <input
                          readOnly={activeType === "contact"}
                          required={
                            ![
                              "preparation_time",
                              "cooking_time",
                              "phone",
                              "link",
                            ].includes(field)
                          }
                          name={field}
                          value={value}
                          onChange={updateField}
                          className="mt-2 w-full rounded-xl border border-[#111111]/15 bg-[#f4efe7] px-3 py-2.5 text-base normal-case tracking-normal outline-none focus:border-[#8b5e3c]"
                        />
                      )}
                    </label>
                  );
                })}
              </div>

              <footer className="border-t border-[#111111]/10 bg-[#f8f2eb] px-6 py-5">
                {activeType !== "contact" && (
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      name="published"
                      checked={Boolean(editor.published)}
                      onChange={updateField}
                      className="h-4 w-4 accent-[#8b5e3c]"
                    />
                    Publier ce contenu
                  </label>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    disabled={isBusy}
                    className="rounded-full bg-[#111111] px-6 py-3 text-[0.64rem] uppercase tracking-[0.18em] text-[#f4efe7] transition hover:bg-[#8b5e3c] disabled:opacity-50"
                  >
                    {activeType === "contact"
                      ? "Mettre à jour"
                      : editingId
                        ? "Enregistrer"
                        : "Créer"}
                  </button>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="rounded-full border border-[#111111]/15 px-6 py-3 text-[0.64rem] uppercase tracking-[0.18em] transition hover:border-[#111111]"
                  >
                    Annuler
                  </button>
                  {statusMessage && (
                    <p role="status" className="text-sm text-[#40352f]">
                      {statusMessage}
                    </p>
                  )}
                </div>
              </footer>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}