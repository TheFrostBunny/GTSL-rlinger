"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
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

import data from "./data.json";

const { placements, candidates, applications, fields, history } = data;

const PROFILE_STORAGE_KEY = "laerling-link-profile";
const SETTINGS_STORAGE_KEY = "laerling-link-settings";
const COMPANY_PROFILE_STORAGE_KEY = "laerling-link-company-profile";

type PageName =
  | "home"
  | "browse"
  | "applications"
  | "history"
  | "profile"
  | "settings"
  | "details";

type ProfileData = {
  name: string;
  email: string;
  field: string;
  interests: string;
  city: string;
  about: string;
};

const translations = {
  Norsk: {
    overview: "Oversikt",
    companyOverview: "Bedriftsoversikt",
    home: "Hjem",
    browsePlacements: "Finn læreplasser",
    browseCandidates: "Finn kandidater",
    applications: "Mine søknader",
    history: "Historikk",
    profile: "Min profil",
    settings: "Innstillinger",
    welcome: "Velkommen",
    back: "Tilbake",
    viewAll: "Se alle",
    editProfile: "Rediger profil",
    getStarted: "Kom i gang",
    language: "Språk",
    norwegian: "Norsk",
    english: "English",
    administer: "Se og administrer søknadene dine.",
    sent: "Sendt",
    backToOverView: "← Tilbake til oversikten",
    addToFavorites: "Legg til i favoritter",
    removeFromFavorites: "Fjern fra favoritter",
    findApprenticeSpot: "Finn læreplass",
    findCandidates: "Finn kandidater",
    viewCompanies: "Bla gjennom lærebedrifter som matcher din fagretning.",
    viewStudents: "Bla gjennom kandidater som matcher deres behov.",
    search: "Søk etter bedrift, fagretning eller sted...",
    companies: "Lærebedrift",
    candidates: "Kandidater",
    removeFavorite: "Fjern liker",
    addFavorite: "Vis interesse",
    historyTitle: "Se dine tidligere søknader og aktiviteter.",
    applicationSent: "Søknad sendt",
    companyName: "Bedriftsnavn",
    companyEmail: "Kontakt-e-post",
    companyField: "Bransje",
    companyInterests: "Tjenester",
    companyCity: "Beliggenhet",
    studentName: "Navn",
    studentEmail: "E-post",
    studentField: "Fagretning",
    studentInterests: "Interesser",
    studentCity: "Bosted",
    account: "Konto og informasjon",
    myProfile: "Min profil",
    companyProfile: "Bedriftsprofil",
    manageProfile: "Se og administrer profilinformasjonen din.",
    manageCompanyProfile: "Hold bedriftsinformasjonen oppdatert.",
    student: "Student",
    company: "Bedrift",
    aboutMe: "Om meg",
    saveChanges: "Lagre endringer",
    settingTitle: "Tilpass hvordan Lærling Link fungerer for deg.",
    choseLanguage: "Velg språket du ønsker å bruke.",
    notifications: "Varsler og personvern",
    emailNotifications: "E-postvarsler",
    recieveUpdates: "Motta oppdateringer om søknader og matcher.",
    visibleProfile: "Synlig profil",
    showProfile: "La relevante bedrifter finne profilen din.",
    updateProfile: "Rediger profil",
    greeting: "God ettermiddag",
    velcome: "Velkommen",
    backWord: "tilbake",
    findYour: "Finn din",
    nextApprentice: "neste lærling",
    newCompanyMatches: "nye bedrifter matcher profilen din denne uken.",
    findStudents: "Finn motiverte talenter som passer til deres fagmiljø.",
    newSuggestions: "nye forslag",
    activeCandidates: "aktive kandidater",
    liked: "du har likt",
    favourites: "favoritter",
    awaitingAnswer: "venter svar",
    recommendedCompanies: "Anbefalte læreplasser",
    recommendedCandidates: "Anbefalte kandidater",
    seeAll: "Se alle",
    of: "av",
    nextStep: "Neste steg",
    makeProfileVisible: "Gjør profilen din synlig",
    publishCompany: "Publiser en ny læreplass",
    completedProfile: "En komplett profil gir deg 3x flere relevante matcher.",
    completedCompanyProfile:
      "Nå flere relevante kandidater med en tydelig stillingsprofil.",
    personalChoice: "Personlige valg",
    showsAs: "Viser som",
  },
  English: {
    overview: "Overview",
    companyOverview: "Company overview",
    home: "Home",
    browsePlacements: "Find apprenticeships",
    browseCandidates: "Find candidates",
    applications: "My applications",
    history: "History",
    profile: "My profile",
    settings: "Settings",
    welcome: "Welcome",
    back: "Back",
    viewAll: "View all",
    editProfile: "Edit profile",
    getStarted: "Get started",
    language: "Language",
    norwegian: "Norwegian",
    english: "English",
    administer: "See and administer your applications.",
    sent: "Sent",
    backToOverView: "← Back to overview",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    findApprenticeSpot: "Find apprenticeship",
    findCandidates: "Find candidates",
    viewCompanies: "View training companies that match your path.",
    viewStudents: "View candidates that match your needs.",
    search: "Search for a company, path eller location...",
    companies: "Training companies",
    candidates: "Candidates",
    removeFavorite: "Remove like",
    addFavorite: "Show interest",
    historyTitle: "See your previous applications and activities.",
    applicationSent: "Application sent",
    companyName: "Company name",
    companyEmail: "Contact email",
    companyField: "Field",
    companyInterests: "Services",
    companyCity: "Location",
    studentName: "Name",
    studentEmail: "Email",
    studentField: "Path",
    studentInterests: "Interests",
    studentCity: "Address",
    account: "Account and information",
    myProfile: "My profile",
    companyProfile: "Compay profile",
    manageProfile: "See and administrate your profile information.",
    manageCompanyProfile: "Keep company information updated.",
    student: "Student",
    company: "Company",
    aboutMe: "About me",
    saveChanges: "Save changes",
    settingTitle: "Adjust how Lærling Link works for you.",
    choseLanguage: "Chose the language you want to use.",
    notifications: "Notifications and privacy",
    emailNotifications: "Email notifications",
    visibleProfile: "Visible profile",
    updateProfile: "Update profile",
    greeting: "Good afternoon",
    velcome: "Velcome",
    backWord: "back",
    findYour: "Find your",
    nextApprentice: "next apprentice",
    newCompanyMatches: "new company matches your profile this week.",
    findStudents: "Find motivated talents that fit your environment.",
    newSuggestions: "new suggestions",
    activeCandidates: "active candidates",
    liked: "you have liked",
    favourites: "favourites",
    awaitingAnswer: "awaiting answer",
    recommendedCompanies: "Recommended companies",
    recommendedCandidates: "Recommended candidates",
    seeAll: "See all",
    of: "of",
    nextStep: "Next step",
    makeProfileVisible: "Make your profile visible",
    publishCompany: "Publish company",
    completedProfile: "A complete profile gives you 3x more relevant matches.",
    completedCompanyProfile:
      "Reach more relevant candidates with a clear job profile.",
    personalChoice: "Personal choices",
    showsAs: "Shows as",
  },
} as const;

