import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const SITE_URL = process.env.NEXTAUTH_URL || "https://construvidas.org";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"CONSTRUVIDAS Iglesia Cristiana" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email sent: %s to %s", info.messageId, to);
    return info;
  } catch (error) {
    console.error("❌ Error sending email to %s:", to, error);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* PLANTILLA BASE HTML INSTITUCIONAL                                          */
/* -------------------------------------------------------------------------- */
function getEmailWrapper(contentHtml: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CONSTRUVIDAS</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f8fafc; padding: 30px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              
              <!-- HEADER CONSTRUVIDAS -->
              <tr>
                <td align="center" style="background-color: #0f172a; padding: 30px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">
                    CONSTRUVIDAS
                  </h1>
                  <span style="color: #38bdf8; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; display: block; margin-top: 4px;">
                    Iglesia Cristiana
                  </span>
                </td>
              </tr>

              <!-- CONTENIDO PRINCIPAL -->
              <tr>
                <td style="padding: 40px 30px; font-size: 15px; line-height: 1.6; color: #334155;">
                  ${contentHtml}
                </td>
              </tr>

              <!-- FOOTER INSTITUCIONAL -->
              <tr>
                <td style="background-color: #f1f5f9; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
                  <p style="margin: 0 0 8px 0; font-weight: 600; color: #0f172a;">Iglesia Cristiana CONSTRUVIDAS</p>
                  <p style="margin: 0 0 12px 0;">Edificando vidas sobre el fundamento firme de Jesucristo.</p>
                  <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                    Este es un correo automático de notificación. Si deseas comunicarte con nosotros, escríbenos a nuestro equipo de discipulado.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/* -------------------------------------------------------------------------- */
/* 1. CORREO DE BIENVENIDA AL REGISTRARSE                                     */
/* -------------------------------------------------------------------------- */
export async function sendWelcomeEmail(to: string, name: string) {
  const subject = "¡Bienvenido a la familia CONSTRUVIDAS! ⛪✨";
  
  const content = `
    <h2 style="color: #0f172a; font-size: 22px; font-weight: 800; margin-top: 0; text-transform: uppercase;">
      ¡Hola, ${name}!
    </h2>
    <p style="margin-bottom: 20px;">
      ¡Nos alegra profundamente darte la bienvenida a la plataforma digital de la <strong>Iglesia Cristiana CONSTRUVIDAS</strong>!
    </p>
    <p style="margin-bottom: 20px;">
      Creemos que tu vida tiene un propósito divino y queremos acompañarte en cada paso de tu crecimiento espiritual y conocimiento de la Palabra de Dios.
    </p>

    <!-- CAJA DE RECURSOS DESTACADOS -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #0284c7; margin-top: 0; font-size: 15px; font-weight: 700; text-transform: uppercase;">
        Lo que encontrarás disponible hoy:
      </h3>
      <ul style="margin: 10px 0; padding-left: 20px; color: #475569;">
        <li style="margin-bottom: 8px;"><strong>Devocionales Diarios:</strong> Alimento espiritual y reflexiones frescas cada día.</li>
        <li style="margin-bottom: 8px;"><strong>Plataforma Virtual de Formación (LMS):</strong> Cursos bíblicos interactivos, videos y evaluaciones.</li>
        <li style="margin-bottom: 8px;"><strong>Casas de Vida y Eventos:</strong> Integración en grupos pequeños y actividades familiares.</li>
      </ul>
    </div>

    <!-- BOTONES DE ACCIÓN -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${SITE_URL}/cursos" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin: 5px;">
        Explorar Cursos
      </a>
      <a href="${SITE_URL}/devocionales" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin: 5px;">
        Leer Devocional de Hoy
      </a>
    </div>

    <p style="margin-top: 30px; font-style: italic; color: #64748b;">
      «Por tanto, id, y haced discípulos a todas las naciones...» — Mateo 28:19
    </p>

    <p style="margin-top: 25px; margin-bottom: 0;">
      Con mucho afecto,<br>
      <strong>El Equipo Pastoral y de Discipulado CONSTRUVIDAS</strong>
    </p>
  `;

  return sendEmail({ to, subject, html: getEmailWrapper(content) });
}

/* -------------------------------------------------------------------------- */
/* 2. NOTIFICACIÓN DE NUEVO DEVOCIONAL PUBLICADO                               */
/* -------------------------------------------------------------------------- */
export async function sendNewDevotionalEmail({
  to,
  name,
  title,
  reference,
  verseText,
  reflectionSnippet,
  devotionalUrl,
}: {
  to: string;
  name: string;
  title: string;
  reference: string;
  verseText: string;
  reflectionSnippet: string;
  devotionalUrl: string;
}) {
  const subject = `📖 Devocional del Día: ${title}`;

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="background-color: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
        Palabra del Día
      </span>
    </div>

    <h2 style="color: #0f172a; font-size: 22px; font-weight: 800; margin-top: 0; text-align: center; text-transform: uppercase; line-height: 1.3;">
      ${title}
    </h2>

    <p style="color: #475569; font-size: 14px; text-align: center;">Hola, <strong>${name}</strong>. Aquí tienes la reflexión bíblica para hoy:</p>

    <!-- CAJA VERSÍCULO CLAVE -->
    <div style="background-color: #0f172a; color: #ffffff; border-radius: 16px; padding: 24px; margin: 25px 0; border: 1px solid #1e293b;">
      <span style="color: #38bdf8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">
        📖 ${reference}
      </span>
      <p style="font-family: Georgia, serif; font-style: italic; font-size: 16px; margin: 0; line-height: 1.5; color: #f1f5f9;">
        «${verseText}»
      </p>
    </div>

    <!-- RESUMEN DE LA REFLEXIÓN -->
    <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
      ${reflectionSnippet}
    </p>

    <!-- BOTÓN DE LECTURA COMPLETA -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${devotionalUrl}" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
        Leer Devocional Completo y Oración
      </a>
    </div>
  `;

  return sendEmail({ to, subject, html: getEmailWrapper(content) });
}

/* -------------------------------------------------------------------------- */
/* 3. CONFIRMACIÓN DE INSCRIPCIÓN A UN CURSO                                  */
/* -------------------------------------------------------------------------- */
export async function sendCourseEnrollmentEmail({
  to,
  name,
  courseTitle,
  courseUrl,
}: {
  to: string;
  name: string;
  courseTitle: string;
  courseUrl: string;
}) {
  const subject = `🎓 Inscripción Confirmada: ${courseTitle}`;

  const content = `
    <h2 style="color: #0f172a; font-size: 22px; font-weight: 800; margin-top: 0; text-transform: uppercase;">
      ¡Inscripción Exitosa!
    </h2>
    <p style="margin-bottom: 20px;">
      Hola <strong>${name}</strong>, te has inscrito exitosamente al programa de formación cristiana:
    </p>

    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #15803d; margin: 0 0 8px 0; font-size: 18px; font-weight: 800; text-transform: uppercase;">
        ${courseTitle}
      </h3>
      <p style="margin: 0; color: #166534; font-size: 13px; font-weight: 600;">
        Plataforma Virtual de Formación en Cristo — CONSTRUVIDAS
      </p>
    </div>

    <p style="margin-bottom: 25px;">
      Ya puedes acceder al Aula Virtual para ver los módulos, videos de enseñanza, pasajes bíblicos y resolver tus evaluaciones de avance.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${courseUrl}" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
        Ingresar al Aula Virtual
      </a>
    </div>
  `;

  return sendEmail({ to, subject, html: getEmailWrapper(content) });
}

/* -------------------------------------------------------------------------- */
/* 4. COMUNICADO O RECORDATORIO DE CURSO (ADMIN BROADCAST)                     */
/* -------------------------------------------------------------------------- */
export async function sendCourseReminderEmail({
  to,
  name,
  courseTitle,
  subject,
  message,
  courseUrl,
}: {
  to: string;
  name: string;
  courseTitle: string;
  subject: string;
  message: string;
  courseUrl: string;
}) {
  const content = `
    <div style="margin-bottom: 20px;">
      <span style="background-color: #fef3c7; color: #92400e; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
        Notificación de Curso: ${courseTitle}
      </span>
    </div>

    <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin-top: 0; text-transform: uppercase;">
      ${subject}
    </h2>

    <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">Hola <strong>${name}</strong>,</p>

    <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 20px; border-radius: 8px; margin: 20px 0; color: #334155; font-size: 15px; line-height: 1.6;">
      ${message.replace(/\n/g, "<br/>")}
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${courseUrl}" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
        Ir al Curso en la Plataforma
      </a>
    </div>
  `;

  return sendEmail({ to, subject: `📢 [${courseTitle}] ${subject}`, html: getEmailWrapper(content) });
}

/* -------------------------------------------------------------------------- */
/* CORREOS EXISTENTES DE EVENTOS Y TIENDA                                      */
/* -------------------------------------------------------------------------- */
export async function sendEventRegistrationEmail(
  to: string,
  name: string,
  eventName: string,
  details: { distance?: string; category?: string; transactionId: string }
) {
  const subject = `Inscripción Confirmada: ${eventName}`;
  const content = `
    <h2 style="color: #15803d; font-size: 22px; font-weight: 800; margin-top: 0; text-transform: uppercase;">
      ¡Inscripción Confirmada!
    </h2>
    <p>Hola <strong>${name}</strong>,</p>
    <p>Tu inscripción al evento <strong>${eventName}</strong> ha sido registrada con éxito.</p>
    <div style="background-color: #f8fafc; padding: 15px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 5px 0;"><strong>Distancia:</strong> ${details.distance || "N/A"}</p>
      <p style="margin: 5px 0;"><strong>Categoría:</strong> ${details.category || "N/A"}</p>
      <p style="margin: 5px 0;"><strong>Referencia de pago:</strong> ${details.transactionId}</p>
    </div>
  `;
  return sendEmail({ to, subject, html: getEmailWrapper(content) });
}

export async function sendOrderConfirmationEmail(
  to: string,
  name: string,
  orderId: string,
  products: { name: string; qty: number; price: number }[]
) {
  const subject = `Confirmación de Compra #${orderId.slice(-6)}`;
  const productRows = products
    .map(
      (p) =>
        `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${p.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">${p.qty}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${p.price.toLocaleString()}</td>
        </tr>`
    )
    .join("");

  const total = products.reduce((acc, p) => acc + p.price * p.qty, 0);

  const content = `
    <h2 style="color: #0284c7; font-size: 22px; font-weight: 800; margin-top: 0; text-transform: uppercase;">
      ¡Gracias por tu pedido!
    </h2>
    <p>Hola <strong>${name}</strong>, tu compra ha sido confirmada:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 10px; text-align: left;">Producto</th>
          <th style="padding: 10px; text-align: center;">Cant.</th>
          <th style="padding: 10px; text-align: right;">Precio</th>
        </tr>
      </thead>
      <tbody>
        ${productRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding: 12px 10px; text-align: right; font-weight: bold;">Total:</td>
          <td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #0284c7;">$${total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
  `;
  return sendEmail({ to, subject, html: getEmailWrapper(content) });
}
