'use client';

const HERO_BACKGROUND =
  'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(56,189,248,0.3), transparent 55%), radial-gradient(circle at 50% 80%, rgba(167,139,250,0.25), transparent 60%)';

export function Hero() {
  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#0f172a',
          backgroundImage: HERO_BACKGROUND
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-slate-900/30" aria-hidden />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-6 px-6 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-lagoon-200">TU Delft · CIEM0000 Interdisciplinary Mechanics &amp; Design</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold md:text-6xl">
          MOSE Barrier Project Interactive Site
        </h1>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <div className="space-y-4">
            <p className="max-w-3xl text-base text-slate-200">
              This site is part of the assignment for the course CIEM0000 Interdisciplinary Mechanics and Design for Civil Engineering at TU Delft.
              We are Group_HOS 1, documenting how preference-based engineering design supports decisions for the MOSE flood barrier in Venice.
            </p>
            <div className="rounded-2xl bg-white/10 p-4 text-sm text-lagoon-100 shadow-lg backdrop-blur">
              <h2 className="text-base font-semibold text-white">Project team</h2>
              <ul className="mt-3 space-y-1">
                <li>Jasper de Ruiter (5278910)</li>
                <li>Roel Wielemaker (5397782)</li>
                <li>Wout Kragten (5640725)</li>
                <li>Mike Schaap (4999800)</li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/20 pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/6G4wfXSs6rU"
                title="MOSE Barrier introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
