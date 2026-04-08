module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Projects/en gravity/tritonweb/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
;
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("⚠️ Debes definir MONGODB_URI en las variables de entorno");
}
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["default"].connect(uri).then((mongoose)=>mongoose.connection);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/Projects/en gravity/tritonweb/src/models/Registration.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
;
const RegistrationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    user: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User"
    },
    event: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Event",
        required: true
    },
    guestInfo: {
        name: {
            type: String
        },
        email: {
            type: String
        }
    },
    cedula: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: [
            "Hombre",
            "Mujer"
        ],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    distance: {
        type: String
    },
    category: {
        type: String
    },
    tshirtSize: {
        type: String
    },
    status: {
        type: String,
        enum: [
            "PENDING_PAYMENT",
            "COMPLETED",
            "FAILED"
        ],
        default: "PENDING_PAYMENT"
    },
    paymentId: {
        type: String
    },
    wompiTransactionId: {
        type: String
    }
}, {
    timestamps: true
});
const Registration = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["models"].Registration || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["model"])("Registration", RegistrationSchema);
const __TURBOPACK__default__export__ = Registration;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/Projects/en gravity/tritonweb/src/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: [
            true,
            "El nombre es obligatorio."
        ],
        trim: true
    },
    email: {
        type: String,
        required: [
            true,
            "El correo es obligatorio."
        ],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [
            true,
            "La contraseña es obligatoria."
        ]
    },
    role: {
        type: String,
        enum: [
            "USER",
            "ADMIN"
        ],
        default: "USER"
    },
    discipline: {
        type: String
    },
    goal: {
        type: String
    }
}, {
    timestamps: true
});
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["models"].User || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["model"])("User", UserSchema);
const __TURBOPACK__default__export__ = User;
}),
"[project]/Projects/en gravity/tritonweb/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                console.log("🔵 Authorize called with:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("🔴 Missing credentials");
                    return null;
                }
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
                    console.log("🟢 DB Connected");
                } catch (error) {
                    console.error("🔴 DB Connection failed:", error);
                    return null;
                }
                const userFound = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                    email: credentials.email
                });
                if (!userFound) {
                    console.log("🔴 User not found:", credentials.email);
                    return null;
                }
                console.log("🟢 User found:", userFound.email);
                const passwordMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, userFound.password);
                if (!passwordMatch) {
                    console.log("🔴 Password mismatch for:", credentials.email);
                    return null;
                }
                console.log("🟢 Password verified. Returning user.");
                return {
                    id: userFound._id.toString(),
                    name: userFound.name,
                    email: userFound.email,
                    role: userFound.role ? userFound.role.toUpperCase() : "USER"
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                console.log("🎫 [NextAuth] JWT Callback - User login:", user.email, "Role:", user.role);
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            console.log("🎫 [NextAuth] Session Callback - Token Role:", token.role);
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET
};
}),
"[project]/Projects/en gravity/tritonweb/src/app/api/admin/events/[id]/registrations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "revalidate",
    ()=>revalidate,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Registration$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/models/Registration.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/lib/auth.ts [app-route] (ecmascript)");
const dynamic = 'force-dynamic';
const runtime = 'nodejs';
const revalidate = 0;
;
;
;
;
;
;
async function GET(req, { params }) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (session?.user?.role !== "ADMIN") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Acceso denegado"
            }, {
                status: 403
            });
        }
        // 2. Validate Event ID
        const { id: eventId } = await params;
        if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["isValidObjectId"])(eventId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Invalid event ID."
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        // 3. Fetch Registrations for the Event
        const registrations = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Registration$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            event: eventId
        }).populate("user", "name email") // Populate user details if linked
        .lean(); // Convert to plain JS objects
        // 4. Return Registrations
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            data: registrations
        }, {
            status: 200
        });
    } catch (error) {
        console.error("🔥 ERROR in /api/admin/events/[id]/registrations:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message || "Internal server error."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f01d04a9._.js.map