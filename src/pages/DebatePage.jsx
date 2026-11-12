import { useState } from 'react'
import { ArrowRight, Check, Lightbulb, MessageCircle, Scale, Sparkles, Menu, X } from 'lucide-react'
import { Logo } from '../components/Logo'

const pillars = [
  ['01', 'Construire une idée', 'Une opinion devient convaincante quand elle s’appuie sur une idée claire, un raisonnement et des exemples.'],
  ['02', 'Écouter vraiment', 'Débattre, ce n’est pas seulement parler : c’est comprendre le point de vue d’en face pour mieux y répondre.'],
  ['03', 'Faire avancer l’échange', 'Le but n’est pas de gagner contre quelqu’un, mais de faire progresser la réflexion collective.'],
]
const sessionSteps = [
  ['01', 'La question', 'Un sujet actuel, une motion claire, deux angles à explorer.'],
  ['02', 'La préparation', 'On cherche ses arguments, ses exemples et les failles possibles.'],
  ['03', 'La joute', 'On prend la parole, on écoute et on répond avec respect.'],
  ['04', 'Le retour', 'On débriefe pour repartir plus précis, plus confiant.'],
]

export function DebatePage({ onHome, onBureau }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <main className="public-shell debate-page">
    <header className="topbar">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><Logo compact /><span>DEBATE CLUB <b>ESISA</b></span></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} onClick={() => setMenuOpen(false)}><a href="/" onClick={(event) => { event.preventDefault(); onHome() }}>Accueil</a><a className="active" href="/le-debat">Le débat</a><a href="/bureau" onClick={(event) => { event.preventDefault(); onBureau() }}>Notre bureau</a><a href="/#inscription" onClick={(event) => { event.preventDefault(); onHome(); setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>S'inscrire</a></nav>
      <span className="topbar-spacer" aria-hidden="true" />
    </header>
    <section className="debate-hero">
      <div><span className="eyebrow"><Sparkles size={15} /> PRENDRE LA PAROLE, AUTREMENT</span><h1>Le débat n’est pas<br /><em>un duel.</em></h1><p>C’est un art de penser ensemble, de défendre ses idées avec structure et d’apprendre à écouter celles des autres.</p><a className="hero-button" href="/#inscription" onClick={(event) => { event.preventDefault(); onHome(); setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Vivre l’expérience <ArrowRight size={17} /></a></div>
      <div className="debate-hero-type"><span className="debate-hero-type__label">CLUB DE DÉBAT · ESISA</span><strong>PARLER</strong><strong className="debate-hero-type__accent">PENSER</strong><strong>AGIR</strong><span className="debate-hero-type__line" /><small>Une idée bien défendue<br />peut ouvrir tout un monde.</small></div>
    </section>
    <section className="debate-definition"><div className="debate-definition__icon"><Lightbulb size={26} /></div><div><span className="section-kicker">EN QUELQUES MOTS</span><h2>Alors, c’est quoi<br /><em>un débat ?</em></h2></div><p>Un débat est un échange organisé où plusieurs personnes confrontent leurs points de vue autour d’une question. On y apprend à argumenter, à nuancer et à respecter une opinion différente de la sienne.</p></section>
    <section className="debate-pillars"><div className="debate-section-heading"><span className="section-kicker">LES BASES</span><h2>Trois réflexes<br /><em>qui changent tout.</em></h2></div><div className="pillar-grid">{pillars.map(([number, title, text]) => <article className="pillar-card" key={number}><span>{number}</span><div className="pillar-icon">{number === '01' ? <Scale size={19} /> : number === '02' ? <MessageCircle size={19} /> : <Check size={19} />}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="session-section"><div className="session-heading"><span className="section-kicker">UNE SÉANCE AU CLUB</span><h2>De la question<br /><em>au déclic.</em></h2><p>Pas besoin d’être expert ou extraverti. Chaque séance est pensée pour apprendre en faisant, à son rythme.</p></div><div className="session-steps">{sessionSteps.map(([number, title, text]) => <article className="session-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="compare-section"><div className="compare-heading"><span className="section-kicker">DEUX ARTS DE LA PAROLE</span><h2>Débat ou public speaking ?<br /><em>Les deux se complètent.</em></h2><p>L’un muscle le raisonnement. L’autre travaille la présence. Au club, on développe les deux.</p></div><div className="compare-table"><div className="compare-row compare-row--head"><span>Débat</span><span>Public speaking</span></div><div className="compare-row"><span><b>Échanger</b> avec une position opposée</span><span><b>Transmettre</b> un message à un public</span></div><div className="compare-row"><span><b>Répondre</b> aux arguments en direct</span><span><b>Captiver</b> et faire passer une émotion</span></div><div className="compare-row"><span><b>Analyser</b> avant de prendre position</span><span><b>Structurer</b> un discours mémorable</span></div></div></section>
    <section className="debate-cta"><div><span className="section-kicker">À VOUS DE PARLER</span><h2>Votre première idée<br />peut changer l’échange.</h2></div><a className="gold-button debate-cta-button" href="/#inscription" onClick={(event) => { event.preventDefault(); onHome(); setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Rejoindre le club <ArrowRight size={17} /></a></section>
    <footer className="site-footer">© 2026 Debate Club ESISA · Fès, Maroc</footer>
  </main>
}
