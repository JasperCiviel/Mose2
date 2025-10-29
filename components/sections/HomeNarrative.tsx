'use client';

import Link from 'next/link';

export function HomeNarrative() {
  return (
    <section className="mx-auto mt-20 max-w-6xl space-y-12 px-6">
      <div className="max-w-4xl space-y-3 text-slate-600">
        <h2 className="text-2xl font-semibold text-slate-800">Setting the stage for MOSE</h2>
        <p className="text-sm leading-relaxed">
          Venice was built for the tides, yet climate change and land subsidence now push <em>acqua alta</em> events past livable limits.
          Since 2014 the city has endured 76 tides above 110 cm — more than double the number observed between 1870 and 1949. The MOSE
          (Modulo Sperimentale Elettromeccanico) barrier is Italy’s answer: 78 bright-yellow steel gates that rise from the lagoon bed to
          block the Adriatic during storms. It is an engineering landmark surrounded by controversy, delays, and questions about whether the
          benefits truly outweigh the impacts on ecology, heritage, and commerce.
        </p>
        <p className="text-sm leading-relaxed">
          Our CIEM0000 team at TU Delft used MOSE as the capstone case for preference-based engineering design. By translating stakeholder
          interviews, MCDA sessions, and optimization experiments into an interactive site, we explain how competing priorities were
          reconciled — and where tensions remain.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
        <article className="card space-y-6 p-6">
          <h3 className="section-title">Introduction highlights</h3>
          <dl className="space-y-6 text-sm leading-relaxed text-slate-600">
            <div>
              <dt className="font-semibold text-slate-800">Venice’s flooding problem</dt>
              <dd>
                Frequent “acqua alta” tides now swamp homes, museums, and the public realm. Protecting 118 islands without sacrificing the
                lagoon’s health is the design brief.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">What MOSE does</dt>
              <dd>
                Gates at Lido, Malamocco, and Chioggia pivot upward when forecasts exceed ~95 cm, sealing the lagoon until the surge passes.
                When stowed, they rest invisibly on the seabed.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Why we chose it</dt>
              <dd>
                MOSE combines massive public investment, environmental risk, and decades of political scandal. It is the perfect laboratory
                for weighing societal needs against engineering feasibility.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Course context</dt>
              <dd>
                CIEM0000 teaches Preference-Based Engineering Design (PBED). This site captures the PBED workflow — from stakeholder preference
                elicitation to multi-criteria analysis, optimization, and ethical reflection.
              </dd>
            </div>
          </dl>
        </article>

        <article className="card space-y-6 p-6">
          <h3 className="section-title">How to explore the studio</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            Each page expands one step of the PBED cycle, from eliciting stakeholder values to optimising the barrier geometry. Follow the
            call-outs below to dive into the material.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-lagoon-50 p-4 text-sm text-lagoon-900">
              <h4 className="font-semibold text-lagoon-700">Stakeholders</h4>
              <p className="mt-2 text-xs leading-relaxed">
                Meet the Municipality, Residents, Environmental Agency, and Shipping Companies to see how they evaluate MOSE.
              </p>
              <Link
                href="/stakeholders"
                className="mt-3 inline-flex text-xs font-semibold text-lagoon-800 underline underline-offset-2"
              >
                Visit stakeholder profiles
              </Link>
            </div>
            <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-800">
              <h4 className="font-semibold text-slate-700">Tetra MCDA</h4>
              <p className="mt-2 text-xs leading-relaxed">Review the weighted scoring that ranked MOSE against alternative coastal defences.</p>
              <Link
                href="/tetra"
                className="mt-3 inline-flex text-xs font-semibold text-slate-700 underline underline-offset-2"
              >
                Explore the Tetra analysis
              </Link>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
              <h4 className="font-semibold text-amber-700">Design sliders</h4>
              <p className="mt-2 text-xs leading-relaxed">Experiment with barrier length, height, and closure time to track performance metrics.</p>
              <Link
                href="/design"
                className="mt-3 inline-flex text-xs font-semibold text-amber-800 underline underline-offset-2"
              >
                Try the design model
              </Link>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
              <h4 className="font-semibold text-emerald-700">Optimization lab</h4>
              <p className="mt-2 text-xs leading-relaxed">
                Compare the stakeholder-weighted optimum with the Min–Max design and stakeholder-specific solutions.
              </p>
              <Link
                href="/opt"
                className="mt-3 inline-flex text-xs font-semibold text-emerald-800 underline underline-offset-2"
              >
                Run the optimisation
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
