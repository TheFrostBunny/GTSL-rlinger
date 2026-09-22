"use client";

import { useEffect, useMemo, useState } from "react";
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
  Pencil,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";

const placements = [
  {
    name: "GreenTech AS",
    field: "IT",
    desc: "Søker lærling innen IT og teknologi.",
    city: "Oslo",
    initials: "GT",
    color: "bg-[#cbe4dc]",
  },
  {
    name: "Nordic Solutions",
    field: "Utvikling",
    desc: "Spennende læreplass innen utvikling.",
    city: "Bergen",
    initials: "NS",
    color: "bg-[#d8c8ed]",
  },
  {
    name: "Fjord Industri",
    field: "Mekanikk",
    desc: "Læreplass innen mekanisk fagretning.",
    city: "Ålesund",
    initials: "FJ",
    color: "bg-[#dfd4b8]",
  },
  {
    name: "Omsorg Pluss",
    field: "Helse",
    desc: "Læreplass innen helsearbeidfag ved sykehjem og bofellesskap.",
    city: "Trondheim",
    initials: "OP",
    color: "bg-[#cbe4dc]",
  },
  {
    name: "Fjordkraft Elektro",
    field: "Elektro",
    desc: "Læreplass innen elektrofag med moderne verktøy.",
    city: "Trondheim",
    initials: "FE",
    color: "bg-[#d8c8ed]",
  },
  {
    name: "MediaVerket",
    field: "Mediaproduksjon",
    desc: "Læreplass innen mediaproduksjon og innholdsskaping.",
    city: "Bergen",
    initials: "MV",
    color: "bg-[#dfd4b8]",
  },
];

const candidates = [
  {
    name: "Emma Hansen",
    field: "IT",
    desc: "Motivert kandidat med interesse for programmering.",
    city: "Oslo",
    initials: "EH",
    color: "bg-[#cbe4dc]",
  },
  {
    name: "Noah Berg",
    field: "Elektro",
    desc: "Nysgjerrig kandidat med relevant fagbakgrunn.",
    city: "Bergen",
    initials: "NB",
    color: "bg-[#d8c8ed]",
  },
  {
    name: "Sofie Nilsen",
    field: "Design og håndverk",
    desc: "Kreativ kandidat med sans for detaljer.",
    city: "Trondheim",
    initials: "SN",
    color: "bg-[#dfd4b8]",
  },
];

const applications = [
  {
    name: "GreenTech AS",
    field: "IT-driftsfaget",
    city: "Oslo",
    date: "12. sep 2026",
    status: "Matchet",
    initials: "GT",
    color: "bg-[#a45bc0]",
  },
  {
    name: "Nordic Solutions",
    field: "Utviklerfaget",
    city: "Bergen",
    date: "15. sep 2026",
    status: "Venter svar",
    initials: "NS",
    color: "bg-[#b47bc9]",
  },
  {
    name: "Fjord Industri",
    field: "Mekanikerfaget",
    city: "Ålesund",
    date: "18. sep 2026",
    status: "Venter svar",
    initials: "FJ",
    color: "bg-[#512477]",
  },
  {
    name: "Omsorg Pluss",
    field: "Helsearbeiderfaget",
    city: "Trondheim",
    date: "20. sep 2026",
    status: "Avslått",
    initials: "OP",
    color: "bg-[#a45bc0]",
  },
];

const fields = [
  "Alle",
  "IT",
  "Bygg og anlegg",
  "Helse",
  "Mekanikk",
  "Mediaproduksjon",
];

const history = [
  {
    name: "GreenTech AS",
    field: "IT-driftsfaget",
    city: "Oslo",
    date: "12. sep 2026",
  },
  {
    name: "Nordic Solutions",
    field: "Utviklerfaget",
    city: "Bergen",
    date: "15. sep 2026",
  },
  {
    name: "Fjord Industri",
    field: "Mekanikerfaget",
    city: "Ålesund",
    date: "18. sep 2026",
  },
];

const PROFILE_STORAGE_KEY = "laerling-link-profile";

