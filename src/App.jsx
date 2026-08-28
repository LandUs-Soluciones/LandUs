import {useEffect, useState} from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CirclePlay,
  Code2,
  Menu,
  MoveRight,
  Sparkles,
  X,
} from 'lucide-react'
import {getLandingContent} from './lib/sanity'
import './App.css'

const fallbackContent = {
  brand: 'LandUs',
  hero: {
    eyebrow: 'Estudio digital para marcas en movimiento',
    title: 'Una presencia web que hace que tu negocio se sienta',
    accent: 'imposible de ignorar.',
    description: 'Creamos landing pages estratégicas y hechas a medida para emprendimientos y negocios que necesitan convertir una buena primera impresión en oportunidades reales.',
    primaryCta: 'Conversemos sobre tu marca',
    secondaryCta: 'Ver cómo trabajamos',
  },
  services: [
    {number: '01', title: 'Estrategia de conversión', text: 'Definimos qué necesita entender tu cliente y ordenamos el mensaje antes de diseñar.'},
    {number: '02', title: 'Diseño con identidad', text: 'Una interfaz pensada para que la personalidad de tu marca se vea y se recuerde.'},
    {number: '03', title: 'Desarrollo y publicación', text: 'Una web rápida, adaptable a cualquier pantalla y lista para recibir visitas.'},
  ],
  process: [
    {step: '01', title: 'Entendemos', text: 'Conocemos tu negocio, objetivo y cliente ideal.'},
    {step: '02', title: 'Construimos', text: 'Diseñamos y desarrollamos una experiencia a tu medida.'},
    {step: '03', title: 'Lanzamos', text: 'Publicamos, medimos y dejamos tu página lista para crecer.'},
  ],
  team: [
    {name: 'Jose Pereda', role: 'Estrategia y desarrollo'},
    {name: 'Renzo Ccente', role: 'Diseño y experiencia'},
  ],
  finalCta: {
    title: 'Tu negocio ya tiene algo valioso. Hagamos que se note.',
    text: 'Cuéntanos qué estás construyendo y veamos si LandUs es el equipo correcto para llevarlo a la web.',
    button: 'Escríbenos por Instagram',
  },
}

const link = 'https://www.instagram.com/landus.solu/'

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
}

function App() {
  const [content, setContent] = useState(fallbackContent)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    getLandingContent().then((remote) => {
      if (remote) setContent({...fallbackContent, ...remote, hero: {...fallbackContent.hero, ...remote.hero}, finalCta: {...fallbackContent.finalCta, ...remote.finalCta}})
    }).catch(() => {})
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="nav-shell">
        <nav className="nav container" aria-label="Navegación principal">
          <a href="#inicio" className="brand" onClick={closeMenu}><BrandMark /><span>{content.brand}</span></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#servicios" onClick={closeMenu}>Servicios</a>
            <a href="#proceso" onClick={closeMenu}>Proceso</a>
            <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
            <a href={link} target="_blank" rel="noreferrer" className="nav-contact" onClick={closeMenu}>Hablemos <ArrowUpRight size={16} /></a>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <section id="inicio" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span></span>{content.hero.eyebrow}</p>
            <h1>{content.hero.title} <em>{content.hero.accent}</em></h1>
            <p className="hero-description">{content.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-light" href={link} target="_blank" rel="noreferrer">{content.hero.primaryCta}<MoveRight size={18} /></a>
              <a className="text-link" href="#proceso">{content.hero.secondaryCta}<ChevronRight size={18} /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Vista previa artística de una landing page de LandUs">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="screen-card">
              <div className="screen-top"><span>LANDUS / DIGITAL</span><span>01—24</span></div>
              <div className="screen-title">Make<br />your next<br /><b>move.</b></div>
              <div className="screen-bottom"><span>BRAND / WEB / MOTION</span><span className="screen-dot"></span></div>
            </div>
            <p className="art-caption"><span>Diseño que toma posición</span><span>↓</span></p>
          </div>
        </div>
        <div className="ticker"><div><span>LANDING PAGES A MEDIDA</span><b>✦</b><span>MARCA, ESTRATEGIA, WEB</span><b>✦</b><span>LANDING PAGES A MEDIDA</span><b>✦</b><span>MARCA, ESTRATEGIA, WEB</span></div></div>
      </section>

      <section id="servicios" className="services section container">
        <div className="section-intro"><p className="eyebrow dark"><span></span>Lo que hacemos</p><h2>Una landing no es solo una página.<br /><em>Es una oportunidad bien diseñada.</em></h2></div>
        <div className="service-list">
          {content.services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><span className="service-arrow"><ArrowUpRight size={22} /></span></article>)}
        </div>
      </section>

      <section className="statement"><div className="container"><p>Diseñamos para que tu negocio se vea a la altura de lo que ya hace bien.</p><div className="statement-stamp"><Sparkles size={18} /><span>LANDUS<br />ESTUDIO DIGITAL</span></div></div></section>

      <section id="proceso" className="process section container">
        <div className="process-head"><div><p className="eyebrow dark"><span></span>Nuestra forma de trabajar</p><h2>Directos al punto.<br />Cerca de tu negocio.</h2></div><a href={link} target="_blank" rel="noreferrer" className="round-link" aria-label="Contactar LandUs"><MoveRight size={25} /></a></div>
        <div className="steps">{content.process.map((item) => <article className="step" key={item.step}><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      </section>

      <section className="showcase"><div className="container showcase-grid"><div className="showcase-copy"><p className="eyebrow"><span></span>Una web con intención</p><h2>Claridad para tu cliente. Carácter para tu marca.</h2><p>No entregamos plantillas disfrazadas. Cada página parte de tu negocio, tu público y el siguiente paso que quieres que dé quien te visita.</p><a className="text-link light" href={link} target="_blank" rel="noreferrer">Inicia tu proyecto <ArrowUpRight size={18} /></a></div><div className="project-window"><div className="window-nav"><span></span><span></span><span></span></div><div className="window-content"><p>YOUR BRAND<br />DESERVES A<br /><b>PLACE TO LAND.</b></p><div><span>PROJECT / 2026</span><span>LANDUS</span></div></div></div></div></section>

      <section id="nosotros" className="team section container"><div className="team-title"><p className="eyebrow dark"><span></span>El equipo</p><h2>Dos perfiles,<br /><em>un mismo estándar.</em></h2></div><div className="team-cards">{content.team.map((member, index) => <article className="team-card" key={member.name}><span className="member-index">0{index + 1}</span><div className="member-monogram">{member.name.split(' ').map((part) => part[0]).join('')}</div><h3>{member.name}</h3><p>{member.role}</p></article>)}</div></section>

      <section className="final-section"><div className="container"><CirclePlay className="play-icon" size={34} /><h2>{content.finalCta.title}</h2><p>{content.finalCta.text}</p><a href={link} target="_blank" rel="noreferrer" className="button button-acid">{content.finalCta.button}<ArrowUpRight size={19} /></a></div></section>

      <footer className="footer container"><a href="#inicio" className="brand"><BrandMark /><span>{content.brand}</span></a><p>Landing pages personalizadas para emprendimientos y negocios en crecimiento.</p><a href={link} target="_blank" rel="noreferrer">@landus.solu <ArrowUpRight size={15} /></a></footer>
    </main>
  )
}

export default App

