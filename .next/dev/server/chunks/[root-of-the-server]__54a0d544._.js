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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

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
"[project]/Projects/en gravity/tritonweb/src/models/Event.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
;
const RegistrationPeriodSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    label: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number
    }
});
const EventSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [
            true,
            "El nombre del evento es obligatorio."
        ],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: [
            true,
            "La fecha es obligatoria."
        ]
    },
    time: {
        type: String,
        required: [
            true,
            "La hora es obligatoria."
        ]
    },
    location: {
        type: String,
        required: [
            true,
            "La ubicación es obligatoria."
        ],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            "Carrera",
            "Triatlón",
            "Ciclismo",
            "Natación",
            "Entrenamiento",
            "Otro"
        ]
    },
    distance: {
        type: String
    },
    distances: {
        type: [
            String
        ],
        default: []
    },
    category: {
        type: [
            String
        ],
        default: []
    },
    minAge: {
        type: Number,
        min: 0
    },
    maxAge: {
        type: Number,
        min: 0
    },
    shirtSizes: {
        type: [
            String
        ],
        default: []
    },
    price: {
        type: Number
    },
    slotsLeft: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    registrationPeriods: {
        type: [
            RegistrationPeriodSchema
        ],
        default: []
    },
    createdBy: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});
// Evita sobreescribir el modelo si ya existe (importante en Next.js)
const Event = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["models"].Event || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["model"])("Event", EventSchema);
const __TURBOPACK__default__export__ = Event;
}),
"[project]/Projects/en gravity/tritonweb/src/models/Order.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
;
const OrderItemSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    productId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String
    }
});
const GuestInfoSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});
const OrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    user: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User"
    },
    guestInfo: {
        type: GuestInfoSchema,
        required: true
    },
    items: {
        type: [
            OrderItemSchema
        ],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentId: {
        type: String
    },
    wompiTransactionId: {
        type: String
    },
    status: {
        type: String,
        enum: [
            "PENDING_PAYMENT",
            "COMPLETED",
            "FAILED",
            "PAID"
        ],
        default: "PENDING_PAYMENT"
    }
}, {
    timestamps: true
});
const Order = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["models"].Order || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["model"])("Order", OrderSchema);
const __TURBOPACK__default__export__ = Order;
}),
"[project]/Projects/en gravity/tritonweb/src/models/Product.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Projects/en gravity/tritonweb/node_modules/mongoose)");
;
const ProductSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: [
            true,
            "El nombre del producto es obligatorio."
        ],
        trim: true
    },
    slug: {
        type: String,
        required: [
            true,
            "El slug del producto es obligatorio."
        ],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [
            true,
            "El precio del producto es obligatorio."
        ],
        min: 0
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        required: [
            true,
            "El stock del producto es obligatorio."
        ],
        min: 0,
        default: 0
    },
    createdBy: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});
const Product = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["models"].Product || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$mongoose$29$__["model"])("Product", ProductSchema);
const __TURBOPACK__default__export__ = Product;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/Projects/en gravity/tritonweb/src/lib/mail.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmail",
    ()=>sendEmail,
    "sendEventRegistrationEmail",
    ()=>sendEventRegistrationEmail,
    "sendOrderConfirmationEmail",
    ()=>sendOrderConfirmationEmail,
    "sendWelcomeEmail",
    ()=>sendWelcomeEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
