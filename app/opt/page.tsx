'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts';
import { useMoseStore } from '@/lib/store';
import type { ObjectiveKey } from '@/lib/model';

const WEIGHT_PRESETS = [
  {
    key: 'balanced',
    label: 'Balanced (course default)',
    values: [0.5, 0.25, 0.1, 0.15] as const,
    description:
      'Matches the stakeholder interviews used in the notebook: Municipality leads, Residents hold a quarter share, followed by Environmental Agency and Shipping.'
  },
  {
    key: 'civic-safety',
    label: 'Civic safety priority',
    values: [0.6, 0.25, 0.05, 0.1] as const,
    description:
      'Municipality and Residents dominate the decision, pushing the GA toward designs that maximise flood safety and cost accountability.'
  },
  {
    key: 'environmental',
    label: 'Environmental emphasis',
    values: [0.35, 0.15, 0.35, 0.15] as const,
    description:
      'Weights chosen to highlight lagoon ecology concerns while still acknowledging civic and navigation needs.'
  },
  {
    key: 'navigation',
    label: 'Navigation emphasis',
    values: [0.4, 0.15, 0.1, 0.35] as const,
    description:
      'Gives the port and marine transport sector a leading voice, favouring shorter closures and more movable spans.'
  }
] as const;

type PresetKey = (typeof WEIGHT_PRESETS)[number]['key'];

type DesignVector = {
  x1: number;
  x2: number;
  x3: number;
};

type MetricSet = Record<ObjectiveKey, number>;

type StaticResult = {
  design: DesignVector;
  metrics: MetricSet;
  preferences: Record<ObjectiveKey, number>;
};

type PresetResults = Record<'minmax' | 'tetra', StaticResult>;

type SoloResults = Record<string, PresetResults>;

type ObjectiveMeta = {
  label: string;
  format: (value: number) => string;
};

const OBJECTIVE_META: Record<ObjectiveKey, ObjectiveMeta> = {
  initial_cost: {
    label: 'Initial cost (EUR)',
    format: (value) => value.toExponential(3)
  },
  maintenance_cost: {
    label: 'Maintenance cost (EUR)',
    format: (value) => value.toExponential(3)
  },
  sight: {
    label: 'Sight score',
    format: (value) => value.toFixed(2)
  },
  accessibility: {
    label: 'Navigation accessibility',
    format: (value) => value.toFixed(2)
  },
  water_quality: {
    label: 'Water quality score',
    format: (value) => value.toFixed(2)
  },
  overtopping_risk: {
    label: 'Residual overtopping risk',
    format: (value) => value.toFixed(3)
  }
};

function formatPreference(value: number) {
  return `${Math.round(value)} / 100`;
}

