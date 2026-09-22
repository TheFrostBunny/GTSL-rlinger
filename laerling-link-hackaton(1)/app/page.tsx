'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Heart,
  Home,
  Menu,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react'

const placements = [
  { name: 'GreenTech AS', field: 'IT og teknologi', city: 'Oslo', match: 96, initials: 'GT', color: 'bg-[#cbe4dc]' },
  { name: 'Nordic Solutions', field: 'Utvikling', city: 'Bergen', match: 91, initials: 'NS', color: 'bg-[#d8c8ed]' },
  { name: 'Fjordkraft Elektro', field: 'Elektro', city: 'Trondheim', match: 87, initials: 'FE', color: 'bg-[#dfd4b8]' },
]

const candidates = [
  { name: 'Emma Hansen', field: 'IT og teknologi', city: 'Oslo', match: 96, initials: 'EH', color: 'bg-[#cbe4dc]' },
  { name: 'Noah Berg', field: 'Elektro', city: 'Bergen', match: 92, initials: 'NB', color: 'bg-[#d8c8ed]' },
  { name: 'Sofie Nilsen', field: 'Design og håndverk', city: 'Trondheim', match: 88, initials: 'SN', color: 'bg-[#dfd4b8]' },
]

function Sidebar({ view, setView, menuOpen, setMenuOpen }: { view: 'learner' | 'company'; setView: (view: 'learner' | 'company') => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const items = view === 'learner'
    ? [['Hjem', Home], ['Finn læreplasser', Search], ['Mine søknader', ClipboardList], ['Historikk', BarChart3], ['Min profil', CircleUserRound], ['Innstillinger', Settings]]
    : [['Hjem', Home], ['Finn kandidater', Search], ['Mine stillinger', ClipboardList], ['Søkere', Users], ['Bedriftsprofil', Building2], ['Innstillinger', Settings]]
  return <aside className={`fixed inset-y-0 left-0 z-20 w-[372px] border-r border-[#293446] bg-[#17212e] px-7 py-7 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
    <div className="flex items-center gap-4 border-b border-[#2a3545] pb-8">
      <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#d62b9d] text-3xl font-semibold text-[#d62b9d]">Ll</div>
      <span className="text-[27px] font-bold tracking-tight text-[#f2f3f6]">Lærling Link</span>
      <button className="ml-auto text-[#dce2ea] lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Lukk meny"><X /></button>
    </div>
    <button
      onClick={() => setView(view === 'learner' ? 'company' : 'learner')}
      className="mt-5 flex w-full items-center justify-between rounded-2xl border border-[#39465a] bg-[#202c3b] px-5 py-4 text-left transition hover:border-[#b85cc7] hover:bg-[#283548]"
      aria-label={`Bytt til ${view === 'learner' ? 'bedriftsvisning' : 'elevvisning'}`}
    >
      <span>
        <span className="block text-xs font-medium uppercase tracking-[0.16em] text-[#91a4bd]">Viser som</span>
        <span className="mt-1 block text-base font-semibold text-white">{view === 'learner' ? 'Elev' : 'Bedrift'}</span>
      </span>
      <span className="text-sm font-semibold text-[#d8b3e4]">Bytt</span>
    </button>
    <nav className="mt-8 flex flex-col gap-3">
      {items.map(([label, Icon], index) => <button key={String(label)} onClick={() => { if (index === 0) setView(view); setMenuOpen(false) }} className={`flex items-center gap-5 rounded-[22px] px-5 py-4 text-left text-[20px] font-medium transition ${index === 0 ? 'bg-[#2d2944] text-white' : 'text-[#9aaec7] hover:bg-[#202c3b] hover:text-white'}`}><Icon className={index === 0 ? 'text-[#a85ab6]' : ''} />{String(label)}</button>)}
    </nav>
    <div className="absolute bottom-8 left-7 right-7 rounded-2xl border border-[#303b4d] bg-[#1d2938] p-4 text-sm text-[#9aabc0]"><p className="font-semibold text-white">{view === 'learner' ? 'Tips til deg' : 'Kom i gang'}</p><p className="mt-1 leading-5">{view === 'learner' ? 'Oppdater profilen din for bedre matcher.' : 'Legg ut en ny læreplass og finn riktig kandidat.'}</p></div>
  </aside>
}

function Topbar({ view, setView, setMenuOpen }: { view: 'learner' | 'company'; setView: (view: 'learner' | 'company') => void; setMenuOpen: (open: boolean) => void }) {
  return <header className="flex h-[102px] items-center justify-between border-b border-[#202a38] px-5 lg:ml-[372px] lg:px-12"><button className="text-[#dce2ea] lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Åpne meny"><Menu /></button><div className="hidden text-sm text-[#91a4bd] lg:block">{view === 'learner' ? 'Oversikt' : 'Bedriftsoversikt'}</div><div className="ml-auto flex items-center gap-4"><button onClick={() => setView(view === 'learner' ? 'company' : 'learner')} className="rounded-full bg-[#302b43] px-4 py-2 text-sm font-semibold text-[#d8b3e4]">{view === 'learner' ? 'Bedrift' : 'Elev'}</button><span className="text-lg font-semibold text-[#f2f3f6]">Ola Nordmann</span><div className="flex size-12 items-center justify-center rounded-full border border-[#344155] bg-[#202c3b] text-lg font-bold text-[#9aaec7]">ON</div></div></header>
}

export default function Page() {
  const [view, setView] = useState<'learner' | 'company'>('learner')
  const [index, setIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [liked, setLiked] = useState<string[]>([])
  const list = view === 'learner' ? placements : candidates
  const active = useMemo(() => list[index % list.length], [index, list])
  const next = (like: boolean) => { if (like && !liked.includes(active.name)) setLiked([...liked, active.name]); setIndex(index + 1) }

  return <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"><Sidebar view={view} setView={setView} menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><Topbar view={view} setView={setView} setMenuOpen={setMenuOpen} /><section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0"><div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between"><div className="max-w-[720px]"><p className="text-[18px] text-[#8fa2bc]">God ettermiddag</p><h1 className="mt-7 text-6xl font-bold leading-[0.98] tracking-[-0.055em] text-[#f4f5f7] sm:text-7xl">{view === 'learner' ? <>Velkommen<br />tilbake, Ola</> : <>Finn din<br /><span className="text-[#c56bd2]">neste lærling</span></>}</h1><p className="mt-8 text-[22px] text-[#91a4bd]">{view === 'learner' ? `${liked.length} nye bedrifter matcher profilen din denne uken.` : 'Finn motiverte talenter som passer til deres fagmiljø.'}</p><div className="mt-14 flex gap-16 border-b border-[#263243] pb-8"><div><p className="text-4xl font-bold">{view === 'learner' ? placements.length : candidates.length}</p><p className="mt-1 text-[16px] text-[#91a4bd]">{view === 'learner' ? 'nye forslag' : 'aktive kandidater'}</p></div><div><p className="text-4xl font-bold">{liked.length}</p><p className="mt-1 text-[16px] text-[#91a4bd]">{view === 'learner' ? 'du har likt' : 'favoritter'}</p></div><div><p className="text-4xl font-bold">0</p><p className="mt-1 text-[16px] text-[#91a4bd]">venter svar</p></div></div></div><div className="w-full max-w-[470px] xl:pt-24"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{view === 'learner' ? 'Anbefalte læreplasser' : 'Anbefalte kandidater'}</h2><button className="flex items-center gap-1 text-sm font-semibold text-[#b88ec8]">Se alle <ChevronRight /></button></div><article className="rounded-[22px] border border-[#303c4e] bg-[#222c3b] p-6 shadow-2xl"><div className="flex items-center gap-4"><div className={`flex size-20 items-center justify-center rounded-2xl ${active.color} text-2xl font-bold text-[#18202b]`}>{active.initials}</div><div><h3 className="text-[22px] font-bold">{active.name}</h3><p className="mt-1 text-[#9aacc3]">{active.field}</p></div><span className="ml-auto rounded-full bg-[#30384a] px-3 py-1 text-sm font-bold text-[#d8b3e4]">{active.match}%</span></div><div className="mt-6 flex items-center gap-2 text-[#9aacc3]"><span>{active.city}</span><span>•</span><span>{view === 'learner' ? 'Oppstart august 2027' : 'Aktiv i dag'}</span></div><p className="mt-5 leading-6 text-[#b2bfd0]">{view === 'learner' ? 'En spennende læreplass med et inkluderende miljø og gode muligheter for utvikling.' : 'Motivert og nysgjerrig kandidat med relevant interesse for faget.'}</p><div className="mt-7 flex items-center justify-between"><button onClick={() => next(false)} className="flex size-14 items-center justify-center rounded-full bg-[#2d3848] text-[#9aacc3] hover:bg-[#394658]" aria-label="Hopp over"><X /></button><span className="text-sm text-[#71849d]">{(index % list.length) + 1} av {list.length}</span><button onClick={() => next(true)} className="flex size-14 items-center justify-center rounded-full bg-[#ee6e71] text-[#341b27] hover:bg-[#f27e80]" aria-label="Vis interesse"><Heart fill="currentColor" /></button></div></article></div></div><div className="mt-16 rounded-[22px] border border-[#2b3748] bg-[#151e2a] p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b85ac4]">Neste steg</p><h2 className="mt-2 text-2xl font-bold">{view === 'learner' ? 'Gjør profilen din synlig' : 'Publiser en ny læreplass'}</h2><p className="mt-2 text-[#91a4bd]">{view === 'learner' ? 'En komplett profil gir deg 3x flere relevante matcher.' : 'Nå flere relevante kandidater med en tydelig stillingsprofil.'}</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c65ccf] px-5 py-3 font-bold text-white hover:bg-[#d26ddb]">Kom i gang <ArrowRight /></button></div></div></section></main>
}
