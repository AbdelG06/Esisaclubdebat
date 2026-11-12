export function Logo({ compact = false }) {
  return <img className={compact ? 'logo logo--compact' : 'logo'} src="/logo.png" alt="Logo Debate Club ESISA" />
}
