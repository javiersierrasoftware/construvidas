"use client";

import ManageStories from "@/components/ManageStories";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

function ManageStoriesPageContent() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <div className="mb-12">
        <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Administración</h2>
        <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Gestionar Historias</h1>
      </div>

      <ManageStories />
    </main>
  );
}

export default function ManageStoriesPage() {
  return (
    <AdminAuthGuard>
      <ManageStoriesPageContent />
    </AdminAuthGuard>
  )
}