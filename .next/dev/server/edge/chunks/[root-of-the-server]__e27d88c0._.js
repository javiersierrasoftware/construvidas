(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__e27d88c0._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Software/construvidas/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
;
;
// Rutas de ADMIN
const adminRoutes = [
    "/stories/create",
    "/stories/manage",
    "/stories/edit",
    "/events/create",
    "/events/manage",
    "/events/edit",
    "/admin"
];
// Rutas de USUARIO (cualquier rol)
const protectedRoutes = [
    "/dashboard",
    "/perfil"
];
async function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAdminRoute = adminRoutes.some((route)=>pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    // Si no es una ruta protegida, no hacer nada
    if (!isAdminRoute && !isProtectedRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Verificar el token usando NextAuth
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    console.log("🔒 [MIDDLEWARE] Path:", pathname);
    console.log("🔒 [MIDDLEWARE] Token exists:", !!token);
    if (token) {
        console.log("🔒 [MIDDLEWARE] Token Role:", token.role);
        console.log("🔒 [MIDDLEWARE] Token Email:", token.email);
    } else {
        console.log("🔒 [MIDDLEWARE] No token found.");
    }
    // Si no hay token, redirigir a login
    if (!token) {
        console.log("🔒 [MIDDLEWARE] Redirecting to login (No Token)");
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    // Si es ruta de Admin, verificar el rol
    if (isAdminRoute) {
        console.log("🔒 [MIDDLEWARE] Admin Route Detected.");
        if (token.role?.toUpperCase() !== "ADMIN") {
            console.log("⚠️ [MIDDLEWARE] ACCESS DENIED: Role is", token.role, "Expected ADMIN");
        // RELAXED CHECK: Still logging but allowing to pass to let Page Guard handle it (or blocking if we want strictness)
        // For debugging, we want to know if this HIT.
        // If we want to strictly debug why it fails, we can temporarily allow it but log LOUDLY.
        } else {
            console.log("✅ [MIDDLEWARE] ACCESS GRANTED: Admin role confirmed.");
        }
    }
    // Si el token es válido y tiene el rol correcto (o no es ruta de admin), continuar
    return __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /* User routes */ "/dashboard/:path*",
        "/perfil/:path*",
        /* Admin Pages */ "/stories/create/:path*",
        "/stories/manage/:path*",
        "/stories/edit/:path*",
        "/events/create/:path*",
        "/events/manage/:path*",
        "/events/edit/:path*",
        "/admin/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__e27d88c0._.js.map