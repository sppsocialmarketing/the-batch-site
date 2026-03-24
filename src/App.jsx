import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, ArrowUpRight } from "lucide-react";
import { nextDropDate, previousBatches, upcomingRelease } from "./data";

export default function TheBatchSplashPage() {
  const targetDate = useMemo(() => new Date(nextDropDate), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [openBatch, setOpenBatch] = useState(previousBatches[0]?.batch ?? null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return undefined;

    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };

    const onLeave = () => setCursor((current) => ({ ...current, visible: false }));
    const onEnter = () => setCursor((current) => ({ ...current, visible: true }));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseover", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseover", onEnter);
    };
  }, []);

  const timerItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black px-4 py-8 text-white md:px-8 md:py-10 lg:px-16">
      <CursorDot cursor={cursor} />

      <div className="mx-auto max-w-6xl">
        <header className="border-b border-white/12 pb-7 md:pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45 md:text-xs">
                Limited Release Flower
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[0.12em] sm:text-5xl md:text-7xl">
                THE BATCH
              </h1>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">Current State</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/70">Awaiting Next Drop</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:pt-12">
          <section>
            <div className="rounded-3xl border border-white/12 bg-white/[0.02] p-6 shadow-2xl shadow-white/[0.02] md:p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Next Batch Drops In</p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {timerItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-5 text-center transition-transform duration-300 hover:-translate-y-1 md:px-4 md:py-6"
                  >
                    <div className="text-3xl font-semibold tracking-[0.08em] tabular-nums sm:text-4xl md:text-5xl">
                      {item.value}
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 border-t border-white/10 pt-7 md:mt-10 md:pt-8">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Upcoming Release</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-medium tracking-[0.08em] md:text-4xl">{upcomingRelease.batch}</h2>
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                    {upcomingRelease.type}
                  </span>
                </div>
                <p className="mt-4 text-lg tracking-[0.14em] text-white/92 sm:text-xl md:text-2xl">
                  {upcomingRelease.strain}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 md:text-base">{upcomingRelease.notes}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="rounded-3xl border border-white/12 bg-white/[0.02] p-6 shadow-2xl shadow-white/[0.02] md:p-8 lg:p-10">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Previous Batches</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[0.06em] md:text-3xl">Find In Store</h3>
                </div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Tap a strain to expand</p>
              </div>

              <div className="mt-6 space-y-4">
                {previousBatches.map((batch) => {
                  const isOpen = openBatch === batch.batch;
                  return (
                    <div key={batch.batch} className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.015]">
                      <button
                        type="button"
                        onClick={() => setOpenBatch(isOpen ? null : batch.batch)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03] md:px-5 md:py-5"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <p className="text-base tracking-[0.12em] text-white/92 md:text-xl">{batch.strain}</p>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                              {batch.type}
                            </span>
                          </div>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/45">{batch.batch}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.24 }}
                          className="shrink-0 rounded-full border border-white/10 p-2 text-white/60"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="overflow-hidden border-t border-white/8"
                          >
                            <div className="space-y-3 p-4 md:p-5">
                              {batch.stores.map((store) => {
                                const inStock = store.status === "IN STOCK";
                                return (
                                  <motion.a
                                    key={`${batch.batch}-${store.name}`}
                                    href={store.mapsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -2, scale: 1.005 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[0.015] px-4 py-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
                                  >
                                    <div className="flex min-w-0 items-start gap-3">
                                      <div className="mt-0.5 rounded-full border border-white/10 p-2 text-white/55 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/90">
                                        <MapPin className="h-4 w-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex min-w-0 items-center gap-2">
                                          <span className="block break-words text-sm tracking-[0.03em] text-white/88 group-hover:text-white md:text-base">
                                            {store.name}
                                          </span>
                                          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                                        </div>
                                        <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-white/35">
                                          Open in Google Maps
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex justify-start sm:justify-end">
                                      <span
                                        className={[
                                          "inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-300 sm:text-xs md:text-sm",
                                          inStock
                                            ? "border-green-500/35 bg-green-500/10 text-green-400 shadow-[0_0_18px_rgba(74,222,128,0.35)] group-hover:shadow-[0_0_24px_rgba(74,222,128,0.45)]"
                                            : "border-red-500/35 bg-red-500/10 text-red-400 shadow-[0_0_18px_rgba(248,113,113,0.35)] group-hover:shadow-[0_0_24px_rgba(248,113,113,0.45)]",
                                        ].join(" ")}
                                      >
                                        {store.status}
                                      </span>
                                    </div>
                                  </motion.a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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

function CursorDot({ cursor }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block [@media(pointer:fine)]:block">
      <motion.div
        animate={{
          x: cursor.x - 6,
          y: cursor.y - 6,
          opacity: cursor.visible ? 1 : 0,
          scale: cursor.visible ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.25 }}
        className="h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]"
      />
    </div>
  );
}

function getTimeLeft(targetDate) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
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
