import { Article } from '../types';

export const articles: Article[] = [
  {
    id: '1',
    title: 'Qatar Airways Expande Horizontes',
    subtitle: 'Una nueva ruta estratégica que conecta el corazón de España con la vibrante capital de Colombia.',
    author: 'Elena Fisher',
    date: '14 de Octubre, 2023',
    imageUrl: 'https://picsum.photos/1200/600?random=1',
    content: `En un movimiento audaz para fortalecer los lazos entre Europa y América del Sur, Qatar Airways ha anunciado el lanzamiento de una ruta directa que conecta Madrid y Bogotá. Se espera que este nuevo corredor impulse significativamente el turismo y el comercio.

"Creemos que esta conexión abrirá nuevas puertas para el intercambio cultural", declaró Akbar Al Baker, el ex CEO de la aerolínea, enfatizando la importancia estratégica del Aeropuerto Internacional El Dorado como un centro regional.

Los viajeros pueden esperar que el moderno Airbus A350-1000 preste servicio en esta ruta, ofreciendo una comodidad inigualable. La expansión se alinea con la creciente demanda de viajes de lujo en la región de LATAM.`,
    interactiveTerms: [
      'Qatar Airways',
      'Madrid',
      'Bogotá',
      'Akbar Al Baker',
      'Aeropuerto Internacional El Dorado',
      'Airbus A350-1000',
      'LATAM'
    ],
    category: 'Aerolíneas'
  },
  {
    id: '2',
    title: 'El Renacimiento de Kioto',
    subtitle: 'Cómo las tradiciones antiguas se encuentran con el turismo sostenible moderno en Japón.',
    author: 'Kenji Tanaka',
    date: '02 de Noviembre, 2023',
    imageUrl: 'https://picsum.photos/1200/600?random=2',
    content: `Kioto está redefiniendo lo que significa ser un sitio patrimonial en el siglo XXI. El gobierno local ha implementado nuevas políticas para gestionar el Sobreturismo mientras preserva la santidad del Distrito de Gion.

Ahora se anima a los visitantes a explorar la iniciativa "Kioto junto al mar", que destaca las zonas costeras del norte. Además, la experiencia de la ceremonia del té se ha revitalizado para incluir educación sobre las prácticas agrícolas sostenibles utilizadas para la producción de Matcha.`,
    interactiveTerms: [
      'Kioto',
      'Sobreturismo',
      'Distrito de Gion',
      'Kioto junto al mar',
      'ceremonia del té',
      'Matcha'
    ],
    category: 'Destinos'
  },
  {
    id: '3',
    title: 'Safari del Futuro',
    subtitle: 'Vehículos eléctricos y seguimiento de conservación con IA en el Serengueti.',
    author: 'Sarah Jenkins',
    date: '10 de Diciembre, 2023',
    imageUrl: 'https://picsum.photos/1200/600?random=3',
    content: `El Parque Nacional Serengueti está experimentando una revolución silenciosa. Los jeeps diésel están siendo reemplazados por silenciosos Vehículos de Safari Eléctricos (VSE), permitiendo a los turistas acercarse a la vida silvestre sin perturbar el paisaje sonoro natural.

Los conservacionistas también están utilizando Visión por Computadora para rastrear los patrones de migración del Ñu. Esta tecnología ayuda a los guardabosques a prevenir la caza furtiva y gestionar el ecosistema de manera más efectiva.`,
    interactiveTerms: [
      'Parque Nacional Serengueti',
      'Vehículos de Safari Eléctricos',
      'Visión por Computadora',
      'Ñu',
      'caza furtiva'
    ],
    category: 'Destinos'
  }
];
