"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  KnowledgeSearch,
  DocumentViewer,
  KnowledgeCopilot,
} from "@/components/knowledge";
import { PdfUploadModal } from "@/components/knowledge/PdfUploadModal";
import { Plus, Sparkles, CheckCircle2 } from "lucide-react";

export default function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedDocId, setSelectedDocId] = useState("SOP-2026-KYC");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleUploadSuccess = (filename: string, chunkCount: number, vectorCount: number) => {
    setToastMsg(`Successfully indexed ${filename} (${chunkCount} chunks, ${vectorCount} FAISS vectors total)`);
    setTimeout(() => setToastMsg(null), 6000);
  };

  return (
    <AppLayout>
      <main className="space-y-8 max-w-[1600px] mx-auto pb-16">
        <ScrollReveal direction="left" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Knowledge Intelligence</h1>
              <p className="text-base text-muted-foreground mt-1">
                Enterprise Banking Policy, Regulatory SOPs & FAISS Vector RAG Engine
              </p>
            </div>

            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs shadow-lg shadow-emerald-950/40 border border-emerald-400/20 transition group shrink-0"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition duration-300" />
              <span>Upload Regulatory PDF</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            </button>
          </div>
        </ScrollReveal>

        {toastMsg && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs shadow-xl animate-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMsg}</span>
          </div>
        )}

        <ScrollReveal direction="left" delay={100}>
          <KnowledgeSearch
            query={query}
            setQuery={setQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={150}>
              <DocumentViewer
                selectedDocId={selectedDocId}
                onSelectDoc={(id) => setSelectedDocId(id)}
              />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={200}>
              <KnowledgeCopilot />
            </ScrollReveal>
          </div>
        </div>

        {/* Real-time Drag and Drop PDF Upload Modal */}
        <PdfUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      </main>
    </AppLayout>
  );
}