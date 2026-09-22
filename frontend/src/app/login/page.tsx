"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error("Identifiants invalides");
      const data = await response.json();
      window.localStorage.setItem("cheffe_admin_token", data.access_token);
      setMessage("Connexion réussie. Votre espace est prêt.");
      router.push("/admin");
    } catch {
      setMessage("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-[#171412] text-[#f5efe8]"><div className="section-shell py-6"><Link href="/" className="text-[0.68rem] uppercase tracking-[0.24em] text-[#d0a884]">Retour a la maison</Link></div><div className="section-shell flex min-h-[75vh] items-center justify-center py-14"><form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#201b18] p-8 md:p-10"><p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d0a884]">Espace privé</p><h1 className="mt-5 font-display text-6xl leading-none">Connexion.</h1><label className="mt-10 block text-[0.68rem] uppercase tracking-[0.2em] text-[#d0a884]">Email<input required type="email" name="email" className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-white" /></label><label className="mt-7 block text-[0.68rem] uppercase tracking-[0.2em] text-[#d0a884]">Mot de passe<input required type="password" name="password" className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-white" /></label><button disabled={loading} className="mt-9 w-full rounded-full bg-[#f5efe8] px-6 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-[#111111] disabled:opacity-60">{loading ? "Connexion..." : "Se connecter"}</button>{message && <p role="status" className="mt-5 text-sm leading-6 text-[#e8dfd4]">{message}</p>}</form></div></main>;
}
