import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, ArrowUpRight } from "lucide-react";
import { nextDropDate, nextRelease, storeReleases } from "./data";

const copy = {
  en: {
    currentState: "Current State",
    awaiting: "Awaiting Release",
    delivering: "Now in Stores",
    english: "EN",
    spanish: "ES",
    releaseCountdown: "Limited Release",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    landingInStores: "NOW IN STORES",
    landingSubtext: "Check store locations as this release arrives.",
    productHighlights: "Release Details",
    storeFinderLabel: "Store Finder",
    citySections: "Find a Store",
    nearbyText: "Indoor flower. Pesticide-free. Available in selected stores.",
    tapToExpand: "Click the strain, then a city, to view store availability.",
    openInGoogleMaps: "Open in Google Maps",
    directions: "Get Directions",
    useLocation: "Use My Location",
    locationActive: "Location Active",
    nearestFirst: "Nearest locations first",
    closestStrains: "Closest strains first",
    milesAway: "mi away",
    storesLabel: "stores",
    inStock: "IN STOCK",
    soldOut: "SOLD OUT",
    nextSectionLabel: "Up Next",
    nextSectionPrompt: "Releasing when the timer ends"
  },
  es: {
    currentState: "Estado Actual",
    awaiting: "Esperando Lanzamiento",
    delivering: "Ya en Tiendas",
    english: "EN",
    spanish: "ES",
    releaseCountdown: "Lanzamiento Limitado",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    landingInStores: "YA EN TIENDAS",
    landingSubtext: "Revisa las tiendas mientras llega este lanzamiento.",
    productHighlights: "Detalles del Lanzamiento",
    storeFinderLabel: "Buscador de Tiendas",
    citySections: "Encontrar Tienda",
    nearbyText: "Flor indoor. Libre de pesticidas. Disponible en tiendas seleccionadas.",
    tapToExpand: "Haz clic en el strain y luego en una ciudad para ver disponibilidad.",
    openInGoogleMaps: "Abrir en Google Maps",
    directions: "Cómo llegar",
    useLocation: "Usar mi ubicación",
    locationActive: "Ubicación activa",
    nearestFirst: "Ubicaciones más cercanas primero",
    closestStrains: "Strains más cercanos primero",
    milesAway: "mi de distancia",
    storesLabel: "tiendas",
    inStock: "EN STOCK",
    soldOut: "AGOTADO",
    nextSectionLabel: "Lo Siguiente",
    nextSectionPrompt: "Se libera cuando termine el contador"
  }
};

const typeTheme = {
  SATIVA: {
    badge: "border-[#8D6A1F]/30 bg-[#C6A85A]/10 text-[#C6A85A]",
  },
  HYBRID: {
    badge: "border-[#8D6A1F]/30 bg-[#C6A85A]/10 text-[#C6A85A]",
  },
  INDICA: {
    badge: "border-[#8D6A1F]/30 bg-[#C6A85A]/10 text-[#C6A85A]",
  },
};

function getTypeTheme(type) {
  return typeTheme[type] || {
    badge: "border-[#8D6A1F]/30 bg-[#C6A85A]/10 text-[#C6A85A]",
  };
}

