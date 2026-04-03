import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Compass,
  MapPin,
  Radar,
  Sparkles,
} from "lucide-react";
import { batchArchive, nextDropDate, previousBatches, upcomingRelease } from "./data";

const copy = {
  en: {
    topLabel: "Selective Flower",
    currentState: "Current State",
    awaiting: "Awaiting Release",
    delivering: "Delivering to Stores",
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
    previousBatches: "Batch Finder",
    citySections: "Find a Store",
    nearbyText: "Fastest way to check if there's Batches near you.",
    tapToExpand: "Click a strain to see if it's in your city or nearby.",
    openInGoogleMaps: "Open in Google Maps",
    directions: "Get Directions",
    cityLabel: "City",
    cityPrompt: "Choose a city",
    useLocation: "Use My Location",
    locationActive: "Location Active",
    nearestFirst: "Nearest locations first",
    closestStrains: "Closest batches first",
    milesAway: "mi away",
    storesLabel: "stores",
    inStock: "IN STOCK",
    soldOut: "SOLD OUT",
    archive: "Batch Archive",
    archiveLabel: "Past Drops",
    archiveCopy: "A record of prior releases, kept simple and easy to scan.",
    showArchive: "Show Archive",
    hideArchive: "Hide Archive",
    locationUnavailable: "Location unavailable",
    limitedBatches: "Released in limited batches.",
    previewLabel: "Preview",
    featuredPanel: "Batch Overview",
    storeCompass: "Store Compass",
    availableAt: "Available At",
  },
  es: {
    topLabel: "Flor Selecta",
    currentState: "Estado Actual",
    awaiting: "Esperando Lanzamiento",
    delivering: "Entregando a Tiendas",
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
    previousBatches: "Buscador de Batch",
    citySections: "Encontrar Tienda",
    nearbyText: "Disponible en ubicaciones seleccionadas.",
    tapToExpand: "Elige un batch y luego una ciudad.",
    openInGoogleMaps: "Abrir en Google Maps",
    directions: "Cómo llegar",
    cityLabel: "Ciudad",
    cityPrompt: "Elige una ciudad",
    useLocation: "Usar mi ubicación",
    locationActive: "Ubicación activa",
    nearestFirst: "Ubicaciones más cercanas primero",
    closestStrains: "Batches más cercanos primero",
    milesAway: "mi de distancia",
    storesLabel: "tiendas",
    inStock: "EN STOCK",
    soldOut: "AGOTADO",
    archive: "Archivo de Batches",
    archiveLabel: "Drops Anteriores",
    archiveCopy: "Un registro de lanzamientos previos, simple y fácil de revisar.",
    showArchive: "Mostrar Archivo",
    hideArchive: "Ocultar Archivo",
    locationUnavailable: "Ubicación no disponible",
    limitedBatches: "Lanzado en batches limitados.",
    previewLabel: "Vista Previa",
    featuredPanel: "Resumen del Batch",
    storeCompass: "Brújula de Tiendas",
    availableAt: "Disponible En",
  }
};

const typeTheme = {
  SATIVA: {
    badge: "border-[#7A1F2D]/35 bg-[#7A1F2D]/[0.08] text-[#7A1F2D]",
    glow: "shadow-[0_0_0_1px_rgba(122,31,45,0.06),0_12px_40px_rgba(122,31,45,0.08)]",
    dot: "bg-[#7A1F2D]",
    wash: "from-[#7A1F2D]/12 to-transparent",
  },
  HYBRID: {
    badge: "border-[#2E4D3F]/35 bg-[#2E4D3F]/[0.08] text-[#2E4D3F]",
    glow: "shadow-[0_0_0_1px_rgba(46,77,63,0.06),0_12px_40px_rgba(46,77,63,0.08)]",
    dot: "bg-[#2E4D3F]",
    wash: "from-[#2E4D3F]/12 to-transparent",
  },
  INDICA: {
    badge: "border-[#3E2A5E]/35 bg-[#3E2A5E]/[0.08] text-[#3E2A5E]",
    glow: "shadow-[0_0_0_1px_rgba(62,42,94,0.06),0_12px_40px_rgba(62,42,94,0.08)]",
    dot: "bg-[#3E2A5E]",
    wash: "from-[#3E2A5E]/12 to-transparent",
  },
};

