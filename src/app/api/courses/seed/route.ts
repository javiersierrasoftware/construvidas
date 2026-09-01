import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { slugify } from "@/lib/slugs";

export async function POST() {
  try {
    await connectDB();

    const existingCount = await Course.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({
        message: "Ya existen cursos en la base de datos.",
        count: existingCount,
      });
    }

    const initialCourses = [
      {
        title: "Escuela de Vida: Fundamentos de la Fe",
        slug: slugify("Escuela de Vida: Fundamentos de la Fe"),
        description: "Un curso esencial para todo discípulo que desea edificar su vida sobre la roca firme de Jesucristo. Aprenderás las verdades fundamentales del evangelio, la oración y la vida en el Espíritu.",
        coverImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
        category: "Fundamentos",
        level: "Principiante",
        isPublished: true,
        modules: [
          {
            title: "Módulo 1: Conociendo a Dios y Su Gracia",
            description: "Descubre el amor incondicional del Padre y la salvación provista en Jesucristo.",
            order: 1,
            lessons: [
              {
                title: "Tema 1.1: El Gran Amor del Padre y la Salvación",
                content: "El discipulado comienza con una comprensión clara del amor incondicional de Dios hacia cada uno de nosotros. A través de la cruz, fuimos perdonados y adoptados como hijos amados.",
                videoUrl: "https://www.youtube.com/embed/bpijnYPO_JQ",
                bibleVerses: [
                  {
                    reference: "Juan 3:16",
                    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
                  },
                  {
                    reference: "Efesios 2:8-9",
                    text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe."
                  }
                ],
                materials: [
                  {
                    title: "Guía de Lectura - El Plan de Salvación (PDF)",
                    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    type: "PDF"
                  }
                ],
                quizzes: [
                  {
                    question: "¿Cómo recibimos la salvación según Efesios 2:8-9?",
                    options: [
                      "Por nuestras buenas obras",
                      "Por gracia mediante la fe en Jesucristo",
                      "Cumpliendo ritos tradicionales",
                      "Pagando una membresía"
                    ],
                    correctOptionIndex: 1,
                    explanation: "La Biblia enseña que la salvación es un regalo inmerecido (gracia) que recibimos al depositar nuestra fe en Cristo."
                  }
                ],
                order: 1
              },
              {
                title: "Tema 1.2: El Poder de la Oración Diaria",
                content: "La oración no es una rutina religiosa, sino una conversación íntima y constante con Dios. Jesús nos enseñó el modelo de oración en el Padre Nuestro para desarrollar comunión diaria.",
                videoUrl: "https://www.youtube.com/embed/VHDeGaQA07A",
                bibleVerses: [
                  {
                    reference: "Mateo 6:6",
                    text: "Mas tú, cuando ores, entra en tu aposento, y cerrada la puerta, ora a tu Padre que está en secreto; y tu Padre que ve en lo secreto te recompensará en público."
                  },
                  {
                    reference: "1 Tesalonicenses 5:17",
                    text: "Orad sin cesar."
                  }
                ],
                materials: [
                  {
                    title: "Devocional - 7 Días de Oración Activa",
                    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    type: "LECTURA"
                  }
                ],
                quizzes: [
                  {
                    question: "¿Cuál es el propósito principal de la oración?",
                    options: [
                      "Conectar en comunión íntima con el Padre celestial",
                      "Pedir objetos materiales en abundancia",
                      "Repetir frases sin sentido",
                      "Impresionar a las demás personas"
                    ],
                    correctOptionIndex: 0,
                    explanation: "La oración cultiva nuestra relación personal con Dios Padre y nos alinea a su buena voluntad."
                  }
                ],
                order: 2
              }
            ]
          },
          {
            title: "Módulo 2: Creciendo en la Palabra y Comunidad",
            description: "Aprende a meditar en las Escrituras e integrarte en la vida comunitaria a través de las Casas de Vida.",
            order: 2,
            lessons: [
              {
                title: "Tema 2.1: La Biblia como Lámpara para tus Pasos",
                content: "La Palabra de Dios es viva y eficaz. Es nuestro alimento espiritual diario que transforma nuestros pensamientos y guía nuestras decisiones cotidianas.",
                videoUrl: "https://www.youtube.com/embed/bpijnYPO_JQ",
                bibleVerses: [
                  {
                    reference: "Salmos 119:105",
                    text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
                  },
                  {
                    reference: "2 Timoteo 3:16-17",
                    text: "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia."
                  }
                ],
                materials: [
                  {
                    title: "Plan Anual de Lectura Bíblica",
                    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    type: "DOCUMENTO"
                  }
                ],
                quizzes: [
                  {
                    question: "¿Qué papel cumple la Escritura en la vida del creyente?",
                    options: [
                      "Es una colección de historias antiguas sin relevancia hoy",
                      "Es inspirada por Dios y útil para enseñar, corregir e instruir",
                      "Solo sirve para memorizar pasajes bíblicos",
                      "Es un libro puramente filosófico"
                    ],
                    correctOptionIndex: 1,
                    explanation: "La Palabra inspirada por Dios capacita y perfecciona al seguidor de Cristo para toda buena obra."
                  }
                ],
                order: 1
              }
            ]
          }
        ]
      },
      {
        title: "Discipulado y Liderazgo Transformador",
        slug: slugify("Discipulado y Liderazgo Transformador"),
        description: "Desarrolla tus dones espirituales y capacidad de servicio para multiplicar el reino de Dios y liderar Casas de Vida con integridad y amor.",
        coverImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop",
        category: "Liderazgo",
        level: "Intermedio",
        isPublished: true,
        modules: [
          {
            title: "Módulo 1: El Corazón del Servidor",
            description: "Principios del liderazgo al estilo de Jesús: servir antes de ser servido.",
            order: 1,
            lessons: [
              {
                title: "Tema 1.1: El Liderazgo de Servicio",
                content: "Jesús redefinió el concepto de grandeza al lavar los pies de sus discípulos. El auténtico líder cristiano busca el bien de los demás y modela el amor de Cristo.",
                videoUrl: "https://www.youtube.com/embed/VHDeGaQA07A",
                bibleVerses: [
                  {
                    reference: "Marcos 10:45",
                    text: "Porque el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos."
                  }
                ],
                materials: [
                  {
                    title: "Manual de Liderazgo Servidor",
                    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    type: "PDF"
                  }
                ],
                quizzes: [
                  {
                    question: "¿Cuál es el distintivo fundamental del líder seguidor de Cristo?",
                    options: [
                      "Tener autoridad y poder sobre otros",
                      "El espíritu de servicio y amor incondicional",
                      "Tener muchos títulos académicos",
                      "No equivocarse jamás"
                    ],
                    correctOptionIndex: 1,
                    explanation: "Jesús enseñó que el mayor entre todos debe ser el servidor de todos."
                  }
                ],
                order: 1
              }
            ]
          }
        ]
      }
    ];

    const createdCourses = await Course.insertMany(initialCourses);

    return NextResponse.json({
      message: "Cursos iniciales sembrados con éxito",
      count: createdCourses.length,
      courses: createdCourses,
    });
  } catch (error: any) {
    console.error("🔴 Error POST /api/courses/seed:", error);
    return NextResponse.json(
      { message: "Error al sembrar cursos", error: error.message },
      { status: 500 }
    );
  }
}