function getInitials(name?: string) {
  const safeName = typeof name === "string" ? name.trim() : "";

  if (!safeName) return "ON";

  return safeName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Sidebar({
  view,
  setView,
  menuOpen,
  setMenuOpen,
  page,
  setPage,
}: {
  view: "learner" | "company";
  setView: (view: "learner" | "company") => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  page: "home" | "browse" | "applications" | "history" | "profile";
  setPage: (
    page: "home" | "browse" | "applications" | "history" | "profile"
  ) => void;
}) {
  const items =
    view === "learner"
      ? [
          ["Hjem", Home],
          ["Finn læreplasser", Search],
          ["Mine søknader", ClipboardList],
          ["Historikk", BarChart3],
          ["Min profil", CircleUserRound],
          ["Innstillinger", Settings],
        ]
      : [
          ["Hjem", Home],
          ["Finn kandidater", Search],
          ["Mine stillinger", ClipboardList],
          ["Søkere", Users],
          ["Bedriftsprofil", Building2],
          ["Innstillinger", Settings],
        ];
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-[372px] border-r border-[#293446] bg-[#17212e] px-7 py-7 ${
        menuOpen ? "block" : "hidden"
      } lg:block`}
    >
      <div className="flex items-center gap-4 border-b border-[#2a3545] pb-8">
        <img
  src="/Logo.png"
  alt="Lærling Link logo"
  className="h-14 w-14 object-contain"
/>
        <span className="text-[27px] font-bold tracking-tight text-[#f2f3f6]">
          Lærling Link
        </span>
        <button
          className="ml-auto text-[#dce2ea] lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Lukk meny"
        >
          <X />
        </button>
      </div>
      <button
        onClick={() => setView(view === "learner" ? "company" : "learner")}
        className="mt-5 flex w-full items-center justify-between rounded-2xl border border-[#39465a] bg-[#202c3b] px-5 py-4 text-left transition hover:border-[#b85cc7] hover:bg-[#283548]"
        aria-label={`Bytt til ${
          view === "learner" ? "bedriftsvisning" : "elevvisning"
        }`}
      >
        <span>
          <span className="block text-xs font-medium uppercase tracking-[0.16em] text-[#91a4bd]">
            Viser som
          </span>
          <span className="mt-1 block text-base font-semibold text-white">
            {view === "learner" ? "Elev" : "Bedrift"}
          </span>
        </span>
        <span className="text-sm font-semibold text-[#d8b3e4]">Bytt</span>
      </button>
      <nav className="mt-8 flex flex-col gap-3">
        {items.map(([label, Icon], index) => {
          const selected =
            (index === 0 && page === "home") ||
            (index === 1 && page === "browse") ||
            (index === 2 && page === "applications") ||
            (index === 3 && page === "history") ||
            (index === 4 && page === "profile");

          return (
            <button
              key={String(label)}
              onClick={() => {
                if (index === 0) setPage("home");
                if (index === 1) setPage("browse");
                if (index === 2) setPage("applications");
                if (index === 3) setPage("history");
                if (index === 4) setPage("profile");
                setMenuOpen(false);
              }}
              className={`flex items-center gap-5 rounded-[22px] px-5 py-4 text-left text-[20px] font-medium transition ${
                selected
                  ? "bg-[#2d2944] text-white"
                  : "text-[#9aaec7] hover:bg-[#202c3b] hover:text-white"
              }`}
            >
              <Icon className={selected ? "text-[#a85ab6]" : ""} />
              {String(label)}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function Topbar({
  view,
  setView,
  setMenuOpen,
  profileName,
}: {
  view: "learner" | "company";
  setView: (view: "learner" | "company") => void;
  setMenuOpen: (open: boolean) => void;
  profileName: string;
}) {
  const initials = getInitials(profileName);

  return (
    <header className="flex h-[102px] items-center justify-between border-b border-[#202a38] px-5 lg:ml-[372px] lg:px-12">
      <button
        className="text-[#dce2ea] lg:hidden"
        onClick={() => setMenuOpen(true)}
        aria-label="Åpne meny"
      >
        <Menu />
      </button>
      <div className="hidden text-sm text-[#91a4bd] lg:block">
        {view === "learner" ? "Oversikt" : "Bedriftsoversikt"}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={() => setView(view === "learner" ? "company" : "learner")}
          className="rounded-full bg-[#302b43] px-4 py-2 text-sm font-semibold text-[#d8b3e4]"
        >
          {view === "learner" ? "Bedrift" : "Elev"}
        </button>
        <span className="text-lg font-semibold text-[#f2f3f6]">
          {profileName}
        </span>
        <div className="flex size-12 items-center justify-center rounded-full border border-[#344155] bg-[#202c3b] text-lg font-bold text-[#9aaec7]">
          {initials}
        </div>
      </div>
    </header>
  );
}

export default function Page() {
  const [view, setView] = useState<"learner" | "company">("learner");
  const [page, setPage] = useState<
    "home" | "browse" | "applications" | "history" | "profile"
  >("home");

  const [editingProfile, setEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    name: "Ola Nordmann",
    email: "ola.nordmann@email.no",
    field: "IT-driftsfaget",
    interests: "Programmering, gaming og teknologi",
    city: "Oslo",
    about:
      "Jeg er en motivert elev med interesse for teknologi og problemløsning.",
  });

  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile((currentProfile) => ({
          ...currentProfile,
          ...parsedProfile,
          name:
            typeof parsedProfile.name === "string" &&
            parsedProfile.name.trim()
              ? parsedProfile.name
              : currentProfile.name,
        }));
      } catch {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
    }

    setProfileLoaded(true);
  }, []);

  useEffect(() => {
    if (profileLoaded) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile, profileLoaded]);

  const [applicationFilter, setApplicationFilter] = useState("Alle");
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [activeField, setActiveField] = useState("Alle");
  const list = view === "learner" ? placements : candidates;
  const active = useMemo(() => list[index % list.length], [index, list]);
  const next = (like: boolean) => {
    if (like && !liked.includes(active.name)) setLiked([...liked, active.name]);
    setIndex(index + 1);
  };
  const filtered = list.filter(
    (item) =>
      (activeField === "Alle" || item.field === activeField) &&
      (item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.field.toLowerCase().includes(query.toLowerCase()) ||
        item.city.toLowerCase().includes(query.toLowerCase()))
  );

  if (page === "applications") {
    const filteredApplications = applications.filter(
      (application) =>
        applicationFilter === "Alle" ||
        (applicationFilter === "Venter svar" &&
          application.status === "Venter svar") ||
        (applicationFilter === "Matchet" && application.status === "Matchet") ||
        (applicationFilter === "Avslått" && application.status === "Avslått")
    );

    return (
      <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
        <Sidebar
          view={view}
          setView={setView}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
        />

        <Topbar view={view} setView={setView} setMenuOpen={setMenuOpen} />

        <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">
            Mine søknader
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            Se og administrer søknadene dine.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Alle", "Venter svar", "Matchet", "Avslått"].map((filter) => (
              <button
                key={filter}
                onClick={() => setApplicationFilter(filter)}
                className={`rounded-2xl px-6 py-3 font-semibold ${
                  applicationFilter === filter
                    ? "bg-[#a45bc0] text-white"
                    : "bg-[#182332] text-[#9aacc3] hover:bg-[#243247]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-5">
            {filteredApplications.map((application) => (
              <article
                key={application.name}
                className="flex items-center gap-6 rounded-[24px] border border-[#29384a] bg-[#172332] p-8"
              >
                <div
                  className={`flex size-20 shrink-0 items-center justify-center rounded-2xl ${application.color} text-2xl font-bold`}
                >
                  {application.initials}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{application.name}</h2>
                  <p className="mt-2 text-xl text-[#91a4bd]">
                    {application.field} · {application.city}
                  </p>
                  <p className="mt-3 text-[#91a4bd]">
                    Sendt {application.date}
                  </p>
                </div>

                <span
                  className={`rounded-2xl px-5 py-3 font-bold ${
                    application.status === "Matchet"
                      ? "bg-[#a45bc0] text-white"
                      : application.status === "Avslått"
                      ? "bg-[#493040] text-[#d9a8c8]"
                      : "bg-[#293545] text-[#d9b3e4]"
                  }`}
                >
                  {application.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (page === "browse") {
    return (
      <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
        <Sidebar
          view={view}
          setView={setView}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
        />

        <Topbar view={view} setView={setView} setMenuOpen={setMenuOpen} />

        <section className="mx-auto max-w-[1300px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">
            {view === "learner" ? "Finn læreplass" : "Finn kandidater"}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {view === "learner"
              ? "Bla gjennom lærebedrifter som matcher din fagretning."
              : "Bla gjennom kandidater som matcher deres behov."}
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-full border border-[#303c4e] bg-[#182332] px-5 py-4">
            <Search className="text-white" size={22} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Søk etter bedrift, fagretning eller sted..."
              className="w-full bg-transparent text-white outline-none placeholder:text-[#91a4bd]"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => setActiveField(field)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold ${
                  activeField === field
                    ? "border-[#a45bc0] bg-[#a45bc0] text-white"
                    : "border-[#29384a] bg-[#182332] text-[#91a4bd] hover:bg-[#243247]"
                }`}
              >
                {field}
              </button>
            ))}
          </div>

          <p className="mt-7 text-sm text-[#91a4bd]">
            {filtered.length} {view === "learner" ? "bedrifter" : "kandidater"}
          </p>

          <div className="mt-3 flex flex-col gap-4">
            {filtered.map((item) => (
              <article
                key={item.name}
                className="flex items-center gap-5 rounded-[22px] border border-[#303c4e] bg-[#222c3b] px-5 py-5"
              >
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${item.color} text-sm font-bold text-[#18202b]`}
                >
                  {item.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="truncate text-sm text-[#91a4bd]">{item.desc}</p>

                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-[#30384a] px-3 py-1 text-xs text-[#d8b3e4]">
                      {item.city}
                    </span>
                    <span className="rounded-full bg-[#30384a] px-3 py-1 text-xs text-[#d8b3e4]">
                      {item.field}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    className="flex size-12 items-center justify-center rounded-full bg-[#2d3848] text-[#91a4bd] hover:bg-[#394658]"
                    aria-label="Avvis"
                  >
                    <X size={20} />
                  </button>

                  <button
                    onClick={() =>
                      setLiked((current) =>
                        current.includes(item.name)
                          ? current.filter((name) => name !== item.name)
                          : [...current, item.name]
                      )
                    }
                    className="flex size-12 items-center justify-center rounded-full bg-[#a45bc0] text-white hover:bg-[#b86bc9]"
                    aria-label="Lik"
                  >
                    <Heart
                      size={20}
                      fill={liked.includes(item.name) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (page === "history") {
    return (
      <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
        <Sidebar
          view={view}
          setView={setView}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
        />

        <Topbar view={view} setView={setView} setMenuOpen={setMenuOpen} />

        <section className="mx-auto max-w-[1250px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">Historikk</h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            Se dine tidligere søknader og aktiviteter.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {history.map((item) => (
              <article
                key={item.name}
                className="rounded-[24px] border border-[#29384a] bg-[#172332] p-7"
              >
                <h2 className="text-2xl font-bold">{item.name}</h2>

                <p className="mt-2 text-lg text-[#91a4bd]">
                  {item.field} · {item.city}
                </p>

                <p className="mt-3 text-lg text-[#91a4bd]">
                  Søknad sendt · {item.date}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (page === "profile") {
    const profileFields = [
      ["name", "Navn"],
      ["email", "E-post"],
      ["field", "Fagretning"],
      ["interests", "Interesser"],
      ["city", "Bosted"],
    ] as const;

    return (
      <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
        <Sidebar
          view={view}
          setView={setView}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          profileName={profile.name}
        />

        <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <p className="text-lg text-[#91a4bd]">Konto og informasjon</p>

          <h1 className="mt-3 text-5xl font-bold tracking-[-0.03em]">
            {view === "learner" ? "Min profil" : "Bedriftsprofil"}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {view === "learner"
              ? "Se og administrer profilinformasjonen din."
              : "Hold bedriftsinformasjonen oppdatert."}
          </p>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#29384a] bg-[#182332]">
            <div className="h-32 bg-gradient-to-r from-[#39254f] via-[#54336a] to-[#202c3b]" />

            <div className="px-8 pb-8">
              <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex size-28 items-center justify-center rounded-full border-8 border-[#182332] bg-[#a45bc0] text-4xl font-bold text-white">
                  ON
                </div>

                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#a45bc0] px-5 py-3 font-semibold text-[#d8b3e4] transition hover:bg-[#a45bc0] hover:text-white"
                >
                  <Pencil size={17} />
                  {editingProfile ? "Avbryt" : "Rediger profil"}
                </button>
              </div>

              <div className="mt-6">
                <h2 className="text-3xl font-bold">{profile.name}</h2>
                <p className="mt-1 text-[#91a4bd]">
                  {view === "learner" ? "Elev" : "Bedrift"} · {profile.city}
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {profileFields.map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#91a4bd]">
                      {label}
                    </span>

                    {editingProfile ? (
                      <input
                        value={profile[key]}
                        onChange={(event) =>
                          setProfile({
                            ...profile,
                            [key]: event.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-[#39465a] bg-[#202c3b] px-4 py-3 text-white outline-none focus:border-[#a45bc0]"
                      />
                    ) : (
                      <div className="rounded-xl border border-[#29384a] bg-[#202c3b] px-4 py-3 text-[#dce2ea]">
                        {profile[key]}
                      </div>
                    )}
                  </label>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-[#91a4bd]">
                  Om meg
                </span>

                {editingProfile ? (
                  <textarea
                    value={profile.about}
                    onChange={(event) =>
                      setProfile({ ...profile, about: event.target.value })
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-[#39465a] bg-[#202c3b] px-4 py-3 text-white outline-none focus:border-[#a45bc0]"
                  />
                ) : (
                  <div className="rounded-xl border border-[#29384a] bg-[#202c3b] px-4 py-3 leading-7 text-[#dce2ea]">
                    {profile.about}
                  </div>
                )}
              </label>

              {editingProfile && (
                <button
                  onClick={() => setEditingProfile(false)}
                  className="mt-6 rounded-xl bg-[#a45bc0] px-6 py-3 font-bold text-white transition hover:bg-[#b86bc9]"
                >
                  Lagre endringer
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
      <Sidebar
        view={view}
        setView={setView}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        page={page}
        setPage={setPage}
      />
      <Topbar view={view} setView={setView} setMenuOpen={setMenuOpen} />
      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[18px] text-[#8fa2bc]">God ettermiddag</p>
            <h1 className="mt-7 text-6xl font-bold leading-[0.98] tracking-[-0.055em] text-[#f4f5f7] sm:text-7xl">
              {view === "learner" ? (
                <>
                  Velkommen
                  <br />
                  tilbake, Ola
                </>
              ) : (
                <>
                  Finn din
                  <br />
                  <span className="text-[#c56bd2]">neste lærling</span>
                </>
              )}
            </h1>
            <p className="mt-8 text-[22px] text-[#91a4bd]">
              {view === "learner"
                ? `${liked.length} nye bedrifter matcher profilen din denne uken.`
                : "Finn motiverte talenter som passer til deres fagmiljø."}
            </p>
            <div className="mt-14 flex gap-16 border-b border-[#263243] pb-8">
              <div>
                <p className="text-4xl font-bold">
                  {view === "learner" ? placements.length : candidates.length}
                </p>
                <p className="mt-1 text-[16px] text-[#91a4bd]">
                  {view === "learner" ? "nye forslag" : "aktive kandidater"}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">{liked.length}</p>
                <p className="mt-1 text-[16px] text-[#91a4bd]">
                  {view === "learner" ? "du har likt" : "favoritter"}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="mt-1 text-[16px] text-[#91a4bd]">venter svar</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[470px] xl:pt-24" id="anbefalinger">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {view === "learner"
                  ? "Anbefalte læreplasser"
                  : "Anbefalte kandidater"}
              </h2>
              <button
                onClick={() => setPage("browse")}
                className="flex items-center gap-1 text-sm font-semibold text-[#b88ec8]"
              >
                Se alle <ChevronRight />
              </button>
            </div>
            <article className="rounded-[22px] border border-[#303c4e] bg-[#222c3b] p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-20 items-center justify-center rounded-2xl ${active.color} text-2xl font-bold text-[#18202b]`}
                >
                  {active.initials}
                </div>
                <div>
                  <h3 className="text-[22px] font-bold">{active.name}</h3>
                  <p className="mt-1 text-[#9aacc3]">{active.field}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[#9aacc3]">
                <span>{active.city}</span>
              </div>
              <p className="mt-5 leading-6 text-[#b2bfd0]">{active.desc}</p>
              <div className="mt-7 flex items-center justify-between">
                <button
                  onClick={() => next(false)}
                  className="flex size-14 items-center justify-center rounded-full bg-[#2d3848] text-[#9aacc3] hover:bg-[#394658]"
                  aria-label="Hopp over"
                >
                  <X />
                </button>
                <span className="text-sm text-[#71849d]">
                  {(index % list.length) + 1} av {list.length}
                </span>
                <button
                  onClick={() => next(true)}
                  className="flex size-14 items-center justify-center rounded-full bg-[#ee6e71] text-[#341b27] hover:bg-[#f27e80]"
                  aria-label="Vis interesse"
                >
                  <Heart fill="currentColor" />
                </button>
              </div>
            </article>
          </div>
        </div>
        <div className="mt-16 rounded-[22px] border border-[#2b3748] bg-[#151e2a] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b85ac4]">
                Neste steg
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {view === "learner"
                  ? "Gjør profilen din synlig"
                  : "Publiser en ny læreplass"}
              </h2>
              <p className="mt-2 text-[#91a4bd]">
                {view === "learner"
                  ? "En komplett profil gir deg 3x flere relevante matcher."
                  : "Nå flere relevante kandidater med en tydelig stillingsprofil."}
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c65ccf] px-5 py-3 font-bold text-white hover:bg-[#d26ddb]">
              Kom i gang <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
