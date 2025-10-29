'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot
} from 'recharts';
import { useMoseStore } from '@/lib/store';
import type { ObjectiveKey } from '@/lib/model';

const metricMeta: Record<
  ObjectiveKey,
  { label: string; description: string; formatter: 'currency' | 'score' | 'risk'; axisLabel: string }
> = {
  initial_cost: {
    label: 'Initial construction cost',
    description:
      'Capital expenditure for movable gates versus fixed structures. More movable metres and taller gates increase expenditure.',
    formatter: 'currency',
    axisLabel: 'Cost (EUR)'
  },
  maintenance_cost: {
    label: 'Annual maintenance cost',
    description:
      'Recurring upkeep for movable gates and fixed structures. Frequent short closures and tall gates accelerate spending.',
    formatter: 'currency',
    axisLabel: 'Maintenance (EUR)'
  },
  sight: {
    label: 'Sightline score',
    description:
      'Aesthetic impact on Venice’s skyline. Movable gates stay underwater when not in use, improving the score.',
    formatter: 'score',
    axisLabel: 'Sight score [-]'
  },
  accessibility: {
    label: 'Navigation accessibility',
    description:
      'Measures how easy it is for vessels to enter and leave the lagoon. Long closures or few movable spans reduce access.',
    formatter: 'score',
    axisLabel: 'Accessibility score [-]'
  },
  water_quality: {
    label: 'Water quality score',
    description:
      'Proxy for tidal exchange and ecological health. Frequent closures stagnate water; more movable gates help the lagoon breathe.',
    formatter: 'score',
    axisLabel: 'Water quality score [-]'
  },
  overtopping_risk: {
    label: 'Residual overtopping risk',
    description:
      'Annual probability that surge water flows over the barrier. Taller gates suppress the risk exponentially.',
    formatter: 'risk',
    axisLabel: 'Risk [-]'
  }
};

function formatMetricValue(key: ObjectiveKey, value: number) {
  const meta = metricMeta[key];
  if (meta.formatter === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  }
  if (meta.formatter === 'risk') {
    return `${(value * 100).toFixed(1)}%`;
  }
  return value.toFixed(2);
}

