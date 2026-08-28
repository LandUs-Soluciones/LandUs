import {useEffect, useState} from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import {getLandingContent} from './lib/sanity'
import './App.css'

const fallbackContent = {
  brand: 'LandUs',
  contactUrl: 'https://www.instagram.com/landus.solu/',
  hero: {
    eyebrow: 'LANDING PAGES PARA NEGOCIOS',
    title: 'Tu anuncio consiguió el clic.',
    accent: 'Ahora haz que avance.',
    description: 'Diseñamos landing pages con una sola dirección: llevar a quien te visita hacia una acción concreta.',
    primaryCta: 'Quiero mi landing',
    secondaryCta: 'Conoce la Ruta LandUs',
  },
  problem: {
    eyebrow: 'DESPUÉS DEL CLIC',
    title: 'El tráfico llega. La pregunta es: ¿qué pasa después?',
    text: 'Una buena landing elimina dudas, explica la oferta y le da a cada visita un siguiente paso claro.',
  },
  route: [
    {_key: 'visit', number: '01', label: 'VISITA', title: 'Llega desde tu campaña', text: 'Un anuncio, un enlace o una búsqueda trae a la persona correcta.'},
    {_key: 'interest', number: '02', label: 'INTERÉS', title: 'Entiende por qué elegirte', text: 'La oferta, la prueba y el mensaje aparecen en el orden correcto.'},
    {_key: 'action', number: '03', label: 'ACCIÓN', title: 'Da el siguiente paso', text: 'WhatsApp, reserva, cotización o compra: una acción visible y simple.'},
    {_key: 'client', number: '04', label: 'CLIENTE', title: 'Se convierte en oportunidad', text: 'Tu página deja de ser una vitrina y empieza a trabajar para tu negocio.'},
  ],
  caseStudy: {
    eyebrow: 'UNA PÁGINA, UNA DIRECCIÓN',
    title: 'Una landing no persigue visitas.',
    accent: 'Persigue una acción.',
    text: 'La acción cambia con tu negocio. La página se diseña para que el siguiente paso sea evidente y fácil de tomar.',
    context: 'EMPRENDIMIENTOS Y NEGOCIOS',
    objective: 'GUIAR A UNA RESPUESTA',
    actions: [{_key: 'quote', label: 'Cotizar'}, {_key: 'book', label: 'Reservar'}, {_key: 'message', label: 'Escribir'}, {_key: 'buy', label: 'Comprar'}],
  },
  offer: [
    {_key: 'strategy', number: '01', title: 'Estrategia', text: 'Definimos qué debe hacer la página y para quién.'},
    {_key: 'copy', number: '02', title: 'Copy', text: 'Ordenamos tu oferta para que se entienda rápido.'},
    {_key: 'design', number: '03', title: 'Diseño', text: 'Creamos una interfaz con carácter y foco.'},
    {_key: 'development', number: '04', title: 'Desarrollo', text: 'La hacemos rápida, responsive y fácil de usar.'},
    {_key: 'integrations', number: '05', title: 'Integraciones', text: 'Conectamos WhatsApp, formularios y analítica.'},
    {_key: 'launch', number: '06', title: 'Publicación', text: 'La ponemos online lista para recibir tráfico.'},
  ],
  faq: [
    {_key: 'faq-1', question: '¿Sirve si todavía no tengo una marca grande?', answer: 'Sí. Una landing ordena tu propuesta y te ayuda a verte claro y confiable desde la primera visita.'},
    {_key: 'faq-2', question: '¿Pueden conectarla con WhatsApp o un formulario?', answer: 'Sí. Definimos la acción principal y conectamos los canales necesarios para que el contacto llegue a tu negocio.'},
    {_key: 'faq-3', question: '¿La página será editable?', answer: 'Sí. Dejamos el contenido clave en un CMS simple para que puedas actualizar textos, casos y llamados a la acción.'},
  ],
  finalCta: {
    title: 'Haz que tu próxima visita avance.',
    text: 'Cuéntanos qué acción necesita conseguir tu negocio y diseñemos el camino para llegar a ella.',
    button: 'Conversemos sobre tu landing',
  },
}

function mergeContent(remote) {
  if (!remote) return fallbackContent
  return {
    ...fallbackContent,
    ...remote,
    hero: {...fallbackContent.hero, ...remote.hero},
    problem: {...fallbackContent.problem, ...remote.problem},
    caseStudy: {...fallbackContent.caseStudy, ...remote.caseStudy, actions: remote.caseStudy?.actions?.length ? remote.caseStudy.actions : fallbackContent.caseStudy.actions},
    finalCta: {...fallbackContent.finalCta, ...remote.finalCta},
    route: remote.route?.length ? remote.route : fallbackContent.route,
    offer: remote.offer?.length ? remote.offer : fallbackContent.offer,
    faq: remote.faq?.length ? remote.faq : fallbackContent.faq,
  }
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
}

