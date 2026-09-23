"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  ChevronDown,
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

const { placements, candidates, translations } = data;
const fields = [
  "Alle",
  ...new Set([...placements, ...candidates].map((item) => item.field)),
];
const applications = placements.slice(0, 2).map((placement, index) => ({
  ...placement,
  date: index === 0 ? "12. sep 2026" : "8. sep 2026",
  status: index === 0 ? "Matchet" : "Venter svar",
}));
const defaultHistory = applications.map(({ name, field, city, date }) => ({
  name,
  field,
  city,
  date,
}));
type HistoryItem = (typeof defaultHistory)[number] & { activity?: string };

const PROFILE_STORAGE_KEY = "laerling-link-profile";
const SETTINGS_STORAGE_KEY = "laerling-link-settings";
const COMPANY_PROFILE_STORAGE_KEY = "laerling-link-company-profile";

type Language = keyof typeof translations;
type TranslationKey = keyof (typeof translations)["Norsk"];
type Listing = (typeof placements)[number] | (typeof candidates)[number];
type ApplicationFilter = "Alle" | "Venter svar" | "Matchet" | "Avslått";
type BrowseTab = "Alle" | "Favoritter";
type Application = (typeof applications)[number] & {
  message?: string;
};

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

type SettingsState = {
  language: Language;
  emailNotifications: boolean;
  profileVisible: boolean;
  darkMode: boolean;
};

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
      aria-label={translate("navigation")}
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
          aria-label={translate("closeMenu")}
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <button
        onClick={() => setView(view === "learner" ? "company" : "learner")}
        className="mt-5 flex w-full items-center justify-between rounded-2xl border border-[#39465a] bg-[#202c3b] px-5 py-4 text-left transition hover:border-[#b85cc7] hover:bg-[#283548]"
        aria-label={translate("switchView")}
        aria-pressed={view === "company"}
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
      <nav
        aria-label={translate("navigation")}
        className="mt-8 flex flex-col gap-2 pb-8"
      >
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
              aria-current={selected ? "page" : undefined}
              className={`flex min-h-12 shrink-0 items-center gap-4 rounded-2xl px-4 py-3 text-left text-base font-medium transition sm:text-lg ${
                selected
                  ? "bg-[#2d2944] text-white"
                  : "text-[#9aaec7] hover:bg-[#202c3b] hover:text-white"
              }`}
            >
              <Icon
                aria-hidden="true"
                className={selected ? "text-[#a85ab6]" : ""}
              />
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
  setPage,
  onSelectPlacement,
  profileName,
  translate,
}: {
  view: "learner" | "company";
  setView: (view: "learner" | "company") => void;
  setMenuOpen: (open: boolean) => void;
  setPage: (page: PageName) => void;
  onSelectPlacement: (placement: Listing) => void;
  profileName?: string;
  translate: (key: TranslationKey) => string;
}) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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
        aria-label={translate("openMenu")}
      >
        <Menu aria-hidden="true" />
      </button>

      <div className="hidden text-sm text-[#91a4bd] lg:block">
        {view === "learner"
          ? translate("overview")
          : translate("companyOverview")}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={() => setView(view === "learner" ? "company" : "learner")}
          aria-label={translate("switchView")}
          className="rounded-full bg-[#302b43] px-4 py-2 text-sm font-semibold text-[#d8b3e4]"
        >
          {view === "learner" ? translate("student") : translate("company")}
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full p-1 transition hover:bg-[#202c3b]"
            aria-label="Åpne profilmeny"
            aria-expanded={profileMenuOpen}
          >
            <span className="hidden text-lg font-semibold text-[#f2f3f6] sm:block">
              {safeProfileName}
            </span>
            <div className="flex size-12 items-center justify-center rounded-full border border-[#344155] bg-[#202c3b] text-lg font-bold text-[#9aaec7]">
              {initials}
            </div>
            <ChevronDown
              size={18}
              className={`hidden text-[#91a4bd] transition sm:block ${
                profileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-16 z-30 w-52 rounded-2xl border border-[#39465a] bg-[#182332] p-2 shadow-2xl">
              {(view === "learner" || view === "company") && (
                <label className="block px-4 py-2 text-sm font-semibold text-[#91a4bd]">
                  {view === "company" ? "Velg bedrift" : "Velg elev"}
                  <select
                    defaultValue=""
                    onChange={(event) => {
                      const selected = (view === "company"
                        ? placements
                        : candidates
                      ).find((item) => item.name === event.target.value);

                      if (selected) {
                        onSelectPlacement(selected);
                        setProfileMenuOpen(false);
                      }
                    }}
                    className="mt-2 w-full rounded-lg border border-[#39465a] bg-[#202c3b] px-2 py-2 text-sm text-[#f2f3f6] outline-none focus:border-[#a45bc0]"
                  >
                    <option value="">Velg...</option>
                    {(view === "company" ? placements : candidates).map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <button
                onClick={() => {
                  setPage("profile");
                  setProfileMenuOpen(false);
                }}
                className="flex w-full items-center rounded-xl px-4 py-3 text-left font-semibold text-[#dce2ea] hover:bg-[#243247]"
              >
                {view === "company"
                  ? translate("companyProfile")
                  : translate("profile")}
              </button>
              <button
                onClick={() => {
                  setPage("settings");
                  setProfileMenuOpen(false);
                }}
                className="flex w-full items-center rounded-xl px-4 py-3 text-left font-semibold text-[#dce2ea] hover:bg-[#243247]"
              >
                {translate("settings")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Page() {
  const [view, setView] = useState<"learner" | "company">("learner");
  const [page, setPage] = useState<PageName>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeField, setActiveField] = useState("Alle");
    const [browseTab, setBrowseTab] = useState<BrowseTab>("Alle");
  const [applicationFilter, setApplicationFilter] =
    useState<ApplicationFilter>("Alle");
  const [savedApplications, setSavedApplications] = useState<Application[]>([]);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [applicationSent, setApplicationSent] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    language: "Norsk",
    emailNotifications: true,
    profileVisible: false,
    darkMode: false,
  });
  const [likedByProfile, setLikedByProfile] = useState<Record<string, string[]>>({});
  const [historyItems, setHistoryItems] =
    useState<HistoryItem[]>(defaultHistory);
  const loadedHistoryKey = useRef<string | null>(null);
  const loadedApplicationsKey = useRef<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<Listing | null>(null);

  const openDetails = (item: Listing) => {
    setSelectedItem(item);
    setApplicationSent(
      view === "learner" && savedApplications.some((application) => application.name === item.name)
    );
    setApplicationMessage("");
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

  const [companyProfile, setCompanyProfile] = useState<ProfileData>({
    name: "GreenTech AS",
    email: "kontakt@greentech.no",
    field: "Teknologi og IT",
    interests: "IT-drift, utvikling og digitale løsninger",
    city: "Oslo",
    about: "GreenTech AS tilbyr læreplasser innen teknologi og IT.",
  });

  const activeProfile = view === "company" ? companyProfile : profile;
  const favoriteKey = `${view}:${activeProfile.name}`;
  const liked = likedByProfile[favoriteKey] ?? [];
  const isMutualMatch = (itemName: string) => {
    const otherProfileKey =
      view === "learner" ? `company:${itemName}` : `learner:${itemName}`;
    return (likedByProfile[otherProfileKey] ?? []).includes(activeProfile.name);
  };

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

  const selectIdentity = (item: Listing) => {
    if (view === "company" && "employees" in item) {
      setCompanyProfile((current) => ({
        ...current,
        name: item.name,
        field: item.field,
        city: item.city,
        about: item.about,
        interests: item.skills.join(", "),
      }));
    }

    if (view === "learner" && "education" in item) {
      setProfile((current) => ({
        ...current,
        name: item.name,
        field: item.field,
        city: item.city,
        about: item.about,
        interests: item.interests.join(", "),
      }));
    }

    setPage("home");
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

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const savedLikes = localStorage.getItem("laerling-link-likes");

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

    if (savedLikes) {
      try {
        const parsedLikes = JSON.parse(savedLikes);
        setLikedByProfile(
          parsedLikes.learner || parsedLikes.company
            ? {
                [`learner:${profile.name}`]: parsedLikes.learner ?? [],
                [`company:${companyProfile.name}`]: parsedLikes.company ?? [],
              }
            : parsedLikes
        );
      } catch {
        localStorage.removeItem("laerling-link-likes");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("laerling-link-likes", JSON.stringify(likedByProfile));
  }, [likedByProfile]);

  useEffect(() => {
    if (loadedHistoryKey.current === favoriteKey) return;

    loadedHistoryKey.current = favoriteKey;
    const historyStorageKey = `laerling-link-history:${favoriteKey}`;
    const savedHistory = localStorage.getItem(historyStorageKey);

    if (savedHistory) {
      try {
        setHistoryItems(JSON.parse(savedHistory));
      } catch {
        localStorage.removeItem(historyStorageKey);
      }
    } else {
      setHistoryItems([]);
    }
  });

  useEffect(() => {
    localStorage.setItem(
      `laerling-link-history:${favoriteKey}`,
      JSON.stringify(historyItems)
    );
  }, [favoriteKey, historyItems]);

  useEffect(() => {
    if (loadedApplicationsKey.current === favoriteKey) return;

    loadedApplicationsKey.current = favoriteKey;
    const applicationsStorageKey = `laerling-link-applications:${favoriteKey}`;
    const savedApplications = localStorage.getItem(applicationsStorageKey);

    if (savedApplications) {
      try {
        setSavedApplications(JSON.parse(savedApplications));
      } catch {
        localStorage.removeItem(applicationsStorageKey);
      }
    } else {
      setSavedApplications([]);
    }
  });

  useEffect(() => {
    if (loadedApplicationsKey.current !== favoriteKey) return;

    localStorage.setItem(
      `laerling-link-applications:${favoriteKey}`,
      JSON.stringify(savedApplications)
    );
  }, [favoriteKey, savedApplications]);

  const translate = (key: TranslationKey) => {
    const language = translations[settings.language] ?? translations.Norsk;
    return language[key] ?? translations.Norsk[key];
  };

  const list = view === "learner" ? placements : candidates;
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return list.filter((item) => {
      const matchesTab = browseTab === "Alle" || liked.includes(item.name);
      const matchesField = activeField === "Alle" || item.field === activeField;
      const matchesQuery =
        !normalizedQuery ||
        [item.name, item.field, item.city, item.desc].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      return matchesTab && matchesField && matchesQuery;
    });
  }, [activeField, browseTab, liked, list, query]);

  const [index, setIndex] = useState(0);
  const active = list[index % list.length];

  const recordHistory = (item: Listing, activity: string) => {
    setHistoryItems((current) => [
      {
        name: item.name,
        field: item.field,
        city: item.city,
        date: new Date().toLocaleDateString("no-NO"),
        activity,
      },
      ...current,
    ]);
  };

  const submitApplication = () => {
    if (!selectedItem || applicationSent) return;

    const application = {
      ...selectedItem,
      date: new Date().toLocaleDateString("no-NO"),
      status: "Venter svar",
      message: applicationMessage.trim(),
    };

    setSavedApplications((current) => [
      application,
      ...current.filter((item) => item.name !== selectedItem.name),
    ]);
    setApplicationSent(true);
    recordHistory(selectedItem, "Søknad sendt");
  };

  const toggleLiked = (name: string) => {
    const willLike = !liked.includes(name);
    const item = [...placements, ...candidates].find(
      (entry) => entry.name === name
    );

    setLikedByProfile((current) => ({
      ...current,
      [favoriteKey]: willLike
        ? [...liked, name]
        : liked.filter((item) => item !== name),
    }));

    if (item) {
      recordHistory(
        item,
        !willLike
          ? "Fjernet fra favoritter"
          : isMutualMatch(name)
          ? "Matchet"
          : "Lagt til i favoritter"
      );
    }

    if (view === "learner" && willLike && isMutualMatch(name)) {
      setSavedApplications((current) =>
        current.map((application) =>
          application.name === name
            ? { ...application, status: "Matchet" }
            : application
        )
      );
    }
  };

  const showPrevious = () => {
    setIndex((current) => (current - 1 + list.length) % list.length);
  };

  const showNext = () => {
    setIndex((current) => (current + 1) % list.length);
  };

  useEffect(() => {
    setIndex(0);
    setQuery("");
    setActiveField("Alle");
    setBrowseTab("Alle");
  }, [view]);

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
      <main
        aria-labelledby="applications-heading"
        className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
      >
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
          setPage={setPage}
          onSelectPlacement={(placement) => {
            selectIdentity(placement);
          }}
          profileName={activeProfile.name}
          translate={translate}
        />

        <section className="mx-auto max-w-[1120px] px-4 pb-12 pt-8 sm:px-6 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1
            id="applications-heading"
            className="text-5xl font-bold tracking-[-0.03em]"
          >
            {translate("applications")}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {translate("administer")}
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3"
            role="group"
            aria-label={translate("filters")}
          >
            {(
              [
                "Alle",
                "Venter svar",
                "Matchet",
                "Avslått",
              ] as ApplicationFilter[]
            ).map((filter) => (
              <button
                key={filter}
                onClick={() => setApplicationFilter(filter)}
                aria-pressed={applicationFilter === filter}
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
                className="flex flex-col gap-5 rounded-[24px] border border-[#29384a] bg-[#172332] p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
              >
                <div
                  className={`flex size-20 shrink-0 items-center justify-center rounded-2xl ${application.color} text-2xl font-bold`}
                >
                  {application.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold">{application.name}</h2>
                  <p className="mt-2 text-xl text-[#91a4bd]">
                    {application.field} · {application.city}
                  </p>
                  <p className="mt-3 text-[#91a4bd]">
                    {translate("sent")} {application.date}
                  </p>
                </div>
                <span
                  className={`self-start rounded-2xl px-5 py-3 font-bold sm:self-center ${
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
      <main
        aria-labelledby="details-heading"
        className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
      >
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
          setPage={setPage}
          onSelectPlacement={(placement) => {
            selectIdentity(placement);
          }}
          profileName={activeProfile.name}
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
                <h1
                  id="details-heading"
                  className="text-3xl font-bold sm:text-4xl"
                >
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
                {selectedItem.about}
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5">
                <h2 className="font-bold">Ferdigheter</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#30384a] px-3 py-1 text-sm text-[#d8b3e4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {"tasks" in selectedItem ? (
                <>
                  <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5">
                    <h2 className="font-bold">Arbeidsoppgaver</h2>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#b2bfd0]">
                      {selectedItem.tasks.map((task) => (
                        <li key={task}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5">
                    <h2 className="font-bold">Krav</h2>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#b2bfd0]">
                      {selectedItem.requirements.map((requirement) => (
                        <li key={requirement}>• {requirement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5 text-sm text-[#b2bfd0]">
                    <h2 className="font-bold text-[#f2f3f6]">Praktisk informasjon</h2>
                    <p className="mt-3">Varighet: {selectedItem.duration}</p>
                    <p className="mt-2">Arbeidsform: {selectedItem.workMode}</p>
                    <p className="mt-2">Bedriftsstørrelse: {selectedItem.employees}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5">
                    <h2 className="font-bold">Interesser</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedItem.interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-[#30384a] px-3 py-1 text-sm text-[#d8b3e4]"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5 text-sm leading-6 text-[#b2bfd0]">
                    <h2 className="font-bold text-[#f2f3f6]">Bakgrunn</h2>
                    <p className="mt-3">Utdanning: {selectedItem.education}</p>
                    <p className="mt-2">Erfaring: {selectedItem.experience}</p>
                  </div>
                  <div className="rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5 text-sm leading-6 text-[#b2bfd0]">
                    <h2 className="font-bold text-[#f2f3f6]">Tilgjengelighet</h2>
                    <p className="mt-3">{selectedItem.availability}</p>
                    <p className="mt-2">Ønsket arbeidsform: {selectedItem.workPreference}</p>
                  </div>
                </>
              )}
            </div>

            {view === "learner" && (
              <div className="mt-8 rounded-2xl border border-[#303c4e] bg-[#202c3b] p-5">
                <label className="block text-sm font-semibold text-[#91a4bd]">
                  Velg bedrift
                  <select
                    value={selectedItem.name}
                    onChange={(event) => {
                      const placement = placements.find(
                        (item) => item.name === event.target.value
                      );

                      if (placement) {
                        setSelectedItem(placement);
                        setApplicationSent(
                          savedApplications.some(
                            (application) => application.name === placement.name
                          )
                        );
                        setApplicationMessage("");
                      }
                    }}
                    className="mt-2 w-full rounded-xl border border-[#39465a] bg-[#172332] px-4 py-3 text-[#f2f3f6] outline-none focus:border-[#a45bc0]"
                  >
                    {placements.map((placement) => (
                      <option key={placement.name} value={placement.name}>
                        {placement.name} · {placement.city}
                      </option>
                    ))}
                  </select>
                </label>
                <h2 className="text-xl font-bold">Søk på læreplassen</h2>
                {applicationSent ? (
                  <p className="mt-3 text-[#9ed8bf]">
                    Søknaden er sendt. Du finner den under Mine søknader.
                  </p>
                ) : (
                  <>
                    <label className="mt-3 block text-sm text-[#91a4bd]">
                      Melding til bedriften (valgfritt)
                      <textarea
                        value={applicationMessage}
                        onChange={(event) => setApplicationMessage(event.target.value)}
                        rows={4}
                        placeholder="Skriv litt om hvorfor du ønsker læreplassen..."
                        className="mt-2 w-full resize-none rounded-xl border border-[#39465a] bg-[#172332] px-4 py-3 text-[#f2f3f6] outline-none focus:border-[#a45bc0]"
                      />
                    </label>
                    <button
                      onClick={submitApplication}
                      className="mt-4 rounded-xl bg-[#a45bc0] px-5 py-3 font-bold text-white transition hover:bg-[#b86bc9]"
                    >
                      Send søknad
                    </button>
                  </>
                )}
              </div>
            )}

            <button
              onClick={() => toggleLiked(selectedItem.name)}
              className="mt-5 rounded-xl border border-[#a45bc0] px-5 py-3 font-bold text-[#d8b3e4] transition hover:bg-[#a45bc0] hover:text-white"
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
      <main
        aria-labelledby="browse-heading"
        className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
      >
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
          setPage={setPage}
          onSelectPlacement={(placement) => {
            selectIdentity(placement);
          }}
          profileName={activeProfile.name}
          translate={translate}
        />

        <section className="mx-auto max-w-[1300px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1
            id="browse-heading"
            className="text-5xl font-bold tracking-[-0.03em]"
          >
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
            <Search aria-hidden="true" className="text-white" size={22} />
            <input
              aria-label={translate("searchLabel")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={translate("search")}
              className="w-full bg-transparent text-white outline-none placeholder:text-[#91a4bd]"
            />
          </div>

          <p className="mt-5 text-sm font-semibold text-[#91a4bd]">Viser</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {(["Alle", "Favoritter"] as BrowseTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setBrowseTab(tab)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold ${
                  browseTab === tab
                    ? "border-[#a45bc0] bg-[#a45bc0] text-white"
                    : "border-[#29384a] bg-[#182332] text-[#91a4bd] hover:bg-[#243247]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm font-semibold text-[#91a4bd]">Fagområde</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => setActiveField(field)}
                aria-pressed={activeField === field}
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

          <p
            className="mt-7 text-sm text-[#91a4bd]"
            role="status"
            aria-live="polite"
          >
            {filtered.length}{" "}
            {view === "learner"
              ? translate("companies")
              : translate("candidates")}
          </p>

          <div className="mt-3 flex flex-col gap-4">
            {filtered.map((item) => (
              <article
                key={item.name}
                className="group flex items-center gap-4 rounded-2xl border border-[#303c4e] bg-[#222c3b] p-4 sm:gap-5 sm:p-5"
              >
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${item.color} text-sm font-bold text-[#18202b]`}
                >
                  {item.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">
                    <button
                      type="button"
                      onClick={() => openDetails(item)}
                      className="text-left hover:underline focus:outline-none focus:ring-2 focus:ring-[#a45bc0]"
                    >
                      {item.name}
                    </button>
                  </h2>
                  <p className="truncate text-sm text-[#91a4bd]">{item.desc}</p>

                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-[#30384a] px-3 py-1 text-xs text-[#d8b3e4]">
                      {item.city}
                    </span>
                    <span className="rounded-full bg-[#30384a] px-3 py-1 text-xs text-[#d8b3e4]">
                      {item.field}
                    </span>
                    {isMutualMatch(item.name) && (
                      <span className="rounded-full bg-[#a45bc0] px-3 py-1 text-xs font-bold text-white">
                        Matchet
                      </span>
                    )}
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
                    aria-hidden="true"
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
      <main
        aria-labelledby="history-heading"
        className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
      >
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
          setPage={setPage}
          onSelectPlacement={(placement) => {
            selectIdentity(placement);
          }}
          profileName={activeProfile.name}
          translate={translate}
        />

        <section className="mx-auto max-w-[1250px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <h1
            id="history-heading"
            className="text-5xl font-bold tracking-[-0.03em]"
          >
            {translate("history")}
          </h1>

          <p className="mt-3 text-lg text-[#91a4bd]">
            {translate("historyTitle")}
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {historyItems.map((item, index) => (
              <article
                key={`${item.name}-${item.date}-${index}`}
                className="rounded-[24px] border border-[#29384a] bg-[#172332] p-7"
              >
                <h2 className="text-2xl font-bold">{item.name}</h2>

                <p className="mt-2 text-lg text-[#91a4bd]">
                  {item.field} · {item.city}
                </p>

                <p className="mt-3 text-lg text-[#91a4bd]">
                  {item.activity ?? translate("applicationSent")} · {item.date}
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
      <main
        aria-labelledby="profile-heading"
        className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
      >
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
          setPage={setPage}
          onSelectPlacement={(placement) => {
            selectIdentity(placement);
          }}
          profileName={activeProfile.name}
          translate={translate}
        />

        <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <p className="text-lg text-[#91a4bd]">{translate("account")}</p>

          <h1
            id="profile-heading"
            className="mt-3 text-5xl font-bold tracking-[-0.03em]"
          >
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
                  aria-pressed={editingProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#a45bc0] px-5 py-3 font-semibold text-[#d8b3e4] transition hover:bg-[#a45bc0] hover:text-white"
                >
                  <Pencil size={17} />
                  {editingProfile ? "Avbryt" : "Rediger profil"}
                </button>
              </div>

              <div className="mt-6">
                <h2 className="text-3xl font-bold">{activeProfile.name}</h2>
                <p className="mt-1 text-[#91a4bd]">
                  {view === "learner"
                    ? translate("student")
                    : translate("company")}
                  · {activeProfile.city}
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
                        id={`profile-${key}`}
                        aria-label={label}
                        value={activeProfile[key]}
                        onChange={(event) =>
                          updateActiveProfile(key, event.target.value)
                        }
                        className="w-full rounded-xl border border-[#39465a] bg-[#202c3b] px-4 py-3 text-white outline-none focus:border-[#a45bc0]"
                      />
                    ) : (
                      <div className="rounded-xl border border-[#29384a] bg-[#202c3b] px-4 py-3 text-[#dce2ea]">
                        {activeProfile[key]}
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
                    id="profile-about"
                    aria-label={translate("aboutMe")}
                    value={activeProfile.about}
                    onChange={(event) =>
                      updateActiveProfile("about", event.target.value)
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-[#39465a] bg-[#202c3b] px-4 py-3 text-white outline-none focus:border-[#a45bc0]"
                  />
                ) : (
                  <div className="rounded-xl border border-[#29384a] bg-[#202c3b] px-4 py-3 leading-7 text-[#dce2ea]">
                    {activeProfile.about}
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
      <main
        aria-labelledby="settings-heading"
        className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
      >
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
          setPage={setPage}
          onSelectPlacement={(placement) => {
            selectIdentity(placement);
          }}
          profileName={activeProfile.name}
          translate={translate}
        />

        <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-16 lg:ml-[428px] lg:mr-12 lg:px-0">
          <p className="text-lg text-[#91a4bd]">
            {translate("personalChoice")}
          </p>
          <h1 id="settings-heading" className="mt-3 text-5xl font-bold">
            {translate("settings")}
          </h1>
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
                aria-label={translate("languageSelect")}
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
                  aria-label={translate("emailNotificationsToggle")}
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
                  aria-label={translate("profileVisibleToggle")}
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
    <main
      aria-labelledby="home-heading"
      className="min-h-screen bg-[#0e131b] text-[#f2f3f6]"
    >
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
        setPage={setPage}
        onSelectPlacement={(placement) => {
          selectIdentity(placement);
        }}
        profileName={activeProfile.name}
        translate={translate}
      />
      <section className="mx-auto max-w-[1120px] px-4 pb-12 pt-8 sm:px-6 lg:ml-[428px] lg:mr-12 lg:px-0">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[18px] text-[#8fa2bc]">
              {translate("greeting")}
            </p>
            <h1
              id="home-heading"
              className="mt-7 text-6xl font-bold leading-[0.98] tracking-[-0.055em] text-[#f4f5f7] sm:text-7xl"
            >
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
                ? `${liked.length}${translate("newCompanyMatches")}`
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
          <div
            className={`w-full ${
              view === "learner"
                ? "max-w-[470px] xl:pt-24"
                : "max-w-[565px] xl:pt-24"
            }`}
            id="anbefalinger"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="recommendations-heading" className="text-xl font-bold">
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
            <article className="rounded-[22px] border border-[#303c4e] bg-[#222c3b] p-7 shadow-2xl">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-24 shrink-0 items-center justify-center rounded-full ${active.color} text-3xl font-bold text-[#18202b]`}
                >
                  {active.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-0">
                    <h3 className="truncate text-[22px] font-bold">
                      {active.name}
                    </h3>
                    <button
                      className={`ml-auto flex size-14 shrink-0 items-center justify-center rounded-full ${
                        liked.includes(active.name)
                          ? "bg-[#ee6e71] text-[#341b27]"
                          : "bg-[#2d3848] text-[#9aacc3]"
                      }`}
                      aria-label={
                        liked.includes(active.name)
                          ? translate("removeFavorite")
                          : translate("addFavorite")
                      }
                      onClick={() => toggleLiked(active.name)}
                    >
                      <Heart
                        aria-hidden="true"
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
                  className="flex size-14 items-center justify-center rounded-full bg-[#2d3848] text-[#9aacc3] hover:bg-[#394658]"
                  aria-label="Forrige anbefaling"
                >
                  <ArrowLeft aria-hidden="true" size={16} />
                </button>
                <span className="text-sm text-[#71849d]">
                  {(index % list.length) + 1} {translate("of")} {list.length}
                </span>
                <button
                  onClick={showNext}
                  className="flex size-14 items-center justify-center rounded-full bg-[#2d3848] text-[#9aacc3] hover:bg-[#394658]"
                  aria-label="Neste anbefaling"
                >
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
            </article>
        </div>
        <div className="mt-16 rounded-[22px] border border-[#2b3748] bg-[#151e2a] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b85ac4]">
                {translate("nextStep")}
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {settings.profileVisible
                  ? view === "learner"
                    ? "Profilen din er synlig"
                    : "Bedriftsprofilen er publisert"
                  : view === "learner"
                  ? translate("makeProfileVisible")
                  : translate("publishCompany")}
              </h2>
              <p className="mt-2 text-[#91a4bd]">
                {settings.profileVisible
                  ? "Du kan når som helst oppdatere profilen din."
                  : view === "learner"
                  ? translate("completedProfile")
                  : translate("completedCompanyProfile")}
              </p>
            </div>
            <button
              type="button"
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white ${
                settings.profileVisible
                  ? "cursor-default bg-[#344155] text-[#9aacc3]"
                  : "bg-[#c65ccf] hover:bg-[#d26ddb]"
              }`}
              onClick={() => {
                if (!settings.profileVisible) {
                  setSettings((current) => ({
                    ...current,
                    profileVisible: true,
                  }));
                }
              }}
              disabled={settings.profileVisible}
            >
              {settings.profileVisible ? "Ferdig" : translate("getStarted")} <ArrowRight />
            </button>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
