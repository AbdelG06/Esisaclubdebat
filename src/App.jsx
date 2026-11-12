import { useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabase'
import { AdminPage } from './pages/AdminPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { BureauPage } from './pages/BureauPage'
import { DebatePage } from './pages/DebatePage'

export default function App() {
  const [route, setRoute] = useState(window.location.pathname)
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const goAdmin = () => {
    window.history.pushState({}, '', '/admin')
    setRoute('/admin')
  }

  const goHome = () => {
    window.history.pushState({}, '', '/')
    setRoute('/')
  }
  const goBureau = () => {
    window.history.pushState({}, '', '/bureau')
    setRoute('/bureau')
  }
  const goDebate = () => {
    window.history.pushState({}, '', '/le-debat')
    setRoute('/le-debat')
  }

  if (route.startsWith('/admin')) {
    return <AdminPage session={session} onHome={goHome} isConfigured={isSupabaseConfigured} />
  }
  if (route.startsWith('/bureau')) {
    return <BureauPage onHome={goHome} onAdmin={goAdmin} onDebate={goDebate} />
  }
  if (route.startsWith('/le-debat')) {
    return <DebatePage onHome={goHome} onBureau={goBureau} />
  }
  return <RegistrationPage onAdmin={goAdmin} onBureau={goBureau} onDebate={goDebate} isConfigured={isSupabaseConfigured} />
}