async function sendEmail({ to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from: `"Triton Web" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html
        });
        console.log("📧 Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return null;
    }
}
async function sendWelcomeEmail(to, name) {
    const subject = "¡Bienvenido a Triton Web!";
    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #00bcd4;">¡Hola, ${name}!</h1>
      <p>Gracias por unirte a la comunidad <strong>Triton</strong>.</p>
      <p>Estamos emocionados de tenerte con nosotros. Ahora podrás inscribirte a eventos, comprar productos y gestionar tu perfil de deportista.</p>
      <br/>
      <p>Atentamente,</p>
      <p><strong>El equipo de Triton</strong></p>
    </div>
  `;
    return sendEmail({
        to,
        subject,
        html
    });
}
async function sendEventRegistrationEmail(to, name, eventName, details) {
    const subject = `Inscripción Confirmada: ${eventName}`;
    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4caf50;">¡Inscripción Exitosa!</h1>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Tu inscripción al evento <strong>${eventName}</strong> ha sido confirmada.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Distancia:</strong> ${details.distance || "N/A"}</p>
        <p><strong>Categoría:</strong> ${details.category || "N/A"}</p>
        <p><strong>Referencia de pago:</strong> ${details.transactionId}</p>
      </div>
      <p>Prepárate para dar lo mejor de ti.</p>
      <br/>
      <p>Atentamente,</p>
      <p><strong>El equipo de Triton</strong></p>
    </div>
  `;
    return sendEmail({
        to,
        subject,
        html
    });
}
async function sendOrderConfirmationEmail(to, name, orderId, products) {
    const subject = `Confirmación de Compra #${orderId.slice(-6)}`;
    const productRows = products.map((p)=>`<tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${p.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${p.qty}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${p.price.toLocaleString()}</td>
        </tr>`).join("");
    const total = products.reduce((acc, p)=>acc + p.price * p.qty, 0);
    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ff9800;">¡Gracias por tu compra!</h1>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Tu pedido ha sido recibido y procesado exitosamente.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; text-align: left;">Producto</th>
            <th style="padding: 8px; text-align: left;">Cant.</th>
            <th style="padding: 8px; text-align: left;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
            <td style="padding: 8px; font-weight: bold;">$${total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
      
      <p>Te avisaremos cuando tu pedido sea enviado.</p>
      <br/>
      <p>Atentamente,</p>
      <p><strong>El equipo de Triton</strong></p>
    </div>
  `;
    return sendEmail({
        to,
        subject,
        html
    });
}
}),
"[project]/Projects/en gravity/tritonweb/src/lib/wompi-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleOrder",
    ()=>handleOrder,
    "handleRegistration",
    ()=>handleRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Registration$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/models/Registration.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Event$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/models/Event.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/models/Order.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Product$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/models/Product.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/lib/mail.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function handleRegistration(id, status, transactionId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    const registration = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Registration$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id).populate("event").populate("user"); // Populate user y event
    if (!registration) {
        console.error(`[Wompi Util] Registration not found for ID: ${id}`);
        throw new Error(`Registration not found for ID: ${id}`);
    }
    if (registration.status === "PENDING_PAYMENT") {
        if (status === "APPROVED") {
            registration.status = "COMPLETED";
            registration.wompiTransactionId = transactionId;
            await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Event$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(registration.event._id, {
                $inc: {
                    slotsLeft: -1
                }
            });
            console.log(`✅ [Wompi Util] Registration ${id} marked as COMPLETED.`);
            // Enviar correo
            const email = registration.guestInfo?.email || registration.user?.email;
            const name = registration.guestInfo?.name || registration.user?.name || "Deportista";
            if (email) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEventRegistrationEmail"])(email, name, registration.event.name, {
                    distance: registration.distance,
                    category: registration.category,
                    transactionId: transactionId
                }).catch((err)=>console.error("Error enviando email de evento:", err));
            } else {
                console.warn("No se pudo enviar email de evento: Falta correo.");
            }
        } else if ([
            "DECLINED",
            "ERROR",
            "VOIDED"
        ].includes(status)) {
            registration.status = "FAILED";
            registration.wompiTransactionId = transactionId;
            console.log(`❌ [Wompi Util] Registration ${id} marked as FAILED.`);
        }
        await registration.save();
    } else {
        console.log(`[Wompi Util] Registration ${id} was already processed. Status: ${registration.status}`);
    }
}
async function handleOrder(id, status, transactionId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id).populate('items.productId');
    if (!order) {
        console.error(`[Wompi Util] Order not found for ID: ${id}`);
        throw new Error(`Order not found for ID: ${id}`);
    }
    if (order.status === "PENDING_PAYMENT") {
        if (status === "APPROVED") {
            order.status = "PAID";
            order.wompiTransactionId = transactionId;
            const productDetails = [];
            for (const item of order.items){
                if (item.productId && item.productId._id) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$models$2f$Product$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].updateOne({
                        _id: item.productId._id
                    }, {
                        $inc: {
                            stock: -item.qty
                        }
                    });
                    productDetails.push({
                        name: item.name,
                        qty: item.qty,
                        price: item.price
                    });
                    console.log(`- [Wompi Util] Decremented stock for product ${item.productId.name} by ${item.qty}`);
                } else {
                    console.warn(`- [Wompi Util] Product for item '${item.name}' not found or invalid. Stock not decremented.`);
                }
            }
            console.log(`✅ [Wompi Util] Order ${id} marked as PAID.`);
            // Enviar correo
            const email = order.guestInfo?.email;
            const name = order.guestInfo?.name || "Cliente";
            if (email) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$mail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendOrderConfirmationEmail"])(email, name, id, productDetails).catch((err)=>console.error("Error enviando email de orden:", err));
            } else {
                console.warn("No se pudo enviar email de orden: Falta correo.");
            }
        } else if ([
            "DECLINED",
            "ERROR",
            "VOIDED"
        ].includes(status)) {
            order.status = "FAILED";
            order.wompiTransactionId = transactionId;
            console.log(`❌ [Wompi Util] Order ${id} marked as FAILED.`);
        }
        await order.save();
    } else {
        console.log(`[Wompi Util] Order ${id} was already processed. Status: ${order.status}`);
    }
}
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/Projects/en gravity/tritonweb/src/app/api/admin/orders/[id]/force-process/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$wompi$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/src/lib/wompi-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/en gravity/tritonweb/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
;
async function POST(req, { params }) {
    try {
        // 1. Authenticate and Authorize Admin
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const tokenCookie = cookieStore.get("triton_session_token");
        if (!tokenCookie) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "No autorizado"
            }, {
                status: 401
            });
        }
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(tokenCookie.value, process.env.JWT_SECRET);
        if (token.role !== "ADMIN") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Acceso denegado"
            }, {
                status: 403
            });
        }
        const { id: orderId } = await params;
        if (!orderId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "ID de la orden es requerido."
            }, {
                status: 400
            });
        }
        console.log(`[Force Process] Manually processing order ${orderId} as 'APPROVED'.`);
        // 2. Call the centralized handler function, simulating a successful webhook
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$src$2f$lib$2f$wompi$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleOrder"])(orderId, 'APPROVED', `MANUAL_APPROVAL_${new Date().toISOString()}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Orden ${orderId} procesada exitosamente como pagada.`
        }, {
            status: 200
        });
    } catch (error) {
        console.error(`[Force Process] Error processing order:`, error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Token inválido o expirado'
            }, {
                status: 401
            });
        }
        // Check if the error message is from our wompi-util
        if (error.message.includes("not found")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: error.message
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$en__gravity$2f$tritonweb$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Error interno del servidor.",
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__54a0d544._.js.map