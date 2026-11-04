/* =========================================================
   MODELO — datos del sitio DevSeed (español / inglés)
   Para agregar o editar contenido, solo se cambia este archivo.
   Todo texto traducible se escribe como { es: '...', en: '...' }.
   ========================================================= */
var DevSeedModel = (function () {
  'use strict';

  var LANGS = ['es', 'en'];
  var STORAGE_KEY = 'devseed-lang';
  var lang = 'es';

  /* ---------- Textos fijos de la interfaz ---------- */
  var ui = {
    pageTitle:      { es: 'DevSeed — Semillero de Videojuegos | Universidad de San Buenaventura Cali',
                      en: 'DevSeed — Video Game Research Group | Universidad de San Buenaventura Cali' },
    metaDesc:       { es: 'DevSeed, semillero interdisciplinario de desarrollo de videojuegos de la Universidad de San Buenaventura Cali.',
                      en: 'DevSeed, the interdisciplinary video game development research group at Universidad de San Buenaventura Cali.' },
    navStatus:      { es: 'Servidor activo', en: 'Server online' },
    menuOpen:       { es: 'Abrir menú', en: 'Open menu' },
    menuClose:      { es: 'Cerrar menú', en: 'Close menu' },
    langLabel:      { es: 'Idioma', en: 'Language' },

    heroBadge:      { es: 'Semillero de investigación · Universidad de San Buenaventura Cali',
                      en: 'Research group · Universidad de San Buenaventura Cali' },
    heroTitle1:     { es: 'Semillero de', en: 'DevSeed' },
    heroTitle2:     { es: 'Videojuegos DevSeed', en: 'Video Game Lab' },
    heroSub:        { es: 'Programación, arte, narrativa y sonido en un solo servidor. Sube de nivel tus habilidades creando videojuegos junto a otros estudiantes de la Universidad de San Buenaventura Cali.',
                      en: 'Programming, art, narrative and sound on a single server. Level up your skills making video games with fellow students at Universidad de San Buenaventura Cali.' },
    heroCta:        { es: '[ PRESIONA START / ÚNETE ]', en: '[ PRESS START / JOIN ]' },
    typewriter:     { es: 'INICIANDO DEVSEED_OS...', en: 'BOOTING DEVSEED_OS...' },

    aboutEyebrow:   { es: '// 01 — sobre el servidor', en: '// 01 — about the server' },
    aboutTitle:     { es: '¿Qué es DevSeed?', en: 'What is DevSeed?' },
    conceptTag:     { es: 'CONCEPTO', en: 'CONCEPT' },
    conceptTitle:   { es: 'Semillero interdisciplinario', en: 'Interdisciplinary research group' },
    conceptText:    { es: 'DevSeed es el semillero de investigación en desarrollo de videojuegos de la Universidad de San Buenaventura Cali: un espacio interdisciplinario donde estudiantes de diversas áreas pueden crear, innovar y aprender de videojuegos.',
                      en: 'DevSeed is the video game development research group of Universidad de San Buenaventura Cali: an interdisciplinary space where students from many fields create, innovate and learn about video games.' },
    philoTag:       { es: 'FILOSOFÍA', en: 'PHILOSOPHY' },
    philoTitle:     { es: 'Narrativa + código + diseño', en: 'Narrative + code + design' },
    philoText:      { es: 'Un espacio en el que se entrelaza la sensibilidad de la narrativa interactiva con el diseño y la programación, explorando tecnologías emergentes en un ambiente de trabajo realista que fomenta el aprendizaje y la colaboración.',
                      en: 'A space where the sensitivity of interactive storytelling meets design and programming, exploring emerging technologies in a realistic work environment that encourages learning and collaboration.' },
    teamTag:        { es: 'CHARACTER SELECT', en: 'CHARACTER SELECT' },
    teamTitle:      { es: 'El equipo', en: 'The team' },

    mvEyebrow:      { es: '// 02 — hacia dónde vamos', en: '// 02 — where we are going' },
    mvTitle:        { es: 'Misión y visión', en: 'Mission and vision' },
    missionTitle:   { es: 'Nuestra misión', en: 'Our mission' },
    missionText:    { es: 'Impulsar el desarrollo de videojuegos mediante un enfoque integral que abarque la programación, el arte, el diseño sonoro, la psicología y más, promoviendo la colaboración entre estudiantes de diferentes disciplinas. Se busca crear un espacio inclusivo donde cada miembro pueda aportar, aprender y avanzar en su pasión por los videojuegos, generando proyectos innovadores y de calidad que reflejen el trabajo en equipo y la diversidad de pensamiento.',
                      en: 'To drive video game development through a comprehensive approach that covers programming, art, sound design, psychology and more, fostering collaboration among students from different disciplines. We aim to build an inclusive space where every member can contribute, learn and grow in their passion for games, creating innovative, high-quality projects that reflect teamwork and diversity of thought.' },
    visionTitle:    { es: 'Nuestra visión', en: 'Our vision' },
    visionText:     { es: 'Ser un espacio interdisciplinario de innovación y creatividad en el que estudiantes de diversas áreas colaboren para desarrollar videojuegos que impacten positivamente en la sociedad, fusionando la tecnología, el arte, el diseño, la psicología y más, fomentando un ambiente de aprendizaje continuo y crecimiento compartido.',
                      en: 'To be an interdisciplinary space for innovation and creativity where students from many fields work together to build video games that have a positive impact on society, blending technology, art, design, psychology and more, and fostering continuous learning and shared growth.' },

    galleryEyebrow: { es: '// momentos', en: '// moments' },
    galleryTitle:   { es: 'DevSeed en acción', en: 'DevSeed in action' },

    actEyebrow:     { es: '// 03 — quest log', en: '// 03 — quest log' },
    actTitle:       { es: 'Actividades y talleres', en: 'Activities and workshops' },

    carPrev:        { es: 'Anterior', en: 'Previous' },
    carNext:        { es: 'Siguiente', en: 'Next' },
    carGoTo:        { es: 'Ir a la tarjeta', en: 'Go to card' },
    evEyebrow:      { es: '// 04 — eventos especiales', en: '// 04 — special events' },
    evTitle:        { es: 'Eventos', en: 'Events' },

    liveEyebrow:    { es: '// 05 — transmisiones', en: '// 05 — broadcasts' },
    liveTitle:      { es: 'En vivo', en: 'Live' },
    livePlay:       { es: 'Reproducir video', en: 'Play video' },
    liveFrom:       { es: 'Desde el minuto', en: 'From minute' },
    liveYoutube:    { es: 'Ver en YouTube ↗', en: 'Watch on YouTube ↗' },

    prodEyebrow:    { es: '// hecho en DevSeed', en: '// made at DevSeed' },
    prodTitle:      { es: 'Producciones audiovisuales', en: 'Video productions' },
    prodLead:       { es: 'Piezas audiovisuales producidas por el semillero para los programas de la Universidad de San Buenaventura Cali.',
                      en: 'Videos produced by the research group for Universidad de San Buenaventura Cali programs.' },
    projEyebrow:    { es: '// 06 — arcade', en: '// 06 — arcade' },
    projTitle:      { es: 'Proyectos del semillero', en: 'Our projects' },

    joinEyebrow:    { es: '// 07 — player registration', en: '// 07 — player registration' },
    joinTitle:      { es: 'Únete al servidor', en: 'Join the server' },
    joinLead:       { es: 'Crea tu personaje y entra a DevSeed. Te contactaremos para tu primera misión.',
                      en: 'Create your character and enter DevSeed. We will contact you for your first mission.' },
    perk1:          { es: 'Aprende programación, arte, audio y narrativa para videojuegos.', en: 'Learn programming, art, audio and narrative for games.' },
    perk2:          { es: 'Participa en game jams, bootcamps y eventos con otras universidades.', en: 'Take part in game jams, bootcamps and events with other universities.' },
    perk3:          { es: 'Trabaja en proyectos reales como Pregúntale a Pepe.', en: 'Work on real projects like Ask Pepe.' },
    perk4:          { es: 'Abierto a estudiantes de todas las carreras.', en: 'Open to students from every program.' },
    joinContact:    { es: '¿Dudas? Escríbele a la docente a cargo', en: 'Questions? Email the faculty advisor' },
    formTitle:      { es: 'Registro de jugador', en: 'Player registration' },
    formSub:        { es: 'Los campos con * son obligatorios', en: 'Fields marked * are required' },
    fName:          { es: 'Nombre *', en: 'Name *' },
    fNamePh:        { es: 'Tu nombre completo', en: 'Your full name' },
    fEmail:         { es: 'Correo *', en: 'Email *' },
    fEmailPh:       { es: 'tucorreo@usbcali.edu.co', en: 'you@usbcali.edu.co' },
    fArea:          { es: 'Área de interés *', en: 'Area of interest *' },
    fAreaPh:        { es: 'Elige tu clase', en: 'Choose your class' },
    fMsg:           { es: 'Mensaje', en: 'Message' },
    fMsgPh:         { es: 'Cuéntanos por qué quieres unirte', en: 'Tell us why you want to join' },
    submit:         { es: 'CREAR PERSONAJE →', en: 'CREATE CHARACTER →' },
    submitDone:     { es: 'PERSONAJE CREADO ✔', en: 'CHARACTER CREATED ✔' },
    success:        { es: '✔ Personaje creado. ¡Bienvenido a DevSeed!', en: '✔ Character created. Welcome to DevSeed!' },
    errName:        { es: 'Escribe tu nombre completo.', en: 'Please enter your full name.' },
    errEmail:       { es: 'Correo no válido.', en: 'Invalid email address.' },
    errArea:        { es: 'Elige tu área de interés.', en: 'Choose your area of interest.' },
    sending:        { es: 'ENVIANDO…', en: 'SENDING…' },
    sendError:      { es: '✖ No se pudo enviar el registro.', en: '✖ The registration could not be sent.' },
    sendMailto:     { es: 'Enviarlo por correo →', en: 'Send it by email →' },
    sendActivation: { es: '⚠ El formulario aún no está activado. La docente debe confirmar el correo de activación de FormSubmit.', en: '⚠ The form is not activated yet. The advisor must confirm the FormSubmit activation email.' },
    sendFile:       { es: '⚠ El envío no funciona abriendo el archivo directamente; debe abrirse desde un servidor o la página publicada.', en: '⚠ Sending does not work when opening the file directly; open it from a server or the published site.' },
    leadBadge:      { es: 'COORDINADOR', en: 'COORDINATOR' },

    skipLink:       { es: 'Saltar al contenido', en: 'Skip to content' },
    backTop:        { es: 'Volver arriba', en: 'Back to top' },
    footerTag:      { es: 'Semillero de investigación en videojuegos', en: 'Video game research group' },
    footerUni:      { es: 'Un semillero de la', en: 'A research group of' },
    footer:         { es: '© DevSeed — Semillero de Videojuegos · Universidad de San Buenaventura Cali',
                      en: '© DevSeed — Video Game Research Group · Universidad de San Buenaventura Cali' }
  };

  /* ---------- Contenido ---------- */
  var data = {
    nav: [
      { id: 'inicio',      label: { es: 'Inicio',      en: 'Home' } },
      { id: 'nosotros',    label: { es: 'Nosotros',    en: 'About' } },
      { id: 'actividades', label: { es: 'Actividades', en: 'Activities' } },
      { id: 'eventos',     label: { es: 'Eventos',     en: 'Events' } },
      { id: 'envivo',      label: { es: 'En vivo',     en: 'Live' } },
      { id: 'proyectos',   label: { es: 'Proyectos',   en: 'Projects' } },
      { id: 'unete',       label: { es: 'Únete',       en: 'Join' } }
    ],

    coordinator: {
      name: 'Kelly Daniella Marín',
      role: { es: '★ DOCENTE A CARGO DEL SEMILLERO · Ing. Multimedia, Mg. Diseño y Desarrollo de Videojuegos',
              en: '★ FACULTY ADVISOR · Multimedia Engineer, M.A. Game Design and Development' },
      photo: 'img/kellyMarin.png'
    },

    // photo: null → se muestra el avatar degradado por defecto
    // lead: true → resalta la tarjeta (coordinación estudiantil)
    students: [
      { name: 'Sebastián Rodríguez',     role: { es: 'Coordinador del semillero', en: 'Group coordinator' }, photo: 'img/sebastian.png', lead: true },
      { name: 'Laurent Rojas',           role: { es: 'Arte',         en: 'Art' },         photo: null },
      { name: 'Samuel Campo',            role: { es: 'Programación', en: 'Programming' }, photo: 'img/samuel.jpg' },
      { name: 'Jhon Urbano',             role: { es: 'Programación', en: 'Programming' }, photo: 'img/john-didier.jpg' }
    ],

    gallery: [
      { caption: { es: 'Sesión de laboratorio', en: 'Lab session' },      photo: 'img/que_es.png' },
      { caption: { es: 'Game Jam de Cali',      en: 'Cali Game Jam' }, photo: 'img/equipo.png' },
      { caption: { es: 'Lanzamiento de la Maestría en Creación Digital y Producción de Videojuegos',
                   en: 'Launch of the Master’s in Digital Creation and Video Game Production' },     photo: 'img/galeria-lanzamiento-maestria.jpg', tall: true },
      { caption: { es: 'Presentación de la web DevSeed', en: 'Presenting the DevSeed website' }, photo: 'img/galeria-presentacion-web.jpg' },
      { caption: { es: 'Reunión de trabajo con Bomberos Cali', en: 'Working session with Cali Fire Department' }, photo: 'img/galeria-reunion-bomberos.jpg' }
    ],

    activities: [
      { tag: 'UNITY 2D',
        title: { es: 'Introductorio de Unity 2D', en: 'Intro to Unity 2D' },
        text:  { es: 'Por Juan Camilo Hidalgo, programador de Neru on Winds.', en: 'By Juan Camilo Hidalgo, programmer of Neru on Winds.' },
        photo: 'img/taller1.png' },
      { tag: 'PIXEL ART',
        title: { es: 'Laboratorio de pixel art', en: 'Pixel art lab' },
        text:  { es: 'Sprites, animación cuadro a cuadro y paletas de color.', en: 'Sprites, frame-by-frame animation and color palettes.' },
        photo: 'img/taller2.png' },
      { tag: { es: 'ILUSTRACIÓN', en: 'ILLUSTRATION' },
        title: { es: 'Taller de ilustración', en: 'Illustration workshop' },
        text:  { es: 'Fundamentos de composición y estilo visual para videojuegos.', en: 'Composition fundamentals and visual style for games.' },
        photo: 'img/taller3.png' },
      { tag: { es: 'ESCENARIOS', en: 'ENVIRONMENTS' },
        title: { es: 'Diseño de escenarios', en: 'Environment design' },
        text:  { es: 'Bloqueo, ambientación e iluminación de niveles jugables.', en: 'Blockout, set dressing and lighting for playable levels.' },
        photo: 'img/taller4.png' },
      { tag: { es: 'PERSONAJES', en: 'CHARACTERS' },
        title: { es: 'Diseño de personajes', en: 'Character design' },
        text:  { es: 'Construcción visual y narrativa de personajes jugables.', en: 'Visual and narrative development of playable characters.' },
        photo: 'img/taller5.png' }
    ],

    // Eventos especiales (game jams, bootcamps...).
    // image: ruta local o URL del banner (si falla, se muestra un arte por defecto)
    events: [
      {
        type: 'GAME JAM',
        title: 'GAME JAM USB 2026',
        hashtag: '#ReplicaJamCali',
        dates: { es: '1 – 8 de octubre de 2026', en: 'October 1 – 8, 2026' },
        text: { es: 'Game jam 100 % en línea en itch.io para estudiantes de la Universidad de San Buenaventura Cali y otras instituciones. La temática fue «Réplica»: una copia de un original, una respuesta a una acción, el eco de un evento o una historia contada en distintos formatos, con juegos ambientados o inspirados en Cali.',
                en: 'A 100% online game jam on itch.io for students of Universidad de San Buenaventura Cali and other institutions. The theme was "Réplica" (Replica): a copy of an original, a response to an action, the echo of an event or a story told across formats, with games set in or inspired by Cali.' },
        details: [
          { es: 'Temática: Réplica', en: 'Theme: Replica' },
          { es: 'Equipos de 3 a 5 personas', en: 'Teams of 3 to 5' },
          { es: 'Inscripción gratuita', en: 'Free entry' },
          { es: 'Muestra y premiación: 10 de octubre', en: 'Showcase & awards: October 10' }
        ],
        image: 'https://img.itch.zone/aW1nLzMwNTgxMTAzLnBuZw==/original/YCPkd3.png',
        url: 'https://itch.io/jam/game-jam-usb-2026',
        button: { es: 'VER EN ITCH.IO ↗', en: 'VIEW ON ITCH.IO ↗' }
      },
      {
        // TODO: completar fechas del bootcamp
        type: 'BOOTCAMP',
        title: 'Play for Change 2025: Bootcamping',
        hashtag: null,
        dates: { es: 'Universidad de San Buenaventura Cali × Universidad del Valle de México (UVM)',
                 en: 'Universidad de San Buenaventura Cali × Universidad del Valle de México (UVM)' },
        text: { es: 'Bootcamp de desarrollo de videojuegos con propósito social, organizado por la Facultad de Ingeniería de la Universidad de San Buenaventura Cali junto con la Universidad del Valle de México (UVM). Fue un evento certificado. Los equipos crearon juegos inspirados en los Objetivos de Desarrollo Sostenible de la ONU sobre la vida en el mar y en la tierra.',
                en: 'A purpose-driven game development bootcamp organized by the School of Engineering at Universidad de San Buenaventura Cali together with Universidad del Valle de México (UVM). It was a certified event. Teams built games inspired by the UN Sustainable Development Goals on life below water and life on land.' },
        details: [
          { es: '✔ Evento certificado', en: '✔ Certified event' },
          { es: 'Colaboración internacional Colombia – México', en: 'International collaboration Colombia – Mexico' },
          { es: 'ODS 14: Vida submarina', en: 'SDG 14: Life below water' },
          { es: 'ODS 15: Vida de ecosistemas terrestres', en: 'SDG 15: Life on land' }
        ],
        image: 'img/play-for-change.jpg',
        url: 'https://itch.io/jam/play-for-change-2025',
        button: { es: 'VER EL BOOTCAMP ↗', en: 'VIEW THE BOOTCAMP ↗' },
        url2: 'https://playforchange2025.itch.io',
        button2: { es: 'JUGAR LOS JUEGOS ↗', en: 'PLAY THE GAMES ↗' }
      }
      ,{
        // TODO: completar fecha e imagen de la visita
        type: { es: 'VISITA INTERNACIONAL', en: 'INTERNATIONAL VISIT' },
        artKey: 'VISIT',
        title: { es: 'Visita internacional a RIT', en: 'International visit to RIT' },
        hashtag: null,
        dates: { es: 'Rochester Institute of Technology · Rochester, NY (EE. UU.)', en: 'Rochester Institute of Technology · Rochester, NY (USA)' },
        text: { es: 'DevSeed visitó el Rochester Institute of Technology (RIT), en Rochester, Nueva York. Lee la publicación completa en LinkedIn.',
                en: 'DevSeed visited the Rochester Institute of Technology (RIT) in Rochester, New York. Read the full post on LinkedIn.' },
        details: [],
        image: 'img/visita-rit.jpg',
        url: 'https://lnkd.in/p/ezsvdwRn',
        button: { es: 'VER EN LINKEDIN ↗', en: 'VIEW ON LINKEDIN ↗' }
      }
      ,{
        // TODO: completar fecha e imagen de la visita
        type: { es: 'VISITA', en: 'VISIT' },
        artKey: 'FIRE',
        title: { es: 'Visita a Bomberos Cali', en: 'Visit to Cali Fire Department' },
        hashtag: null,
        dates: { es: 'Benemérito Cuerpo de Bomberos Voluntarios de Cali', en: 'Benemérito Cuerpo de Bomberos Voluntarios de Cali' },
        text: { es: 'El semillero DevSeed visitó el Cuerpo de Bomberos Voluntarios de Cali. Mira el reel en Instagram.',
                en: 'The DevSeed research group visited the Cali Volunteer Fire Department. Watch the reel on Instagram.' },
        details: [],
        image: 'img/visita-bomberos.jpg',
        imagePosition: 'center 55%',
        url: 'https://www.instagram.com/reel/DeRlzrVpUwd/',
        button: { es: 'VER EN INSTAGRAM ↗', en: 'VIEW ON INSTAGRAM ↗' }
      }
      ,{
        type: { es: 'RECONOCIMIENTO', en: 'AWARDS' },
        artKey: 'GAME JAM',
        title: { es: 'Éxito bonaventuriano en el Cali Game Jam 2025', en: 'Bonaventurian success at Cali Game Jam 2025' },
        hashtag: null,
        dates: { es: '29 y 30 de marzo de 2025 · 40 horas · Tema: «a ciegas»', en: 'March 29–30, 2025 · 40 hours · Theme: "blind"' },
        text: { es: 'En la primera versión del Cali Game Jam, estudiantes y egresados de la Facultad de Ingeniería —entre ellos integrantes de DevSeed— crearon videojuegos en 40 horas y obtuvieron varios reconocimientos.',
                en: 'At the first Cali Game Jam, students and alumni of the School of Engineering —including DevSeed members— built games in 40 hours and earned several awards.' },
        details: [
          { es: '1.er lugar · Mejor audio: BugsALight', en: '1st place · Best audio: BugsALight' },
          { es: '2.º lugar · Mejor audio: Nocturnal Pulse', en: '2nd place · Best audio: Nocturnal Pulse' },
          { es: '2.º lugar · Mejor juego del jam: Juepucha Apocalypse', en: '2nd place · Best game of the jam: Juepucha Apocalypse' },
          { es: 'Mención especial · Mecánica innovadora: BugsALight', en: 'Special mention · Innovative mechanic: BugsALight' }
        ],
        image: 'img/equipo.png',
        url: 'https://usbcali.edu.co/exito-bonaventuriano-en-el-cali-game-jam-2025/',
        button: { es: 'LEER LA NOTA ↗', en: 'READ THE ARTICLE ↗' }
      }
      // Para agregar otro evento, copia uno de los bloques anteriores.
    ],

    // Transmisiones en vivo (YouTube). start = segundo en el que empieza el video
    videos: [
      {
        id: 'ONuXnTKlW3g', start: 1630,
        tag: { es: 'EN VIVO', en: 'LIVE' },
        title: 'Hablemos de | Voluntariado en acción',
        channel: 'RadioMediaUSB',
        date: { es: '16 de septiembre de 2026', en: 'September 16, 2026' }
      },
      {
        id: 'qdspbe3nKnA', start: 5746,
        tag: { es: 'LANZAMIENTO', en: 'LAUNCH' },
        title: { es: 'Lanzamiento de la Maestría en Creación Digital y Producción de Videojuegos', en: 'Launch of the Master’s in Digital Creation and Video Game Production' },
        channel: null,
        date: null
      }
    ],

    // Producciones audiovisuales del semillero (videos verticales en /video)
    productions: [
      {
        src: 'video/promo-ing-multimedia.mp4',
        poster: 'img/poster-promo-ing-multimedia.jpg',
        tag: { es: 'PROMO', en: 'PROMO' },
        title: { es: '¿Sabías qué hace un ingeniero multimedia en videojuegos?', en: 'What does a multimedia engineer do in video games?' },
        text: { es: 'Pieza promocional del programa de Ingeniería Multimedia: diseñar mundos, niveles e historias, y hacer realidad sus propios videojuegos.',
                en: 'Promo for the Multimedia Engineering program: designing worlds, levels and stories, and bringing your own games to life.' }
      },
      {
        src: 'video/promo-maestria-videojuegos.mp4',
        poster: 'img/poster-promo-maestria-videojuegos.jpg',
        tag: { es: 'PROMO', en: 'PROMO' },
        title: { es: 'Maestría en Creación Digital y Producción de Videojuegos', en: 'Master’s in Digital Creation and Video Game Production' },
        text: { es: '¿Juegas? Ahora, créalos. Pieza promocional de la maestría, con experiencias inmersivas y realidad virtual en el Hackspace.',
                en: 'Do you play? Now, create them. Promo for the master’s program, featuring immersive experiences and VR at the Hackspace.' }
      }
    ],

    // image: ruta a una captura del juego (o null para el arte por defecto)
    // url / button: enlace opcional a demo o tráiler
    projects: [
      {
        title: { es: 'Pregúntale a Pepe', en: 'Ask Pepe (Pregúntale a Pepe)' },
        status: { es: 'EN DESARROLLO', en: 'IN DEVELOPMENT' },
        text: { es: 'Videojuego educativo para celular sobre prevención para niños. Pepe, un bombero radio-operador, y Chispa, su mascota, enseñan a los jugadores cómo actuar frente a emergencias.',
                en: 'An educational mobile game about prevention for kids. Pepe, a firefighter radio operator, and Chispa, his pet, teach players how to respond to emergencies.' },
        partner: { es: 'En alianza con el Benemérito Cuerpo de Bomberos Voluntarios de Cali',
                   en: 'In partnership with the Benemérito Cuerpo de Bomberos Voluntarios de Cali (Cali Volunteer Fire Department)' },
        chips: [
          'Unity',
          { es: 'Móvil', en: 'Mobile' },
          '3D',
          { es: 'Educativo', en: 'Educational' },
          { es: 'Prevención', en: 'Prevention' }
        ],
        image: 'img/preguntale-a-pepe-tablero.jpg',
        imageAlt: { es: 'Tablero de diseño del juego Pregúntale a Pepe', en: 'Game design board for Ask Pepe' },
        url: null,
        button: null
      }
    ],

    interestAreas: [
      { value: 'programacion', label: { es: 'Programación',    en: 'Programming' } },
      { value: 'arte',         label: { es: 'Arte',            en: 'Art' } },
      { value: 'diseno',       label: { es: 'Diseño de juego', en: 'Game design' } },
      { value: 'audio',        label: { es: 'Audio',           en: 'Audio' } },
      { value: 'narrativa',    label: { es: 'Narrativa',       en: 'Narrative' } }
    ]
  };

  var registrations = [];

  /* ---------- Idioma ---------- */
  function isLocalized(v) {
    return v && typeof v === 'object' && !Array.isArray(v) && 'es' in v && 'en' in v;
  }

  // Devuelve una copia del valor con los textos en el idioma actual
  function localize(v) {
    if (isLocalized(v)) return v[lang];
    if (Array.isArray(v)) return v.map(localize);
    if (v && typeof v === 'object') {
      var out = {};
      Object.keys(v).forEach(function (k) { out[k] = localize(v[k]); });
      return out;
    }
    return v;
  }

  function loadLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    // por defecto siempre en español; se recuerda la última elección del visitante
    lang = LANGS.indexOf(saved) >= 0 ? saved : 'es';
    return lang;
  }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0) return lang;
    lang = l;
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
    return lang;
  }

  /* ---------- Registro ---------- */
  function validateRegistration(r) {
    var errors = {};
    if (!r.nombre || r.nombre.trim().length < 3) errors.nombre = ui.errName[lang];
    if (!r.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.correo)) errors.correo = ui.errEmail[lang];
    if (!r.area) errors.area = ui.errArea[lang];
    return errors;
  }

  /* ---------- Envío del formulario por correo ----------
     Se usa FormSubmit (https://formsubmit.co), servicio gratuito que reenvía
     el formulario al correo sin necesidad de servidor propio.
     IMPORTANTE: el primer envío manda un correo de activación a esta
     dirección; hay que abrirlo y confirmar para empezar a recibir registros. */
  var MAIL_TO = 'kdmarin@usbcali.edu.co';
  var MAIL_ENDPOINT = 'https://formsubmit.co/ajax/' + MAIL_TO;

  // Plan B: abre el programa de correo del visitante con el mensaje ya escrito
  function buildMailto(p) {
    var body = 'Nombre: ' + p.Nombre + '\nCorreo: ' + p.Correo + '\nÁrea de interés: ' + p['Área de interés'] + '\nMensaje: ' + p.Mensaje;
    return 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent(p._subject) + '&body=' + encodeURIComponent(body);
  }

  function addRegistration(r) {
    var errors = validateRegistration(r);
    if (Object.keys(errors).length) return Promise.resolve({ ok: false, errors: errors });

    var areaItem = data.interestAreas.filter(function (a) { return a.value === r.area; })[0];
    var payload = {
      _subject: 'Nuevo registro DevSeed: ' + r.nombre.trim(),
      _template: 'table',
      _captcha: 'false',
      _replyto: r.correo.trim(),
      Nombre: r.nombre.trim(),
      Correo: r.correo.trim(),
      'Área de interés': areaItem ? areaItem.label.es : r.area,
      Mensaje: (r.mensaje || '').trim() || '—',
      Idioma: lang === 'es' ? 'Español' : 'Inglés',
      _honey: r.honey || ''
    };

    return fetch(MAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { res: res, j: j }; }); })
      .then(function (o) {
        var ok = o.res.ok && String(o.j.success) !== 'false';
        var msg = String(o.j.message || '');
        if (ok) registrations.push(payload);
        else if (window.console) console.warn('[DevSeed] FormSubmit:', msg || o.res.status);
        return { ok: ok, errors: {}, sendError: !ok,
                 needsActivation: /activat/i.test(msg),
                 fileProtocol: location.protocol === 'file:',
                 mailto: buildMailto(payload) };
      })
      .catch(function () {
        return { ok: false, errors: {}, sendError: true, fileProtocol: location.protocol === 'file:', mailto: buildMailto(payload) };
      });
  }

  return {
    get: function (key) { return localize(data[key]); },
    t: function (key) { return ui[key] ? ui[key][lang] : key; },
    ui: function () { return localize(ui); },
    getLang: function () { return lang; },
    loadLang: loadLang,
    setLang: setLang,
    addRegistration: addRegistration
  };
})();
