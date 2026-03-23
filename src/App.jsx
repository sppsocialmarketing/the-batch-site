import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { nextDropDate, previousBatches, upcomingRelease } from "./data";

export default function TheBatchSplashPage() {
  const targetDate = useMemo(() => new Date(nextDropDate), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timerItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 md:px-10 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-white/15 pb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-white/45">
                Limited Release Flower
              </p>
              <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-[0.12em]">
                THE BATCH
              </h1>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">Current State</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/70">Awaiting Next Drop</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-14 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <section>
            <div className="border border-white/12 rounded-3xl p-8 md:p-10 bg-white/[0.02] shadow-2xl shadow-white/[0.02]">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Next Batch Drops In</p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {timerItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="text-4xl md:text-5xl font-semibold tracking-[0.08em] tabular-nums">
                      {item.value}
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Upcoming Release</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-[0.08em]">{upcomingRelease.batch}</h2>
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                    {upcomingRelease.type}
                  </span>
                </div>
                <p className="mt-4 text-xl md:text-2xl tracking-[0.14em] text-white/92">
                  {upcomingRelease.strain}
                </p>
                <p className="mt-3 max-w-xl leading-7 text-white/70">{upcomingRelease.notes}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="border border-white/12 rounded-3xl p-8 md:p-10 bg-white/[0.02] shadow-2xl shadow-white/[0.02]">
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Previous Batches</p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-medium tracking-[0.06em]">Find In Store</h3>
                </div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Live Status</p>
              </div>

              <div className="mt-6 space-y-6">
                {previousBatches.map((batch) => (
                  <div key={batch.batch} className="rounded-3xl border border-white/8 bg-white/[0.015] p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-3 border-b border-white/8 pb-4">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">{batch.batch}</p>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                        {batch.type}
                      </span>
                    </div>
                    <h4 className="mt-4 text-xl tracking-[0.12em] text-white/92">{batch.strain}</h4>

                    <div className="mt-5 space-y-3">
                      {batch.stores.map((store) => {
                        const inStock = store.status === "IN STOCK";

                        return (
                          <motion.a
                            key={`${batch.batch}-${store.name}`}
                            href={store.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -3, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.015] px-4 py-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.03]"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="rounded-full border border-white/10 p-2 text-white/55 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/90">
                                <MapPin className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="block truncate text-sm tracking-[0.03em] text-white/88 group-hover:text-white md:text-base">
                                    {store.name}
                                  </span>
                                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                                </div>
                                <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-white/35">
                                  Open in Google Maps
                                </span>
                              </div>
                            </div>
                            <span
                              className={[
                                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] transition-all duration-300 md:text-sm",
                                inStock
                                  ? "border-green-500/35 bg-green-500/10 text-green-400 shadow-[0_0_18px_rgba(74,222,128,0.35)] group-hover:shadow-[0_0_24px_rgba(74,222,128,0.45)]"
                                  : "border-red-500/35 bg-red-500/10 text-red-400 shadow-[0_0_18px_rgba(248,113,113,0.35)] group-hover:shadow-[0_0_24px_rgba(248,113,113,0.45)]",
                              ].join(" ")}
                            >
                              {store.status}
                            </span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
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