export default function DesignPage() {
  const { config, design, metrics, preferences, prefFns, setDesign } = useMoseStore();
  const { bounds } = config;

  const preferenceCurves = useMemo(() => {
    return (config.OBJECTIVE_KEYS as ObjectiveKey[]).map((objective) => {
      const { x: domain } = config.knots[objective];
      const min = domain[0];
      const max = domain[domain.length - 1];
      const steps = 120;
      const samples = Array.from({ length: steps + 1 }, (_, idx) => {
        const value = min + (idx / steps) * (max - min);
        const preference = prefFns[objective]?.(value) ?? 0;
        return { metric: value, preference };
      });
      return { objective, min, max, samples };
    });
  }, [config.OBJECTIVE_KEYS, config.knots, prefFns]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-6 items-start lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
        <div className="space-y-6 lg:sticky lg:top-24 self-start">
          <header className="space-y-4">
            <h1 className="text-4xl font-semibold text-slate-800">Design &amp; Feasibility</h1>
            <p className="text-sm text-slate-600">
              Adjust the three degrees of freedom — movable length (x1), gate height (x2), and closure duration (x3) — to
              see how stakeholder metrics respond in real time. The sliders mirror the GA notebook used in PBED sessions.
            </p>
          </header>

          <section className="card p-6 space-y-6">
            <h2 className="section-title">Design Controls</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Movable barrier length x1 ({bounds.x1.unit})
                </label>
                <p className="text-xs text-slate-500">
                  {bounds.x1.min}–{bounds.x1.max} m. Represents how much of the 1.6 km inlet span is composed of movable
                  gates rather than fixed structure.
                </p>
                <input
                  type="range"
                  min={bounds.x1.min}
                  max={bounds.x1.max}
                  step={bounds.x1.step}
                  value={design.x1}
                  onChange={(event) => setDesign({ x1: Number(event.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-slate-700">Current: {design.x1.toFixed(0)} {bounds.x1.unit}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Gate height above water x2 ({bounds.x2.unit})
                </label>
                <p className="text-xs text-slate-500">
                  {bounds.x2.min}–{bounds.x2.max} m. Taller gates improve safety but are heavier, more visible, and harder
                  to maintain.
                </p>
                <input
                  type="range"
                  min={bounds.x2.min}
                  max={bounds.x2.max}
                  step={bounds.x2.step}
                  value={design.x2}
                  onChange={(event) => setDesign({ x2: Number(event.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-slate-700">Current: {design.x2.toFixed(2)} {bounds.x2.unit}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Closure duration x3 ({bounds.x3.unit})
                </label>
                <p className="text-xs text-slate-500">
                  {bounds.x3.min}–{bounds.x3.max} h. Short closures favour water exchange and port access; long closures
                  ease operations but frustrate shipping and ecology.
                </p>
                <input
                  type="range"
                  min={bounds.x3.min}
                  max={bounds.x3.max}
                  step={bounds.x3.step}
                  value={design.x3}
                  onChange={(event) => setDesign({ x3: Number(event.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-slate-700">Current: {design.x3.toFixed(2)} {bounds.x3.unit}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="card p-6 space-y-5">
            <h2 className="section-title">Design Variables in the MOSE Barrier Project</h2>
            <p className="text-sm text-slate-600">
              Within the MOSE barrier system, several design variables determine how the structure performs and interacts
              with its environment. Each variable represents a design choice that influences both the technical performance
              and the economic feasibility of the barrier. Some solutions may be more expensive but deliver higher
              reliability or reduced environmental impact, while others prioritise cost efficiency or faster operation.
              Understanding these trade-offs is essential when optimising the system&apos;s overall design.
            </p>
            <p className="text-sm text-slate-600">
              In our project we focus on three primary design variables that you can explore with the sliders:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>The length of the MOSE barrier.</li>
              <li>The height of the MOSE barrier.</li>
              <li>The closure time of the MOSE barrier.</li>
            </ul>
            <div className="space-y-6 text-sm text-slate-600">
              <article className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">1. Length of the MOSE barrier</h3>
                <p>
                  In the actual MOSE system, barriers span the three inlets of the Venetian Lagoon for a combined length of
                  approximately 1,600 metres. The length directly affects the construction cost, the amount of structure
                  visible above the water, and the openness of the lagoon to the Adriatic Sea.
                </p>
                <p>
                  For our study we vary the barrier length between 1 metre and 1,600 metres. The upper bound reflects the
                  full inlet length; any additional length would extend beyond the lagoon openings and is therefore not
                  considered.
                </p>
              </article>
              <article className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">2. Height of the MOSE barrier</h3>
                <p>
                  The current MOSE gates are engineered to resist tides up to roughly N.A.P. +3 metres. Barrier height
                  determines the maximum water level the system can withstand before overtopping occurs. Increasing the height
                  improves resilience against extreme events, but it also raises construction complexity, cost, and visual
                  impact on the lagoon landscape.
                </p>
                <p>
                  In the analysis the gate height is treated as a variable between 1 and 10 metres so that we can examine how
                  taller or shorter gates influence performance and stakeholder preferences.
                </p>
              </article>
              <article className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">3. Closure time of the MOSE barrier</h3>
                <p>
                  At present it takes about 32 minutes (≈0.5 hours) to close a MOSE gate completely. Closure time governs both
                  operational responsiveness and navigation impact. Faster closures enhance protection during sudden storm
                  surges but require more powerful mechanical systems and higher energy consumption. Longer closure times
                  reduce mechanical stress, yet they increase exposure to rapidly rising water levels and keep shipping
                  channels closed for longer.
                </p>
                <p>
                  We therefore allow closure time to range between 0.5 hours and 3 hours, capturing the trade-off between
                  efficiency, safety, and operational practicality.
                </p>
              </article>
            </div>
          </section>

          <section className="card p-6 space-y-6">
            <h2 className="section-title">Influence of Design Variables on MOSE Barrier Performance</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <p>
                The design variables of the MOSE barrier affect several key performance aspects of the system. Based on input
                from stakeholders (see the Stakeholders page), the following aspects have been identified as most important for
                evaluating the effectiveness and feasibility of the barrier:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Initial construction cost</li>
                <li>Lifetime maintenance cost</li>
                <li>Sightline score</li>
                <li>Navigation accessibility</li>
                <li>Water quality score</li>
                <li>Residual overtopping risk</li>
              </ul>
              <p>
                Each of these aspects is influenced by the three main design variables: the length (L), height (H), and closure
                time (T) of the barrier.
              </p>
            </div>
            <div className="space-y-6 text-sm text-slate-600">
              <article className="space-y-3">
                <h3 className="text-base font-semibold text-slate-700">Initial construction cost</h3>
                <p>
                  The initial construction cost represents the total investment required to build the MOSE barrier. This aspect is
                  crucial to stakeholders, as the project must remain financially feasible while still providing adequate
                  protection.
                </p>
                <p>
                  In our model, the initial construction cost depends directly on the length, height, and closure time of the
                  barrier. A longer and taller barrier increases both material and mechanical costs, while a shorter closure time
                  requires more powerful systems, making the design more expensive. Conversely, a shorter barrier results in lower
                  construction costs but requires additional traditional embankments, which are cheaper to build.
                </p>
                <p>The cost is estimated using the following equation:</p>
                <figure className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 text-center">
                  C<sub>initial</sub> = L × (H<sup>2</sup> × c<sub>2</sub> + (1 / T) × c<sub>2</sub>) + (1600 − L) × (H<sup>2</sup> × c<sub>3</sub>)
                </figure>
                <p>where:</p>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
                  <li>L = length of the barrier (in meters)</li>
                  <li>H = height of the barrier (in meters)</li>
                  <li>T = closure time (in hours)</li>
                  <li>c<sub>2</sub> = 4.8 × 10<sup>4</sup></li>
                  <li>c<sub>3</sub> = 5.5 × 10<sup>3</sup></li>
                </ul>
              </article>

              <article className="space-y-3">
                <h3 className="text-base font-semibold text-slate-700">Lifetime maintenance cost</h3>
                <p>
                  The lifetime maintenance cost represents the total cost of maintaining the MOSE barrier system throughout its
                  operational lifespan. This includes periodic inspections, mechanical maintenance, corrosion protection, and
                  replacement of worn components. From a stakeholder perspective, this aspect is vital to ensure the long-term
                  reliability and economic sustainability of the flood protection system.
                </p>
                <p>
                  In our model, this cost is primarily determined by the length (L), height (H), and closure time (T) of the
                  barrier. Longer and higher barriers require more maintenance due to their larger surface area and mechanical
                  complexity, while a shorter closure time increases the operational stress on moving components, leading to higher
                  upkeep costs over time.
                </p>
                <p>The lifetime maintenance cost is calculated using the following equation:</p>
                <figure className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 text-center">
                  C<sub>maintenance</sub> = L × (H × d<sub>1</sub> + (1 / T<sup>2</sup>) × d<sub>2</sub>) + (1600 − L) × (H × d<sub>3</sub>)
                </figure>
                <p>where:</p>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
                  <li>L = length of the barrier (in meters)</li>
                  <li>H = height of the barrier (in meters)</li>
                  <li>T = closure time (in hours)</li>
                  <li>d<sub>1</sub> = 4.8 × 10<sup>5</sup></li>
                  <li>d<sub>2</sub> = 1.5 × 10<sup>6</sup></li>
                  <li>d<sub>3</sub> = 2.2 × 10<sup>4</sup></li>
                </ul>
              </article>

              <article className="space-y-3">
                <h3 className="text-base font-semibold text-slate-700">Sightline score</h3>
                <p>
                  The sightline score represents the visual impact of the MOSE barrier on the surrounding landscape and views of
                  the Venetian Lagoon. Stakeholders identified this as an important factor for preserving the aesthetic value and
                  cultural heritage of the area. A design with taller or more extensive barrier sections can obstruct views,
                  whereas shorter or fewer movable elements maintain a more open and visually appealing horizon.
                </p>
                <p>
                  The sightline score depends on the length (L) and height (H) of the barrier. A larger proportion of movable
                  sections contributes positively to visibility, while higher barriers reduce it.
                </p>
                <p>The score is estimated using the following simplified equation:</p>
                <figure className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 text-center">
                  S<sub>sightline</sub> = (L / 1600) × 10 − ((1600 − L) / (1600 × H)) × 10
                </figure>
                <p>
                  This relationship captures the balance between movable and fixed parts: more movable sections improve visibility,
                  while higher structures decrease it. The final score is limited between 0 and 10, ensuring that extreme values
                  remain within a realistic range.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-base font-semibold text-slate-700">Navigation accessibility</h3>
                <p>
                  The navigation accessibility score reflects how easily ships and vessels can move in and out of the lagoon while
                  the barrier system is operational. This factor is crucial for maintaining economic activity and maritime
                  transport, both of which are vital to Venice.
                </p>
                <p>
                  Two variables play the largest role: The length (L), more movable sections mean fewer obstructions to
                  navigation. The closure time (T), faster closures reduce the total time the barrier remains shut, minimizing
                  disruption for ships.
                </p>
                <p>The navigation accessibility score is calculated as:</p>
                <figure className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 text-center">
                  S<sub>navigation</sub> = (L / 1600) × 10 − (10 / 7) × T
                </figure>
                <p>
                  Here, longer movable sections and shorter closure times result in better accessibility. The score is constrained
                  between 0 and 10, ensuring realistic operational boundaries.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-base font-semibold text-slate-700">Water quality score</h3>
                <p>
                  The water quality score represents how the operation of the MOSE barrier affects the exchange of water between
                  the lagoon and the Adriatic Sea. This exchange is critical for maintaining ecological balance and water quality.
                </p>
                <p>
                  A longer closure time reduces this exchange, causing water stagnation and degradation in quality. Conversely, a
                  system with more movable sections and faster closing cycles allows for greater flexibility, improving circulation
                  and water renewal.
                </p>
                <p>The score is given by:</p>
                <figure className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 text-center">
                  S<sub>water</sub> = (L / 1600) × 10 − (10 / 24) × T
                </figure>
                <p>
                  In this formula, increasing the barrier length improves the score (as more controlled openings exist), while
                  increasing closure time decreases it (as the lagoon remains closed for longer). Like other indicators, the score
                  is scaled between 0 and 10.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-base font-semibold text-slate-700">Residual overtopping risk</h3>
                <p>
                  Residual overtopping risk measures the remaining probability that water levels will exceed the barrier height
                  during extreme storm events. It depends mainly on the gate height: taller gates provide exponentially stronger
                  protection, though they increase cost and visual impact.
                </p>
                <figure className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
                  <span>
                    R<sub>overtopping</sub> = 0.65 &times; e<sup>&minus;0.35 &times; (H &minus; 1)</sup>
                  </span>
                </figure>
                <p className="text-xs text-slate-500">
                  H represents the barrier height in metres; the risk is scaled between 0 and 10 for interpretation.
                </p>
              </article>
            </div>
          </section>

          <section className="card p-6">
            <h2 className="section-title">Metric Feedback</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(Object.keys(metricMeta) as ObjectiveKey[]).map((key) => (
                <div key={key} className="rounded-2xl border border-slate-100 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700">{metricMeta[key].label}</p>
                    <span className="text-xs text-slate-500">
                      Preference: {preferences[key as keyof typeof preferences]} / 100
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">{formatMetricValue(key, metrics[key])}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 space-y-6">
            <h2 className="section-title">Preference Curves (notebook derived)</h2>
            <p className="text-sm text-slate-600">
              Each curve is the PCHIP interpolation from the <code>mose_3x5_corrected.ipynb</code> notebook and captures
              how stakeholders score a performance aspect as the underlying metric shifts. The red marker shows the
              preference score for the current design.
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {preferenceCurves.map(({ objective, samples, min, max }) => {
                const meta = metricMeta[objective];
                const clamp = (value: number) => Math.min(Math.max(value, min), max);
                const currentMetric = clamp(metrics[objective]);
                const currentPref = preferences[objective];

                return (
                  <article key={objective} className="space-y-3">
                    <h3 className="text-base font-semibold text-slate-700">{meta.label}</h3>
                    <div className="h-40 w-full">
                      <ResponsiveContainer>
                        <LineChart data={samples} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                          <XAxis
                            dataKey="metric"
                            tick={{ fill: '#475569', fontSize: 11 }}
                            type="number"
                            domain={[min, max]}
                            label={{
                              value: meta.axisLabel,
                              position: 'insideBottom',
                              offset: -6,
                              fill: '#475569',
                              fontSize: 10
                            }}
                          />
                          <YAxis
                            dataKey="preference"
                            domain={[0, 100]}
                            tick={{ fill: '#475569', fontSize: 11 }}
                            label={{
                              value: 'Preference (0-100)',
                              angle: -90,
                              position: 'insideLeft',
                              offset: 8,
                              fill: '#475569',
                              fontSize: 10
                            }}
                          />
                          <Tooltip
                            formatter={(value: number) => `${value.toFixed(1)} preference`}
                            labelFormatter={(label) => `${meta.label}: ${label.toLocaleString()}`}
                          />
                          <Line type="monotone" dataKey="preference" stroke="#0f60db" strokeWidth={2} dot={false} />
                          <ReferenceDot
                            x={currentMetric}
                            y={currentPref}
                            r={6}
                            fill="#dc2626"
                            stroke="white"
                            label={{ value: 'Current', position: 'top', fill: '#dc2626', fontSize: 10 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
