"use client";

import { FormEvent, useState } from "react";

import SiteHeader from "@/components/SiteHeader";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setFeedback(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Contact request failed");
      event.currentTarget.reset();
      setFeedback("Votre message a bien été reçu. La cheffe reviendra vers vous très prochainement.");
    } catch {
      setFeedback("Le message n'a pas pu être envoyé. Réessayez dans un instant.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#111111]">
      <SiteHeader />
      <div className="section-shell grid gap-12 py-14 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#7a6659]">Prendre contact</p>
          <h1 className="mt-5 font-display text-6xl leading-[0.9] md:text-8xl">Une table a imaginer.</h1>
          <p className="mt-8 max-w-md text-base leading-8 text-[#40352f]">Evenement, atelier, creation ou conversation autour des saveurs africaines : racontez-nous votre idee.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#111111]/10 bg-[#f8f2eb] p-7 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-[#7a6659]">Nom<input required name="name" className="mt-3 w-full border-b border-[#111111]/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-[#111111]" /></label>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-[#7a6659]">Email<input required type="email" name="email" className="mt-3 w-full border-b border-[#111111]/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-[#111111]" /></label>
          </div>
          <label className="mt-7 block text-[0.68rem] uppercase tracking-[0.2em] text-[#7a6659]">Telephone<input name="phone" className="mt-3 w-full border-b border-[#111111]/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-[#111111]" /></label>
          <label className="mt-7 block text-[0.68rem] uppercase tracking-[0.2em] text-[#7a6659]">Type de demande<select name="request_type" defaultValue="collaboration" className="mt-3 w-full border-b border-[#111111]/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-[#111111]"><option value="collaboration">Collaboration</option><option value="event">Evenement</option><option value="workshop">Atelier</option><option value="media">Presse / media</option></select></label>
          <label className="mt-7 block text-[0.68rem] uppercase tracking-[0.2em] text-[#7a6659]">Message<textarea required name="message" rows={5} className="mt-3 w-full resize-y border-b border-[#111111]/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none focus:border-[#111111]" /></label>
          <button disabled={isSending} className="mt-8 inline-flex rounded-full bg-[#111111] px-7 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-[#f8f2eb] transition hover:bg-[#2c241e] disabled:cursor-wait disabled:opacity-60">{isSending ? "Envoi..." : "Envoyer le message"}</button>
          {feedback && <p role="status" className="mt-5 text-sm leading-6 text-[#40352f]">{feedback}</p>}
        </form>
      </div>
    </main>
  );
}
