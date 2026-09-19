"use client";

import React, { useState } from "react";
import { Sparkles, Send, Bot, Terminal, CheckCircle2 } from "lucide-react";

const QUICK_COMMANDS = [
  "Create a black oversized hoodie",
  "Create a campaign for Drop 02",
  "Generate SEO metadata for all products",
  "Mark this product as limited",
];

export function AdminAIAssistant() {
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<
    { id: string; userText: string; aiResponse: string; action?: string }[]
  >([
    {
      id: "init",
      userText: "Sistem durumu nedir?",
      aiResponse:
        "UTOPIA LDN AI Studio aktif. Drop 01 canlı satışta (87/100 parça satıldı). Veritabanı ve stok motoru senkronize.",
    },
  ]);

  const handleSubmit = async (cmdText?: string) => {
    const textToSend = cmdText || command;
    if (!textToSend.trim()) return;

    setLoading(true);
    setCommand("");

    try {
      const res = await fetch("/api/ai/admin-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: textToSend }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResponses((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            userText: textToSend,
            aiResponse: data.message,
            action: data.action,
          },
        ]);
      } else {
        setResponses((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            userText: textToSend,
            aiResponse: data.error || "Komut işlenirken bir sorun oluştu.",
          },
        ]);
      }
    } catch {
      setResponses((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          userText: textToSend,
          aiResponse: "Bağlantı hatası oluştu.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] font-bold">
          <Terminal className="w-4 h-4 text-[#e50914]" />
          ADMIN AI STUDIO COMMAND ASSISTANT
        </div>
        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          ONLINE // DB ACCESS
        </span>
      </div>

      {/* Chat / Terminal Log */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scroll text-xs font-mono">
        {responses.map((r) => (
          <div key={r.id} className="space-y-1.5">
            <div className="text-neutral-500 flex items-center gap-1.5">
              <span className="text-[#e50914]">❯</span> {r.userText}
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-200 whitespace-pre-wrap flex items-start gap-2">
              <Bot className="w-4 h-4 text-[#e50914] flex-shrink-0 mt-0.5" />
              <div>{r.aiResponse}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="p-3 bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-xs font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e50914] animate-spin" />
            Yapay zeka mağaza komutunu icra ediyor...
          </div>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {QUICK_COMMANDS.map((q) => (
          <button
            key={q}
            onClick={() => handleSubmit(q)}
            disabled={loading}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] font-mono uppercase text-neutral-300 hover:text-white transition-colors"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Command Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex gap-2 pt-2"
      >
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Komut yazın (örn: Create a black oversized hoodie, Drop 02 için kampanya yaz)..."
          className="flex-1 bg-[#111] border border-neutral-800 px-3 py-2.5 text-xs font-mono text-white placeholder-neutral-600 outline-none focus:border-white"
        />
        <button
          type="submit"
          disabled={loading || !command.trim()}
          className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
          GÖNDER
        </button>
      </form>
    </div>
  );
}