function getTypeTheme(type) {
  return typeTheme[type] || {
    badge: "border-black/[0.08] bg-black/[0.04] text-black/60",
    glow: "shadow-[0_0_0_1px_rgba(17,17,17,0.04),0_12px_40px_rgba(17,17,17,0.05)]",
    dot: "bg-black/55",
    wash: "from-black/8 to-transparent",
  };
}

export default function TheBatchSplashPage() {
  const targetDate = useMemo(() => new Date(nextDropDate), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [openBatch, setOpenBatch] = useState((Array.isArray(previousBatches) ? previousBatches[0]?.batch : null) ?? null);
  const [openCity, setOpenCity] = useState({});
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [upcomingOpen, setUpcomingOpen] = useState(true);
  const [language, setLanguage] = useState("en");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const t = copy[language];

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

  const timerItems = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds },
  ];

  const isLanding = timerItems.every((item) => item.value === "00");
  const currentStateText = isLanding ? t.delivering : t.awaiting;

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

  const sortedBatches = useMemo(() => {
    const safeBatches = Array.isArray(previousBatches) ? previousBatches : [];

    return safeBatches
      .map((batch) => {
        const decoratedCities = decorateCities(batch);
        const nearestDistance = decoratedCities.flatMap((city) => city.stores).find((store) => store.distance != null)?.distance ?? null;
        const totalStores = decoratedCities.reduce((sum, city) => sum + city.stores.length, 0);
        const totalInStock = decoratedCities.reduce((sum, city) => sum + city.inStockCount, 0);

        return {
          ...batch,
          decoratedCities,
          nearestDistance,
          totalStores,
          totalInStock,
        };
      })
      .sort((a, b) => {
        if (!userLocation) return 0;
        if (a.nearestDistance == null && b.nearestDistance == null) return 0;
        if (a.nearestDistance == null) return 1;
        if (b.nearestDistance == null) return -1;
        return a.nearestDistance - b.nearestDistance;
      });
  }, [userLocation]);

  const featuredStrains = (upcomingRelease?.strains || []).slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f1eb] px-4 py-4 text-[#111111] md:px-6 md:py-6 lg:px-8">
      <CursorDot x={cursorX} y={cursorY} visible={cursorVisible} />

      <div className="mx-auto max-w-[1500px]">
        <header className="rounded-[34px] border border-black/[0.07] bg-white/75 p-5 shadow-[0_12px_70px_rgba(17,17,17,0.06)] backdrop-blur-xl md:p-7">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-black/[0.07] bg-black/[0.035] px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-black/55">
                  {t.topLabel}
                </span>
                <span className="rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-black/50">
                  {t.previewLabel}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-[0.12em] sm:text-5xl lg:text-7xl">
                THE BATCH
              </h1>
              <p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.22em] text-black/45 md:text-[13px]">
                {t.limitedBatches}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] xl:min-w-[420px]">
              <div className="rounded-[28px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.72))] p-4 md:p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/38">{t.currentState}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${isLanding ? "bg-[#2E4D3F] shadow-[0_0_18px_rgba(46,77,63,0.45)]" : "bg-black/55"}`} />
                  <p className="text-sm uppercase tracking-[0.28em] text-black/75 md:text-[13px]">{currentStateText}</p>
                </div>
              </div>

              <div className="inline-flex h-fit w-fit items-center rounded-full border border-black/[0.07] bg-black/[0.035] p-1">
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

        <main className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <motion.section
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="rounded-[34px] border border-black/[0.07] bg-white/70 p-5 shadow-[0_18px_80px_rgba(17,17,17,0.06)] backdrop-blur-xl md:p-7"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-black/42">{t.nextBatchDropsIn}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-medium tracking-[0.08em] md:text-5xl">{upcomingRelease?.batch}</h2>
                    <span className="rounded-full border border-black/[0.07] bg-black/[0.035] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/55">
                      {t.featuredPanel}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {timerItems.map((item) => (
                    <div key={item.label} className="rounded-[24px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(17,17,17,0.03),rgba(17,17,17,0.015))] px-4 py-5 text-center">
                      <div className="text-3xl font-semibold tracking-[0.08em] tabular-nums md:text-4xl">{item.value}</div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-black/42">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isLanding ? (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-6 rounded-[28px] border border-black/[0.07] bg-[linear-gradient(135deg,rgba(46,77,63,0.12),rgba(255,255,255,0.85))] px-6 py-7"
                  >
                    <p className="text-xl font-medium tracking-[0.16em] text-black/90 md:text-2xl">
                      {t.landingInStores}
                      <span className="inline-flex w-[1.6em] justify-start">
                        <span className="loading-dot">.</span>
                        <span className="loading-dot" style={{ animationDelay: "0.2s" }}>.</span>
                        <span className="loading-dot" style={{ animationDelay: "0.4s" }}>.</span>
                      </span>
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-black/50">{t.landingSubtext}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[28px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.68))] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-black/42">{t.upcomingStrains}</p>
                      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-black/76">
                        {(upcomingRelease?.strains || []).map((strain) => strain.name).join(" · ")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUpcomingOpen((value) => !value)}
                      className="rounded-full border border-black/[0.07] bg-black/[0.035] p-2 text-black/65"
                    >
                      <motion.div animate={{ rotate: upcomingOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {upcomingOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 grid gap-3">
                          {(upcomingRelease?.strains || []).map((strain) => (
                            <motion.div
                              key={strain.name}
                              whileHover={{ y: -2 }}
                              transition={{ type: "spring", stiffness: 260, damping: 26 }}
                              className={`rounded-[24px] border border-black/[0.07] bg-gradient-to-br ${getTypeTheme(strain.type).wash} ${getTypeTheme(strain.type).glow} p-4`}
                            >
                              <div className="flex flex-wrap items-center gap-3">
                                <p className="text-base tracking-[0.12em] text-black/92 md:text-lg">{strain.name}</p>
                                <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${getTypeTheme(strain.type).badge}`}>
                                  {strain.type}
                                </span>
                              </div>
                              <p className="mt-3 max-w-xl text-sm leading-7 text-black/62">{strain.notes?.[language]}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid gap-4">
                  {featuredStrains.map((strain, index) => (
                    <div key={strain.name} className="rounded-[26px] border border-black/[0.07] bg-black text-[#f5f5f2] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">0{index + 1}</span>
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${getTypeTheme(strain.type).badge}`}>
                          {strain.type}
                        </span>
                      </div>
                      <p className="mt-4 text-xl tracking-[0.1em]">{strain.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <section className="rounded-[34px] border border-black/[0.07] bg-white/70 p-5 shadow-[0_18px_80px_rgba(17,17,17,0.06)] backdrop-blur-xl md:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-black/42">{t.previousBatches}</p>
                  <h3 className="mt-3 text-3xl font-medium tracking-[0.06em]">{t.citySections}</h3>
                </div>
                <div className="rounded-full border border-black/[0.07] bg-black/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-black/55">
                  {userLocation ? t.closestStrains : t.storeCompass}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.07] bg-black/[0.045] px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-black/90 transition-all duration-200 hover:-translate-y-[1px] hover:border-black/12 hover:bg-black/[0.08]"
                >
                  <Compass className="h-3.5 w-3.5" />
                  {userLocation ? t.locationActive : t.useLocation}
                </button>
                {userLocation && <span className="text-[10px] uppercase tracking-[0.16em] text-black/45">{t.nearestFirst}</span>}
                {locationError && <span className="text-[10px] uppercase tracking-[0.16em] text-red-600">{t.locationUnavailable}</span>}
              </div>

              <p className="mt-4 text-sm leading-6 text-black/56">{t.nearbyText}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-black/36">{t.tapToExpand}</p>

              <div className="mt-8 grid gap-4">
                {sortedBatches.map((batch) => {
                  const open = openBatch === batch.batch;
                  const batchTheme = getTypeTheme(batch.type);

                  return (
                    <motion.div
                      key={batch.batch}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      className="overflow-hidden rounded-[30px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.72))]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenBatch((current) => (current === batch.batch ? null : batch.batch))}
                        className="w-full p-5 text-left md:p-6"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-black/42">{batch.batch}</span>
                              <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${batchTheme.badge}`}>
                                {batch.type}
                              </span>
                            </div>
                            <p className="mt-3 text-2xl tracking-[0.08em] text-black/94 md:text-3xl">{batch.strain}</p>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[430px]">
                            <InfoTile label={t.availableAt} value={`${batch.totalInStock}/${batch.totalStores}`} sub={`${batch.totalStores} ${t.storesLabel}`} />
                            <InfoTile label={t.cityLabel} value={String(batch.decoratedCities.length).padStart(2, "0")} sub={batch.decoratedCities[0]?.city || t.cityPrompt} />
                            <InfoTile label={t.storeCompass} value={batch.nearestDistance != null ? `${batch.nearestDistance.toFixed(1)}` : "--"} sub={batch.nearestDistance != null ? t.milesAway : t.cityPrompt} />
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/[0.07] pt-4">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-black/45">
                            <span className={`h-2 w-2 rounded-full ${batchTheme.dot}`} />
                            {userLocation ? t.closestStrains : t.tapToExpand}
                          </div>
                          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="rounded-full border border-black/[0.07] bg-black/[0.035] p-2 text-black/65">
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden border-t border-black/[0.07]"
                          >
                            <div className="grid gap-4 p-4 md:p-5 xl:grid-cols-2">
                              {batch.decoratedCities.map((cityGroup) => {
                                const cityOpen = isCityOpen(batch.batch, cityGroup.city);
                                const nearestLabel = cityGroup.nearestDistance != null ? `${cityGroup.nearestDistance.toFixed(1)} ${t.milesAway}` : null;

                                return (
                                  <motion.div key={`${batch.batch}-${cityGroup.city}`} layout className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-black/[0.018]">
                                    <button
                                      type="button"
                                      onClick={() => toggleCity(batch.batch, cityGroup.city)}
                                      className="w-full p-4 text-left"
                                    >
                                      <div className="flex items-center justify-between gap-4">
                                        <div>
                                          <p className="text-sm uppercase tracking-[0.18em] text-black/82">{cityGroup.city}</p>
                                          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/45">
                                            <span>{cityGroup.inStockCount} {t.inStock}</span>
                                            <span>•</span>
                                            <span>{cityGroup.stores.length} {t.storesLabel}</span>
                                            {nearestLabel ? <><span>•</span><span>{nearestLabel}</span></> : null}
                                          </div>
                                        </div>
                                        <motion.div animate={{ rotate: cityOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="rounded-full border border-black/[0.07] bg-white p-2 text-black/65">
                                          <ChevronDown className="h-4 w-4" />
                                        </motion.div>
                                      </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {cityOpen && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                          className="overflow-hidden"
                                        >
                                          <div className="space-y-3 border-t border-black/[0.07] p-3">
                                            {cityGroup.stores.map((store) => {
                                              const inStock = store.status === "IN STOCK";
                                              const stockLabel = inStock ? t.inStock : t.soldOut;

                                              return (
                                                <motion.div
                                                  key={`${cityGroup.city}-${store.name}`}
                                                  whileHover={{ y: -1.5 }}
                                                  transition={{ type: "spring", stiffness: 250, damping: 28 }}
                                                  className="rounded-[22px] border border-black/[0.07] bg-white/80 p-4"
                                                >
                                                  <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                      <div>
                                                        <p className="text-sm tracking-[0.04em] text-black/92 md:text-base">{store.name}</p>
                                                        {store.distance != null && (
                                                          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-black/45">
                                                            {store.distance.toFixed(1)} {t.milesAway}
                                                          </p>
                                                        )}
                                                      </div>
                                                      <span className={[
                                                        "w-fit rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em]",
                                                        inStock ? "border-[#bbf7d0] bg-[#e8f7ee] text-[#166534] stock-pulse" : "border-[#fecaca] bg-[#fbeaea] text-[#991b1b]",
                                                      ].join(" ")}>
                                                        {stockLabel}
                                                      </span>
                                                    </div>

                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                      <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/42 transition-colors duration-200 hover:text-black/75">
                                                        <span>{t.openInGoogleMaps}</span>
                                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                                      </a>

                                                      <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/[0.07] bg-black text-[11px] uppercase tracking-[0.16em] text-white px-5 py-3 transition-all duration-200 hover:-translate-y-[1px] hover:bg-black/90 sm:w-auto">
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
            </section>
          </section>

          <section className="space-y-6">
            <section className="rounded-[34px] border border-black/[0.07] bg-black text-[#f5f5f2] p-5 shadow-[0_22px_90px_rgba(17,17,17,0.18)] md:p-7 xl:sticky xl:top-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">{t.featuredPanel}</p>
                  <p className="mt-3 text-3xl tracking-[0.08em]">{upcomingRelease?.batch}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white/70">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {(upcomingRelease?.strains || []).map((strain) => (
                  <div key={strain.name} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm uppercase tracking-[0.2em] text-white/88">{strain.name}</p>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${getTypeTheme(strain.type).badge}`}>
                        {strain.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/58">{strain.notes?.[language]}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[34px] border border-black/[0.07] bg-white/70 p-5 shadow-[0_18px_80px_rgba(17,17,17,0.06)] backdrop-blur-xl md:p-7">
              <button type="button" onClick={() => setArchiveOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-black/[0.07] bg-black/[0.04] p-3 text-black/70">
                    <Archive className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-black/42">{t.archiveLabel}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[0.06em]">{t.archive}</h3>
                  </div>
                </div>

                <motion.div animate={{ rotate: archiveOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="rounded-full border border-black/[0.07] bg-black/[0.035] p-2 text-black/65">
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>

              <p className="mt-4 text-sm leading-7 text-black/60">{t.archiveCopy}</p>

              <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-black/45">
                <Radar className="h-3.5 w-3.5" />
                {archiveOpen ? t.hideArchive : t.showArchive}
              </div>

              <AnimatePresence initial={false}>
                {archiveOpen && (
                  <motion.div
                    key="archive-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(Array.isArray(batchArchive) ? batchArchive : []).map((item) => (
                        <motion.div
                          key={item.batch}
                          whileHover={{ y: -2 }}
                          transition={{ type: "spring", stiffness: 250, damping: 28 }}
                          className="rounded-[24px] border border-black/[0.07] bg-white/85 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-black/45">{item.batch}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${getTypeTheme(item.type).badge}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="mt-3 text-lg tracking-[0.12em] text-black/92">{item.strain}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-black/45">{item.status}</p>
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

function InfoTile({ label, value, sub }) {
  return (
    <div className="rounded-[22px] border border-black/[0.07] bg-black/[0.025] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-black/42">{label}</p>
      <p className="mt-2 text-2xl font-medium tracking-[0.06em] text-black/92">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-black/42">{sub}</p>
    </div>
  );
}

function CursorDot({ x, y, visible }) {
  return (
    <motion.div
      style={{ x, y, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ opacity: { duration: 0.08 }, scale: { duration: 0.08 } }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-2.5 w-2.5 rounded-full bg-[#111111] shadow-[0_0_10px_rgba(0,0,0,0.14)] md:block"
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
    seconds: String(seconds).padStart(2, "0"),
  };
}
