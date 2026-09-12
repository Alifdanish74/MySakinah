"use client";

import { useState } from "react";
import { Search, Loader2, CreditCard, Sparkles, X, CheckCircle2 } from "lucide-react";

interface ICSearchFormProps {
  onSearch: (ic: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function ICSearchForm({ onSearch, isLoading, error }: ICSearchFormProps) {
  const [icInput, setIcInput] = useState("");

  // Format IC as XXXXXX-XX-XXXX while typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw.length <= 6) {
      setIcInput(raw);
    } else if (raw.length <= 8) {
      setIcInput(`${raw.slice(0, 6)}-${raw.slice(6)}`);
    } else {
      setIcInput(`${raw.slice(0, 6)}-${raw.slice(6, 8)}-${raw.slice(8, 12)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!icInput.trim()) return;
    onSearch(icInput);
  };

  const handleDemoClick = (demoIC: string) => {
    setIcInput(demoIC);
    onSearch(demoIC);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-amber-500/5 backdrop-blur-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Semakan Pantas Dalam Talian</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Masukkan No. Kad Pengenalan
          </h2>
          <p className="text-sm text-slate-400 mt-1.5 max-w-md mx-auto">
            Sila masukkan nombor MyKad (IC) anda untuk memaparkan Kad Keahlian Digital rasmi MySakinah Pro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CreditCard className="h-5 w-5 text-amber-400/70" />
            </div>
            <input
              type="text"
              value={icInput}
              onChange={handleInputChange}
              placeholder="Contoh: 900101-14-5678"
              maxLength={14}
              disabled={isLoading}
              className="w-full pl-12 pr-12 py-4 bg-slate-950/80 border-2 border-amber-500/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 text-white placeholder-slate-500 text-lg sm:text-xl font-mono tracking-wider rounded-xl transition-all duration-200"
            />
            {icInput && (
              <button
                type="button"
                onClick={() => setIcInput("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !icInput.trim()}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base sm:text-lg shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menyemak Rekod Keahlian...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Semak Kad Keahlian</span>
              </>
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-200">Semakan Gagal</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Quick Demo Test Section */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Cuba Contoh Rekod IC Ujian (Klik Untuk Uji):</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => handleDemoClick("920315-10-5432")}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 hover:border-amber-500/50 border border-slate-700 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
            >
              920315-10-5432 (KOHASiL)
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick("880520-14-6789")}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 hover:border-amber-500/50 border border-slate-700 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
            >
              880520-14-6789 (KOPETRO)
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick("951104-08-5521")}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 hover:border-amber-500/50 border border-slate-700 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
            >
              951104-08-5521 (Al-Barzah)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
