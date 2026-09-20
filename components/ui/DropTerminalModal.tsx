"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Copy, Check, Sparkles } from "lucide-react";

export function DropTerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    { command: string; output: React.ReactNode; isSuccess?: boolean }[]
  >([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-neutral-400">
          <p className="text-emerald-400 font-bold">
            [✓] UTOPIA MAINFRAME v3.4 // DISPATCH ONLINE
          </p>
          <p>DÜĞÜM 01: ISTANBUL (TR-34) // DÜĞÜM 02: LONDON (UK-020)</p>
          <p className="text-[#FF5500]">
            KOMUTLAR: 'DRILL', 'SECRET', 'DROP', 'POLIS', 'CLEAR', 'HELP'
          </p>
        </div>
      ),
    },
  ]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom on new history
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Synthesize Cyber Beep Sound FX with Web Audio API (Zero dependencies/bandwidth)
  const playCyberSound = (type: "beep" | "success" | "error") => {
    try {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "success") {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "error") {
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playCyberSound("success");
    setTimeout(() => setCopied(false), 2000);
  };

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    const cmd = raw.toLowerCase();
    if (!cmd) return;

    playCyberSound("beep");

    let out: React.ReactNode = null;
    let isSuccess = false;

    switch (cmd) {
      case "help":
        out = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-[#FF5500] font-bold">KULLANILABİLİR KOMUTLAR:</p>
            <p>• <span className="text-white font-bold">DRILL</span> : Gizli VIP indirim şifresini çözümler.</p>
            <p>• <span className="text-white font-bold">SECRET</span> : Yeraltı arşiv loglarını görüntüler.</p>
            <p>• <span className="text-white font-bold">DROP</span> : Sıradaki kısıtlı üretim parçasını listeler.</p>
            <p>• <span className="text-white font-bold">CLEAR</span> : Terminal ekranını temizler.</p>
          </div>
        );
        break;

      case "drill":
      case "utopia":
      case "34":
      case "london":
        playCyberSound("success");
        isSuccess = true;
        out = (
          <div className="p-3 bg-[#FF5500]/10 border border-[#FF5500] space-y-2 rounded-sm shadow-[0_0_20px_rgba(255,85,0,0.3)]">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-[#FF5500]" />
              ERİŞİM ONAYLANDI // VIP GİZLİ DROP İNDİRİM KODU
            </div>
            <p className="text-white text-xs">
              Sepette kullanabileceğiniz gizli <span className="text-[#FF5500] font-bold">%20 indirim</span> protokolü açıldı:
            </p>
            <div className="flex items-center gap-2 bg-black/80 p-2 border border-white/20">
              <span className="text-base font-black tracking-widest text-[#FF5500]">
                UTOPIA20
              </span>
              <button
                onClick={() => handleCopyCode("UTOPIA20")}
                className="ml-auto flex items-center gap-1 px-3 py-1 bg-[#FF5500] text-white text-[10px] font-bold uppercase hover:bg-[#FF5500]/80 transition-all"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "KOPYALANDI" : "KODU AL"}
              </button>
            </div>
          </div>
        );
        break;

      case "secret":
      case "archive":
        out = (
          <div className="text-neutral-400 space-y-1">
            <p className="text-white font-bold">[!] ARŞİV DOSYASI: 04-NOCTURNE-SHELL</p>
            <p>DOKUMA: 480 GSM AĞIR FRANSIZ HAVLU KUMAŞI</p>
            <p>DONANIM: MAT SİYAH ASKERİ TİTANYUM FERMUAR</p>
            <p className="text-emerald-400">DURUM: SINIRLI ÜRETİM (50 ADET DÜNYA GENELİ)</p>
          </div>
        );
        break;

      case "drop":
        out = (
          <div className="text-neutral-300">
            <p className="text-[#FF5500] font-bold">YAKLAŞAN DROP: DROP 03 // UNDERGROUND</p>
            <p>TARİH: 24 SAAT İÇİNDE ERKEN ERİŞİM</p>
            <p className="text-neutral-500 text-[10px]">VIP KULLANICILARA ÖZEL ŞİFRELİ SAYFA AKTİF EDİLECEKTİR.</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        playCyberSound("error");
        out = (
          <div className="text-red-400">
            [HATA] Bilinmeyen komut: "{raw}". Komut listesi için <span className="text-white font-bold underline cursor-pointer" onClick={() => executeCommand("help")}>'help'</span> yazın.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: raw, output: out, isSuccess }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  return (
    <>
      {/* Trigger Button (Bottom Left HUD) */}
      <div className="fixed bottom-6 left-6 z-[9990] flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-black/85 text-white/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] text-[11px] font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] group"
          title="Gizli Arşiv Terminali"
        >
          <Terminal className="w-3.5 h-3.5 text-[#FF5500] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">DROP TERMINAL</span>
          <span className="sm:hidden">TERMINAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      {/* Cyber Hacker Terminal Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[99995] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#FF5500]/50 shadow-[0_0_40px_rgba(255,85,0,0.25)] flex flex-col max-h-[85vh] overflow-hidden">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-white/80">
                <Terminal className="w-4 h-4 text-[#FF5500]" />
                <span className="font-bold">UTOPIA_TERMINAL_v3.4.sh</span>
                <span className="text-[10px] text-neutral-500">// ROOT ACCESS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs space-y-4 custom-scroll max-h-[55vh]">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                    <span className="text-[#FF5500]">uto-os:~$</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  <div>{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Action Chips for Mobile / Fast Click */}
            <div className="px-4 py-2 border-t border-white/10 bg-[#121212] flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">HIZLI:</span>
              {["DRILL", "SECRET", "DROP", "HELP", "CLEAR"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 bg-black/60 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] text-[10px] font-mono text-neutral-400 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input Prompt */}
            <div className="p-3 bg-black border-t border-[#FF5500]/30 flex items-center gap-2">
              <span className="text-[#FF5500] font-mono text-sm font-bold animate-pulse">
                uto-os:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Komut girin (örn: 'drill' veya 'help')..."
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-neutral-600"
              />
              <button
                onClick={() => executeCommand(input)}
                className="px-3 py-1 bg-[#FF5500] text-white font-mono text-[10px] font-bold uppercase hover:bg-[#FF5500]/80 transition-colors"
              >
                ÇALIŞTIR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
