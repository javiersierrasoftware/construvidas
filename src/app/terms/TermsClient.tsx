"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Printer,
  Search,
  ChevronRight,
  Smartphone,
  Globe,
  FileCheck,
  AlertTriangle,
  Phone,
  MapPin,
  CheckCircle2,
  Info,
  Scale,
  CreditCard,
  BookOpen,
  MessageCircle,
  Copy,
  Users,
  Copyright,
  Ban
} from "lucide-react";

interface Section {
  id: string;
  number: string;
  title: string;
  keywords: string[];
  content: React.ReactNode;
}

export default function TermsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(false);

  const WHATSAPP_NUMBER = "+57 300 838 4014";
  const WHATSAPP_LINK = "https://wa.me/573008384014";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+573008384014");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const sections: Section[] = [
    {
      id: "aceptacion",
      number: "01",
      title: "Aceptación de los Términos y Ámbito de Aplicación",
      keywords: ["aceptación", "acuerdo", "web", "aplicación móvil", "ios", "android"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Los presentes Términos y Condiciones de Uso (en adelante, los <strong>&ldquo;Términos&rdquo;</strong>) constituyen un contrato legal vinculante celebrado entre cualquier persona que acceda, navegue, se registre o utilice los servicios (en adelante, el <strong>&ldquo;Usuario&rdquo;</strong>) y la <strong>IGLESIA CRISTIANA CONSTRUVIDAS</strong> (en adelante, <strong>&ldquo;CONSTRUVIDAS&rdquo;</strong> o la <strong>&ldquo;Iglesia&rdquo;</strong>).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 my-4 text-sm">
            <div>
              <p className="font-bold text-slate-900 mb-1">Titular de la Plataforma:</p>
              <p className="text-slate-700 font-medium">IGLESIA CRISTIANA CONSTRUVIDAS</p>
              <p className="text-slate-500">Entidad Religiosa legalmente constituida en Colombia</p>
              <p className="text-slate-500"><strong>Domicilio:</strong> Calle 17 N.º 30-48, Barrio Dulce Nombre, Sincelejo, Sucre – Colombia</p>
              <p className="text-slate-500"><strong>WhatsApp Oficial:</strong> +57 300 838 4014</p>
              <p className="text-slate-500"><strong>Servidor Oficial:</strong> https://construvidas.org</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Desarrollo y Soporte Tecnológico:</p>
              <p className="text-slate-700 font-medium">TICSOFT S.A.S.</p>
              <p className="text-slate-500">Empresa de software y base tecnológica proveedora de la infraestructura digital</p>
              <p className="text-slate-500"><strong>Sitio Web:</strong> www.ticsoft.co</p>
            </div>
          </div>
          <p>
            Estos Términos rigen el uso del sitio web oficial (<code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-semibold">https://construvidas.org</code>), así como de las aplicaciones móviles oficiales para dispositivos iOS (distribuida en Apple App Store) y Android (distribuida en Google Play Store), y todas las funciones conexas de cursos bíblicos, eventos, devocionales, historias comunitarias y tienda en línea.
          </p>
          <p className="font-medium text-slate-800">
            Al acceder, descargar o utilizar nuestras plataformas, el Usuario manifiesta haber leído, comprendido y aceptado en su totalidad estos Términos, así como nuestra <Link href="/privacy" className="text-secondary-600 underline font-bold">Política de Privacidad</Link>. Si no está de acuerdo con alguno de los puntos, debe abstenerse de utilizar el servicio.
          </p>
        </div>
      ),
    },
    {
      id: "licencia",
      number: "02",
      title: "Licencia Limitada de Uso (Web y Aplicación Móvil EULA)",
      keywords: ["licencia", "eula", "apple", "google play", "propiedad", "uso personal"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS otorga al Usuario una licencia personal, no exclusiva, intransferible, revocable y limitada para descargar, instalar y utilizar la aplicación móvil y acceder a la plataforma web únicamente para fines personales, espirituales, formativos y comunitarios no comerciales.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs md:text-sm">
            <p className="font-bold text-slate-900">Restricciones Expresas de la Licencia:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>No se permite descompilar, realizar ingeniería inversa, desensamblar o intentar extraer el código fuente de la aplicación móvil o del servidor web.</li>
              <li>No se autoriza revender, sublicenciar, arrendar o explotar comercialmente la plataforma o sus contenidos sin autorización previa y por escrito de CONSTRUVIDAS.</li>
              <li>No se permite el uso de robots, scrapers, arañas web o mecanismos automatizados para extraer masivamente datos de devocionales, usuarios, eventos o lecciones de cursos.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500">
            Esta licencia se concede de conformidad con el Contrato de Licencia para el Usuario Final Estándar (EULA) de Apple para aplicaciones de iOS y las Condiciones de Distribución para Desarrolladores de Google Play para Android.
          </p>
        </div>
      ),
    },
    {
      id: "cuentas",
      number: "03",
      title: "Registro de Cuentas, Credenciales y Seguridad",
      keywords: ["registro", "cuenta", "contraseña", "seguridad", "responsabilidad"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Para acceder a ciertas funcionalidades de la plataforma (como inscripción a cursos, seguimiento de devocionales, compras en la tienda o publicación en historias comunitarias), el Usuario debe crear una cuenta personal suministrando información veraz, completa y actualizada.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm">
            <li>
              <strong>Custodia de Credenciales:</strong> El Usuario es el único responsable de mantener la confidencialidad de su contraseña y datos de acceso. Cualquier actividad realizada desde su cuenta se presumirá efectuada por el titular de la misma.
            </li>
            <li>
              <strong>Notificación de Vulnerabilidades:</strong> El Usuario se compromete a notificar de inmediato a CONSTRUVIDAS vía WhatsApp (+57 300 838 4014) sobre cualquier uso no autorizado de su cuenta o brecha de seguridad advertida.
            </li>
            <li>
              <strong>Veracidad de la Información:</strong> Queda terminantemente prohibida la suplantación de identidad o el suministro de información falsa o perteneciente a terceras personas sin su autorización previa.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "conducta",
      number: "04",
      title: "Reglas de Conducta y Contenido Generado por el Usuario (UGC)",
      keywords: ["conducta", "ugc", "historias", "comunidad", "moderación", "tolerancia cero", "apple guideline 1.2"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            En concordancia con las directrices de <strong>Apple App Store (Guideline 1.2 - User-Generated Content)</strong> y las políticas de <strong>Google Play Store</strong>, nuestra plataforma cuenta con una <strong>política estricta de tolerancia cero</strong> frente a contenidos ofensivos, difamatorios, de odio o abusivos.
          </p>
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle size={18} />
              Contenidos Estrictamente Prohibidos:
            </div>
            <ul className="list-disc pl-5 text-xs md:text-sm text-amber-950 space-y-1">
              <li>Mensajes de odio, discriminación racial, religiosa, de género o cualquier forma de hostigamiento o acoso (bullying).</li>
              <li>Imágenes o textos con contenido pornográfico, sexualmente explícito, violento o que atente contra la dignidad humana y los principios de la fe cristiana.</li>
              <li>Material protegido por derechos de autor o propiedad intelectual de terceros sin la debida licencia o autorización.</li>
              <li>Spam, publicidad no autorizada, esquemas piramidales o enlaces maliciosos de phishing.</li>
            </ul>
          </div>
          <p>
            <strong>Mecanismos de Moderación y Denuncia:</strong> CONSTRUVIDAS se reserva el derecho incondicional de revisar, ocultar o eliminar cualquier historia, fotografía, comentario o testimonio que infrinja estas reglas, así como de suspender o expulsar de forma permanente al usuario infractor sin previo aviso.
          </p>
        </div>
      ),
    },
    {
      id: "cursos",
      number: "05",
      title: "Cursos Bíblicos, Discipulados y Formación Espiritual",
      keywords: ["cursos", "discipulado", "formación", "educación", "certificados"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Los cursos, lecciones, guías de discipulado y materiales formativos ofrecidos a través de la plataforma web y la aplicación móvil tienen un carácter estrictamente espiritual, pastoral, eclesiástico y de crecimiento personal en la fe cristiana.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs md:text-sm space-y-2">
            <p className="font-bold text-slate-900">Aclaración Legal sobre Certificados:</p>
            <p className="text-slate-600">
              Las constancias, diplomas o certificados emitidos al culminar los cursos acreditan la participación interna dentro de los programas de edificación de la Iglesia Cristiana CONSTRUVIDAS. No constituyen títulos de educación superior, técnica o formal reglamentada por el Ministerio de Educación Nacional de Colombia ni confieren idoneidad profesional civil.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "eventos",
      number: "06",
      title: "Inscripción y Participación en Eventos y Conferencias",
      keywords: ["eventos", "inscripción", "boletos", "asistencia", "código qr"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS organiza eventos, conferencias, campamentos y congresos a los cuales los usuarios pueden inscribirse a través de la web o app móvil:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm">
            <li><strong>Confirmación y Acreditación:</strong> La inscripción exitosa generará un comprobante o código QR de acceso personal e intransferible que deberá presentarse al ingreso del recinto.</li>
            <li><strong>Cupos y Cancelaciones:</strong> Los cupos están sujetos a la capacidad física del auditorio o sede. En caso de fuerza mayor, caso fortuito o disposiciones gubernamentales, CONSTRUVIDAS se reserva la facultad de reprogramar las fechas informando oportunamente a los inscritos.</li>
            <li><strong>Código de Conducta en Eventos:</strong> Los asistentes se comprometen a respetar los protocolos de seguridad física, las directrices del equipo de servidores y a mantener un comportamiento acorde con la fraternidad y el orden comunitario.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "donaciones-tienda",
      number: "07",
      title: "Donaciones, Ofrendas y Compras en la Tienda Oficial (Wompi)",
      keywords: ["donaciones", "ofrendas", "tienda", "compras", "wompi", "bancolombia", "estatuto consumidor", "ley 1480"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Las transacciones económicas realizadas dentro de la plataforma se rigen por las siguientes condiciones específicas:
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">A. Donaciones, Diezmos y Ofrendas Voluntarias</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Las donaciones y ofrendas constituyen actos de liberalidad voluntaria de los creyentes para el sostenimiento del ministerio pastoral, obras sociales y funcionamiento de la iglesia. De acuerdo con el régimen eclesiástico y civil colombiano, las donaciones no son reembolsables una vez perfeccionada la transferencia a favor de la entidad religiosa.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">B. Tienda en Línea y Estatuto del Consumidor (Ley 1480 de 2011)</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Para la adquisición de libros, biblias, indumentaria o accesorios en la tienda oficial, rigen las disposiciones de la Ley 1480 de 2011 (Estatuto del Consumidor de Colombia). Los precios se exhiben en pesos colombianos (COP). El Usuario goza del derecho de retracto dentro de los cinco (5) días hábiles siguientes a la entrega del producto, siempre que este se encuentre en perfecto estado y sin señales de uso.
              </p>
            </div>
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-2 font-bold text-blue-900 text-xs md:text-sm mb-1">
                <CreditCard size={18} />
                Seguridad de Pagos con Wompi (Bancolombia)
              </div>
              <p className="text-xs md:text-sm text-blue-950">
                Todos los pagos y transacciones con tarjeta de crédito, PSE o corresponsales bancarios se procesan de forma cifrada a través de la pasarela autorizada <strong>Wompi</strong> con certificación PCI-DSS Nivel 1. CONSTRUVIDAS nunca tiene acceso a datos de tarjetas ni contraseñas bancarias.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "propiedad-intelectual",
      number: "08",
      title: "Propiedad Intelectual y Derechos de Autor",
      keywords: ["propiedad intelectual", "derechos de autor", "marcas", "sermones", "devocionales", "logos"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Todos los elementos distintivos de la plataforma, incluyendo el nombre comercial <strong>CONSTRUVIDAS</strong>, logotipos, emblemas, textos de devocionales diarios, guías de estudio, lecciones audiovisuales, audios de sermones, diseño gráfico, código fuente y software son propiedad exclusiva de la <strong>IGLESIA CRISTIANA CONSTRUVIDAS</strong> o de <strong>TICSOFT S.A.S.</strong>, encontrándose amparados por las leyes de propiedad intelectual de Colombia (Ley 23 de 1982, Decisión Andina 351 y 486) y los tratados internacionales de la OMPI.
          </p>
          <p>
            El Usuario puede compartir devocionales y enlaces oficiales a través de redes sociales para fines de edificación espiritual y evangelización, siempre que se cite expresamente la fuente y no se modifique el contenido ni se utilice con ánimo de lucro.
          </p>
        </div>
      ),
    },
    {
      id: "menores-terminos",
      number: "09",
      title: "Protección de Menores de Edad y Responsabilidad Parental",
      keywords: ["menores", "edad", "padres", "tutores", "responsabilidad"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            El uso de la plataforma por parte de niños, niñas y adolescentes menores de 18 años debe ser supervisado directamente por sus padres o representantes legales. Los padres o tutores asumen la responsabilidad civil y legal por cualquier acción u omisión en que incurran los menores bajo su patria potestad dentro de la aplicación móvil o sitio web.
          </p>
          <p className="text-xs md:text-sm text-slate-500">
            CONSTRUVIDAS no solicita ni admite compras o contrataciones realizadas directamente por menores de edad sin la previa representación de sus progenitores.
          </p>
        </div>
      ),
    },
    {
      id: "limitacion-responsabilidad",
      number: "10",
      title: "Exención de Garantías y Limitación de Responsabilidad",
      keywords: ["responsabilidad", "garantías", "disponibilidad", "fallas", "internet"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS y TICSOFT S.A.S. realizan sus mayores esfuerzos para garantizar la disponibilidad continua, seguridad e integridad de la plataforma. No obstante, en la máxima medida permitida por la ley aplicable:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm">
            <li>La plataforma se provee &ldquo;tal cual&rdquo; (as is) y &ldquo;según disponibilidad&rdquo; (as available), sin garantías explícitas de que el servicio sea ininterrumpido o libre de errores derivados de fallas de telecomunicaciones ajenas a nuestro control.</li>
            <li>CONSTRUVIDAS no será responsable por daños indirectos, imprevistos o perjuicios ocasionados por interrupciones en los servicios de internet, ataques de ciberseguridad masivos o virus que afecten los dispositivos de los usuarios.</li>
            <li>Las orientaciones espirituales, prédicas y devocionales reflejan los principios de fe de la congregación y no sustituyen diagnósticos médicos, psicológicos, asesorías jurídicas o financieras profesionales.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "suspension-terminacion",
      number: "11",
      title: "Suspensión, Cancelación y Eliminación de Cuentas",
      keywords: ["suspensión", "cancelación", "eliminar cuenta", "terminación"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Facultad de Suspensión por la Iglesia:</strong> CONSTRUVIDAS se reserva el derecho de suspender temporal o definitivamente la cuenta de cualquier usuario que incumpla los presentes Términos, cometa actos inmorales o delictivos, intente vulnerar la seguridad del sistema o falte al respeto de los miembros de la congregación.
          </p>
          <p>
            <strong>Derecho de Cancelación por el Usuario:</strong> El Usuario puede solicitar el cierre y eliminación definitiva de su cuenta en cualquier instante, bien sea desde los ajustes de la aplicación móvil o escribiendo a nuestro WhatsApp oficial (+57 300 838 4014), conforme a lo detallado en nuestra <Link href="/privacy#eliminacion-cuenta" className="text-secondary-600 underline font-bold">Política de Supresión de Datos</Link>.
          </p>
        </div>
      ),
    },
    {
      id: "modificaciones-terminos",
      number: "12",
      title: "Modificación de los Términos y Condiciones",
      keywords: ["modificaciones", "actualización", "vigencia", "cambios"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS podrá revisar y actualizar estos Términos periódicamente para reflejar mejoras técnicas, nuevos servicios o ajustes regulatorios exigidos por las autoridades colombianas, Apple Inc. o Google LLC.
          </p>
          <p>
            Las actualizaciones entrarán en vigor a partir de su publicación en el servidor oficial. El uso continuo de la plataforma con posterioridad a la publicación constituirá la aceptación tácita de los Términos actualizados.
          </p>
        </div>
      ),
    },
    {
      id: "legislacion-jurisdiccion",
      number: "13",
      title: "Legislación Aplicable, Resolución de Controversias y Jurisdicción",
      keywords: ["ley aplicable", "jurisdicción", "sincelejo", "colombia", "tribunales"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Los presentes Términos y cualquier controversia o reclamación derivada de su interpretación, cumplimiento o validez se regirán e interpretarán exclusivamente conforme a las leyes de la <strong>República de Colombia</strong>.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs md:text-sm">
            <p className="font-bold text-slate-900">Arreglo Directo y Jurisdicción Competente:</p>
            <p className="text-slate-700">
              Las partes acuerdan acudir en primera instancia a mecanismos de solución amistosa y arreglo directo. De no ser posible un acuerdo, cualquier litigio será sometido a la jurisdicción ordinaria de los jueces y tribunales de la ciudad de <strong>Sincelejo, departamento de Sucre, República de Colombia</strong>, renunciando las partes a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500">
            <span><strong>Fecha de Entrada en Vigencia:</strong> 1 de Enero de 2026</span>
            <span><strong>Última Revisión y Actualización:</strong> Septiembre de 2026</span>
          </div>
        </div>
      ),
    },
  ];

  const filteredSections = searchQuery.trim() === ""
    ? sections
    : sections.filter((sec) => {
        const query = searchQuery.toLowerCase();
        return (
          sec.title.toLowerCase().includes(query) ||
          sec.keywords.some((k) => k.toLowerCase().includes(query))
        );
      });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-b from-primary-900 via-primary-800 to-primary-950 text-white pt-14 pb-20 px-4 relative overflow-hidden border-b border-primary-700/50">
        <div className="absolute inset-0 bg-[radial-gradient(#335fbb_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <Scale size={14} className="text-emerald-400" />
              Ley 1480 de 2011 (Colombia)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <ShieldCheck size={14} className="text-blue-300" />
              Apple App Store EULA Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <Smartphone size={14} className="text-secondary-300" />
              Google Play Developer Terms
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-white mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            Acuerdo y normativa de uso para la plataforma web oficial y las aplicaciones móviles oficiales (iOS y Android) de la <strong>IGLESIA CRISTIANA CONSTRUVIDAS</strong>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vigente y Actualizado a Septiembre de 2026</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div>Servidor Oficial: construvidas.org</div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div>WhatsApp Oficial: +57 300 838 4014</div>
          </div>
        </div>
      </section>

      {/* QUICK SUMMARY CARDS */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <FileCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Licencia</p>
              <p className="text-sm font-bold text-slate-900">Uso Personal</p>
              <p className="text-xs text-slate-500 mt-0.5">Acceso libre y formativo para el crecimiento de tu fe.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Comunidad</p>
              <p className="text-sm font-bold text-slate-900">Respeto Mutuo</p>
              <p className="text-xs text-slate-500 mt-0.5">Tolerancia cero contra contenido ofensivo o difamatorio.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ofrendas & Pagos</p>
              <p className="text-sm font-bold text-slate-900">Wompi Certificado</p>
              <p className="text-xs text-slate-500 mt-0.5">Transacciones seguras tokenizadas con certificación bancaria.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Copyright size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Propiedad</p>
              <p className="text-sm font-bold text-slate-900">Derechos Reservados</p>
              <p className="text-xs text-slate-500 mt-0.5">Materiales y devocionales propiedad de CONSTRUVIDAS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLES: BUSCADOR & BOTONES */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en los términos (ej. cursos, tienda, conducta)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
              title="Imprimir documento legal"
            >
              <Printer size={16} />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition border border-emerald-200"
              title="Chatear al WhatsApp Oficial de la Iglesia"
            >
              <MessageCircle size={16} className="text-emerald-600" />
              <span>WhatsApp: {WHATSAPP_NUMBER}</span>
            </a>
            <button
              onClick={handleCopyPhone}
              className="p-2 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              title="Copiar número de WhatsApp"
            >
              {copiedPhone ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR ÍNDICE INTERACTIVO */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-28 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contenido Legal</p>
              <h3 className="text-lg font-gobold text-slate-900 uppercase">Cláusulas de Uso</h3>
            </div>

            <nav className="space-y-1 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-primary-700 hover:bg-primary-50/60 transition group font-medium"
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-primary-600">
                      {sec.number}.
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <p className="font-bold text-slate-800">Canales de Contacto CONSTRUVIDAS</p>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span>Sincelejo, Sucre – Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-slate-400 shrink-0" />
                <span>https://construvidas.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-emerald-600 shrink-0" />
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-semibold hover:underline"
                >
                  WhatsApp: +57 300 838 4014
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/privacy"
                  className="text-secondary-600 hover:text-secondary-700 font-bold underline block"
                >
                  Ver Política de Privacidad y Datos →
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* SECCIONES Y CLÁUSULAS */}
        <main className="lg:col-span-8 space-y-8">
          {filteredSections.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <Info className="mx-auto text-slate-400 mb-3" size={32} />
              <p className="text-slate-800 font-bold text-base">No se encontraron cláusulas coincidentes</p>
              <p className="text-slate-500 text-sm mt-1">Prueba con otra palabra clave como &ldquo;cursos&rdquo;, &ldquo;tienda&rdquo; o &ldquo;conducta&rdquo;.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-xs font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-xl"
              >
                Ver todos los términos
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 font-mono text-xs font-bold flex items-center justify-center">
                    {sec.number}
                  </span>
                  <h2 className="text-lg sm:text-xl font-gobold uppercase text-slate-900 tracking-tight">
                    {sec.title}
                  </h2>
                </div>
                <div>{sec.content}</div>
              </article>
            ))
          )}

          {/* CONTACT CARD */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-gobold uppercase text-slate-900 tracking-tight">
              ¿Preguntas sobre los Términos de Uso?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Si tienes inquietudes sobre el funcionamiento de la plataforma web, la aplicación móvil, los cursos o la tienda, nuestro equipo pastoral y de soporte está disponible a través de nuestra línea oficial.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <MessageCircle size={16} />
                Escribir al WhatsApp (+57 300 838 4014)
              </a>
              <Link
                href="/privacy"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <ShieldCheck size={16} />
                Consultar Política de Privacidad
              </Link>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
