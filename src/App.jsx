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
    upcomingRelease: "Upcoming Release",
    upcomingStrains: "Active Batches",
    previousBatches: "Find a Store",
    citySections: "Find a Store",
    nearbyText: "Fastest way to check your city or somewhere close.",
    tapToExpand: "Click a strain to see if it's in your city or nearby!",
    openInGoogleMaps: "Open in Google Maps",
    directions: "Get Directions",
    cityLabel: "City",
    inStock: "IN STOCK",
    soldOut: "SOLD OUT",
    archive: "Batch Archive",
    archiveLabel: "Past Drops",
    archiveCopy: "A clean record of every release. Built for scale, so as more batches drop, the archive stays organized instead of turning into a wall of chaos.",
    showArchive: "Show Archive",
    hideArchive: "Hide Archive"
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
    upcomingRelease: "Próximo Lanzamiento",
    upcomingStrains: "activo Batches",
    previousBatches: "Encontrar una tienda",
    citySections: "Buscar por Ciudad",
    nearbyText: "La forma más rápida de revisar tu ciudad o una cercana.",
    tapToExpand: "¡Haz clic en una variedad para ver si está en tu ciudad o cerca!",
    openInGoogleMaps: "Abrir en Google Maps",
    directions: "Cómo llegar",
    cityLabel: "Ciudad",
    inStock: "EN STOCK",
    soldOut: "AGOTADO",
    archive: "Archivo de Batches",
    archiveLabel: "Drops Anteriores",
    archiveCopy: "Un registro limpio de cada lanzamiento. Hecho para crecer, para que cuando haya muchos batches el archivo siga ordenado y no se convierta en un muro de caos.",
    showArchive: "Mostrar Archivo",
    hideArchive: "Ocultar Archivo"
  }
};

