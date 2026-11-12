import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, ChevronRight, Clock3, MapPin, ShieldCheck, Sparkles, UserRound, ArrowUpRight, Menu, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Logo } from '../components/Logo'
import { FieldError } from '../components/FieldError'

const levels = ['1ère année', '2ème année', '3ème année', '4ème année', '5ème année']
const sections = [
  { id: 'francaise', label: 'Française', note: 'Argumenter avec finesse' },
  { id: 'arabe', label: 'Arabe', note: 'صوتك، حجتك، تأثيرك' },
  { id: 'anglaise', label: 'Anglaise', note: 'Speak with impact' },
]
const experiences = [
  { id: 'regulierement', label: 'Oui, régulièrement' },
  { id: 'un_peu', label: 'Un peu' },
  { id: 'premiere_fois', label: "Non, c'est une première fois" },
]
const initial = { nom: '', prenom: '', telephone: '', niveau: '', section: '', experience: '', honeypot: '' }

function normalizePhone(value) { return value.replace(/[^\d+]/g, '') }
function validPhone(value) { return /^(?:(?:\+212|00212)[67]\d{8}|0[67]\d{8})$/.test(normalizePhone(value)) }

export function RegistrationPage({ onAdmin, onBureau, onDebate, isConfigured }) {
  const [form, setForm] = useState(initial)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (status.type !== 'success') return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [status.type])

  const errors = useMemo(() => {
    const result = {}
    if (!form.nom.trim()) result.nom = 'Indiquez votre nom.'
    if (!form.prenom.trim()) result.prenom = 'Indiquez votre prénom.'
    if (!form.telephone) result.telephone = 'Indiquez votre numéro de téléphone.'
    else if (!validPhone(form.telephone)) result.telephone = 'Utilisez un numéro marocain valide : 06/07 XX XX XX XX ou +212.'
    if (!form.niveau) result.niveau = 'Sélectionnez votre niveau.'
    if (!form.section) result.section = 'Choisissez une section.'
    if (!form.experience) result.experience = 'Choisissez une réponse.'
    return result
  }, [form])
  const completedFields = [form.nom, form.prenom, form.telephone, form.niveau, form.section, form.experience].filter(Boolean).length
  const progress = Math.round((completedFields / 6) * 100)

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
    setTouched((current) => ({ ...current, [name]: true }))
    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' })
  }
  const submit = async (event) => {
    event.preventDefault()
    setTouched({ nom: true, prenom: true, telephone: true, niveau: true, section: true, experience: true })
    if (Object.keys(errors).length || form.honeypot) return
    setStatus({ type: 'loading', message: '' })
    if (!supabase) {
      setStatus({ type: 'error', message: 'La connexion Supabase n’est pas configurée. Ajoutez les variables du fichier .env.' })
      return
    }
    const niveau = levels.indexOf(form.niveau) + 1
    const { error } = await supabase.from('inscriptions').insert({
      nom: form.nom.trim(), prenom: form.prenom.trim(), telephone: normalizePhone(form.telephone),
      niveau, section: form.section, experience: form.experience,
    })
    if (error) {
      if (error.code === '23505') setStatus({ type: 'error', message: 'Ce numéro est déjà inscrit au Debate Club.' })
      else setStatus({ type: 'error', message: 'Impossible d’enregistrer l’inscription. Réessayez dans un instant.' })
      return
    }
    setStatus({ type: 'success', message: 'Votre inscription est confirmée.' })
    setForm(initial)
    setTouched({})
  }

  return <main className="public-shell">
    <header className="topbar">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <Logo compact /><span>DEBATE CLUB <b>ESISA</b></span>
      </a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} onClick={() => setMenuOpen(false)}><a className="active" href="#accueil">Accueil</a><a href="/le-debat" onClick={(event) => { event.preventDefault(); onDebate() }}>Le débat</a><a href="/bureau" onClick={(event) => { event.preventDefault(); onBureau() }}>Notre bureau</a><a href="#inscription">S'inscrire</a></nav>
      <span className="topbar-spacer" aria-hidden="true" />
    </header>
    <section className="hero">
      <div className="hero-copy" id="accueil">
        <div className="eyebrow"><Sparkles size={15} /> INSCRIPTIONS OUVERTES · 2026</div>
        <h1>Faites entendre<br /><em>votre voix.</em></h1>
        <p>Un espace convivial pour développer votre prise de parole en public, affiner votre esprit critique et apprendre à convaincre avec assurance.</p>
        <div className="hero-actions"><a className="hero-button" href="#inscription">Rejoindre le club <ArrowUpRight size={17} /></a><a className="hero-text-link" href="/bureau" onClick={(event) => { event.preventDefault(); onBureau() }}>Rencontrer le bureau <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="hero-logo"><Logo /></div>
    </section>
    <section className="welcome-strip"><div><span className="section-kicker">BIENVENUE AU CLUB DE DÉBAT</span><h2>Des idées qui circulent.<br /><em>Des voix qui s'affirment.</em></h2></div><p>Ateliers, joutes oratoires et échanges passionnants vous attendent tout au long de l'année. 💬✨</p></section>
    <section className="registration-card" id="inscription">
      <div className="card-heading">
        <div><span className="section-kicker">BIENVENUE AU CLUB</span><h2>Rejoins le Debate Club ESISA</h2><p>Quelques informations pour commencer votre aventure.</p><div className="form-status"><span className="form-status__line" style={{ '--progress': `${progress}%` }} /><span>{progress === 100 ? 'PRÊT À NOUS REJOINDRE' : `${progress}% · INSCRIPTION EN 2 MINUTES`}</span></div></div>
        <div className="heading-icon"><UserRound size={22} /></div>
      </div>
      {status.type === 'error' && <div className="alert-box" role="alert">{status.message}</div>}
      <form onSubmit={submit} noValidate>
        <div className="form-grid">
          <label className="field"><span>Nom <b>*</b></span><input value={form.nom} onChange={(e) => update('nom', e.target.value)} onBlur={() => setTouched((v) => ({ ...v, nom: true }))} placeholder="Votre nom" />{touched.nom && <FieldError>{errors.nom}</FieldError>}</label>
          <label className="field"><span>Prénom <b>*</b></span><input value={form.prenom} onChange={(e) => update('prenom', e.target.value)} onBlur={() => setTouched((v) => ({ ...v, prenom: true }))} placeholder="Votre prénom" />{touched.prenom && <FieldError>{errors.prenom}</FieldError>}</label>
          <label className="field"><span>Téléphone <b>*</b></span><input type="tel" value={form.telephone} onChange={(e) => update('telephone', e.target.value)} onBlur={() => setTouched((v) => ({ ...v, telephone: true }))} placeholder="06 12 34 56 78" />{touched.telephone && <FieldError>{errors.telephone}</FieldError>}</label>
          <label className="field"><span>Niveau d'étude <b>*</b></span><select value={form.niveau} onChange={(e) => update('niveau', e.target.value)} onBlur={() => setTouched((v) => ({ ...v, niveau: true }))}><option value="">Sélectionnez votre niveau</option>{levels.map((level) => <option key={level}>{level}</option>)}</select>{touched.niveau && <FieldError>{errors.niveau}</FieldError>}</label>
        </div>
        <fieldset className="choice-group"><legend>Section souhaitée <b>*</b></legend><div className="choice-grid">{sections.map((item) => <label className={`choice-card ${form.section === item.id ? 'selected' : ''}`} key={item.id}><input type="radio" name="section" value={item.id} checked={form.section === item.id} onChange={(e) => update('section', e.target.value)} /><span className="radio-mark" /><span><strong>{item.label}</strong><small>{item.note}</small></span></label>)}</div>{touched.section && <FieldError>{errors.section}</FieldError>}</fieldset>
        <fieldset className="choice-group"><legend>Avez-vous une expérience préalable en débat, prise de parole en public ou éloquence ? <b>*</b></legend><div className="experience-list">{experiences.map((item) => <label className={`experience-option ${form.experience === item.id ? 'selected' : ''}`} key={item.id}><input type="radio" name="experience" value={item.id} checked={form.experience === item.id} onChange={(e) => update('experience', e.target.value)} /><span className="radio-mark" /><span>{item.label}</span></label>)}</div>{touched.experience && <FieldError>{errors.experience}</FieldError>}</fieldset>
        <input className="honeypot" tabIndex="-1" autoComplete="off" value={form.honeypot} onChange={(e) => update('honeypot', e.target.value)} aria-hidden="true" />
        <button className="submit-button" type="submit" disabled={status.type === 'loading'}>{status.type === 'loading' ? 'Inscription en cours…' : <>S'inscrire au club <ChevronRight size={19} /></>}</button>
        <div className="form-footer"><ShieldCheck size={16} /><span>Vos informations restent confidentielles et sont utilisées uniquement pour l'organisation du club.</span><Clock3 size={16} /><span>2 minutes</span></div>
      </form>
    </section>
    <footer className="site-footer">© 2026 Debate Club ESISA · Fès, Maroc</footer>
    {status.type === 'success' && <div className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <div className="success-modal__glow" />
      <div className="success-modal__content">
        <div className="success-modal__logo"><Logo /></div>
        <div className="success-modal__icon"><CheckCircle2 size={30} /></div>
        <span className="section-kicker">INSCRIPTION VALIDÉE</span>
        <h2 id="success-title">Félicitations !</h2>
        <p className="success-modal__intro">Votre inscription au Debate Club ESISA a bien été enregistrée.</p>
        <div className="success-modal__event">
          <div><CalendarDays size={22} /><span><strong>Jeudi 15 octobre 2026</strong><small>Rendez-vous à 12h30</small></span></div>
          <div><MapPin size={22} /><span><strong>Bureaux des étudiants</strong><small>En face de l'amphi</small></span></div>
        </div>
        <p className="success-modal__note">On vous attend le jour J. À très bientôt pour votre première rencontre !</p>
        <button className="success-modal__button" onClick={() => setStatus({ type: 'idle', message: '' })}>Retour à l'accueil <ChevronRight size={18} /></button>
      </div>
    </div>}
  </main>
}