const translationsWithNynorsk = {
  ...translations,
  Nynorsk: {
    ...translations.Norsk,
    overview: "Oversyn",
    companyOverview: "Bedriftsoversyn",
    home: "Heim",
    browsePlacements: "Finn læreplassar",
    browseCandidates: "Finn kandidatar",
    applications: "Søknadene mine",
    history: "Historikk",
    profile: "Profilen min",
    settings: "Innstillingar",
    welcome: "Velkomen",
    back: "Tilbake",
    viewAll: "Se alle",
    editProfile: "Rediger profil",
    getStarted: "Kom i gang",
    language: "Språk",
    norwegian: "Norsk",
    english: "Engelsk",
    search: "Søk etter bedrift, fagretning eller stad...",
    companies: "Lærebedrifter",
    candidates: "Kandidatar",
    findApprenticeSpot: "Finn læreplass",
    findCandidates: "Finn kandidatar",
    viewCompanies: "Sjå lærebedrifter som passar fagretninga di.",
    viewStudents: "Sjå kandidatar som passar behova dykkar.",
    personalChoice: "Personlege val",
    showsAs: "Viser som",
    student: "Elev",
    company: "Bedrift",
    saveChanges: "Lagre endringar",
    settingTitle: "Tilpass korleis Lærling Link fungerer for deg.",
    choseLanguage: "Vel språket du ønskjer å bruke.",
    notifications: "Varsel og personvern",
    emailNotifications: "E-postvarsel",
    visibleProfile: "Synleg profil",
    updateProfile: "Rediger profil",
  },
} as const;

