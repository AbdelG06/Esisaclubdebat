import { useState } from 'react'
import { ArrowUpRight, Instagram, MessageCircle, Mic2, Sparkles, Menu, X } from 'lucide-react'
import { Logo } from '../components/Logo'

const members = [
  ['Présidente', 'yam_ouki_', '🏛️'],
  ['Vice-Présidente', '_yassmine_mn', '🎯'],
  ['Resp. Média', 'abdelkrimgarwaoui_off', '📸'],
  ['Resp. Communication', 'emn.ae', '🎙️'],
  ['Resp. AR', 'mosaab_z1', '🇲🇦'],
  ['Resp. FR', 'mbnzk_', '🇫🇷'],
  ['Resp. ENG', 'chnn.he_', '🇬🇧'],
]

export function BureauPage({ onHome, onAdmin, onDebate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <main className="public-shell bureau-page">
    <header className="topbar">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><Logo compact /><span>DEBATE CLUB <b>ESISA</b></span></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} onClick={() => setMenuOpen(false)}><a href="/" onClick={(event) => { event.preventDefault(); onHome() }}>Accueil</a><a href="/le-debat" onClick={(event) => { event.preventDefault(); onDebate() }}>Le débat</a><a className="active" href="/bureau">Notre bureau</a><a href="/#inscription" onClick={(event) => { event.preventDefault(); onHome(); setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>S'inscrire</a></nav>
      <span className="topbar-spacer" aria-hidden="true" />
    </header>
    <section className="bureau-hero">
      <div><span className="eyebrow"><Sparkles size={15} /> L'ÉQUIPE 2026</span><h1>Des voix différentes.<br /><em>Une même énergie.</em></h1><p>Découvrez le bureau de notre Club de Débat : une équipe passionnée, dynamique et déterminée à faire rayonner l'art de l'éloquence dans notre communauté.</p></div>
      <div className="bureau-hero-mark"><Mic2 className="bureau-hero-mark__icon" size={78} /><span>PARLER<br />POUR<br /><b>AGIR</b></span></div>
    </section>
    <section className="bureau-content">
      <div className="bureau-intro"><span className="section-kicker">LE BUREAU DU CLUB</span><h2>Les personnes<br /><em>derrière les idées.</em></h2><p>Ils animeront et guideront le club cette année, avec une seule ambition : créer un espace où chaque idée mérite d'être entendue.</p><div className="community-links"><a className="community-link community-link--instagram" href="https://www.instagram.com/esisa_debateclub/" target="_blank" rel="noreferrer"><Instagram size={17} /><span><small>Suivez nos actualités</small><strong>Instagram du club</strong></span><ArrowUpRight size={16} /></a><a className="community-link community-link--whatsapp" href="https://chat.whatsapp.com/GlhCH2SstNFB8k6A8rH98d" target="_blank" rel="noreferrer"><MessageCircle size={17} /><span><small>Rejoignez la communauté</small><strong>Groupe WhatsApp</strong></span><ArrowUpRight size={16} /></a></div></div>
      <div className="member-grid">{members.map(([role, handle, emoji], index) => <a className={`member-card ${index === 0 ? 'member-card--lead' : ''}`} key={handle} href={`https://www.instagram.com/${handle}/`} target="_blank" rel="noreferrer"><span className="member-number">0{index + 1}</span><span className="member-avatar">{emoji}</span><span className="member-role">{role}</span><strong>@{handle}</strong><ArrowUpRight size={17} /></a>)}</div>
    </section>
    <section className="bureau-cta"><div><span className="section-kicker">À VOUS DE JOUER</span><h2>Votre voix a sa place<br />autour de la table.</h2></div><a className="gold-button bureau-cta-button" href="/#inscription" onClick={(event) => { event.preventDefault(); onHome(); setTimeout(() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Rejoindre le club <ArrowUpRight size={17} /></a></section>
    <footer className="site-footer">© 2026 Debate Club ESISA · Fès, Maroc</footer>
  </main>
}
