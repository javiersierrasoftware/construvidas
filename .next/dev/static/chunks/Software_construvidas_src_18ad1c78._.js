(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Software/construvidas/src/store/cartStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCartStore",
    ()=>useCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
"use client";
;
const useCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        items: [],
        isOpen: false,
        toggleCart: ()=>set((state)=>({
                    isOpen: !state.isOpen
                })),
        addItem: (item)=>set((state)=>{
                // si ya existe, aumentar cantidad
                const existing = state.items.find((i)=>i.productId === item.productId); // Changed from 'id' to 'productId'
                if (existing) {
                    return {
                        items: state.items.map((i)=>i.productId === item.productId ? {
                                ...i,
                                qty: i.qty + 1
                            } : i // Changed from 'id' to 'productId'
                        )
                    };
                }
                // agregar nuevo
                return {
                    items: [
                        ...state.items,
                        {
                            ...item,
                            qty: 1
                        }
                    ]
                };
            }),
        removeItem: (productId)=>set((state)=>({
                    items: state.items.filter((i)=>i.productId !== productId)
                })),
        clearCart: ()=>set(()=>({
                    items: []
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Software/construvidas/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/src/store/cartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [adminOpen, setAdminOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const user = session?.user;
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const toggleMobile = ()=>setMobileOpen((v)=>!v);
    const toggleProfileMenu = ()=>setMenuOpen((v)=>!v);
    const toggleCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])({
        "Navbar.useCartStore[toggleCart]": (state)=>state.toggleCart
    }["Navbar.useCartStore[toggleCart]"]);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])({
        "Navbar.useCartStore[items]": (state)=>state.items
    }["Navbar.useCartStore[items]"]);
    const totalItems = items.reduce((acc, item)=>acc + item.qty, 0);
    /* ---------------------- CERRAR MENÚ CLICK AFUERA (DESKTOP PERFIL) ---------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            function handleClickOutside(e) {
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                    setMenuOpen(false);
                }
            }
            if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
            return ({
                "Navbar.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        menuOpen
    ]);
    /* ---------------------- BLOQUEAR SCROLL CUANDO MENÚ MÓVIL ABIERTO ---------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            if (!mobileOpen) return;
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return ({
                "Navbar.useEffect": ()=>{
                    document.body.style.overflow = prev;
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        mobileOpen
    ]);
    /* ------------------------- LOGOUT ------------------------- */ const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
            callbackUrl: "/login"
        });
        setMenuOpen(false);
        setMobileOpen(false);
        setAdminOpen(null);
    };
    const closeMobile = ()=>{
        setMobileOpen(false);
        setAdminOpen(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-accent-300 z-50 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-4 flex items-center justify-between h-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-3 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-10 w-10 relative transition-transform duration-300 group-hover:scale-110",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/construvidastransparente.png",
                                    alt: "CONSTRUVIDAS Logo",
                                    fill: true,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col leading-none select-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-900 font-gobold text-2xl tracking-tight uppercase",
                                        children: "CONSTRUVIDAS"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500 text-[9px] uppercase tracking-[0.3em] font-bold opacity-100",
                                        children: "Iglesia Cristiana"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-8 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLinks, {}, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCart,
                                className: "relative hover:text-secondary-400 transition text-gray-200",
                                "aria-label": "Abrir carrito",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-2 -right-2 bg-gradient-to-br from-secondary-400 to-accent-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center",
                                        children: totalItems
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            !user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: "bg-gradient-to-br from-secondary-400 to-accent-400 text-black font-semibold px-5 py-1.5 rounded-full",
                                children: "Ingresar"
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: menuRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleProfileMenu,
                                        className: "flex items-center gap-2",
                                        "aria-label": "Abrir menú de perfil",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-9 w-9 rounded-full bg-gradient-to-br from-secondary-400 to-accent-400 text-black font-bold flex items-center justify-center",
                                                children: user?.name?.charAt(0)?.toUpperCase() ?? "U"
                                            }, void 0, false, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 18,
                                                className: "text-slate-800"
                                            }, void 0, false, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-4 w-72 bg-white border border-slate-100 rounded-[2rem] shadow-2xl z-50 overflow-hidden py-4 animate-in fade-in slide-in-from-top-2 duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-6 py-4 mb-2 border-b border-slate-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1",
                                                        children: "Bienvenido"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-gobold text-slate-900 uppercase truncate",
                                                        children: user?.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 135,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/perfil",
                                                className: "block px-6 py-3 text-sm font-medium hover:bg-slate-50 hover:text-secondary-600 transition text-slate-600",
                                                onClick: ()=>setMenuOpen(false),
                                                children: "Mi Perfil"
                                            }, void 0, false, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this),
                                            user?.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-secondary-500 font-bold bg-secondary-50/50",
                                                        children: "Administración"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-2 pb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 flex flex-col gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/stories/manage",
                                                                    className: "block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl",
                                                                    onClick: ()=>setMenuOpen(false),
                                                                    children: "Gestionar Historias"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                    lineNumber: 157,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/events/manage",
                                                                    className: "block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl",
                                                                    onClick: ()=>setMenuOpen(false),
                                                                    children: "Gestionar Eventos"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                    lineNumber: 165,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/admin/products/manage",
                                                                    className: "block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl",
                                                                    onClick: ()=>setMenuOpen(false),
                                                                    children: "Gestionar Tienda"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                    lineNumber: 173,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/admin/surveys",
                                                                    className: "block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl",
                                                                    onClick: ()=>setMenuOpen(false),
                                                                    children: "Gestionar Encuestas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 30
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/admin/hero-slider",
                                                                    className: "block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl",
                                                                    onClick: ()=>setMenuOpen(false),
                                                                    children: "Hero Slider"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                    lineNumber: 189,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 150,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 pt-4 border-t border-slate-50 px-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleLogout,
                                                    className: "flex items-center w-full text-left px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition rounded-2xl",
                                                    children: "Cerrar sesión"
                                                }, void 0, false, {
                                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex md:hidden items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCart,
                                className: "relative p-2",
                                "aria-label": "Abrir carrito",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        size: 22,
                                        className: "text-slate-900"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1 right-1 bg-secondary-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transform translate-x-1 -translate-y-1",
                                        children: totalItems
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleMobile,
                                className: "p-2",
                                "aria-label": "Abrir menú",
                                children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 26,
                                    className: "text-slate-900"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                    lineNumber: 227,
                                    columnNumber: 27
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    size: 26,
                                    className: "text-slate-900"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                    lineNumber: 227,
                                    columnNumber: 72
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Cerrar menú",
                onClick: closeMobile,
                className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] md:hidden animate-in fade-in duration-500"
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 234,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed top-0 right-0 w-[20rem] max-w-[85vw] h-dvh bg-white border-l border-slate-100 shadow-2xl transform transition-transform duration-500 ease-out z-[60] md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center p-8 border-b border-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1",
                                        children: "Navegación"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl font-gobold text-slate-900 uppercase tracking-tight",
                                        children: "Menú Principal"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 249,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeMobile,
                                className: "p-2 hover:bg-slate-50 rounded-full transition-colors",
                                "aria-label": "Cerrar menú",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 26,
                                    className: "text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col p-8 overflow-y-auto h-[calc(100vh-100px)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                        href: "/",
                                        onClick: closeMobile,
                                        children: "Inicio"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                        href: "/stories",
                                        onClick: closeMobile,
                                        children: "Comunidad"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                        href: "/discipulado",
                                        onClick: closeMobile,
                                        children: "Discipulado"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                        href: "/events",
                                        onClick: closeMobile,
                                        children: "Eventos"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 262,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                        href: "/join",
                                        onClick: closeMobile,
                                        children: "Únete"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-8 border-t border-slate-50"
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            !user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                onClick: closeMobile,
                                className: "bg-slate-900 text-white font-gobold py-5 rounded-2xl text-center uppercase tracking-widest text-xs shadow-lg",
                                children: "Ingresar"
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                            href: "/perfil",
                                            onClick: closeMobile,
                                            children: "Mi Perfil"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    user?.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8 pt-8 border-t border-slate-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] uppercase tracking-[0.2em] text-secondary-500 font-bold mb-6",
                                                children: "Administración"
                                            }, void 0, false, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileSection, {
                                                        title: "Historias",
                                                        open: adminOpen === "historias",
                                                        onToggle: ()=>setAdminOpen((v)=>v === "historias" ? null : "historias"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/stories/create",
                                                                onClick: closeMobile,
                                                                children: "Crear historia"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 297,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/stories/manage",
                                                                onClick: closeMobile,
                                                                children: "Gestionar historias"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileSection, {
                                                        title: "Eventos",
                                                        open: adminOpen === "eventos",
                                                        onToggle: ()=>setAdminOpen((v)=>v === "eventos" ? null : "eventos"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/events/create",
                                                                onClick: closeMobile,
                                                                children: "Crear evento"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/events/manage",
                                                                onClick: closeMobile,
                                                                children: "Gestionar eventos"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileSection, {
                                                        title: "Tienda",
                                                        open: adminOpen === "tienda",
                                                        onToggle: ()=>setAdminOpen((v)=>v === "tienda" ? null : "tienda"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/admin/products/manage",
                                                                onClick: closeMobile,
                                                                children: "Gestionar tienda"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/admin/sales",
                                                                onClick: closeMobile,
                                                                children: "Ventas realizadas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileSection, {
                                                        title: "Hero Slider",
                                                        open: adminOpen === "hero",
                                                        onToggle: ()=>setAdminOpen((v)=>v === "hero" ? null : "hero"),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                            href: "/admin/hero-slider",
                                                            onClick: closeMobile,
                                                            children: "Gestionar Hero Slider"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileSection, {
                                                        title: "Encuestas",
                                                        open: adminOpen === "surveys",
                                                        onToggle: ()=>setAdminOpen((v)=>v === "surveys" ? null : "surveys"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/admin/surveys",
                                                                onClick: closeMobile,
                                                                children: "Gestionar Encuestas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAdminLink, {
                                                                href: "/admin/surveys/create",
                                                                onClick: closeMobile,
                                                                children: "Crear Nueva Encuesta"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 286,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "mt-12 text-red-500 font-bold text-center py-4 bg-red-50 rounded-2xl border border-red-100 uppercase tracking-widest text-[10px]",
                                        children: "Cerrar sesión"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(Navbar, "/PqFl/ZMouvMZ69Uy9vwmi9ie7o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = Navbar;
/* --------------------- LINKS DESKTOP --------------------- */ function NavLinks() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]",
                children: "Inicio"
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 372,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/stories",
                className: "text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]",
                children: "Comunidad"
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/discipulado",
                className: "text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]",
                children: "Discipulado"
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/events",
                className: "text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]",
                children: "Eventos"
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/join",
                className: "text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]",
                children: "Únete"
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
        lineNumber: 371,
        columnNumber: 5
    }, this);
}
_c1 = NavLinks;
/* --------------------- LINK MOBILE --------------------- */ function MobileLink({ href, children, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        onClick: onClick,
        className: "block text-slate-600 hover:text-secondary-600 transition font-gobold uppercase tracking-widest text-lg py-1",
        children: children
    }, void 0, false, {
        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
        lineNumber: 393,
        columnNumber: 5
    }, this);
}
_c2 = MobileLink;
/* --------------------- SECCIÓN COLAPSABLE (MOBILE ADMIN) --------------------- */ function MobileSection({ title, open, onToggle, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onToggle,
                className: "w-full flex items-center justify-between py-2 text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs uppercase tracking-wider text-slate-400 font-bold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 16,
                        className: `text-slate-400 transition-transform ${open ? "rotate-180" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-4 pl-4 border-l-2 border-slate-50 flex flex-col",
                children: children
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
                lineNumber: 428,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
        lineNumber: 416,
        columnNumber: 5
    }, this);
}
_c3 = MobileSection;
/* --------------------- LINK ADMIN (MOBILE) --------------------- */ function MobileAdminLink({ href, children, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        onClick: onClick,
        className: "text-slate-600 hover:text-secondary-600 transition font-bold text-sm",
        children: children
    }, void 0, false, {
        fileName: "[project]/Software/construvidas/src/components/Navbar.tsx",
        lineNumber: 447,
        columnNumber: 5
    }, this);
}
_c4 = MobileAdminLink;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Navbar");
__turbopack_context__.k.register(_c1, "NavLinks");
__turbopack_context__.k.register(_c2, "MobileLink");
__turbopack_context__.k.register(_c3, "MobileSection");
__turbopack_context__.k.register(_c4, "MobileAdminLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Software/construvidas/src/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useAuth() {
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const user = session?.user ? {
        id: session.user.id,
        email: session.user.email ?? "",
        name: session.user.name ?? "",
        role: session.user.role
    } : null;
    const handleLogout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
            callbackUrl: "/login"
        }); // Redirects to /login after logout
    };
    return {
        user,
        logout: handleLogout
    };
}
_s(useAuth, "xGqsfA9Yc4bug2CeORcyTsHwvXY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Software/construvidas/src/data/colombia.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOMBIA_DATA",
    ()=>COLOMBIA_DATA
]);
const COLOMBIA_DATA = [
    {
        departamento: "Amazonas",
        ciudades: [
            "Leticia",
            "Puerto Nariño"
        ]
    },
    {
        departamento: "Antioquia",
        ciudades: [
            "Medellín",
            "Bello",
            "Itagüí",
            "Envigado",
            "Apartadó",
            "Rionegro",
            "Turbo",
            "Caucasia"
        ]
    },
    {
        departamento: "Arauca",
        ciudades: [
            "Arauca",
            "Arauquita",
            "Saravena",
            "Tame"
        ]
    },
    {
        departamento: "Atlántico",
        ciudades: [
            "Barranquilla",
            "Soledad",
            "Malambo",
            "Sabanalarga"
        ]
    },
    {
        departamento: "Bolívar",
        ciudades: [
            "Cartagena",
            "Magangué",
            "Turbaco",
            "El Carmen de Bolívar"
        ]
    },
    {
        departamento: "Boyacá",
        ciudades: [
            "Tunja",
            "Sogamoso",
            "Duitama",
            "Chiquinquirá"
        ]
    },
    {
        departamento: "Caldas",
        ciudades: [
            "Manizales",
            "La Dorada",
            "Chinchiná",
            "Villamaría"
        ]
    },
    {
        departamento: "Caquetá",
        ciudades: [
            "Florencia",
            "San Vicente del Caguán"
        ]
    },
    {
        departamento: "Casanare",
        ciudades: [
            "Yopal",
            "Aguazul",
            "Villanueva"
        ]
    },
    {
        departamento: "Cauca",
        ciudades: [
            "Popayán",
            "Santander de Quilichao",
            "Puerto Tejada"
        ]
    },
    {
        departamento: "Cesar",
        ciudades: [
            "Valledupar",
            "Aguachica",
            "Codazzi"
        ]
    },
    {
        departamento: "Chocó",
        ciudades: [
            "Quibdó",
            "Istmina"
        ]
    },
    {
        departamento: "Córdoba",
        ciudades: [
            "Montería",
            "Lorica",
            "Sahagún",
            "Cereté"
        ]
    },
    {
        departamento: "Cundinamarca",
        ciudades: [
            "Bogotá",
            "Soacha",
            "Fusagasugá",
            "Facatativá",
            "Zipaquirá",
            "Chía",
            "Girardot",
            "Mosquera"
        ]
    },
    {
        departamento: "Guainía",
        ciudades: [
            "Inírida"
        ]
    },
    {
        departamento: "Guaviare",
        ciudades: [
            "San José del Guaviare"
        ]
    },
    {
        departamento: "Huila",
        ciudades: [
            "Neiva",
            "Pitalito",
            "Garzón",
            "La Plata"
        ]
    },
    {
        departamento: "La Guajira",
        ciudades: [
            "Riohacha",
            "Maicao",
            "Uribia"
        ]
    },
    {
        departamento: "Magdalena",
        ciudades: [
            "Santa Marta",
            "Ciénaga",
            "Zona Bananera",
            "Plato"
        ]
    },
    {
        departamento: "Meta",
        ciudades: [
            "Villavicencio",
            "Acacías",
            "Granada"
        ]
    },
    {
        departamento: "Nariño",
        ciudades: [
            "Pasto",
            "Tumaco",
            "Ipiales"
        ]
    },
    {
        departamento: "Norte de Santander",
        ciudades: [
            "Cúcuta",
            "Ocaña",
            "Villa del Rosario",
            "Los Patios"
        ]
    },
    {
        departamento: "Putumayo",
        ciudades: [
            "Mocoa",
            "Puerto Asís"
        ]
    },
    {
        departamento: "Quindío",
        ciudades: [
            "Armenia",
            "Calarcá",
            "Montenegro",
            "Quimbaya"
        ]
    },
    {
        departamento: "Risaralda",
        ciudades: [
            "Pereira",
            "Dosquebradas",
            "Santa Rosa de Cabal"
        ]
    },
    {
        departamento: "San Andrés y Providencia",
        ciudades: [
            "San Andrés",
            "Providencia"
        ]
    },
    {
        departamento: "Santander",
        ciudades: [
            "Bucaramanga",
            "Floridablanca",
            "Barrancabermeja",
            "Girón",
            "Piedecuesta"
        ]
    },
    {
        departamento: "Sucre",
        ciudades: [
            "Sincelejo",
            "Corozal",
            "San Onofre",
            "Sampués"
        ]
    },
    {
        departamento: "Tolima",
        ciudades: [
            "Ibagué",
            "Espinal",
            "Melgar",
            "Chaparral"
        ]
    },
    {
        departamento: "Valle del Cauca",
        ciudades: [
            "Cali",
            "Buenaventura",
            "Palmira",
            "Tulua",
            "Yumbo",
            "Cartago",
            "Jamundí",
            "Buga"
        ]
    },
    {
        departamento: "Vaupés",
        ciudades: [
            "Mitú"
        ]
    },
    {
        departamento: "Vichada",
        ciudades: [
            "Puerto Carreño"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Software/construvidas/src/components/store/CheckoutForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/src/hooks/useAuth.ts [app-client] (ecmascript)"); // Assuming you have an auth hook
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/src/store/cartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$data$2f$colombia$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/src/data/colombia.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CheckoutForm({ onClose, totalAmount }) {
    _s();
    const { items } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(); // Get cart items
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])(); // Assuming useAuth provides user
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: user?.name || "",
        email: user?.email || "",
        cedula: "",
        address: "",
        phoneNumber: ""
    });
    const [shippingMethod, setShippingMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pickup");
    const [selectedDepartment, setSelectedDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCity, setSelectedCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [availableCities, setAvailableCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [addressLine, setAddressLine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Prefill cedula, address, phoneNumber if user is logged in and has profile data
    // This would require fetching user profile from DB or having it in the user object
    // For now, we'll assume it's not directly in 'user' from useAuth unless specified.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutForm.useEffect": ()=>{
            if (user) {
                setFormData({
                    "CheckoutForm.useEffect": (prev)=>({
                            ...prev,
                            name: user.name || prev.name,
                            email: user.email || prev.email
                        })
                }["CheckoutForm.useEffect"]);
            }
        }
    }["CheckoutForm.useEffect"], [
        user
    ]);
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // Handle Department Change
    const handleDepartmentChange = (e)=>{
        const deptName = e.target.value;
        setSelectedDepartment(deptName);
        // Find cities for selected department
        const deptData = __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$data$2f$colombia$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOMBIA_DATA"].find((d)=>d.departamento === deptName);
        setAvailableCities(deptData ? deptData.ciudades : []);
        // Reset city if department changes
        setSelectedCity("");
    };
    const handleCityChange = (e)=>{
        setSelectedCity(e.target.value);
    };
    const handleShippingMethodChange = (method)=>{
        setShippingMethod(method);
        // You might want to clear address fields or keep them depending on UX preference
        if (method === "pickup") {
            setAddressLine("");
            setSelectedDepartment("");
            setSelectedCity("");
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        // Validate shipping info manually since we construct the final address
        if (shippingMethod === "shipping") {
            if (!selectedDepartment || !selectedCity || !addressLine) {
                setError("Por favor completa todos los campos de dirección de envío.");
                setIsLoading(false);
                return;
            }
        }
        // Construct final address string
        let finalAddress = "Acordar entrega por WhatsApp";
        if (shippingMethod === "shipping") {
            finalAddress = `${addressLine} - ${selectedCity}, ${selectedDepartment} (Valor de envío no incluido)`;
        }
        try {
            if (items.length === 0) {
                throw new Error("El carrito está vacío.");
            }
            const orderDetails = {
                ...formData,
                address: finalAddress,
                cartItems: items.map((item)=>({
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        qty: item.qty,
                        image: item.image
                    })),
                totalAmount
            };
            const res = await fetch("/api/store/checkout/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(orderDetails)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Error al procesar el pago.");
            }
            if (data.redirectUrl) {
                router.push(data.redirectUrl); // Redirect to Wompi checkout
            } else {
                throw new Error("No se recibió URL de redirección para el pago.");
            }
        } catch (err) {
            setError(err.message);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white border border-slate-100 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-gobold text-slate-900 uppercase tracking-tight mb-8",
                    children: "Datos del Comprador"
                }, void 0, false, {
                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "name",
                                    className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                    children: "Nombre Completo"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "name",
                                    name: "name",
                                    value: formData.name,
                                    onChange: handleChange,
                                    required: true,
                                    className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "email",
                                            className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            id: "email",
                                            name: "email",
                                            value: formData.email,
                                            onChange: handleChange,
                                            required: true,
                                            className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "cedula",
                                            className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                            children: "Cédula"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "cedula",
                                            name: "cedula",
                                            value: formData.cedula,
                                            onChange: handleChange,
                                            required: true,
                                            className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                    children: "Método de Entrega"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleShippingMethodChange("pickup"),
                                            className: `flex-1 py-4 px-6 rounded-2xl border font-gobold text-[10px] uppercase tracking-widest transition-all ${shippingMethod === "pickup" ? "bg-slate-900 border-slate-900 text-white shadow-lg" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`,
                                            children: "Acordar por WhatsApp"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleShippingMethodChange("shipping"),
                                            className: `flex-1 py-4 px-6 rounded-2xl border font-gobold text-[10px] uppercase tracking-widest transition-all ${shippingMethod === "shipping" ? "bg-slate-900 border-slate-900 text-white shadow-lg" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`,
                                            children: "Envío a dirección"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this),
                        shippingMethod === "shipping" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6 pt-6 border-t border-slate-100 mt-6 animate-in slide-in-from-top-4 duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "department",
                                                    className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                                    children: "Departamento"
                                                }, void 0, false, {
                                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    id: "department",
                                                    value: selectedDepartment,
                                                    onChange: handleDepartmentChange,
                                                    className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Selecciona"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 23
                                                        }, this),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$data$2f$colombia$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOMBIA_DATA"].map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: dept.departamento,
                                                                children: dept.departamento
                                                            }, dept.departamento, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "city",
                                                    className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                                    children: "Ciudad"
                                                }, void 0, false, {
                                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    id: "city",
                                                    value: selectedCity,
                                                    onChange: handleCityChange,
                                                    disabled: !selectedDepartment,
                                                    className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none disabled:opacity-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Selecciona"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 23
                                                        }, this),
                                                        availableCities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: city,
                                                                children: city
                                                            }, city, false, {
                                                                fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "addressLine",
                                            className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                            children: "Dirección exacta"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "addressLine",
                                            name: "addressLine",
                                            value: addressLine,
                                            onChange: (e)=>setAddressLine(e.target.value),
                                            placeholder: "Ej: Carrera 12 # 34-56, Apt 201",
                                            required: shippingMethod === "shipping",
                                            className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this),
                        shippingMethod === "pickup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-secondary-50 border border-secondary-100 p-4 rounded-2xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-secondary-600 font-medium text-center italic",
                                children: "Coordinaremos la entrega contigo vía WhatsApp para que retires en nuestra sede."
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                lineNumber: 291,
                                columnNumber: 18
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "phoneNumber",
                                    className: "text-xs font-bold text-slate-500 uppercase tracking-widest ml-1",
                                    children: "Teléfono móvil"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "tel",
                                    id: "phoneNumber",
                                    name: "phoneNumber",
                                    value: formData.phoneNumber,
                                    onChange: handleChange,
                                    required: true,
                                    className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center md:text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1",
                                            children: "Total a pagar"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl font-gobold text-slate-900",
                                            children: [
                                                "$",
                                                totalAmount.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 w-full md:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onClose,
                                            className: "flex-1 px-8 py-4 bg-slate-50 text-slate-700 font-gobold rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] shadow-sm border border-slate-100",
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 318,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: isLoading,
                                            className: "flex-[2] px-8 py-4 bg-slate-900 text-white font-gobold rounded-2xl hover:bg-secondary-600 hover:shadow-xl transition-all uppercase tracking-widest text-[10px] shadow-lg",
                                            children: isLoading ? "Procesando..." : "Finalizar Compra"
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-red-50 text-red-600 rounded-2xl text-center text-sm font-medium border border-red-100 animate-pulse",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Software/construvidas/src/components/store/CheckoutForm.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s(CheckoutForm, "5sP0ytzhtqNb33oPIvC2pbj96qc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CheckoutForm;
var _c;
__turbopack_context__.k.register(_c, "CheckoutForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Software/construvidas/src/components/store/CartSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/src/store/cartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"); // Added useState
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$components$2f$store$2f$CheckoutForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/src/components/store/CheckoutForm.tsx [app-client] (ecmascript)"); // Added CheckoutForm
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CartSidebar() {
    _s();
    const { isOpen, items, toggleCart, removeItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    const [showCheckoutForm, setShowCheckoutForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Added state
    const total = items.reduce((acc, p)=>acc + p.price * p.qty, 0);
    if (showCheckoutForm) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$components$2f$store$2f$CheckoutForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onClose: ()=>setShowCheckoutForm(false),
            totalAmount: total
        }, void 0, false, {
            fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-0 right-0 h-full w-[24rem] bg-white border-l border-slate-100 p-8 shadow-2xl transition-transform duration-500 z-50 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]",
                                children: "Mi Pedido"
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-gobold text-slate-900 uppercase tracking-tight",
                                children: "Tu Carrito"
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleCart,
                        className: "p-2 hover:bg-slate-50 rounded-full transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 24,
                            className: "text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 pb-40",
                children: [
                    items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 32,
                                    className: "text-slate-200"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400 font-medium italic",
                                children: "Tu carrito está vacío."
                            }, void 0, false, {
                                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl group transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-20 w-20 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: item.image || "/placeholder-image.jpg",
                                        alt: item.name,
                                        fill: true,
                                        className: "object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-gobold text-slate-900 uppercase tracking-wide text-sm truncate",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-secondary-600 mt-1",
                                            children: [
                                                item.qty,
                                                " × $",
                                                item.price.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeItem(item.productId),
                                    className: "p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18,
                                        className: "text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, item.productId, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 w-full px-8 py-8 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-end mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block",
                                    children: "Total"
                                }, void 0, false, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                    lineNumber: 74,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-3xl font-gobold text-slate-900",
                                    children: [
                                        "$",
                                        total.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowCheckoutForm(true),
                        className: "w-full bg-slate-900 text-white font-gobold py-5 rounded-2xl hover:bg-secondary-600 hover:shadow-xl transition-all uppercase tracking-widest text-xs",
                        children: "Finalizar Pedido"
                    }, void 0, false, {
                        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Software/construvidas/src/components/store/CartSidebar.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(CartSidebar, "z1mpe3UxiMbE7QXvCpVHkzwx5uA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = CartSidebar;
var _c;
__turbopack_context__.k.register(_c, "CartSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Software/construvidas/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software/construvidas/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)"); // Assuming you need ToastContainer here
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Software$2f$construvidas$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true
            }, void 0, false, {
                fileName: "[project]/Software/construvidas/src/app/providers.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Software/construvidas/src/app/providers.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Software_construvidas_src_18ad1c78._.js.map