type Language = keyof typeof translationsWithNynorsk;
type TranslationKey = keyof typeof translationsWithNynorsk.Norsk;

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

type SettingsState = {
  language: Language;
  emailNotifications: boolean;
  profileVisible: boolean;
  darkMode: boolean;
};

function Sidebar({
  view,
  setView,
  menuOpen,
  setMenuOpen,
  page,
  setPage,
  translate,
}: {
  view: "learner" | "company";
  setView: (view: "learner" | "company") => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  page: PageName;
  setPage: (page: PageName) => void;
  translate: (key: TranslationKey) => string;
}) {
  const items =
    view === "learner"
      ? [
          [translate("home"), Home],
          [translate("browsePlacements"), Search],
          [translate("applications"), ClipboardList],
          [translate("history"), BarChart3],
          [translate("profile"), CircleUserRound],
          [translate("settings"), Settings],
        ]
      : [
          [translate("home"), Home],
          [translate("browseCandidates"), Search],
          [translate("applications"), ClipboardList],
          [translate("candidates"), Users],
          [translate("companyProfile"), Building2],
          [translate("settings"), Settings],
        ];
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex h-dvh w-[300px] max-w-[85vw] flex-col overflow-y-scroll overscroll-contain border-r border-[#293446] bg-[#17212e] px-5 py-5 sm:px-7 sm:py-7 ${
        menuOpen ? "flex" : "hidden"
      } lg:flex`}
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
            {translate("showsAs")}
          </span>
          <span className="mt-1 block text-base font-semibold text-white">
            {view === "learner" ? translate("student") : translate("company")}
          </span>
        </span>
        <span className="text-sm font-semibold text-[#d8b3e4]">Bytt</span>
      </button>
      <nav className="mt-8 flex flex-col gap-2 pb-8">
        {items.map(([label, Icon], index) => {
          const selected =
            (index === 0 && page === "home") ||
            (index === 1 && page === "browse") ||
            (index === 2 && page === "applications") ||
            (index === 3 && page === "history") ||
            (index === 4 && page === "profile") ||
            (index === 5 && page === "settings");

          return (
            <button
              key={String(label)}
              onClick={() => {
                if (index === 0) setPage("home");
                if (index === 1) setPage("browse");
                if (index === 2) setPage("applications");
                if (index === 3) setPage("history");
                if (index === 4) setPage("profile");
                if (index === 5) setPage("settings");
                setMenuOpen(false);
              }}
              className={`flex min-h-12 shrink-0 items-center gap-4 rounded-2xl px-4 py-3 text-left text-base font-medium transition sm:text-lg ${
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
  translate,
}: {
  view: "learner" | "company";
  setView: (view: "learner" | "company") => void;
  setMenuOpen: (open: boolean) => void;
  profileName?: string;
  translate: (key: TranslationKey) => string;
}) {
  const safeProfileName =
    typeof profileName === "string" && profileName.trim()
      ? profileName
      : "Ola Nordmann";

  const initials = getInitials(safeProfileName);

  return (
    <header className="flex min-h-[80px] items-center justify-between gap-3 border-b border-[#202a38] px-4 lg:ml-[372px] lg:h-[102px] lg:px-12">
      <button
        className="text-[#dce2ea] lg:hidden"
        onClick={() => setMenuOpen(true)}
        aria-label="Åpne meny"
      >
        <Menu />
      </button>

      <div className="hidden text-sm text-[#91a4bd] lg:block">
        {view === "learner"
          ? translate("overview")
          : translate("companyOverview")}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={() => setView(view === "learner" ? "company" : "learner")}
          className="rounded-full bg-[#302b43] px-4 py-2 text-sm font-semibold text-[#d8b3e4]"
        >
          {view === "learner" ? translate("student") : translate("company")}
        </button>

        <span className="hidden text-lg font-semibold text-[#f2f3f6] sm:block">
          {safeProfileName}
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
  const [page, setPage] = useState<PageName>("home");

  const [selectedItem, setSelectedItem] = useState<
    (typeof placements)[number] | null
  >(null);

  const openDetails = (item: (typeof placements)[number]) => {
    setSelectedItem(item);
    setPage("details");
  };

  const [editingProfile, setEditingProfile] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
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
            typeof parsedProfile.name === "string" && parsedProfile.name.trim()
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

  const [savedApplications, setSavedApplications] =
    useState<typeof applications>(applications);
  const [applicationsLoaded, setApplicationsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("laerling-link-applications");

    if (saved) {
      try {
        setSavedApplications(JSON.parse(saved));
      } catch {
        localStorage.removeItem("laerling-link-applications");
      }
    }

    setApplicationsLoaded(true);
  }, []);

  useEffect(() => {
    if (applicationsLoaded) {
      localStorage.setItem(
        "laerling-link-applications",
        JSON.stringify(savedApplications)
      );
    }
  }, [savedApplications, applicationsLoaded]);

  const [applicationFilter, setApplicationFilter] = useState("Alle");
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likedByView, setLikedByView] = useState({
    learner: [] as string[],
    company: [] as string[],
  });

  const liked = likedByView[view];

  const toggleLiked = (name: string) => {
    setLikedByView((current) => {
      const currentLiked = current[view];

      return {
        ...current,
        [view]: currentLiked.includes(name)
          ? currentLiked.filter((likedName) => likedName !== name)
          : [...currentLiked, name],
      };
    });
  };

  const showPrevious = () => {
    setIndex((currentIndex) =>
      currentIndex === 0 ? list.length - 1 : currentIndex - 1
    );
  };

  const showNext = () => {
    setIndex((currentIndex) => (currentIndex + 1) % list.length);
  };

  const [query, setQuery] = useState("");
  const [activeField, setActiveField] = useState("Alle");
  const list = view === "learner" ? placements : candidates;
  const active = useMemo(() => list[index % list.length], [index, list]);
  const filtered = list.filter(
    (item) =>
      (activeField === "Alle" || item.field === activeField) &&
      (item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.field.toLowerCase().includes(query.toLowerCase()) ||
        item.city.toLowerCase().includes(query.toLowerCase()))
  );

  const [settings, setSettings] = useState<SettingsState>({
    language: "Norsk",
    emailNotifications: true,
    profileVisible: true,
    darkMode: true,
  });

  const text =
    translationsWithNynorsk[settings.language] ??
    translationsWithNynorsk.Norsk;

  const translate = (key: TranslationKey) => text[key];

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (savedSettings) {
      try {
        setSettings((current) => ({
          ...current,
          ...JSON.parse(savedSettings),
        }));
      } catch {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const companyProfile = {
    name: "GreenTech AS",
    email: "kontakt@greentech.no",
    field: "Teknologi og IT",
    interests: "IT-drift, utvikling og digitale løsninger",
    city: "Oslo",
    about: "GreenTech AS tilbyr læreplasser innen teknologi og IT.",
  };

  const activeProfile = view === "company" ? companyProfile : profile;

  const updateActiveProfile = (key: keyof ProfileData, value: string) => {
    if (view === "company") {
      setCompanyProfile((current) => ({
        ...current,
        [key]: value,
      }));
    } else {
      setProfile((current) => ({
        ...current,
        [key]: value,
      }));
    }
  };

  useEffect(() => {
    const savedCompanyProfile = localStorage.getItem(
      COMPANY_PROFILE_STORAGE_KEY
    );

    if (savedCompanyProfile) {
      try {
        setCompanyProfile((current) => ({
          ...current,
          ...JSON.parse(savedCompanyProfile),
        }));
      } catch {
        localStorage.removeItem(COMPANY_PROFILE_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      COMPANY_PROFILE_STORAGE_KEY,
      JSON.stringify(companyProfile)
    );
  }, [companyProfile]);

  if (page === "applications") {
    const filteredApplications = savedApplications.filter(
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
          translate={translate}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          translate={translate}
        />

        <section className="mx-auto max-w-[1120px] px-4 pb-12 pt-8 sm:px-6 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">
            {translate("applications")}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {translate("administer")}
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
                    {translate("sent")} {application.date}
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

  if (page === "details") {
    if (!selectedItem) {
      setPage("browse");
      return null;
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
          translate={translate}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          translate={translate}
        />

        <section className="mx-auto max-w-[900px] px-4 pb-20 pt-8 sm:px-6 lg:ml-[428px] lg:mr-12 lg:px-0 lg:pt-16">
          <button
            onClick={() => setPage("browse")}
            className="mb-8 text-sm font-semibold text-[#c9a1d5] hover:text-white"
          >
            {translate("backToOverView")}
          </button>
          <article className="rounded-3xl border border-[#303c4e] bg-[#182332] p-5 shadow-xl sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div
                className={`flex size-20 shrink-0 items-center justify-center rounded-2xl ${selectedItem.color} text-2xl font-bold text-[#18202b]`}
              >
                {selectedItem.initials}
              </div>
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl">
                  {selectedItem.name}
                </h1>
                <p className="mt-2 text-[#91a4bd]">
                  {selectedItem.field} · {selectedItem.city}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-[#303c4e] pt-6">
              <h2 className="text-xl font-bold">Om {selectedItem.name}</h2>
              <p className="mt-3 leading-7 text-[#b2bfd0]">
                {selectedItem.desc}
              </p>
            </div>

            <button
              onClick={() => toggleLiked(selectedItem.name)}
              className="mt-8 rounded-xl bg-[#a45bc0] px-5 py-3 font-bold text-white transition hover:bg-[#b86bc9]"
            >
              {liked.includes(selectedItem.name)
                ? translate("removeFromFavorites")
                : translate("addToFavorites")}
            </button>
          </article>
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
          translate={translate}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          translate={translate}
        />

        <section className="mx-auto max-w-[1300px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">
            {view === "learner"
              ? translate("findApprenticeSpot")
              : translate("findCandidates")}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {view === "learner"
              ? translate("viewCompanies")
              : translate("viewStudents")}
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-full border border-[#303c4e] bg-[#182332] px-5 py-4">
            <Search className="text-white" size={22} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={translate("search")}
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
            {filtered.length}{" "}
            {view === "learner"
              ? translate("companies")
              : translate("candidates")}
          </p>

          <div className="mt-3 flex flex-col gap-4">
            {filtered.map((item) => (
              <article
                key={item.name}
                onClick={() => openDetails(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openDetails(item);
                  }
                }}
                tabIndex={0}
                role="button"
                className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-[#303c4e] bg-[#222c3b] p-4 transition hover:-translate-y-0.5 hover:border-[#a45bc0] hover:bg-[#283548] focus:outline-none focus:ring-2 focus:ring-[#a45bc0] sm:gap-5 sm:p-5"
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
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleLiked(item.name);
                  }}
                  className={`ml-auto flex size-12 shrink-0 items-center justify-center rounded-full ${
                    liked.includes(item.name)
                      ? "bg-[#ee6e71] text-[#341b27]"
                      : "bg-[#2d3848] text-[#9aacc3]"
                  }`}
                  aria-label={
                    liked.includes(item.name)
                      ? translate("removeFavorite")
                      : translate("addFavorite")
                  }
                  aria-pressed={liked.includes(item.name)}
                >
                  <Heart
                    size={20}
                    fill={liked.includes(item.name) ? "currentColor" : "none"}
                  />
                </button>
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
          translate={translate}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          translate={translate}
        />

        <section className="mx-auto max-w-[1250px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1 className="text-5xl font-bold tracking-[-0.03em]">
            {translate("history")}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {translate("historyTitle")}
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
                  {translate("applicationSent")} · {item.date}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (page === "profile") {
    const profileFields =
      view === "company"
        ? ([
            ["name", translate("companyName")],
            ["email", translate("companyEmail")],
            ["field", translate("companyField")],
            ["interests", translate("companyInterests")],
            ["city", translate("companyCity")],
          ] as const)
        : ([
            ["name", translate("studentName")],
            ["email", translate("studentEmail")],
            ["field", translate("studentField")],
            ["interests", translate("studentInterests")],
            ["city", translate("studentCity")],
          ] as const);

    return (
      <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
        <Sidebar
          view={view}
          setView={setView}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
          translate={translate}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          profileName={activeProfile.name}
          translate={translate}
        />

        <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <p className="text-lg text-[#91a4bd]">{translate("account")}</p>

          <h1 className="mt-3 text-5xl font-bold tracking-[-0.03em]">
            {view === "learner"
              ? translate("myProfile")
              : translate("companyProfile")}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {view === "learner"
              ? translate("manageProfile")
              : translate("manageCompanyProfile")}
          </p>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#29384a] bg-[#182332]">
            <div className="h-32 bg-gradient-to-r from-[#39254f] via-[#54336a] to-[#202c3b]" />

            <div className="px-8 pb-8">
              <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex size-28 items-center justify-center rounded-full border-8 border-[#182332] bg-[#a45bc0] text-4xl font-bold text-white">
                  {getInitials(activeProfile.name)}
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
                  {view === "learner"
                    ? translate("student")
                    : translate("company")}
                  · {profile.city}
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
                          updateActiveProfile(key, event.target.value)
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
                  {translate("aboutMe")}
                </span>

                {editingProfile ? (
                  <textarea
                    value={activeProfile.about}
                    onChange={(event) =>
                      updateActiveProfile("about", event.target.value)
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
                  {translate("saveChanges")}
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (page === "settings") {
    return (
      <main className="min-h-screen bg-[#0e131b] text-[#f2f3f6]">
        <Sidebar
          view={view}
          setView={setView}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          page={page}
          setPage={setPage}
          translate={translate}
        />

        <Topbar
          view={view}
          setView={setView}
          setMenuOpen={setMenuOpen}
          profileName={profile.name || "Ola Nordmann"}
          translate={translate}
        />

        <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <p className="text-lg text-[#91a4bd]">
            {translate("personalChoice")}
          </p>
          <h1 className="mt-3 text-5xl font-bold">{translate("settings")}</h1>
          <p className="mt-3 text-lg text-[#91a4bd]">
            {translate("settingTitle")}
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-3xl border border-[#29384a] bg-[#182332] p-7">
              <h2 className="text-2xl font-bold">{translate("language")}</h2>
              <p className="mt-2 text-[#91a4bd]">
                {translate("choseLanguage")}
              </p>

              <select
                value={settings.language}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    language: event.target.value as Language,
                  })
                }
                className="mt-5 w-full rounded-xl border border-[#39465a] bg-[#202c3b] px-4 py-3 text-white outline-none focus:border-[#a45bc0]"
              >
                <option value="Norsk">{translate("norwegian")}</option>
                <option value="Nynorsk">Nynorsk</option>
                <option value="English">{translate("english")}</option>
              </select>
            </div>

            <div className="rounded-3xl border border-[#29384a] bg-[#182332] p-7">
              <h2 className="text-2xl font-bold">
                {translate("notifications")}
              </h2>

              <label className="mt-6 flex items-center justify-between gap-5 border-b border-[#29384a] pb-5">
                <span>
                  <span className="block font-semibold">
                    {translate("emailNotifications")}
                  </span>
                  <span className="text-sm text-[#91a4bd]">
                    {translate("recieveUpdates")}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(event) =>
                    setSettings({
                      ...settings,
                      emailNotifications: event.target.checked,
                    })
                  }
                  className="size-5 accent-[#a45bc0]"
                />
              </label>

              <label className="mt-5 flex items-center justify-between gap-5">
                <span>
                  <span className="block font-semibold">
                    {translate("visibleProfile")}
                  </span>
                  <span className="text-sm text-[#91a4bd]">
                    {translate("showProfile")}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.profileVisible}
                  onChange={(event) =>
                    setSettings({
                      ...settings,
                      profileVisible: event.target.checked,
                    })
                  }
                  className="size-5 accent-[#a45bc0]"
                />
              </label>
            </div>

            <div className="rounded-3xl border border-[#29384a] bg-[#182332] p-7">
              <h2 className="text-2xl font-bold">{translate("account")}</h2>
              <p className="mt-2 text-[#91a4bd]">{profile.email}</p>

              <button
                onClick={() => setPage("profile")}
                className="mt-5 rounded-xl bg-[#a45bc0] px-5 py-3 font-bold text-white transition hover:bg-[#b86bc9]"
              >
                {translate("updateProfile")}
              </button>
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
        translate={translate}
      />
      <Topbar
        view={view}
        setView={setView}
        setMenuOpen={setMenuOpen}
        translate={translate}
      />
      <section className="mx-auto max-w-[1120px] px-4 pb-12 pt-8 sm:px-6 lg:ml-[428px] lg:mr-12 lg:px-0">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[18px] text-[#8fa2bc]">
              {translate("greeting")}
            </p>
            <h1 className="mt-7 text-6xl font-bold leading-[0.98] tracking-[-0.055em] text-[#f4f5f7] sm:text-7xl">
              {view === "learner" ? (
                <>
                  {translate("velcome")}
                  <br />
                  {translate("backWord")}, {profile.name}
                </>
              ) : (
                <>
                  {translate("findYour")}
                  <br />
                  <span className="text-[#c56bd2]">
                    {translate("nextApprentice")}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-8 text-[22px] text-[#91a4bd]">
              {view === "learner"
                ? `${
                    likedByView[view === "learner" ? "company" : "learner"]
                      .length
                  }${translate("newCompanyMatches")}`
                : translate("findStudents")}
            </p>
            <div className="mt-14 flex gap-16 border-b border-[#263243] pb-8">
              <div>
                <p className="text-4xl font-bold">
                  {view === "learner" ? placements.length : candidates.length}
                </p>
                <p className="mt-1 text-[16px] text-[#91a4bd]">
                  {view === "learner"
                    ? translate("newSuggestions")
                    : translate("activeCandidates")}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">{liked.length}</p>
                <p className="mt-1 text-[16px] text-[#91a4bd]">
                  {view === "learner"
                    ? translate("liked")
                    : translate("favourites")}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">0</p>
                <p className="mt-1 text-[16px] text-[#91a4bd]">
                  {translate("awaitingAnswer")}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[470px] xl:pt-24" id="anbefalinger">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {view === "learner"
                  ? translate("recommendedCompanies")
                  : translate("recommendedCandidates")}
              </h2>
              <button
                onClick={() => setPage("browse")}
                className="flex items-center gap-1 text-sm font-semibold text-[#b88ec8]"
              >
                {translate("seeAll")} <ChevronRight />
              </button>
            </div>
            <article className="rounded-[22px] border border-[#303c4e] bg-[#222c3b] p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-20 shrink-0 items-center justify-center rounded-full ${active.color} text-2xl font-bold text-[#18202b]`}
                >
                  {active.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-0">
                    <h3 className="truncate text-[22px] font-bold">
                      {active.name}
                    </h3>
                    <button
                      className={`ml-auto flex size-12 shrink-0 items-center justify-center rounded-full ${
                        liked.includes(active.name)
                          ? "bg-[#ee6e71] text-[#341b27]"
                          : "bg-[#2d3848] text-[#9aacc3]"
                      }`}
                      aria-label={
                        liked.includes(active.name)
                          ? "Fjern liker"
                          : "Vis interesse"
                      }
                      onClick={() => toggleLiked(active.name)}
                    >
                      <Heart
                        fill={
                          liked.includes(active.name) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                  <p className=" text-[#91a4bd]">{active.field}</p>
                  <p className="mt-1 text-[#9aacc3]">{active.city}</p>
                </div>
              </div>
              <p className="mt-5 leading-6 text-[#b2bfd0]">{active.desc}</p>
              <div className="mt-7 flex items-center justify-between">
                <button
                  onClick={showPrevious}
                  className="flex size-12 items-center justify-center rounded-full bg-[#2d3848] text-[#9aacc3] hover:bg-[#394658]"
                  aria-label="Forrige anbefaling"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="text-sm text-[#71849d]">
                  {(index % list.length) + 1} {translate("of")} {list.length}
                </span>
                <button
                  onClick={showNext}
                  className="flex size-12 items-center justify-center rounded-full bg-[#2d3848] text-[#9aacc3] hover:bg-[#394658]"
                  aria-label="Neste anbefaling"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          </div>
        </div>
        <div className="mt-16 rounded-[22px] border border-[#2b3748] bg-[#151e2a] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b85ac4]">
                {translate("nextStep")}
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {view === "learner"
                  ? translate("makeProfileVisible")
                  : translate("publishCompany")}
              </h2>
              <p className="mt-2 text-[#91a4bd]">
                {view === "learner"
                  ? translate("completedProfile")
                  : translate("completedCompanyProfile")}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c65ccf] px-5 py-3 font-bold text-white hover:bg-[#d26ddb]"
              onClick={() => setPage("profile")}
            >
              {translate("getStarted")} <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
