import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, ArrowUpRight, Archive } from "lucide-react";
import { batchArchive, nextDropDate, previousBatches, upcomingRelease } from "./data";

const copy = {
  en: {
    topLabel: "Limited Release Flower",
    currentState: "Current State",
    awaiting: "Awaiting Next Drop",
    english: "EN",
    spanish: "ES",
    nextBatchDropsIn: "Next Batch Drops In",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    landingInStores: "CURRENTLY LANDING IN STORES",
    landingSubtext: "Check store locations as batches arrive.",
    upcomingRelease: "Upcoming Release",
    upcomingStrains: "Included Strains",
    previousBatches: "Find a Store",
    citySections: "Browse by City",
    nearbyText: "Fastest way to check if there's Batches near you.",
    tapToExpand: "Click a strain to see if it's in your city or nearby.",
    openInGoogleMaps: "Open in Google Maps",
    directions: "Get Directions",
    cityLabel: "City",
    cityPrompt: "Choose a city",
    useLocation: "Use My Location",
    locationActive: "Location Active",
    nearestFirst: "Nearest locations first",
    milesAway: "mi away",
    storesLabel: "stores",
    inStock: "IN STOCK",
    soldOut: "SOLD OUT",
    archive: "Batch Archive",
    archiveLabel: "Past Drops",
    archiveCopy: "A clean record of every release. Built for scale, so as more batches drop, the archive stays organized instead of turning into a wall of chaos.",
    showArchive: "Show Archive",
    hideArchive: "Hide Archive",
    locationUnavailable: "Location unavailable"
  },
  es: {
    topLabel: "Flor de Lanzamiento Limitado",
    currentState: "Estado Actual",
    awaiting: "Esperando el Próximo Drop",
    english: "EN",
    spanish: "ES",
    nextBatchDropsIn: "Próximo Batch en",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    landingInStores: "ACTUALMENTE LLEGANDO A TIENDAS",
    landingSubtext: "Revisa las tiendas mientras van llegando los batches.",
    upcomingRelease: "Próximo Lanzamiento",
    upcomingStrains: "Strains Incluidas",
    previousBatches: "Encontrar Tienda",
    citySections: "Buscar por Ciudad",
    nearbyText: "La forma más rápida de revisar si hay Batches cerca de ti.",
    tapToExpand: "Haz clic en una strain para ver si está en tu ciudad o cerca.",
    openInGoogleMaps: "Abrir en Google Maps",
    directions: "Cómo llegar",
    cityLabel: "Ciudad",
    cityPrompt: "Elige una ciudad",
    useLocation: "Usar mi ubicación",
    locationActive: "Ubicación activa",
    nearestFirst: "Ubicaciones más cercanas primero",
    milesAway: "mi de distancia",
    storesLabel: "tiendas",
    inStock: "EN STOCK",
    soldOut: "AGOTADO",
    archive: "Archivo de Batches",
    archiveLabel: "Drops Anteriores",
    archiveCopy: "Un registro limpio de cada lanzamiento. Hecho para crecer, para que cuando haya muchos batches el archivo siga ordenado y no se convierta en un muro de caos.",
    showArchive: "Mostrar Archivo",
    hideArchive: "Ocultar Archivo",
    locationUnavailable: "Ubicación no disponible"
  }
};