function renderResultSummary(
  title: string,
  result: StaticResult | null,
  objectives: ObjectiveKey[]
) {
  if (!result) {
    return <p className="text-sm text-slate-600">Run the optimisation to view this result.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <ul className="space-y-1 text-sm text-slate-700">
        <li>
          <span className="font-medium">x1:</span> {result.design.x1.toFixed(2)} m movable gates
        </li>
        <li>
          <span className="font-medium">x2:</span> {result.design.x2.toFixed(2)} m gate height
        </li>
        <li>
          <span className="font-medium">x3:</span> {result.design.x3.toFixed(2)} h closure duration
        </li>
      </ul>
      <ul className="space-y-1 text-xs text-slate-500">
        {objectives.map((key) => (
          <li key={key}>
            <span className="font-medium text-slate-700">{OBJECTIVE_META[key].label}:</span> {OBJECTIVE_META[key].format(result.metrics[key])}
            <span className="ml-2 text-slate-400">Preference {formatPreference(result.preferences[key])}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OptimizationPage() {
  const {
    config,
    stakeholderNames,
    stakeholderWeights,
    stakeholderRawInfluence,
    stakeholderRawObjectiveWeights,
    prefFns,
    setStakeholderInfluences
  } = useMoseStore();

  const objectives = config.OBJECTIVE_KEYS.slice() as ObjectiveKey[];

  const buildResult = (design: DesignVector, metrics: MetricSet): StaticResult => {
    const preferences = {} as Record<ObjectiveKey, number>;
    objectives.forEach((key) => {
      const fn = prefFns?.[key];
      preferences[key] = fn ? Math.round(fn(metrics[key])) : 0;
    });
    return { design, metrics, preferences };
  };

  const presetData = useMemo<Record<PresetKey, PresetResults>>(() => {
    return {
      balanced: {
        minmax: buildResult(
          { x1: 1598.44, x2: 2.92, x3: 2.11 },
          {
            initial_cost: 1.381e9,
            maintenance_cost: 9.395e11,
            sight: 9.99,
            accessibility: 6.97,
            water_quality: 9.11,
            overtopping_risk: 0.331
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 3.1, x3: 1.63 },
          {
            initial_cost: 1.466e9,
            maintenance_cost: 1.028e12,
            sight: 9.99,
            accessibility: 7.66,
            water_quality: 9.31,
            overtopping_risk: 0.312
          } as MetricSet
        )
      },
      'civic-safety': {
        minmax: buildResult(
          { x1: 1598.44, x2: 2.93, x3: 2.12 },
          {
            initial_cost: 1.383e9,
            maintenance_cost: 9.403e11,
            sight: 9.99,
            accessibility: 6.97,
            water_quality: 9.11,
            overtopping_risk: 0.33
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 3.04, x3: 1.62 },
          {
            initial_cost: 1.455e9,
            maintenance_cost: 1.021e12,
            sight: 9.99,
            accessibility: 7.68,
            water_quality: 9.31,
            overtopping_risk: 0.318
          } as MetricSet
        )
      },
      environmental: {
        minmax: buildResult(
          { x1: 1598.44, x2: 2.93, x3: 2.12 },
          {
            initial_cost: 1.383e9,
            maintenance_cost: 9.403e11,
            sight: 9.99,
            accessibility: 6.97,
            water_quality: 9.11,
            overtopping_risk: 0.33
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 3.24, x3: 1.31 },
          {
            initial_cost: 1.547e9,
            maintenance_cost: 1.119e12,
            sight: 9.99,
            accessibility: 8.11,
            water_quality: 9.44,
            overtopping_risk: 0.297
          } as MetricSet
        )
      },
      navigation: {
        minmax: buildResult(
          { x1: 1598.44, x2: 2.97, x3: 2.12 },
          {
            initial_cost: 1.39e9,
            maintenance_cost: 9.451e11,
            sight: 9.99,
            accessibility: 6.97,
            water_quality: 9.11,
            overtopping_risk: 0.326
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 3.24, x3: 1.39 },
          {
            initial_cost: 1.532e9,
            maintenance_cost: 1.099e12,
            sight: 9.99,
            accessibility: 8.01,
            water_quality: 9.41,
            overtopping_risk: 0.297
          } as MetricSet
        )
      }
    };
  }, [prefFns, objectives]);

  const soloData = useMemo<SoloResults>(() => {
    return {
      Municipality: {
        minmax: buildResult(
          { x1: 0, x2: 9.99, x3: 3.19 },
          {
            initial_cost: 1.395e8,
            maintenance_cost: 2.682e10,
            sight: 1.0,
            accessibility: 0.0,
            water_quality: 0.0,
            overtopping_risk: 0.028
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 0, x2: 9.99, x3: 1.12 },
          {
            initial_cost: 1.395e8,
            maintenance_cost: 2.682e10,
            sight: 1.0,
            accessibility: 0.0,
            water_quality: 0.0,
            overtopping_risk: 0.028
          } as MetricSet
        )
      },
      Residents: {
        minmax: buildResult(
          { x1: 1598.44, x2: 4.79, x3: 0.57 },
          {
            initial_cost: 2.252e9,
            maintenance_cost: 1.868e12,
            sight: 9.99,
            accessibility: 9.18,
            water_quality: 9.75,
            overtopping_risk: 0.173
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 5.5, x3: 0.62 },
          {
            initial_cost: 2.385e9,
            maintenance_cost: 1.881e12,
            sight: 9.99,
            accessibility: 9.1,
            water_quality: 9.73,
            overtopping_risk: 0.135
          } as MetricSet
        )
      },
      'Environmental Agency': {
        minmax: buildResult(
          { x1: 1598.44, x2: 5.84, x3: 0.5 },
          {
            initial_cost: 2.618e9,
            maintenance_cost: 2.158e12,
            sight: 9.99,
            accessibility: 9.28,
            water_quality: 9.78,
            overtopping_risk: 0.119
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 5.84, x3: 0.5 },
          {
            initial_cost: 2.618e9,
            maintenance_cost: 2.158e12,
            sight: 9.99,
            accessibility: 9.28,
            water_quality: 9.78,
            overtopping_risk: 0.119
          } as MetricSet
        )
      },
      'Shipping Companies': {
        minmax: buildResult(
          { x1: 1598.44, x2: 4.79, x3: 0.57 },
          {
            initial_cost: 2.252e9,
            maintenance_cost: 1.868e12,
            sight: 9.99,
            accessibility: 9.18,
            water_quality: 9.75,
            overtopping_risk: 0.173
          } as MetricSet
        ),
        tetra: buildResult(
          { x1: 1598.44, x2: 4.79, x3: 0.57 },
          {
            initial_cost: 2.252e9,
            maintenance_cost: 1.868e12,
            sight: 9.99,
            accessibility: 9.18,
            water_quality: 9.75,
            overtopping_risk: 0.173
          } as MetricSet
        )
      }
    };
  }, [prefFns, objectives]);

  const activePreset = useMemo(() => {
    const isMatch = (presetValues: readonly number[], current: number[]) =>
      presetValues.length === current.length &&
      presetValues.every((value, idx) => Math.abs(value - current[idx]) < 1e-3);
    return WEIGHT_PRESETS.find((preset) => isMatch(preset.values, stakeholderRawInfluence)) ?? WEIGHT_PRESETS[0];
  }, [stakeholderRawInfluence]);

  const [selectedPresetKey, setSelectedPresetKey] = useState<string>(activePreset.key);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [displayResults, setDisplayResults] = useState<Record<'tetra' | 'minmax', StaticResult | null>>({
    tetra: null,
    minmax: null
  });
  const [soloResultsState, setSoloResultsState] = useState<Record<string, PresetResults | null>>({});

  useEffect(() => {
    setSelectedPresetKey(activePreset.key);
    setLastRun(null);
    setDisplayResults({ tetra: null, minmax: null });
  }, [activePreset.key]);

  const selectedPreset = WEIGHT_PRESETS.find((preset) => preset.key === selectedPresetKey) ?? WEIGHT_PRESETS[0];
  const presetResults = presetData[selectedPreset.key as PresetKey];
  const tetraResult = displayResults.tetra;
  const minmaxResult = displayResults.minmax;

  const preferenceCurves = useMemo(() => {
    if (!tetraResult && !minmaxResult) return [];
    return objectives.map((objective) => {
      const domain = config.knots[objective].x;
      const min = domain[0];
      const max = domain[domain.length - 1];
      const steps = 120;
      const samples = Array.from({ length: steps + 1 }, (_, idx) => {
        const metric = min + (idx / steps) * (max - min);
        const fn = prefFns?.[objective];
        const preference = fn ? fn(metric) : 0;
        return { metric, preference };
      });
      const clamp = (value: number) => Math.min(Math.max(value, min), max);
      return {
        objective,
        samples,
        min,
        max,
        tetraPoint: tetraResult
          ? {
              metric: clamp(tetraResult.metrics[objective]),
              preference: tetraResult.preferences[objective]
            }
          : null,
        minmaxPoint: minmaxResult
          ? {
              metric: clamp(minmaxResult.metrics[objective]),
              preference: minmaxResult.preferences[objective]
            }
          : null
      };
    });
  }, [config.knots, objectives, prefFns, tetraResult, minmaxResult]);

  const handlePresetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const preset = WEIGHT_PRESETS.find((item) => item.key === event.target.value) ?? WEIGHT_PRESETS[0];
    setSelectedPresetKey(preset.key);
    setLastRun(null);
    setDisplayResults({ tetra: null, minmax: null });
    setStakeholderInfluences(Array.from(preset.values));
  };

  const handleRun = (paradigm: 'tetra' | 'minmax') => {
    if (!presetResults) {
      return;
    }
    setDisplayResults((prev) => ({
      ...prev,
      [paradigm]: presetResults[paradigm]
    }));
    const presetLabel = selectedPreset.label;
    setLastRun(`${paradigm === 'tetra' ? 'Weighted (Tetra)' : 'Min–Max'} · ${presetLabel}`);
  };

  const handleSoloRun = (name: string) => {
    const data = soloData[name];
    if (!data) return;
    setSoloResultsState((prev) => ({ ...prev, [name]: data }));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-800">Optimization Lab</h1>
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            The project involves several stakeholders, including the Municipality, Residents, Environmental Agency, and Shipping Companies,
            each with their own priorities and objectives. For example, the Municipality places strong emphasis on cost efficiency and safety,
            while the Environmental Agency focuses more on water quality.
          </p>
          <p>
            Because each stakeholder values the design aspects differently, an individual optimization can be performed for each group to find the
            best combination of barrier length (L), height (H), and closure time (T) that aligns with their specific interests.
          </p>
          <p>
            Additionally, by assigning weighted importance values to all stakeholder preferences, a combined optimization can be created. The weighted
            importance is determined in the Tetra page of this site. This represents the most balanced design, one that offers the best possible
            compromise between economic feasibility, safety, environmental quality, and operational functionality for the MOSE barrier system.
          </p>
          <p>
            To identify the optimal configuration of the MOSE barrier, our model uses two complementary optimization approaches: the Tetra Solution and
            the Min–Max Solution.
          </p>
        </div>
      </header>

      <section className="card p-6 space-y-4">
        <h2 className="section-title">Choose Weight Scenario</h2>
        <p className="text-sm text-slate-600">
          Select one of the stakeholder influence profiles we analysed in the notebook. The values are normalised before optimisation runs.
        </p>
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <label className="space-y-2 text-sm text-slate-600">
            <span className="block font-medium text-slate-700">Weight profile</span>
            <select
              value={selectedPresetKey}
              onChange={handlePresetChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            >
              {WEIGHT_PRESETS.map((preset) => (
                <option key={preset.key} value={preset.key}>
                  {preset.label}
                </option>
              ))}
            </select>
            <span className="block text-xs text-slate-500">
              {WEIGHT_PRESETS.find((preset) => preset.key === selectedPresetKey)?.description ?? selectedPreset.description}
            </span>
          </label>
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Normalised influence</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {stakeholderNames.map((name: string, idx: number) => (
                <li key={name} className="flex items-baseline justify-between gap-4">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span>{(stakeholderWeights[idx] * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide text-slate-500">Stakeholder</th>
                {objectives.map((objective) => (
                  <th key={objective} className="px-3 py-2 text-left font-semibold uppercase tracking-wide text-slate-500">
                    {OBJECTIVE_META[objective].label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {stakeholderNames.map((name: string, idx: number) => {
                const weightsRow = stakeholderRawObjectiveWeights[idx] ?? [];
                return (
                  <tr key={name} className="odd:bg-slate-50">
                    <td className="px-3 py-2 font-semibold text-slate-700">{name}</td>
                    {objectives.map((objective, objectiveIdx) => {
                      const weight = weightsRow[objectiveIdx] ?? 0;
                      return (
                        <td key={objective} className="px-3 py-2 text-slate-600">
                          {(weight * 100).toFixed(0)}%
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="section-title">Recorded Optimisation Runs</h2>
        <p className="text-sm text-slate-600">
          Use the buttons to highlight the stored results for each paradigm. The underlying data are reproduced exactly from the notebook runs.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => handleRun('tetra')}
            className="rounded-full bg-lagoon-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Show weighted (Tetra) solution
          </button>
          <button
            type="button"
            onClick={() => handleRun('minmax')}
            className="rounded-full border border-lagoon-600 px-5 py-2 text-sm font-semibold text-lagoon-700"
          >
            Show Min–Max solution
          </button>
        </div>
        <p className="text-xs text-slate-500">
          {lastRun ? `Viewing recorded ${lastRun}.` : 'Select a preset and choose a paradigm to view the stored results.'}
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card p-6 space-y-3">
          {renderResultSummary('Weighted (Tetra) solution', tetraResult, objectives)}
        </article>
        <article className="card p-6 space-y-3">
          {renderResultSummary('Min–Max solution', minmaxResult, objectives)}
        </article>
      </section>

      <section className="card p-6 space-y-6">
        <h2 className="section-title">Preference Curves and Optimisation Solutions</h2>
        <p className="text-sm text-slate-600">
          The curves show how stakeholders score each performance aspect as the underlying metric changes. Markers highlight the latest weighted (Tetra)
          and Min–Max solutions so you can see where the optimisers land on each preference scale.
        </p>
        {preferenceCurves.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {preferenceCurves.map(({ objective, samples, tetraPoint, minmaxPoint, min, max }) => {
              const label = OBJECTIVE_META[objective].label;
              return (
                <article key={objective} className="space-y-3">
                  <h3 className="text-base font-semibold text-slate-700">{label}</h3>
                  <div className="h-40 w-full">
                    <ResponsiveContainer>
                      <LineChart data={samples} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                        <XAxis
                          dataKey="metric"
                          tick={{ fill: '#475569', fontSize: 11 }}
                          type="number"
                          domain={[min, max]}
                          label={{ value: 'Metric value', position: 'insideBottom', offset: -6, fill: '#475569', fontSize: 10 }}
                        />
                        <YAxis
                          dataKey="preference"
                          domain={[0, 100]}
                          tick={{ fill: '#475569', fontSize: 11 }}
                          label={{ value: 'Preference (0-100)', angle: -90, position: 'insideLeft', offset: 8, fill: '#475569', fontSize: 10 }}
                        />
                        <Tooltip
                          formatter={(value: number) => `${value.toFixed(1)} preference`}
                          labelFormatter={(value) => `${label}: ${Number(value).toLocaleString()}`}
                        />
                        <Line type="monotone" dataKey="preference" stroke="#0f60db" strokeWidth={2} dot={false} />
                        {tetraPoint && (
                          <ReferenceDot
                            x={tetraPoint.metric}
                            y={tetraPoint.preference}
                            r={6}
                            fill="#0f766e"
                            stroke="white"
                            label={{ value: 'Tetra', position: 'top', fill: '#0f766e', fontSize: 10 }}
                          />
                        )}
                        {minmaxPoint && (
                          <ReferenceDot
                            x={minmaxPoint.metric}
                            y={minmaxPoint.preference}
                            r={6}
                            fill="#6366f1"
                            stroke="white"
                            label={{ value: 'Min–Max', position: 'bottom', fill: '#6366f1', fontSize: 10 }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Run one of the optimisation scenarios to overlay its results on the preference curves.
          </p>
        )}
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="section-title">Optimize for one stakeholder at a time</h2>
        <p className="text-sm text-slate-600">
          Run the GA with a single stakeholder set to 100% influence. This mirrors a sensitivity sweep where the other groups momentarily step back.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {stakeholderNames.map((name: string) => {
            const result = soloResultsState[name] ?? null;
            const waiting = false;
            return (
              <article key={name} className="rounded-2xl border border-slate-100 p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{name}</h3>
                    <p className="text-xs text-slate-500">100% influence, others at 0%</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSoloRun(name)}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    disabled={waiting}
                  >
                    Show result
                  </button>
                </div>
                {result ? (
                  <div className="grid gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      {renderResultSummary('Min–Max result', result.minmax, objectives)}
                    </div>
                    <div className="rounded-xl bg-lagoon-50/70 p-3">
                      {renderResultSummary('Weighted (Tetra) result', result.tetra, objectives)}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">Select &ldquo;Show result&rdquo; to display the stored optimisation for this stakeholder.</p>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
