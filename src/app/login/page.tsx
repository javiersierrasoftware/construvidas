import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-slate-900 pt-28 pb-20 px-6" />}>
      <LoginClient />
    </Suspense>
  );
}
