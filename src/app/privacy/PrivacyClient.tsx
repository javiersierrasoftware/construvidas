"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Printer,
  Search,
  ChevronRight,
  Smartphone,
  Globe,
  Lock,
  UserCheck,
  AlertTriangle,
  Phone,
  MapPin,
  Trash2,
  CheckCircle2,
  Info,
  Scale,
  CreditCard,
  Camera,
  Bell,
  HardDrive,
  MessageCircle,
  Copy
} from "lucide-react";

interface Section {
  id: string;
  number: string;
  title: string;
  keywords: string[];
  content: React.ReactNode;
}

export default function PrivacyClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(false);

  const WHATSAPP_NUMBER = "+57 300 838 4014";
  const WHATSAPP_LINK = "https://wa.me/573008384014";
  const WHATSAPP_DELETION_LINK =
    "https://wa.me/573008384014?text=Hola%20equipo%20de%20Construvidas%2C%20solicito%20la%20eliminaci%C3%B3n%20definitiva%20de%20mi%20cuenta%20y%20todos%20mis%20datos%20personales%20asociados.";

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
      id: "responsable",
      number: "01",
      title: "Identificación del Responsable y Encargado del Tratamiento",
      keywords: ["responsable", "ticsoft", "iglesia", "sincelejo", "contacto", "whatsapp"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            La presente Política de Privacidad y Tratamiento de Datos Personales regula la recolección, almacenamiento, uso, circulación, supresión y protección de la información personal suministrada por los feligreses, miembros, usuarios, donantes, alumnos y visitantes (en adelante, los <strong>&ldquo;Titulares&rdquo;</strong> o el <strong>&ldquo;Usuario&rdquo;</strong>) de la <strong>IGLESIA CRISTIANA CONSTRUVIDAS</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 my-4 text-sm">
            <div>
              <p className="font-bold text-slate-900 mb-1">Responsable del Tratamiento:</p>
              <p className="text-slate-700 font-medium">IGLESIA CRISTIANA CONSTRUVIDAS</p>
              <p className="text-slate-500">Entidad Religiosa legalmente constituida en Colombia</p>
              <p className="text-slate-500"><strong>Domicilio:</strong> Calle 17 N.º 30-48, Barrio Dulce Nombre, Sincelejo, Sucre – Colombia</p>
              <p className="text-slate-500"><strong>Canal Oficial / WhatsApp:</strong> +57 300 838 4014</p>
              <p className="text-slate-500"><strong>Portal Oficial:</strong> https://construvidas.org</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Desarrollador Tecnológico y Encargado:</p>
              <p className="text-slate-700 font-medium">TICSOFT S.A.S.</p>
              <p className="text-slate-500">Empresa de base tecnológica proveedora de infraestructura y desarrollo digital</p>
              <p className="text-slate-500"><strong>Sitio Web:</strong> www.ticsoft.co</p>
              <p className="text-slate-500"><strong>Rol:</strong> Encargado técnico de la infraestructura bajo instrucciones expresas de CONSTRUVIDAS.</p>
            </div>
          </div>
          <p>
            CONSTRUVIDAS actúa como <strong>Responsable del Tratamiento</strong> en los términos de la Ley 1581 de 2012 de Colombia y normas complementarias, definiendo de manera autónoma las finalidades y medios del tratamiento de datos personales.
          </p>
        </div>
      ),
    },
    {
      id: "ambito",
      number: "02",
      title: "Ámbito de Aplicación (Plataforma Web y Aplicaciones Móviles)",
      keywords: ["ámbito", "web", "aplicación móvil", "ios", "android", "apple", "google play", "servidor"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Esta política aplica de manera universal e indivisible a todos los canales, interfaces digitales y puntos de contacto provistos por CONSTRUVIDAS, entre los cuales se incluyen:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Sitio Web y Servidor Oficial:</strong> Portal institucional alojado en <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-semibold">https://construvidas.org</code> y cualquier dominio o subdominio oficial administrado por CONSTRUVIDAS.
            </li>
            <li>
              <strong>Aplicación Móvil iOS (Apple App Store):</strong> Aplicación oficial distribuida a través de la tienda de aplicaciones de Apple Inc.
            </li>
            <li>
              <strong>Aplicación Móvil Android (Google Play Store):</strong> Aplicación oficial distribuida a través de la tienda de aplicaciones de Google LLC.
            </li>
            <li>
              <strong>Sistemas y Canales Conexos:</strong> Formularios de inscripción a eventos, plataforma de cursos y discipulado, peticiones de oración, encuestas, pasarelas de donación y canales de mensajería autorizados.
            </li>
          </ul>
          <p>
            Al acceder, registrarse, descargar o utilizar cualquiera de estas plataformas, el Usuario declara haber leído, comprendido y aceptado de manera libre, previa, expresa e informada los términos de esta Política.
          </p>
        </div>
      ),
    },
    {
      id: "principios",
      number: "03",
      title: "Principios Rectores del Tratamiento de Datos",
      keywords: ["principios", "legalidad", "seguridad", "confidencialidad", "transparencia"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            En concordancia con la Ley Estatutaria 1581 de 2012 de Colombia y el Reglamento General de Protección de Datos (RGPD) de la Unión Europea, el tratamiento de datos personales en CONSTRUVIDAS se regirá bajo los siguientes principios inviolables:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">1. Legalidad</span>
              El tratamiento es una actividad reglada sujeta a la Constitución y las leyes vigentes.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">2. Finalidad</span>
              El tratamiento obedece a una finalidad legítima de acuerdo con la misión eclesiástica informada al titular.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">3. Libertad y Consentimiento</span>
              Los datos solo se tratan con el consentimiento previo, expreso e informado del Titular.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">4. Veracidad o Calidad</span>
              La información debe ser veraz, completa, exacta, actualizada, comprobable y comprensible.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">5. Transparencia</span>
              Se garantiza el derecho del Titular a obtener en cualquier momento información sobre sus datos.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">6. Acceso y Circulación Restringida</span>
              Los datos no podrán estar disponibles en internet o medios de divulgación masiva salvo autorización expresa.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">7. Seguridad</span>
              Se incorporan medidas técnicas, humanas y administrativas necesarias para evitar adulteración o pérdida.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">8. Confidencialidad</span>
              Todas las personas que intervengan en el tratamiento están obligadas a garantizar la reserva de los datos.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "datos-recopilados",
      number: "04",
      title: "Categorías de Datos Personales que Recopilamos",
      keywords: ["datos recopilados", "información personal", "registro", "correo", "perfil", "nombre"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            De acuerdo con las funciones de nuestra plataforma web y aplicación móvil, recopilamos las siguientes categorías de información:
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">A. Datos de Identificación y Contacto</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Nombres y apellidos completos, dirección de correo electrónico, número de teléfono móvil o WhatsApp, fotografía de perfil (opcional), ciudad o lugar de residencia, y fecha de nacimiento.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">B. Datos de Autenticación y Seguridad</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Contraseñas cifradas mediante algoritmos unidireccionales de alta seguridad (bcrypt/hash seguro), tokens de sesión protegidos, identificadores de cuenta y registros de accesos.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">C. Datos de Participación Ministerial y Formativa</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Inscripciones a cursos bíblicos y de formación espiritual, avance académico en lecciones, asistencia a eventos comunitarios, respuestas a encuestas internas voluntarias y vinculación a grupos de discipulado o servicio.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">D. Contenido Compartido por el Usuario (Testimonios y Comunidad)</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Fotografías, testimonios, historias o reflexiones espirituales que el Titular decida libremente cargar y publicar en la sección comunitaria de la plataforma.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900 text-sm mb-1">E. Datos Técnicos y del Dispositivo (App Móvil y Web)</h4>
              <p className="text-xs md:text-sm text-slate-600">
                Dirección IP, tipo de navegador web, modelo y sistema operativo del dispositivo móvil (iOS / Android), versión de la aplicación, identificador anónimo de dispositivo para notificaciones push (Push Token) y reportes de diagnóstico de fallas (crash logs) para optimización técnica.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "datos-sensibles",
      number: "05",
      title: "Tratamiento Especial de Datos Sensibles (Convicciones Religiosas)",
      keywords: ["datos sensibles", "religión", "fe", "creencias", "espiritual", "artículo 5 ley 1581"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div className="text-xs md:text-sm text-amber-900 leading-relaxed">
              <strong>Declaración Legal Obligatoria (Artículos 5 y 6, Ley 1581 de 2012):</strong> Se informa al Titular que las convicciones religiosas, filosóficas o de fe son catalogadas legalmente como <strong>Datos Sensibles</strong>. Por consiguiente, <u>ningún usuario está obligado en ninguna circunstancia a responder preguntas sobre datos sensibles ni a suministrar este tipo de información</u>.
            </div>
          </div>
          <p>
            En virtud del ejercicio legítimo de la libertad de cultos y asociación religiosa consagrada en el Artículo 19 de la Constitución Política de Colombia, el tratamiento de estos datos en CONSTRUVIDAS se regirá estrictamente por las siguientes condiciones:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Finalidad Exclusivamente Pastoral y Comunitaria:</strong> La información sobre la fe, peticiones de oración, bautismos, confirmaciones y membresía se procesa con el único propósito de orientar la labor pastoral, espiritual, formativa y el bienestar de la comunidad de creyentes.
            </li>
            <li>
              <strong>Prohibición Absoluta de Cesión o Comercialización:</strong> CONSTRUVIDAS no vende, no arrienda, no cede ni transfiere bajo ninguna modalidad información relacionada con las convicciones religiosas de sus feligreses a terceros para fines comerciales, publicitarios, políticos o de lucro.
            </li>
            <li>
              <strong>Confidencialidad y Reserva Pastoral:</strong> Las solicitudes de consejería, confesiones o peticiones de oración privadas gozan de la más estricta reserva espiritual y secreto profesional ministerial.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "menores",
      number: "06",
      title: "Protección Estricta de Niños, Niñas y Adolescentes (Menores de Edad)",
      keywords: ["menores", "niños", "infancia", "coppa", "escuela dominical", "tutores", "padres"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS reconoce la prevalencia absoluta de los derechos de los niños, niñas y adolescentes conforme a la Constitución Política, el Código de la Infancia y la Adolescencia (Ley 1098 de 2006 de Colombia), la Ley 1581 de 2012 y la Ley de Protección de la Privacidad Infantil en Internet (COPPA) de los Estados Unidos.
          </p>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Protocolo de Seguridad para Menores:</h4>
            <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
              <li>
                <strong>Autorización Obligatoria de Padres o Representantes Legales:</strong> Ningún menor de edad podrá registrarse de forma autónoma en la plataforma sin el consentimiento previo, expreso e informado de su padre, madre o tutor legal.
              </li>
              <li>
                <strong>Ministerio Infantil (ConstruVidas Kids):</strong> En actividades como escuela bíblica dominical, campamentos infantiles o eventos familiares, los datos de los menores (nombre, edad, alergias, contactos de emergencia) serán custodiados exclusivamente para velar por su seguridad física y médica durante las actividades eclesiásticas.
              </li>
              <li>
                <strong>Prohibición de Imágenes Públicas sin Consentimiento:</strong> No se publicarán fotografías ni videos en los que se identifique directamente a un menor de edad en la web ni en redes públicas sin la debida autorización escrita de sus representantes legales.
              </li>
              <li>
                <strong>Derecho de Cancelación Inmediata:</strong> Cualquier padre o tutor legal puede solicitar en cualquier momento la eliminación total e inmediata de los datos de su hijo o representado comunicándose directamente al WhatsApp oficial de la iglesia: <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-secondary-600 font-bold underline">+57 300 838 4014</a>.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "finalidades",
      number: "07",
      title: "Finalidades del Tratamiento de los Datos Personales",
      keywords: ["finalidades", "cursos", "eventos", "notificaciones", "pastoral", "devocional"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Los datos personales recolectados a través de la plataforma web y de las aplicaciones móviles para iOS y Android serán tratados para las siguientes finalidades legítimas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">1. Operación de Cuentas y Acceso</p>
              <p className="text-slate-600 text-xs md:text-sm">
                Creación y administración de perfiles de usuario, autenticación segura, recuperación de contraseñas y personalización de la experiencia en la aplicación.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">2. Edificación Espiritual y Formación</p>
              <p className="text-slate-600 text-xs md:text-sm">
                Entrega del devocional diario, gestión y seguimiento de cursos bíblicos, lecciones, evaluaciones y registro en grupos de discipulado y crecimiento en la fe.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">3. Gestión de Eventos y Comunidad</p>
              <p className="text-slate-600 text-xs md:text-sm">
                Inscripción, emisión de boletos o confirmaciones QR para asistencia a congresos, conferencias, cultos especiales y actividades de servicio comunitario.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">4. Notificaciones y Comunicaciones</p>
              <p className="text-slate-600 text-xs md:text-sm">
                Envío de recordatorios devocionales, novedades comunitarias, avisos de cursos y notificaciones push autorizadas por el Titular en su dispositivo móvil.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">5. Procesamiento de Donaciones y Pedidos</p>
              <p className="text-slate-600 text-xs md:text-sm">
                Gestión administrativa y contable de ofrendas voluntarias, donaciones eclesiásticas o compras de materiales formativos en la tienda en línea.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">6. Seguridad y Cumplimiento Legal</p>
              <p className="text-slate-600 text-xs md:text-sm">
                Detección y mitigación de fraudes, protección contra ataques informáticos, soporte técnico y cumplimiento de deberes legales ante autoridades competentes.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "permisos-moviles",
      number: "08",
      title: "Permisos Solicitados en la Aplicación Móvil (iOS y Android)",
      keywords: ["permisos", "apple", "google play", "cámara", "galería", "notificaciones", "almacenamiento"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            En estricto cumplimiento de las directrices de revisión de <strong>Apple App Store (Guideline 5.1.1)</strong> y las políticas para desarrolladores de <strong>Google Play Store (Data Safety Policy)</strong>, a continuación se detallan los permisos de hardware y software que la aplicación móvil puede requerir:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <Camera className="text-secondary-600 shrink-0 mt-1" size={22} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Cámara (Camera / NSCameraUsageDescription)</h4>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  <strong>Finalidad:</strong> Permite al usuario tomar fotografías en tiempo real para actualizar su foto de perfil, subir un testimonio/historia comunitaria o escanear códigos QR de acreditación en eventos presenciales.
                </p>
                <p className="text-xs text-slate-500 mt-1 italic">
                  * La cámara nunca es activada en segundo plano ni sin la interacción directa del usuario.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <HardDrive className="text-secondary-600 shrink-0 mt-1" size={22} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Fotos y Galería Multimedia (NSPhotoLibraryUsageDescription / READ_MEDIA_IMAGES)</h4>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  <strong>Finalidad:</strong> Permite al usuario seleccionar imágenes almacenadas en su dispositivo para asociarlas a su cuenta o compartirlas en la sección de historias/comunidad.
                </p>
                <p className="text-xs text-slate-500 mt-1 italic">
                  * La aplicación solo accede a las imágenes seleccionadas voluntariamente por el usuario.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <Bell className="text-secondary-600 shrink-0 mt-1" size={22} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Notificaciones Push (UserNotifications / POST_NOTIFICATIONS)</h4>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  <strong>Finalidad:</strong> Enviar recordatorios matutinos del devocional del día, alertas de eventos próximos, mensajes pastorales y actualizaciones sobre cursos activos.
                </p>
                <p className="text-xs text-slate-500 mt-1 italic">
                  * El usuario puede activar o desactivar este permiso en cualquier momento desde los ajustes del sistema de su teléfono.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <HardDrive className="text-secondary-600 shrink-0 mt-1" size={22} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Almacenamiento Local y Caché</h4>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  <strong>Finalidad:</strong> Guardar localmente textos de devocionales, estado de cursos y tokens de sesión para permitir una navegación rápida y el funcionamiento básico sin conexión a internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "pagos",
      number: "09",
      title: "Transacciones Financieras, Donaciones y Pasarela de Pagos (Wompi)",
      keywords: ["pagos", "donaciones", "wompi", "tarjetas", "bancolombia", "pci-dss"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Para la gestión de donaciones, ofrendas y pagos en la tienda en línea, CONSTRUVIDAS utiliza la infraestructura de pagos de <strong>Wompi</strong> (plataforma de pagos de Bancolombia):
          </p>
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <CreditCard size={18} />
              Certificación de Seguridad Bancaria y Estándar PCI-DSS
            </div>
            <p className="text-xs md:text-sm text-blue-950 leading-relaxed">
              <strong>CONSTRUVIDAS NO almacena, no captura ni tiene acceso en ningún momento a los números completos de tarjetas de crédito o débito, códigos de seguridad CVV ni contraseñas bancarias de los Titulares.</strong> Toda transacción es procesada directamente a través de conexiones seguras y cifradas con tokenización bancaria bajo el estándar internacional PCI-DSS Nivel 1.
            </p>
          </div>
          <p>
            Los únicos datos retenidos por CONSTRUVIDAS corresponden a la confirmación de la transacción suministrada por la pasarela (monto, fecha, código de referencia de la transacción, estado aprobado/rechazado) para fines de auditoría contable y emisión de recibos conforme a la ley tributaria de Colombia.
          </p>
        </div>
      ),
    },
    {
      id: "terceros",
      number: "10",
      title: "Terceros Encargados y Transferencia Internacional de Datos",
      keywords: ["terceros", "transferencia internacional", "servidores", "aws", "google", "cloud"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Para garantizar la alta disponibilidad, seguridad y rendimiento de la plataforma digital y aplicaciones móviles, CONSTRUVIDAS contrata servicios tecnológicos con proveedores de clase mundial que actúan como Encargados del Tratamiento:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm">
            <li>
              <strong>Infraestructura Web y Servidores:</strong> Servidores en la nube seguros con altos estándares de protección física y lógica.
            </li>
            <li>
              <strong>Bases de Datos y Almacenamiento Seguro:</strong> MongoDB Atlas y almacenamiento protegido para registros y contenidos multimedia de la iglesia.
            </li>
            <li>
              <strong>Servicios de Mensajería y Notificaciones:</strong> Servicios de mensajería transaccional y entrega de notificaciones push para dispositivos móviles (Apple Push Notification service - APNs y Firebase Cloud Messaging - FCM de Google).
            </li>
          </ul>
          <p>
            Todas las transferencias o transmisiones de datos se realizan bajo cláusulas estrictas de confidencialidad y protección de datos que garantizan niveles de seguridad equivalentes o superiores a los exigidos por la Ley 1581 de 2012 de Colombia y el RGPD de la Unión Europea.
          </p>
        </div>
      ),
    },
    {
      id: "seguridad",
      number: "11",
      title: "Medidas de Seguridad Técnicas, Físicas y Administrativas",
      keywords: ["seguridad", "cifrado", "https", "tls", "contraseñas", "protección"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS implementa una robusta arquitectura de defensa en profundidad para proteger los datos personales contra accesos no autorizados, pérdidas, adulteración o divulgación indebida:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-900 block mb-1">Cifrado en Tránsito (HTTPS/TLS)</span>
              Todas las comunicaciones entre la app móvil, el navegador web y nuestros servidores están cifradas mediante protocolos TLS 1.2 y TLS 1.3 con certificados SSL vigentes.
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-900 block mb-1">Cifrado de Credenciales</span>
              Las contraseñas de los usuarios se almacenan utilizando algoritmos de hashing criptográfico unidireccional con salado (salt) que impiden su lectura en texto plano.
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-900 block mb-1">Control de Accesos por Roles (RBAC)</span>
              Solo personal pastoral y técnico estrictamente autorizado tiene acceso a las bases de datos conforme a sus funciones institucionales.
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-900 block mb-1">Copias de Respaldo y Monitoreo</span>
              Copias de seguridad automáticas cifradas y monitoreo constante para prevenir accesos maliciosos e intrusiones no autorizadas.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "derechos",
      number: "12",
      title: "Derechos de los Titulares de los Datos (Habeas Data, RGPD y CCPA)",
      keywords: ["derechos", "habeas data", "arco", "acceso", "rectificación", "supresión", "ccpa"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            En virtud de la legislación colombiana (Ley 1581 de 2012), europea (RGPD) y estadounidense (CCPA/CPRA), el Titular de la información goza de los siguientes derechos fundamentales:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm">
            <li><strong>Derecho de Conocer y Acceder:</strong> Solicitar prueba de la autorización otorgada y consultar gratuitamente los datos personales que se encuentran en posesión de CONSTRUVIDAS.</li>
            <li><strong>Derecho de Actualizar y Rectificar:</strong> Solicitar la corrección de datos personales parciales, inexactos, incompletos, fraccionados o que induzcan a error.</li>
            <li><strong>Derecho de Supresión (Cancelación / Olvido):</strong> Solicitar la eliminación total de sus datos cuando considere que no están siendo tratados conforme a la ley o hayan dejado de ser necesarios.</li>
            <li><strong>Derecho de Revocación de la Autorización:</strong> Revocar en cualquier momento el consentimiento otorgado para el tratamiento de sus datos personales.</li>
            <li><strong>Derecho a no ser objeto de Venta de Datos (CCPA/CPRA):</strong> CONSTRUVIDAS garantiza expresamente que no comercializa ni vende datos personales bajo ninguna figura ni beneficio económico.</li>
            <li><strong>Derecho de Presentar Quejas ante la Autoridad de Control:</strong> Acudir ante la Superintendencia de Industria y Comercio (SIC) de Colombia o la autoridad de protección de datos de su jurisdicción si considera vulnerados sus derechos.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "procedimiento-pqrs",
      number: "13",
      title: "Procedimiento para el Ejercicio de Derechos (PQRS de Datos)",
      keywords: ["procedimiento", "pqrs", "plazos", "10 días", "15 días", "solicitud", "sic", "whatsapp"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Para ejercer cualquiera de sus derechos de Habeas Data, el Titular o su representante deberá comunicarse a través de nuestro canal oficial:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
            <p className="font-bold text-slate-900 mb-1">Canal Oficial de Atención de Datos de la Iglesia:</p>
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-emerald-600" />
              <p className="text-slate-800 font-semibold">
                WhatsApp Oficial:{" "}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline"
                >
                  +57 300 838 4014
                </a>
              </p>
            </div>
            <p className="text-slate-600 text-xs">
              <strong>Dirección Física:</strong> Calle 17 N.º 30-48, Dulce Nombre, Sincelejo, Sucre – Colombia
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Indique en su mensaje: Nombre completo, número de documento de identidad y descripción clara de su solicitud (consulta, actualización o eliminación de datos).
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-white border-l-4 border-secondary-500 rounded-r-xl shadow-sm text-xs md:text-sm">
              <span className="font-bold text-slate-900 block">Término Legal para Consultas (10 Días Hábiles):</span>
              Las consultas sobre qué datos reposan en nuestras bases de datos serán atendidas en un plazo máximo de diez (10) días hábiles contados a partir de la fecha de recibo. Si no fuere posible atenderla dentro de dicho término, se informará al interesado los motivos y la fecha de respuesta, la cual no superará cinco (5) días hábiles adicionales.
            </div>
            <div className="p-3.5 bg-white border-l-4 border-primary-500 rounded-r-xl shadow-sm text-xs md:text-sm">
              <span className="font-bold text-slate-900 block">Término Legal para Reclamos, Correcciones o Supresión (15 Días Hábiles):</span>
              Los reclamos para corrección, actualización o supresión de datos serán atendidos en un término máximo de quince (15) días hábiles. Si existieren deficiencias en la solicitud, se requerirá al peticionario dentro de los cinco (5) días siguientes para que subsane las fallas.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "eliminacion-cuenta",
      number: "14",
      title: "Política y Mecanismo de Eliminación de Cuenta y Supresión de Datos",
      keywords: ["eliminación de cuenta", "borrar cuenta", "google play policy", "apple guideline 5.1.1(v)", "eliminar perfil", "whatsapp"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm mb-1">
              <Trash2 size={18} />
              Requerimiento Obligatorio de Apple App Store y Google Play Store
            </div>
            <p className="text-xs md:text-sm text-red-800 leading-relaxed">
              En cumplimiento estricto de las directrices de <strong>Apple (Guideline 5.1.1(v))</strong> y <strong>Google Play (Account Deletion Requirement)</strong>, todo usuario que cree una cuenta en CONSTRUVIDAS tiene el derecho incondicional a eliminar su cuenta y todos sus datos personales asociados, tanto dentro de la aplicación móvil como a través de este portal web público, sin necesidad de tener la app instalada.
            </p>
          </div>

          <h4 className="font-bold text-slate-900 text-sm">Métodos Disponibles para Eliminar su Cuenta:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs md:text-sm">
                <Smartphone size={18} className="text-secondary-600" />
                Opción 1: Desde la Aplicación Móvil
              </div>
              <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-1">
                <li>Abra la App Móvil de <strong>CONSTRUVIDAS</strong> en su iPhone o Android.</li>
                <li>Inicie sesión y diríjase a la pestaña <strong>&ldquo;Perfil&rdquo;</strong> o <strong>&ldquo;Ajustes&rdquo;</strong>.</li>
                <li>Haga clic en la opción <strong>&ldquo;Seguridad de la Cuenta&rdquo;</strong>.</li>
                <li>Seleccione el botón <strong>&ldquo;Eliminar mi Cuenta y Datos&rdquo;</strong> y confirme la acción.</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs md:text-sm">
                <MessageCircle size={18} className="text-emerald-600" />
                Opción 2: Vía WhatsApp Oficial de la Iglesia
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Escriba directamente a la línea oficial de atención de la iglesia:
              </p>
              <a
                href={WHATSAPP_DELETION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
              >
                <MessageCircle size={14} />
                Abrir Chat de WhatsApp (+57 300 838 4014)
              </a>
              <p className="text-[11px] text-slate-500 mt-1">
                Envíe el mensaje solicitando la eliminación de cuenta indicando su nombre completo y el correo registrado. Su solicitud será procesada de manera prioritaria.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs md:text-sm space-y-2">
            <h5 className="font-bold text-slate-900">¿Qué información se elimina de forma inmediata y permanente?</h5>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Credenciales de acceso, contraseñas y tokens de sesión.</li>
              <li>Fotografía de perfil y datos biográficos de contacto.</li>
              <li>Historial de lecciones de cursos, encuestas y avances espirituales.</li>
              <li>Historias, comentarios y testimonios subidos a la sección comunitaria.</li>
            </ul>
            <p className="text-[11px] text-slate-500 italic pt-1">
              * Nota legal: Los registros de pagos u ofrendas procesadas se conservarán de forma anonimizada y estrictamente por el plazo que mande la legislación fiscal y contable de Colombia (DIAN), tras lo cual serán igualmente purgados.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "cookies",
      number: "15",
      title: "Uso de Cookies y Tecnologías de Almacenamiento Local",
      keywords: ["cookies", "rastreo", "localstorage", "sesión", "navegador"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            El portal web y las aplicaciones de CONSTRUVIDAS utilizan cookies técnicas y almacenamiento local (LocalStorage / SessionStorage) con los siguientes objetivos:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm">
            <li><strong>Cookies Estrictamente Necesarias:</strong> Permiten mantener iniciada la sesión del usuario de forma segura, gestionar el carrito de donaciones o tienda y garantizar la navegación protegida contra falsificación de peticiones (CSRF).</li>
            <li><strong>Cookies de Preferencia:</strong> Recuerdan configuraciones de interfaz como idioma y tamaño de tipografía.</li>
            <li><strong>Cookies Analíticas Anónimas:</strong> Miden el rendimiento de las páginas y la concurrencia en transmisiones en vivo sin vincular identidades de navegación directa.</li>
          </ul>
          <p className="text-xs md:text-sm">
            El usuario puede bloquear o eliminar las cookies en cualquier momento ajustando la configuración de su navegador web. Tenga en cuenta que deshabilitar cookies esenciales puede impedir el inicio de sesión y la funcionalidad de ciertas áreas privadas de la plataforma.
          </p>
        </div>
      ),
    },
    {
      id: "modificaciones",
      number: "16",
      title: "Modificaciones y Actualizaciones a la Política de Privacidad",
      keywords: ["modificaciones", "actualización", "cambios", "vigencia"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            CONSTRUVIDAS se reserva el derecho de modificar o actualizar esta Política de Privacidad en cualquier momento para adaptarla a cambios regulatorios, normativas de las tiendas de aplicaciones o nuevas funcionalidades del servicio.
          </p>
          <p>
            Cuando se implementen cambios sustanciales en las finalidades del tratamiento o en los derechos de los usuarios, se notificará a través de un aviso destacado en el portal web o mediante una notificación push a los usuarios registrados antes de que la modificación entre en vigor.
          </p>
        </div>
      ),
    },
    {
      id: "autoridad",
      number: "17",
      title: "Autoridad de Control, Legislación Aplicable y Jurisdicción",
      keywords: ["autoridad de control", "sic", "colombia", "sincelejo", "jurisdicción"],
      content: (
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            Esta Política de Privacidad y el tratamiento de datos personales se rigen de manera primaria e integral por las leyes de la <strong>República de Colombia</strong>.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs md:text-sm">
            <p className="font-bold text-slate-900">Autoridad Nacional de Vigilancia:</p>
            <p className="text-slate-700">
              Superintendencia de Industria y Comercio (SIC) — Delegatura para la Protección de Datos Personales
            </p>
            <p className="text-slate-500">Sitio Web Oficial: <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-secondary-600 underline font-semibold">www.sic.gov.co</a></p>
            <p className="text-slate-500">Bogotá D.C., Colombia</p>
          </div>
          <p>
            Cualquier controversia no resuelta a través del procedimiento de reclamos interno será sometida a la jurisdicción ordinaria de la República de Colombia, teniendo como domicilio principal la ciudad de Sincelejo, Sucre.
          </p>
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500">
            <span><strong>Fecha de Entrada en Vigencia:</strong> 1 de Enero de 2026</span>
            <span><strong>Última Actualización y Revisión Legal:</strong> Septiembre de 2026</span>
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
          {/* BADGES CERTIFICACIÓN */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <ShieldCheck size={14} className="text-emerald-400" />
              Ley 1581 de 2012 (Colombia)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <Scale size={14} className="text-blue-300" />
              RGPD / GDPR & CCPA Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <Smartphone size={14} className="text-secondary-300" />
              Apple App Store & Google Play Compliant
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-white mb-4">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            Documento vinculante de protección de datos para la plataforma web y las aplicaciones móviles oficiales (iOS y Android) de la <strong>IGLESIA CRISTIANA CONSTRUVIDAS</strong>.
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
              <Lock size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Seguridad</p>
              <p className="text-sm font-bold text-slate-900">Cifrado Bancario TLS</p>
              <p className="text-xs text-slate-500 mt-0.5">Tus datos viajan 100% encriptados de extremo a extremo.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Privacidad</p>
              <p className="text-sm font-bold text-slate-900">Cero Venta de Datos</p>
              <p className="text-xs text-slate-500 mt-0.5">Nunca vendemos ni cedemos tu información a terceros con fines comerciales.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Transacciones</p>
              <p className="text-sm font-bold text-slate-900">PCI-DSS Wompi</p>
              <p className="text-xs text-slate-500 mt-0.5">No almacenamos datos de tarjetas de crédito o cuentas bancarias.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Trash2 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tus Derechos</p>
              <p className="text-sm font-bold text-slate-900">Borrado de Cuenta</p>
              <p className="text-xs text-slate-500 mt-0.5">Puedes eliminar tu cuenta y datos en cualquier momento desde la app o web.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALLOUT ELIMINACIÓN DE CUENTA (MANDATORIO PARA APPLE & GOOGLE PLAY) */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-primary-950 text-white p-6 md:p-8 rounded-3xl shadow-lg border border-red-900/40 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30 mb-4">
              <Trash2 size={14} />
              Centro de Eliminación de Cuenta y Datos (Google Play & Apple Compliant)
            </div>
            <h2 className="text-xl md:text-2xl font-gobold uppercase tracking-wide mb-2">
              ¿Deseas eliminar tu cuenta de Construvidas y tus datos personales?
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
              Tienes el derecho incondicional a darte de baja. Puedes solicitar la supresión inmediata de tu usuario, credenciales, historial de cursos, fotos de perfil y testimonios sin necesidad de reinstalar la aplicación.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_DELETION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Solicitar Eliminación vía WhatsApp (+57 300 838 4014)
              </a>
              <a
                href="#eliminacion-cuenta"
                className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs md:text-sm px-4 py-2.5 rounded-xl transition border border-white/20 flex items-center gap-2"
              >
                <Info size={16} />
                Ver Pasos dentro de la App Móvil
              </a>
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
              placeholder="Buscar en la política (ej. cámara, menores, wompi)..."
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
              <h3 className="text-lg font-gobold text-slate-900 uppercase">Tabla de Cláusulas</h3>
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
              <p className="font-bold text-slate-800">Oficina de Datos CONSTRUVIDAS</p>
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
            </div>
          </div>
        </aside>

        {/* SECCIONES Y CLÁUSULAS */}
        <main className="lg:col-span-8 space-y-8">
          {filteredSections.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <Info className="mx-auto text-slate-400 mb-3" size={32} />
              <p className="text-slate-800 font-bold text-base">No se encontraron cláusulas coincidentes</p>
              <p className="text-slate-500 text-sm mt-1">Prueba con otra palabra clave como &ldquo;cámara&rdquo;, &ldquo;cuenta&rdquo;, &ldquo;pagos&rdquo; o &ldquo;menores&rdquo;.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-xs font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-xl"
              >
                Ver todas las cláusulas
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

          {/* CONTACT FOOTER CARD */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-gobold uppercase text-slate-900 tracking-tight">
              ¿Dudas o Reclamaciones sobre tus Datos Personales?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nuestro equipo pastoral y administrativo está a tu completa disposición para atender cualquier solicitud, aclaración o trámite relacionado con tus derechos de Habeas Data bajo la Ley 1581 de 2012 de la República de Colombia o normativas internacionales.
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
              <a
                href="tel:+573008384014"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <Phone size={16} />
                Llamar a +57 300 838 4014
              </a>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