export default function TheBatchSplashPage() {
  const targetDate = useMemo(() => new Date(nextDropDate), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [openBatch, setOpenBatch] = useState((Array.isArray(previousBatches) ? previousBatches[0]?.batch : null) ?? null);
  const [openCity, setOpenCity] = useState({});
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [upcomingOpen, setUpcomingOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 700, damping: 45, mass: 0.2 });
  const smoothY = useSpring(cursorY, { stiffness: 700, damping: 45, mass: 0.2 });

  const t = copy[language];

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }

    const onSuccess = (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLocationError(false);
    };

    const onError = () => {
      navigator.geolocation.getCurrentPosition(
        onSuccess,
        () => setLocationError(true),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
      );
    };

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return undefined;

    const handleMove = (event) => {
      cursorX.set(event.clientX - 6);
      cursorY.set(event.clientY - 6);
      setCursorVisible(true);
    };

    const handleLeave = () => setCursorVisible(false);
    const handleEnter = () => setCursorVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  const timerItems = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds }
  ];

  const isLanding = timerItems.every((item) => item.value === "00");

  const toggleCity = (batchKey, cityName) => {
    const key = `${batchKey}__${cityName}`;
    setOpenCity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCityOpen = (batchKey, cityName) => !!openCity[`${batchKey}__${cityName}`];

  const normalizeBatchCities = (batch) => {
    if (Array.isArray(batch?.storesByCity)) return batch.storesByCity;
    if (Array.isArray(batch?.stores)) {
      const grouped = batch.stores.reduce((acc, store) => {
        const cityName = store.city || "Unknown City";
        if (!acc[cityName]) acc[cityName] = [];
        acc[cityName].push(store);
        return acc;
      }, {});
      return Object.entries(grouped).map(([city, stores]) => ({ city, stores }));
    }
    return [];
  };

  const decorateCities = (batch) => {
    return normalizeBatchCities(batch)
      .map((cityGroup) => {
        const safeStores = Array.isArray(cityGroup?.stores) ? cityGroup.stores : [];
        const stores = safeStores
          .map((store) => {
            const distance =
              userLocation && store?.lat != null && store?.lng != null
                ? getDistanceMiles(userLocation.lat, userLocation.lng, store.lat, store.lng)
                : null;
            return { ...store, distance };
          })
          .sort((a, b) => {
            if (a.distance == null && b.distance == null) {
              return (a.status === "IN STOCK" ? -1 : 1) - (b.status === "IN STOCK" ? -1 : 1);
            }
            if (a.distance == null) return 1;
            if (b.distance == null) return -1;
            return a.distance - b.distance;
          });

        const nearestDistance = stores.find((s) => s.distance != null)?.distance ?? null;
        const inStockCount = stores.filter((s) => s.status === "IN STOCK").length;

        return { ...cityGroup, stores, nearestDistance, inStockCount };
      })
      .sort((a, b) => {
        if (a.nearestDistance == null && b.nearestDistance == null) return 0;
        if (a.nearestDistance == null) return 1;
        if (b.nearestDistance == null) return -1;
        return a.nearestDistance - b.nearestDistance;
      });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f5f2] px-4 py-8 text-[#111111] md:px-8 md:py-10 lg:px-16">
      <CursorDot x={smoothX} y={smoothY} visible={cursorVisible} />

      <div className="mx-auto max-w-6xl">
        <header className="border-b border-black/10 pb-7 md:pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#111111]/45 md:text-xs">{t.topLabel}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[0.12em] sm:text-5xl md:text-7xl">THE BATCH</h1>
            </div>

            <div className="flex flex-col gap-4 text-left md:items-end md:text-right">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#111111]/35">{t.currentState}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#111111]/70">{t.awaiting}</p>
              </div>

              <div className="inline-flex w-fit items-center rounded-full border border-black/10 bg-black/[0.04] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={["rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-200", language === "en" ? "bg-[#111111] text-[#f5f5f2]" : "text-[#111111]/65 hover:text-[#111111]"].join(" ")}
                >
                  {t.english}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("es")}
                  className={["rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-200", language === "es" ? "bg-[#111111] text-[#f5f5f2]" : "text-[#111111]/65 hover:text-[#111111]"].join(" ")}
                >
                  {t.spanish}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-10 pt-10 md:gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pt-12">
          <section className="space-y-8">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="rounded-3xl border border-black/10 bg-black/[0.025] p-6 shadow-2xl shadow-black/[0.06] backdrop-blur-[2px] md:p-10"
            >
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#111111]/45">{t.nextBatchDropsIn}</p>

              {isLanding ? (
                <div className="mt-6 rounded-3xl border border-black/10 bg-black/[0.025] px-6 py-10 text-center md:px-8 md:py-12">
                  <div className="mx-auto max-w-2xl">
                    <p className="text-xl font-medium tracking-[0.16em] text-[#111111]/92 md:text-3xl">
                      {t.landingInStores}
                      <span className="inline-flex w-[1.6em] justify-start">
                        <span className="loading-dot">.</span>
                        <span className="loading-dot" style={{ animationDelay: "0.2s" }}>.</span>
                        <span className="loading-dot" style={{ animationDelay: "0.4s" }}>.</span>
                      </span>
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[#111111]/45">
                      {t.landingSubtext}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {timerItems.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-black/10 bg-black/[0.025] px-3 py-5 text-center transition-transform duration-200 hover:-translate-y-1 md:px-4 md:py-6">
                      <div className="text-3xl font-semibold tracking-[0.08em] tabular-nums sm:text-4xl md:text-5xl">{item.value}</div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#111111]/45">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 border-t border-black/10 pt-7">
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#111111]/45">{t.upcomingRelease}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-medium tracking-[0.08em] md:text-4xl">{upcomingRelease?.batch}</h2>
                  <span className="rounded-full border border-black/10 bg-black/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#111111]/60">
                    {(upcomingRelease?.strains || []).length} {(upcomingRelease?.strains || []).length === 1 ? "STRAIN" : "STRAINS"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setUpcomingOpen((value) => !value)}
                  className="mt-5 flex w-full items-center justify-between gap-4 rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-4 text-left transition-all duration-200 hover:border-black/16 hover:bg-black/[0.05]"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#111111]/45">{t.upcomingStrains}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#111111]/82">{(upcomingRelease?.strains || []).map((strain) => strain.name).join(" · ")}</p>
                  </div>

                  <motion.div animate={{ rotate: upcomingOpen ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="shrink-0 rounded-full border border-black/10 bg-black/[0.04] p-2 text-[#111111]/65">
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {upcomingOpen && (
                    <motion.div key="upcoming-strains" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="mt-4 space-y-3">
                        {(upcomingRelease?.strains || []).map((strain) => (
                          <motion.div key={strain.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} className="rounded-2xl border border-black/8 bg-black/[0.025] p-4 transition-all duration-200 hover:border-black/14 hover:bg-black/[0.04]">
                            <div className="flex flex-wrap items-center gap-3">
                              <p className="text-base tracking-[0.12em] text-[#111111]/92 md:text-lg">{strain.name}</p>
                              <span className="rounded-full border border-black/10 bg-black/[0.05] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-[#111111]/55">{strain.type}</span>
                            </div>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-[#111111]/68">{strain.notes?.[language]}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </section>

          <section>
            <div className="rounded-3xl border border-black/10 bg-black/[0.025] p-5 shadow-2xl shadow-black/[0.06] backdrop-blur-[2px] md:p-10">
              <div className="border-b border-black/10 pb-5">
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#111111]/45">{t.previousBatches}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[0.06em] md:text-3xl">{t.citySections}</h3>
                <p className="mt-3 text-sm leading-6 text-[#111111]/55">{t.nearbyText}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#111111]/35">{t.tapToExpand}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/[0.05] px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#111111]/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/[0.08]"
                  >
                    {userLocation ? t.locationActive : t.useLocation}
                  </button>
                  {userLocation && (
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#111111]/45">{t.nearestFirst}</span>
                  )}
                  {locationError && (
                    <span className="text-[10px] uppercase tracking-[0.22em] text-red-600">{t.locationUnavailable}</span>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {(Array.isArray(previousBatches) ? previousBatches : []).map((batch) => {
                  const isOpen = openBatch === batch.batch;

                  return (
                    <motion.div key={batch.batch} layout transition={{ layout: { type: "spring", stiffness: 260, damping: 24 } }} className="overflow-hidden rounded-3xl border border-black/8 bg-black/[0.02] backdrop-blur-[1px] transition-all duration-200 hover:border-black/14 hover:bg-black/[0.04] hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
                      <button
                        type="button"
                        onClick={() => setOpenBatch(isOpen ? null : batch.batch)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-5"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111]/45">{batch.batch}</span>
                            <span className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-[#111111]/55">{batch.type}</span>
                          </div>
                          <p className="mt-3 truncate pr-2 text-lg tracking-[0.12em] text-[#111111]/92 md:text-xl">{batch.strain}</p>
                        </div>

                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="shrink-0 rounded-full border border-black/10 bg-black/[0.04] p-2 text-[#111111]/65">
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                            <div className="space-y-3 border-t border-black/8 px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-4">
                              <p className="px-1 text-[10px] uppercase tracking-[0.28em] text-[#111111]/38">{t.cityPrompt}</p>

                              {decorateCities(batch).map((cityGroup) => {
                                const cityOpen = isCityOpen(batch.batch, cityGroup.city);

                                return (
                                  <motion.div key={`${batch.batch}-${cityGroup.city}`} layout transition={{ layout: { type: "spring", stiffness: 260, damping: 24 } }} className="overflow-hidden rounded-2xl border border-black/8 bg-black/[0.025]">
                                    <button
                                      type="button"
                                      onClick={() => toggleCity(batch.batch, cityGroup.city)}
                                      className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-all duration-200 hover:bg-black/[0.04]"
                                    >
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                          <div className="rounded-full border border-black/10 p-2 text-[#111111]/55">
                                            <MapPin className="h-4 w-4" />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-[10px] uppercase tracking-[0.28em] text-[#111111]/42">{t.cityLabel}</p>
                                            <p className="text-sm tracking-[0.08em] text-[#111111]/92 md:text-base">{cityGroup.city}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                              <span className="rounded-full border border-black/10 bg-black/[0.05] px-3 py-1.5 text-[10px] leading-none uppercase tracking-[0.18em] text-[#111111]/60 whitespace-nowrap">
                                                {cityGroup.stores.length} {t.storesLabel}
                                              </span>
                                              {cityGroup.inStockCount > 0 && (
                                                <span className="stock-pulse rounded-full border border-green-500/30 bg-green-500/12 px-3 py-1.5 text-[10px] leading-none uppercase tracking-[0.18em] text-green-600 whitespace-nowrap">
                                                  {cityGroup.inStockCount} {t.inStock}
                                                </span>
                                              )}
                                              {cityGroup.nearestDistance != null && (
                                                <span className="rounded-full border border-black/10 bg-black/[0.05] px-3 py-1.5 text-[10px] leading-none uppercase tracking-[0.18em] text-[#111111]/60 whitespace-nowrap">
                                                  {cityGroup.nearestDistance.toFixed(1)} {t.milesAway}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex shrink-0 items-start self-start">
                                        <motion.div animate={{ rotate: cityOpen ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="shrink-0 rounded-full border border-black/10 bg-black/[0.04] p-2 text-[#111111]/65">
                                          <ChevronDown className="h-4 w-4" />
                                        </motion.div>
                                      </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {cityOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                                          <div className="space-y-3 border-t border-black/8 p-3">
                                            {cityGroup.stores.map((store) => {
                                              const inStock = store.status === "IN STOCK";
                                              const stockLabel = inStock ? t.inStock : t.soldOut;

                                              return (
                                                <motion.div key={`${cityGroup.city}-${store.name}`} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} className="group rounded-2xl border border-black/8 bg-black/[0.025] p-3 transition-all duration-200 hover:border-black/14 hover:bg-black/[0.045] hover:backdrop-blur-md">
                                                  <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                      <div className="min-w-0">
                                                        <p className="text-sm tracking-[0.03em] text-[#111111]/92 md:text-base">{store.name}</p>
                                                        {store.distance != null && (
                                                          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#111111]/45">
                                                            {store.distance.toFixed(1)} {t.milesAway}
                                                          </p>
                                                        )}
                                                      </div>

                                                      <span className={["w-fit shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-200", inStock ? "stock-pulse border-green-500/30 bg-green-500/12 text-green-600 group-hover:shadow-[0_0_24px_rgba(74,222,128,0.48)]" : "border-red-500/30 bg-red-500/12 text-red-600 shadow-[0_0_18px_rgba(248,113,113,0.35)] group-hover:shadow-[0_0_24px_rgba(248,113,113,0.45)]"].join(" ")}>
                                                        {stockLabel}
                                                      </span>
                                                    </div>

                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                      <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#111111]/42 transition-colors duration-200 hover:text-[#111111]/75">
                                                        <span>{t.openInGoogleMaps}</span>
                                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                                      </a>

                                                      <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/10 bg-black/[0.05] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[#111111]/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/[0.08] sm:w-auto">
                                                        <span>{t.directions}</span>
                                                        <ArrowRight className="h-3.5 w-3.5" />
                                                      </a>
                                                    </div>
                                                  </div>
                                                </motion.div>
                                              );
                                            })}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="lg:col-span-2">
            <section className="rounded-3xl border border-black/10 bg-black/[0.025] p-6 backdrop-blur-[2px] md:p-8">
              <button type="button" onClick={() => setArchiveOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-black/10 p-2 text-[#111111]/70">
                    <Archive className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#111111]/45">{t.archiveLabel}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[0.06em]">{t.archive}</h3>
                  </div>
                </div>

                <motion.div animate={{ rotate: archiveOpen ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="shrink-0 rounded-full border border-black/10 bg-black/[0.04] p-2 text-[#111111]/65">
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#111111]/65">{t.archiveCopy}</p>

              <div className="mt-4">
                <button type="button" onClick={() => setArchiveOpen((value) => !value)} className="text-[11px] uppercase tracking-[0.28em] text-[#111111]/45 transition-colors duration-200 hover:text-[#111111]/80">
                  {archiveOpen ? t.hideArchive : t.showArchive}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {archiveOpen && (
                  <motion.div key="archive-content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {(Array.isArray(batchArchive) ? batchArchive : []).map((item) => (
                        <motion.div key={item.batch} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} className="rounded-2xl border border-black/8 bg-black/[0.025] p-4 transition-all duration-200 hover:border-black/14 hover:bg-black/[0.04]">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111]/45">{item.batch}</span>
                            <span className="rounded-full border border-black/10 bg-black/[0.05] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-[#111111]/55">{item.type}</span>
                          </div>
                          <p className="mt-3 text-lg tracking-[0.12em] text-[#111111]/92">{item.strain}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#111111]/45">{item.status}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

function CursorDot({ x, y, visible }) {
  return (
    <motion.div
      style={{ x, y, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ opacity: { duration: 0.18 }, scale: { duration: 0.18 } }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-3 w-3 rounded-full bg-[#111111] shadow-[0_0_14px_rgba(0,0,0,0.18)] md:block"
    />
  );
}

function getDistanceMiles(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getTimeLeft(targetDate) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0")
  };
}
