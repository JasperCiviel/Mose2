'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { defaultConfig } from '@/lib/defaultConfig';
import { useMoseStore } from '@/lib/store';

const objectives = defaultConfig.OBJECTIVE_KEYS;

const featureStakeholders = [
  {
    id: 'residents',
    name: 'Citizens of Venice',
    image: '/images/stakeholders/citizens-of-venice.png',
    description:
      'The residents of Venice are the most directly impacted and the most personally involved stakeholders. Their investment is grounded in safety, living standards, and cultural conservation. Residents rely on the MOSE Barrier to safeguard their homes, businesses, and cultural heritage from flooding, which has traditionally interrupted daily activities and tourism. Simultaneously, they might voice worries regarding the project’s expenses, clarity, and lasting impact, highlighting the necessity for trust and responsibility in its oversight.'
  },
  {
    id: 'shipping',
    name: 'Shipping Companies',
    image: '/images/stakeholders/shipping-companies.png',
    description:
      'Shipping firms hold a considerable operational interest in the MOSE initiative, since the barriers directly influence maritime movement to and from the Venetian ports. Their main priority is ensuring efficient access pathways for commercial ships, ferries, and cruise liners while the barriers are operational. They promote meticulous planning and coordination of barrier closures to reduce delays and financial losses, ensuring that Venice stays a viable and competitive port destination.'
  },
  {
    id: 'environmental',
    name: 'Environmental Agencies',
    image: '/images/stakeholders/environmental-agencies.png',
    description:
      'Environmental organizations, both national and regional, are worried about the ecological stability of the Venetian Lagoon. Their interest in the MOSE project focuses on overseeing and reducing the ecological effects of the barrier system. Their goal is to guarantee that the functioning of the barriers does not interfere with tidal movements, water quality, or the habitats of nearby plants and animals, while also advocating for sustainable coastal management methods that comply with EU environmental regulations.'
  },
  {
    id: 'municipality',
    name: 'Municipality of Venice',
    image: '/images/stakeholders/municipality-of-venice.png',
    description:
      'The Municipality of Venice is a key stakeholder, tasked with overseeing the city’s infrastructure, safety, and sustainable development. Its primary interest in the MOSE Barrier initiative is to safeguard Venice from more frequent and intense flooding incidents triggered by high tides and elevated sea levels. The city aims to guarantee that the initiative protects the cultural heritage, promotes local economic activity, and is in harmony with wider urban and environmental policies.'
  }
] as const;

const stakeholderNarratives = [
  {
    name: 'Municipality',
    role: 'City & regional authorities',
    focus: 'Must keep Venice habitable while justifying the investment in MOSE.',
    involvement: 'Coordinates closures, manages maintenance contracts, and reports outcomes to regional partners.',
    stakes: 'Political credibility slips if closures fail or costs spiral.',
    tension: 'Needs flawless execution without alienating taxpayers.'
  },
  {
    name: 'Residents',
    role: 'Inhabitants of Venice',
    focus: 'Depend on MOSE to protect homes, business spaces, and cultural heritage.',
    involvement: 'Live with the noise, rerouting, and disruption whenever the gates rise.',
    stakes: 'Poor coordination drains quality of life and drives people away.',
    tension: 'Seek safety but worry about taxes and maintenance interruptions.'
  },
  {
    name: 'Environmental Agency',
    role: 'Lagoon ecology watchdogs',
    focus: 'Track water exchange, sediment flows, and habitats as MOSE operates.',
    involvement: 'Collect data, audit monitoring stations, and advise on closure limits.',
    stakes: 'Extended closures risk ecological damage and public backlash.',
    tension: 'Demand safeguards so protection does not cost the lagoon its health.'
  },
  {
    name: 'Shipping Companies',
    role: 'Port & marine transport',
    focus: 'Need predictable access for ferries, cargo, and cruise traffic.',
    involvement: 'Coordinate with MOSE control rooms on routing, pilot staffing, and schedules.',
    stakes: 'Delays raise costs and push traffic toward competing ports.',
    tension: 'Support MOSE when it protects the city without choking navigation.'
  }
];

export default function StakeholdersPage() {
  const {
    stakeholderNames,
    stakeholderObjectiveWeights
  } = useMoseStore();
  const [activeStakeholder, setActiveStakeholder] = useState<typeof featureStakeholders[number]>(
    featureStakeholders[0]
  );

  const stakeholderSummary = useMemo(() => {
    return stakeholderNames.map((name, idx) => {
      const narrative = stakeholderNarratives.find((item) => item.name === name);
      const weightsRow = stakeholderObjectiveWeights[idx] ?? [];
      const topObjectives = objectives
        .map((objective, objectiveIdx) => ({
          objective,
          weight: weightsRow[objectiveIdx] ?? 0
        }))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 2)
        .map((item) => item.objective.replace(/_/g, ' '));
      return {
        name,
        role: narrative?.role ?? '',
        focus: narrative?.focus ?? '',
        involvement: narrative?.involvement ?? '',
        stakes: narrative?.stakes ?? '',
        tension: narrative?.tension ?? '',
        topObjectives
      };
    });
  }, [stakeholderNames, stakeholderObjectiveWeights]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-800">Stakeholders & Preference Balancing</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          PBED starts with people. Four stakeholder groups captured in our TU Delft interviews define what “good”
          means for MOSE — and their priorities often pull in opposite directions.
        </p>
      </header>

      <section className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureStakeholders.map((stakeholder) => {
            const isActive = activeStakeholder.id === stakeholder.id;
            return (
              <button
                key={stakeholder.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveStakeholder(stakeholder)}
                className={`group relative h-56 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 ${
                  isActive ? 'ring-2 ring-lagoon-500' : ''
                }`}
              >
                <Image
                  src={stakeholder.image}
                  alt={stakeholder.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">Stakeholder</p>
                  <p className="mt-2 text-lg font-semibold text-white">{stakeholder.name}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">{activeStakeholder.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{activeStakeholder.description}</p>
        </div>
      </section>

      <section className="card p-6 space-y-6">
        <h2 className="section-title">Stakeholder Profiles</h2>
        <p className="text-sm text-slate-600">
          Each profile outlines the stakeholder’s mission, day-to-day involvement, and the objectives they push hardest
          for in PBED sessions. Weight sliders now live in the{' '}
          <Link href="/opt" className="font-semibold text-lagoon-700 underline underline-offset-2">
            Optimization Lab
          </Link>{' '}
          so you can explore different influence mixes there.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {stakeholderSummary.map((stakeholder) => (
            <article key={stakeholder.name} className="rounded-2xl border border-slate-100 p-5 space-y-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-slate-800">{stakeholder.name}</h2>
                <p className="text-xs uppercase tracking-wide text-slate-400">{stakeholder.role}</p>
              </div>
              <p className="text-sm text-slate-600">{stakeholder.focus}</p>
              <p className="text-sm text-slate-600">{stakeholder.involvement}</p>
              <p className="text-sm text-slate-600">{stakeholder.stakes}</p>
              <p className="rounded-xl bg-lagoon-50 p-3 text-xs text-lagoon-700">
                <strong className="font-semibold">Key concern:</strong> {stakeholder.tension}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Primary objectives</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-500">
                  {stakeholder.topObjectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
