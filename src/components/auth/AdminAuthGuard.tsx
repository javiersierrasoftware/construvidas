"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log("🛡️ [AuthGuard] Status:", status);
    if (status === "loading") return;

    const user = session?.user;
    console.log("🛡️ [AuthGuard] User:", user);
    console.log("🛡️ [AuthGuard] Role:", user?.role);

    // Normalized role check
    if (status === "authenticated" && user?.role?.toUpperCase() === "ADMIN") {
      console.log("✅ [AuthGuard] Authorized!");
      setIsAuthorized(true);
    } else if (status === "unauthenticated" || (user && user.role?.toUpperCase() !== "ADMIN")) {
      console.log("⛔ [AuthGuard] UNAUTHORIZED. Redirecting to login.");
      router.replace("/login");
    }
  }, [status, session, router]);

  // Show loader while loading OR while waiting for authorization (to prevent flash of content)
  if (status === "loading" || !isAuthorized) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-secondary-500" />
        <p className="mt-4 text-slate-700">Verificando autorización...</p>
      </main>
    );
  }

  return <>{children}</>;
}