export default function TheBatchSplashPage() {
  const targetDate = useMemo(() => new Date(nextDropDate), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [openBatch, setOpenBatch] = useState(previousBatches[0]?.batch ?? null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [upcomingOpen, setUpcomingOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [cursorVisible, setCursorVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 700, damping: 45, mass: 0.2 });
  const smoothY = useSpring(cursorY, { stiffness: 700, damping: 45, mass: 0.2 });

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

  const timerItems = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black px-4 py-8 text-white md:px-8 md:py-10 lg:px-16">
      <CursorDot x={smoothX} y={smoothY} visible={cursorVisible} />

      <div className="mx-auto max-w-6xl">
        <header className="border-b border-white/12 pb-7 md:pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45 md:text-xs">{t.topLabel}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[0.12em] sm:text-5xl md:text-7xl">THE BATCH</h1>
            </div>

            <div className="flex flex-col gap-4 text-left md:items-end md:text-right">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">{t.currentState}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/70">{t.awaiting}</p>
              </div>

              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={["rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-300", language === "en" ? "bg-white text-black" : "text-white/65 hover:text-white"].join(" ")}
                >
                  {t.english}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("es")}
                  className={["rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-300", language === "es" ? "bg-white text-black" : "text-white/65 hover:text-white"].join(" ")}
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
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="rounded-3xl border border-white/12 bg-white/[0.02] p-6 shadow-2xl shadow-white/[0.02] backdrop-blur-[2px] md:p-10"
            >
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">{t.nextBatchDropsIn}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {timerItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-5 text-center transition-transform duration-300 hover:-translate-y-1 md:px-4 md:py-6">
                    <div className="text-3xl font-semibold tracking-[0.08em] tabular-nums sm:text-4xl md:text-5xl">{item.value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">{t.upcomingRelease}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-medium tracking-[0.08em] md:text-4xl">{upcomingRelease.batch}</h2>
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                    {upcomingRelease.strains.length} {upcomingRelease.strains.length === 1 ? "STRAIN" : "STRAINS"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setUpcomingOpen((value) => !value)}
                  className="mt-5 flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-left transition-all duration-300 hover:border-white/18 hover:bg-white/[0.04]"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">{t.upcomingStrains}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/82">{upcomingRelease.strains.map((strain) => strain.name).join(" · ")}</p>
                  </div>

                  <motion.div animate={{ rotate: upcomingOpen ? 180 : 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/65">
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {upcomingOpen && (
                    <motion.div key="upcoming-strains" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="mt-4 space-y-3">
                        {upcomingRelease.strains.map((strain) => (
                          <motion.div key={strain.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} className="rounded-2xl border border-white/8 bg-white/[0.018] p-4 transition-all duration-300 hover:border-white/16 hover:bg-white/[0.03]">
                            <div className="flex flex-wrap items-center gap-3">
                              <p className="text-base tracking-[0.12em] text-white/92 md:text-lg">{strain.name}</p>
                              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55">{strain.type}</span>
                            </div>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-white/68">{strain.notes[language]}</p>
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
            <div className="rounded-3xl border border-white/12 bg-white/[0.02] p-5 shadow-2xl shadow-white/[0.02] backdrop-blur-[2px] md:p-10">
              <div className="border-b border-white/10 pb-5">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">{t.previousBatches}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[0.06em] md:text-3xl">{t.citySections}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{t.nearbyText}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/35">{t.tapToExpand}</p>
              </div>

              <div className="mt-6 space-y-4">
                {previousBatches.map((batch) => {
                  const isOpen = openBatch === batch.batch;

                  return (
                    <motion.div key={batch.batch} layout transition={{ layout: { type: "spring", stiffness: 220, damping: 22 } }} className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.015] backdrop-blur-[1px] transition-all duration-300 hover:border-white/16 hover:bg-white/[0.03] hover:shadow-[0_14px_40px_rgba(255,255,255,0.05)]">
                      <button
                        type="button"
                        onClick={() => setOpenBatch(isOpen ? null : batch.batch)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-5"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">{batch.batch}</span>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55">{batch.type}</span>
                          </div>
                          <p className="mt-3 truncate pr-2 text-lg tracking-[0.12em] text-white/92 md:text-xl">{batch.strain}</p>
                        </div>

                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/65">
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                            <div className="space-y-4 border-t border-white/8 px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-4">
                              {batch.storesByCity.map((cityGroup) => (
                                <div key={`${batch.batch}-${cityGroup.city}`} className="rounded-2xl border border-white/8 bg-white/[0.02] p-3 sm:p-4">
                                  <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                                    <div className="rounded-full border border-white/10 p-2 text-white/55">
                                      <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">{t.cityLabel}</p>
                                      <p className="text-sm tracking-[0.08em] text-white/92 md:text-base">{cityGroup.city}</p>
                                    </div>
                                  </div>

                                  <div className="mt-3 space-y-3">
                                    {cityGroup.stores.slice().sort((a, b) => (a.status === "IN STOCK" ? -1 : 1) - (b.status === "IN STOCK" ? -1 : 1)).map((store) => {
                                      const inStock = store.status === "IN STOCK";
                                      const stockLabel = inStock ? t.inStock : t.soldOut;

                                      return (
                                        <motion.div key={`${cityGroup.city}-${store.name}`} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} className="group rounded-2xl border border-white/8 bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/16 hover:bg-white/[0.045] hover:backdrop-blur-md">
                                          <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                              <div className="min-w-0">
                                                <p className="text-sm tracking-[0.03em] text-white/92 md:text-base">{store.name}</p>
                                              </div>

                                              <span className={["w-fit shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-300", inStock ? "stock-pulse border-green-500/35 bg-green-500/10 text-green-400 group-hover:shadow-[0_0_24px_rgba(74,222,128,0.48)]" : "border-red-500/35 bg-red-500/10 text-red-400 shadow-[0_0_18px_rgba(248,113,113,0.35)] group-hover:shadow-[0_0_24px_rgba(248,113,113,0.45)]"].join(" ")}>
                                                {stockLabel}
                                              </span>
                                            </div>

                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                              <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-white/42 transition-colors duration-300 hover:text-white/75">
                                                <span>{t.openInGoogleMaps}</span>
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                              </a>

                                              <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/[0.09] sm:w-auto">
                                                <span>{t.directions}</span>
                                                <ArrowRight className="h-3.5 w-3.5" />
                                              </a>
                                            </div>
                                          </div>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
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
            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-[2px] md:p-8">
              <button type="button" onClick={() => setArchiveOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/10 p-2 text-white/70">
                    <Archive className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">{t.archiveLabel}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[0.06em]">{t.archive}</h3>
                  </div>
                </div>

                <motion.div animate={{ rotate: archiveOpen ? 180 : 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/65">
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">{t.archiveCopy}</p>

              <div className="mt-4">
                <button type="button" onClick={() => setArchiveOpen((value) => !value)} className="text-[11px] uppercase tracking-[0.28em] text-white/45 transition-colors duration-300 hover:text-white/80">
                  {archiveOpen ? t.hideArchive : t.showArchive}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {archiveOpen && (
                  <motion.div key="archive-content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {batchArchive.map((item) => (
                        <motion.div key={item.batch} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} className="rounded-2xl border border-white/8 bg-white/[0.018] p-4 transition-all duration-300 hover:border-white/16 hover:bg-white/[0.03]">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">{item.batch}</span>
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55">{item.type}</span>
                          </div>
                          <p className="mt-3 text-lg tracking-[0.12em] text-white/92">{item.strain}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/45">{item.status}</p>
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
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)] md:block"
    />
  );
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