export default function TheBatchSplashPage() {
  const targetDate = useMemo(() => new Date(nextDropDate), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [openStrain, setOpenStrain] = useState((Array.isArray(storeReleases) ? storeReleases[0]?.strain : null) ?? null);
  const [openCity, setOpenCity] = useState({});
  const [language, setLanguage] = useState("en");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

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
      navigator.geolocation.getCurrentPosition(onSuccess, () => setLocationError(true), {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 120000,
    });
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

  const toggleCity = (strainKey, cityName) => {
    const key = `${strainKey}__${cityName}`;
    setOpenCity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCityOpen = (strainKey, cityName) => !!openCity[`${strainKey}__${cityName}`];

  const normalizeCities = (release) => {
    if (Array.isArray(release?.storesByCity)) return release.storesByCity;
    return [];
  };

  const decorateCities = (release) => {
    return normalizeCities(release)
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

        const nearestDistance = stores.find((store) => store.distance != null)?.distance ?? null;

        return {
          ...cityGroup,
          stores,
          nearestDistance,
        };
      })
      .sort((a, b) => {
        if (!userLocation) return 0;
        if (a.nearestDistance == null && b.nearestDistance == null) return 0;
        if (a.nearestDistance == null) return 1;
        if (b.nearestDistance == null) return -1;
        return a.nearestDistance - b.nearestDistance;
      });
  };

  const getSortedReleases = () => {
    const safeReleases = Array.isArray(storeReleases) ? storeReleases : [];

    return safeReleases
      .map((release) => {
        const decoratedCities = decorateCities(release);
        const nearestDistance = decoratedCities.flatMap((city) => city.stores).find((store) => store.distance != null)?.distance ?? null;

        return {
          ...release,
          decoratedCities,
          nearestDistance,
        };
      })
      .sort((a, b) => {
        if (!userLocation) return 0;
        if (a.nearestDistance == null && b.nearestDistance == null) return 0;
        if (a.nearestDistance == null) return 1;
        if (b.nearestDistance == null) return -1;
        return a.nearestDistance - b.nearestDistance;
      });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0b0b] px-4 py-8 text-[#ededed] md:px-8 md:py-10 lg:px-16">
      <CursorDot x={cursorX} y={cursorY} visible={cursorVisible} />

      <div className="mx-auto max-w-6xl">
        <header className="border-b border-white/10 pb-7 md:pb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-[0.11em] sm:text-5xl md:text-7xl">THE BATCH</h1>
            </div>

            <div className="flex flex-col gap-4 text-left md:items-end md:text-right">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#ededed]/35">{t.currentState}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#e7d38a]">{isLanding ? t.delivering : t.awaiting}</p>
              </div>

              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 p-1">
                <button type="button" onClick={() => setLanguage("en")} className={["rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-200", language === "en" ? "bg-[#e7d38a] text-[#0b0b0b]" : "text-[#ededed]/65 hover:text-[#ededed]"].join(" ")}>
                  {t.english}
                </button>
                <button type="button" onClick={() => setLanguage("es")} className={["rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-200", language === "es" ? "bg-[#e7d38a] text-[#0b0b0b]" : "text-[#ededed]/65 hover:text-[#ededed]"].join(" ")}>
                  {t.spanish}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-12 pt-12 md:gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:pt-16">
          <section className="space-y-10 md:space-y-12">
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 26 }} className="rounded-[28px] border border-[#c6a85a]/20 bg-white/[0.03] p-7 shadow-2xl shadow-black/30 backdrop-blur-[2px] md:p-11">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#ededed]/45">{t.releaseCountdown}</p>

                {isLanding ? (
                  <div className="mt-6 rounded-[28px] border border-[#c6a85a]/20 bg-[#c6a85a]/[0.06] px-6 py-10 text-center md:px-8 md:py-12">
                    <div className="mx-auto max-w-2xl">
                      <p className="text-xl font-medium tracking-[0.16em] text-[#f2e5b5] md:text-3xl">
                        {t.landingInStores}
                        <span className="inline-flex w-[1.6em] justify-start">
                          <span className="loading-dot">.</span>
                          <span className="loading-dot" style={{ animationDelay: "0.2s" }}>.</span>
                          <span className="loading-dot" style={{ animationDelay: "0.4s" }}>.</span>
                        </span>
                      </p>
                      <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[#ededed]/55">{t.landingSubtext}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    {timerItems.map((item) => (
                      <div key={item.label} className="rounded-[22px] border border-white/10 bg-white/[0.03] px-3 py-5 text-center transition-transform duration-200 hover:-translate-y-1 md:px-4 md:py-6">
                        <div className="text-3xl font-semibold tracking-[0.08em] tabular-nums text-[#f5f5f0] sm:text-4xl md:text-5xl">{item.value}</div>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#ededed]/45">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#c6a85a]">{t.nextSectionLabel}</p>
                <h2 className="mt-4 text-2xl font-medium tracking-[0.06em] text-[#f2e5b5] md:text-3xl">{nextRelease.title?.[language]}</h2>
                <p className="mt-3 text-sm leading-6 text-[#ededed]/55">{nextRelease.subtitle?.[language]}</p>

                <div className="mt-6 rounded-[22px] border border-[#c6a85a]/20 bg-[#c6a85a]/[0.05] px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-[#e7d38a]">
                  {t.nextSectionPrompt}
                </div>

                <div className="mt-6 space-y-3">
                  {(nextRelease?.strains || []).map((strain) => (
                    <motion.div
                      key={strain.name}
                      whileHover={{ y: -1.5 }}
                      transition={{ type: "spring", stiffness: 250, damping: 28 }}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition-all duration-200 hover:border-[#c6a85a]/20 hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-base tracking-[0.12em] text-[#f5f5f0] md:text-lg">{strain.name}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${getTypeTheme(strain.type).badge}`}>{strain.type}</span>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-[#ededed]/68">{strain.notes?.[language]}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          <section>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/25 backdrop-blur-[2px] md:p-11">
              <div className="border-b border-white/10 pb-5">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#c6a85a]">{t.storeFinderLabel}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[0.06em] text-[#f5f5f0] md:text-3xl">{t.citySections}</h3>
                <p className="mt-3 text-sm leading-6 text-[#ededed]/55">{t.nearbyText}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#ededed]/35">{t.tapToExpand}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={handleUseLocation} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[#ededed]/90 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#c6a85a]/25 hover:bg-white/[0.08]">
                    {userLocation ? t.locationActive : t.useLocation}
                  </button>
                  {userLocation && <span className="text-[11px] uppercase tracking-[0.16em] text-[#e7d38a]">{t.nearestFirst}</span>}
                  {locationError && <span className="text-[11px] uppercase tracking-[0.16em] text-[#fca5a5]">Location unavailable</span>}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {getSortedReleases().map((release) => {
                  const releaseOpen = openStrain === release.strain;

                  return (
                    <motion.div key={release.strain} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 28 }} className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
                      <button type="button" onClick={() => setOpenStrain(releaseOpen ? null : release.strain)} className="flex w-full items-center justify-between gap-4 p-4 text-left transition-all duration-200 hover:bg-white/[0.04] md:p-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-base tracking-[0.12em] text-[#f5f5f0] md:text-lg">{release.strain}</p>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${getTypeTheme(release.type).badge}`}>{release.type}</span>
                          </div>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#ededed]/45">{release.decoratedCities?.length || 0} {t.storesLabel}</p>
                        </div>

                        <motion.div animate={{ rotate: releaseOpen ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] p-2 text-[#ededed]/65">
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {releaseOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-white/10">
                            <div className="space-y-3 p-3 md:p-4">
                              {release.decoratedCities.map((cityGroup) => {
                                const cityOpen = isCityOpen(release.strain, cityGroup.city);

                                return (
                                  <motion.div key={`${release.strain}-${cityGroup.city}`} className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.025]">
                                    <button type="button" onClick={() => toggleCity(release.strain, cityGroup.city)} className="flex w-full items-center justify-between gap-4 p-3 text-left transition-all duration-200 hover:bg-white/[0.035]">
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2 text-[#f5f5f0]">
                                          <MapPin className="h-3.5 w-3.5 text-[#c6a85a]" />
                                          <p className="truncate text-sm tracking-[0.03em] md:text-base">{cityGroup.city}</p>
                                        </div>
                                        {cityGroup.nearestDistance != null && <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#ededed]/45">{cityGroup.nearestDistance.toFixed(1)} {t.milesAway}</p>}
                                      </div>

                                      <motion.div animate={{ rotate: cityOpen ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] p-2 text-[#ededed]/65">
                                        <ChevronDown className="h-4 w-4" />
                                      </motion.div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {cityOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                                          <div className="space-y-3 border-t border-white/10 p-3">
                                            {cityGroup.stores.map((store) => {
                                              const inStock = store.status === "IN STOCK";
                                              const stockLabel = inStock ? t.inStock : t.soldOut;

                                              return (
                                                <motion.div key={`${cityGroup.city}-${store.name}`} whileHover={{ y: -1.5 }} transition={{ type: "spring", stiffness: 250, damping: 28 }} className="group rounded-[22px] border border-white/10 bg-white/[0.03] p-3 transition-all duration-200 hover:border-[#c6a85a]/20 hover:bg-white/[0.05]">
                                                  <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                      <div className="min-w-0">
                                                        <p className="text-sm tracking-[0.03em] text-[#f5f5f0] md:text-base">{store.name}</p>
{store.phone && (
  <div className="mt-2">
    <a href={`tel:${store.phone}`} className="block text-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[#ededed]/90 hover:border-[#c6a85a]/25">
      Call to confirm availability
    </a>
  </div>
)}

                                                        {store.distance != null && <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#ededed]/45">{store.distance.toFixed(1)} {t.milesAway}</p>}
                                                      </div>

                                                      <span className={["w-fit shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200", inStock ? "border-[#355d45] bg-[#102217] text-[#7df0a7] group-hover:shadow-[0_0_10px_rgba(34,197,94,0.14)]" : "border-[#5f2c2c] bg-[#221010] text-[#fca5a5] group-hover:shadow-[0_0_10px_rgba(239,68,68,0.10)]"].join(" ")}>
                                                        {stockLabel}
                                                      </span>
                                                    </div>

                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                      <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#ededed]/42 transition-colors duration-200 hover:text-[#ededed]/75">
                                                        <span>{t.openInGoogleMaps}</span>
                                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                                      </a>

                                                      <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-[#ededed]/90 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#c6a85a]/25 hover:bg-white/[0.08] sm:w-auto">
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
        </main>
      </div>
    </div>
  );
}

function CursorDot({ x, y, visible }) {
  return (
    <motion.div
      style={{ x, y, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ opacity: { duration: 0.08 }, scale: { duration: 0.08 } }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-2.5 w-2.5 rounded-full bg-[#e7d38a] shadow-[0_0_12px_rgba(231,211,138,0.2)] md:block"
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