function RouteLine({className = ''}) {
  return <svg className={`route-line ${className}`} viewBox="0 0 580 180" fill="none" aria-hidden="true">
    <path d="M8 38h178c70 0 88 104 158 104h142c43 0 56-35 77-67l9-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="186" cy="38" r="7" fill="white" stroke="currentColor" strokeWidth="3" />
    <circle cx="344" cy="142" r="7" fill="white" stroke="currentColor" strokeWidth="3" />
    <path d="m560 51 18 10-12 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

function App() {
  const [content, setContent] = useState(fallbackContent)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    getLandingContent().then((remote) => setContent(mergeContent(remote))).catch(() => {})
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="site-header">
        <nav className="nav shell" aria-label="Navegación principal">
          <a className="brand" href="#inicio" onClick={closeMenu}><BrandMark /><span>Land<span>Us</span></span></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#ruta" onClick={closeMenu}>La Ruta LandUs</a>
            <a href="#producto" onClick={closeMenu}>Qué incluye</a>
            <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
            <a className="nav-cta" href={content.contactUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Hablemos <ArrowUpRight size={16} /></a>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="section-kicker"><span></span>{content.hero.eyebrow}</p>
            <h1>{content.hero.title} <strong>{content.hero.accent}</strong></h1>
            <p className="hero-lede">{content.hero.description}</p>
            <div className="hero-actions">
              <a className="button primary" href={content.contactUrl} target="_blank" rel="noreferrer">{content.hero.primaryCta}<ArrowRight size={18} /></a>
              <a className="inline-link" href="#ruta">{content.hero.secondaryCta}<ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="hero-demo" aria-label="Vista previa de una landing diseñada para guiar a la acción">
            <RouteLine className="hero-route" />
            <div className="browser-frame">
              <div className="browser-top"><div><i></i><i></i><i></i></div><span>tu-negocio.pe</span><b>↗</b></div>
              <div className="preview-page">
                <div className="preview-nav"><span>TU MARCA</span><small>Servicios&nbsp;&nbsp;&nbsp; Nosotros</small></div>
                <div className="preview-content"><p>UNA PROPUESTA CLARA</p><h2>Haz que elegirte<br />sea el siguiente paso.</h2><span>Explica tu oferta, reduce dudas y guía a una acción concreta.</span><button>Conocer la solución <ArrowRight size={14} /></button></div>
                <div className="preview-proof"><span>01</span><p>página<br />un objetivo</p><i></i></div>
              </div>
            </div>
            <div className="hero-note visit-note"><span></span>VISITA</div>
            <div className="hero-note action-note"><span></span>RESPUESTA</div>
          </div>
        </div>        <div className="hero-strip"><div className="shell"><span>MUCHAS VISITAS</span><i></i><b>UNA DIRECCIÓN CLARA</b><i></i><span>UNA ACCIÓN</span></div></div>
      </section>

      <section className="problem shell">
        <div className="problem-intro"><p className="section-kicker dark"><span></span>{content.problem.eyebrow}</p><h2>{content.problem.title}</h2></div>
        <div className="problem-copy"><p>{content.problem.text}</p><ul><li><Check size={17} /> Menos distracciones</li><li><Check size={17} /> Más claridad</li><li><Check size={17} /> Una acción visible</li></ul></div>
      </section>

      <section className="route-section" id="ruta">
        <div className="shell"><div className="route-heading"><p className="section-kicker dark"><span></span>LA RUTA LANDUS</p><h2>Cada visita necesita<br /><strong>un siguiente paso.</strong></h2><p>Diseñamos el recorrido completo: desde el momento en que alguien llega hasta el momento en que decide actuar.</p></div>
          <div className="route-map"><RouteLine /><div className="route-cards">{content.route.map((item) => <article key={item._key || item.number} className="route-card"><span className="route-number">{item.number}</span><p>{item.label}</p><h3>{item.title}</h3><span>{item.text}</span></article>)}</div></div>
        </div>
      </section>

      <section className="case-section">
        <div className="shell case-grid">
          <div className="case-copy"><p className="section-kicker dark"><span></span>{content.caseStudy.eyebrow}</p><h2>{content.caseStudy.title} <strong>{content.caseStudy.accent}</strong></h2><p>{content.caseStudy.text}</p><div className="case-facts"><div><span>PARA QUIÉN</span><b>{content.caseStudy.context}</b></div><div><span>OBJETIVO</span><b>{content.caseStudy.objective}</b></div></div></div>
          <div className="action-board" aria-label="Acciones que puede conseguir una landing"><RouteLine /><p>LANDUS / UNA PÁGINA, UNA ACCIÓN</p><h3>¿Qué necesita hacer quien llega?</h3><div className="action-choices">{content.caseStudy.actions.map((item) => <span key={item._key || item.label}><i></i>{item.label}<ArrowRight size={16} /></span>)}</div><b>La acción se adapta a tu negocio. El foco no.</b></div>
        </div>
      </section>
      <section className="product shell" id="producto">
        <div className="product-heading"><p className="section-kicker dark"><span></span>EL PRODUCTO LANDUS</p><h2>Una landing.<br /><strong>Un objetivo claro.</strong></h2></div>
        <div className="offer-list">{content.offer.map((item) => <article key={item._key || item.number} className="offer-item"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight size={19} /></article>)}</div>
      </section>

      <section className="questions" id="preguntas"><div className="shell questions-grid"><div><p className="section-kicker dark"><span></span>ANTES DE EMPEZAR</p><h2>Las preguntas que aparecen antes de dar el siguiente paso.</h2><a href={content.contactUrl} target="_blank" rel="noreferrer" className="inline-link blue">¿Tienes otra? Escríbenos <ArrowRight size={16} /></a></div><div className="faq-list">{content.faq.map((item) => <details key={item._key || item.question}><summary>{item.question}<ChevronDown size={19} /></summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="final-cta"><div className="shell"><RouteLine /><p className="section-kicker">LANDUS / CADA VISITA, CON DIRECCIÓN</p><h2>{content.finalCta.title}</h2><p>{content.finalCta.text}</p><a className="button primary" href={content.contactUrl} target="_blank" rel="noreferrer">{content.finalCta.button}<ArrowRight size={18} /></a></div></section>

      <footer className="footer shell"><a className="brand" href="#inicio"><BrandMark /><span>Land<span>Us</span></span></a><p>Landing pages diseñadas alrededor de una acción.</p><a href={content.contactUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15} /></a></footer>
    </main>
  )
}

export default App