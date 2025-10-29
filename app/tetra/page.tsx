import Image from 'next/image';
import Link from 'next/link';

type WeightedCriterionRow = {
  label: string;
  localWeight: number | null;
  globalWeight: number | null;
  weightingValue: number | null;
  level: 0 | 1 | 2 | 3;
};

const weightedCriteria: WeightedCriterionRow[] = [
  { label: 'Criteria', localWeight: null, globalWeight: null, weightingValue: null, level: 0 },

  { label: 'Environmental Groups', localWeight: 0.15, globalWeight: 0.15, weightingValue: 15, level: 1 },
  { label: 'Bio Diversity Env.', localWeight: 0.6, globalWeight: 0.09, weightingValue: 60, level: 2 },
  { label: 'Water Quality Env.', localWeight: 0.4, globalWeight: 0.06, weightingValue: 40, level: 2 },

  { label: 'Government', localWeight: 0.5, globalWeight: 0.5, weightingValue: 50, level: 1 },
  { label: 'Costs', localWeight: 0.2, globalWeight: 0.1, weightingValue: 20, level: 2 },
  { label: 'Initial Costs', localWeight: 0.7, globalWeight: 0.07, weightingValue: 70, level: 3 },
  { label: 'Maintenance Costs', localWeight: 0.3, globalWeight: 0.03, weightingValue: 30, level: 3 },
  {
    label: 'Reliability Flood Protection Gov.',
    localWeight: 0.8,
    globalWeight: 0.4,
    weightingValue: 80,
    level: 2
  },

  { label: 'Inhabitants', localWeight: 0.2, globalWeight: 0.2, weightingValue: 20, level: 1 },
  { label: 'Implementation Time Inh.', localWeight: 0.087, globalWeight: 0.017, weightingValue: 20, level: 2 },
  { label: 'Reliability Flood Protection Inh.', localWeight: 0.348, globalWeight: 0.07, weightingValue: 80, level: 2 },
  { label: 'Visual Impact Inh.', localWeight: 0.174, globalWeight: 0.035, weightingValue: 40, level: 2 },
  { label: 'Water Quality Inh.', localWeight: 0.391, globalWeight: 0.078, weightingValue: 90, level: 2 },

  { label: 'Tourism Business', localWeight: 0.15, globalWeight: 0.15, weightingValue: 15, level: 1 },
  { label: 'Reliability Flood Protection', localWeight: 0.333, globalWeight: 0.05, weightingValue: 30, level: 2 },
  { label: 'Shipping times', localWeight: 0.167, globalWeight: 0.025, weightingValue: 15, level: 2 },
  { label: 'Visual Impact', localWeight: 0.167, globalWeight: 0.025, weightingValue: 15, level: 2 },
  { label: 'Water Quality', localWeight: 0.333, globalWeight: 0.05, weightingValue: 30, level: 2 }
];

const indentClasses: Record<WeightedCriterionRow['level'], string> = {
  0: '',
  1: 'pl-4',
  2: 'pl-8',
  3: 'pl-12'
};

const formatWeight = (value: number | null) =>
  typeof value === 'number' ? value.toFixed(3) : '';

type ResultRow = {
  alternative: string;
  rank: number;
  rating: number;
  assessment: string;
  narrative: string;
  highlight?: boolean;
};

const overallResults: ResultRow[] = [
  {
    alternative: 'MOSE',
    rank: 1,
    rating: 100,
    assessment: 'Preferred option',
    narrative:
      'Balances robust flood protection with acceptable ecological and visual trade-offs while keeping the lagoon open during normal tides.',
    highlight: true
  },
  {
    alternative: 'Closed Dams',
    rank: 2,
    rating: 61.303,
    assessment: 'Trade-off heavy',
    narrative:
      'Delivers constant defence but permanently blocks tidal exchange, harms water quality, and disrupts navigation and economic activity.'
  },
  {
    alternative: 'Lifting Gate',
    rank: 3,
    rating: 60.039,
    assessment: 'Maintenance intensive',
    narrative:
      'Simpler than MOSE on paper but requires large supporting works, ongoing maintenance to fight corrosion, and remains visible above the waterline.'
  },
  {
    alternative: 'Super Levee',
    rank: 4,
    rating: 41.042,
    assessment: 'Limited coverage',
    narrative:
      'Strengthens existing embankments yet leaves areas below sea level exposed and significantly alters the historical cityscape.'
  },
  {
    alternative: 'Water Injection',
    rank: 5,
    rating: 0,
    assessment: 'High uncertainty',
    narrative:
      'Raises the city gradually without intercepting tides, but the long-term geotechnical stability and uniform uplift remain unclear.'
  }
];

type Preference = 'Preferred' | 'Strong performer' | 'Viable backup' | 'Mixed' | 'Low preference' | 'High uncertainty';

const preferenceStyles: Record<Preference, string> = {
  Preferred: 'bg-lagoon-100 text-lagoon-800',
  'Strong performer': 'bg-emerald-100 text-emerald-800',
  'Viable backup': 'bg-sky-100 text-sky-800',
  Mixed: 'bg-amber-100 text-amber-800',
  'Low preference': 'bg-rose-100 text-rose-800',
  'High uncertainty': 'bg-slate-200 text-slate-700'
};

type SensitivityRow = {
  alternative: string;
  rank: number;
  rating: number;
  preference: Preference;
  rationale: string;
};

type SensitivityTable = {
  stakeholder: string;
  highlight: string;
  rows: SensitivityRow[];
};

const sensitivityTables: SensitivityTable[] = [
  {
    stakeholder: 'Environmental groups',
    highlight:
      'As the water injection option does not influence the tide inside the lagoon and thus does not negatively influence the water quality and biodiversity, this is logically the best alternative for the environmental groups.',
    rows: [
      {
        alternative: 'Water Injection',
        rank: 1,
        rating: 100,
        preference: 'Preferred',
        rationale: 'Lifts the city without blocking tidal exchange, directly supporting water quality and biodiversity goals.'
      },
      {
        alternative: 'MOSE',
        rank: 2,
        rating: 90,
        preference: 'Strong performer',
        rationale:
          'Temporary closures preserve most tidal flow while still delivering strong flood protection when surges threaten the lagoon.'
      },
      {
        alternative: 'Lifting Gate',
        rank: 3,
        rating: 83.421,
        preference: 'Mixed',
        rationale:
          'Vertical gates need frequent operation and remain visible above the water, reducing ecological and scenic quality compared with MOSE.'
      },
      {
        alternative: 'Super Levee',
        rank: 4,
        rating: 52.632,
        preference: 'Low preference',
        rationale: 'Shoreline fortifications alter habitats and do not address the lagoon water exchange environmental groups value.'
      },
      {
        alternative: 'Closed Dams',
        rank: 5,
        rating: 0,
        preference: 'Low preference',
        rationale: 'Permanent separation from the Adriatic would interrupt tidal currents and degrade lagoon ecology.'
      }
    ]
  },
  {
    stakeholder: 'Government',
    highlight:
      'The government is most interested in reliability and costs. Since the closed dams are the most reliable, these score best, but the MOSE barrier and super levee are good options as well. The reliability of water injection is not high, so this is the least favourable option.',
    rows: [
      {
        alternative: 'Closed Dams',
        rank: 1,
        rating: 100,
        preference: 'Preferred',
        rationale: 'Offers the highest reliability, giving confidence in long-term protection despite heavy capital costs.'
      },
      {
        alternative: 'MOSE',
        rank: 2,
        rating: 76.574,
        preference: 'Strong performer',
        rationale:
          'Delivers high reliability with the flexibility to reopen the lagoon, justifying the investment through dependable operation.'
      },
      {
        alternative: 'Super Levee',
        rank: 3,
        rating: 73.238,
        preference: 'Viable backup',
        rationale: 'Relatively straightforward to build and maintain, though it leaves some areas vulnerable and alters the cityscape.'
      },
      {
        alternative: 'Lifting Gate',
        rank: 4,
        rating: 58.222,
        preference: 'Mixed',
        rationale: 'Requires significant supporting infrastructure and maintenance, introducing lifecycle cost and reliability risks.'
      },
      {
        alternative: 'Water Injection',
        rank: 5,
        rating: 0,
        preference: 'High uncertainty',
        rationale: 'Limited evidence of long-term effectiveness makes it difficult to justify as a primary flood defence.'
      }
    ]
  },
  {
    stakeholder: 'Inhabitants',
    highlight:
      'The inhabitants of Venice care by far the most about reliability, since they want to live safely. Also the water quality matters to them, as this also impacts their daily life. MOSE therefore scores best for them, as it combines both of these.',
    rows: [
      {
        alternative: 'MOSE',
        rank: 1,
        rating: 100,
        preference: 'Preferred',
        rationale: 'Provides strong flood protection while keeping the lagoon open between surge events, protecting quality of life.'
      },
      {
        alternative: 'Lifting Gate',
        rank: 2,
        rating: 61.583,
        preference: 'Viable backup',
        rationale: 'Improves reliability but introduces visual intrusion and long closure windows that disrupt daily routines.'
      },
      {
        alternative: 'Water Injection',
        rank: 3,
        rating: 43.788,
        preference: 'High uncertainty',
        rationale: 'Long implementation time and uncertain uplift make day-to-day safety gains unpredictable for residents.'
      },
      {
        alternative: 'Closed Dams',
        rank: 4,
        rating: 36.544,
        preference: 'Low preference',
        rationale: 'Would degrade water quality and restrict movement, even if the barriers guarantee protection.'
      },
      {
        alternative: 'Super Levee',
        rank: 5,
        rating: 0,
        preference: 'Low preference',
        rationale: 'Fails to protect low-lying districts and cannot address rainfall or groundwater flooding that residents experience.'
      }
    ]
  },
  {
    stakeholder: 'Tourism business',
    highlight: 'The tourism business has a similar view as the inhabitants and also has MOSE as the best option.',
    rows: [
      {
        alternative: 'MOSE',
        rank: 1,
        rating: 100,
        preference: 'Preferred',
        rationale: 'Protects the city while staying hidden during normal conditions, keeping Venice attractive and accessible.'
      },
      {
        alternative: 'Lifting Gate',
        rank: 2,
        rating: 48.633,
        preference: 'Mixed',
        rationale: 'Maintains access during low tides but leaves visible structures and demands closures that may disrupt services.'
      },
      {
        alternative: 'Water Injection',
        rank: 3,
        rating: 43.247,
        preference: 'High uncertainty',
        rationale: 'Lengthy implementation and unpredictable results make it difficult for tourism operators to plan with confidence.'
      },
      {
        alternative: 'Closed Dams',
        rank: 4,
        rating: 11.983,
        preference: 'Low preference',
        rationale: 'Blocks navigation and diminishes the maritime character that underpins visitor experiences.'
      },
      {
        alternative: 'Super Levee',
        rank: 5,
        rating: 0,
        preference: 'Low preference',
        rationale: 'Alters the historic skyline and still leaves some tourist areas exposed during extreme events.'
      }
    ]
  }
];

export default function TetraPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-800">Tetra MCDA Story</h1>
        <p className="text-sm text-slate-600">
          Design problems often involve multiple, and sometimes conflicting, objectives. Examples of these objectives are
          costs, reliability, and sustainability. As a result, identifying the optimal design cannot rely on a single
          criterion alone. A Multi-Criteria Decision Analysis (MCDA) provides a structured approach to evaluate design
          alternatives by considering several objectives simultaneously. It also incorporates the perspectives of various
          stakeholders, each of whom may assign different weights to the criteria and score the alternatives differently on
          these criteria.
        </p>
        <p className="text-sm text-slate-600">
          Tetra is a software tool that simplifies the MCDA process by allowing users to assign weights and scores to both
          stakeholders and criteria. It then performs calculations to determine the final scores of all alternatives,
          supporting transparent and balanced decision-making.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800">Design Alternatives</h2>
        <p className="text-sm text-slate-600">
          In the case of the protection of Venice against the rising water level inside the lagoon, five design
          alternatives were taken into consideration.
        </p>
        <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <Image
              src="/images/tetra/alternatives.png"
              alt="Overview diagram explaining the five design alternatives considered for protecting Venice."
              width={1600}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
          <figcaption className="mt-3 text-xs text-slate-500">
            Summary of the five alternatives explored before MCDA scoring in Tetra.
          </figcaption>
        </figure>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Closed dams at inlets</h3>
            <p className="mt-3 text-sm text-slate-600">
              This design alternative suggests building permanent barriers at the three lagoon inlets to fully isolate the
              Venetian Lagoon from the Adriatic Sea. Although this solution would offer constant defence against high
              tides, it would interfere with natural tidal currents, resulting in ecological harm, sediment buildup, and
              decreased water quality. Additionally, it would obstruct navigation and economic operations and sluices would
              have to be built.
            </p>
          </article>
          <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Super Levee</h3>
            <p className="mt-3 text-sm text-slate-600">
              The super levee idea is to raise and strengthen the current coastal protections surrounding Venice to endure
              severe water levels. While this design would have been fairly simple to build and upkeep, it would not
              safeguard regions situated below sea level or stop flooding caused by groundwater and rain. Moreover, it
              would significantly transform the city&apos;s historical environment and offer only minimal long-term
              resilience to rising sea levels.
            </p>
          </article>
          <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Lifting Barrier</h3>
            <p className="mt-3 text-sm text-slate-600">
              This alternative involves the installation of vertical lift gates at the lagoon inlets that could be elevated
              during high tides (you can think of the Oosterscheldekering as an example). Although these gates are
              technically less complex than the MOSE design, they would need considerable supporting infrastructure and
              ongoing maintenance to avoid corrosion and guarantee functionality. The visual and environmental effects are
              notable as the gates would still be visible above the water level even when inactive.
            </p>
          </article>
          <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Injections of water</h3>
            <p className="mt-3 text-sm text-slate-600">
              This creative plan seeks to address Venice&apos;s slow sinking by pumping seawater into deep geological
              layers under the city. The approach includes pumping seawater into a brackish aquifer situated around 600-850
              meters underground to increase the city's height by approximately 25-30 cm over ten years. The objective is
              to reduce the impact of acqua alta (high water) by raising the whole city instead of preventing the tides.
              Nevertheless, there are uncertainties about long-term geological stability, irregular uplift, and possible
              effects on current structures.
            </p>
          </article>
          <article className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">MOSE (Modulo Sperimentale Elettromeccanico)</h3>
            <p className="mt-3 text-sm text-slate-600">
              The selected solution, MOSE, is a set of movable barriers set up at the three lagoon entrances (Lido,
              Malamocco, and Chioggia) that can be lifted temporarily during high tides to separate the lagoon from the
              ocean. This design provides adaptability and the ability to reverse, facilitating normal tidal flow and
              navigation in ordinary circumstances, all while safeguarding Venice during storm surges. It tries to balance
              technical effectiveness, environmental conservation, and long-term viability, although this makes it an
              expensive option and it requires much maintenance.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800">Tetra Model</h2>
        <p className="text-sm text-slate-600">
          The Tetra model takes the following criteria per stakeholder into account.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Residents</h3>
            <p className="mt-3 text-sm text-slate-600">
              For the residents, the most crucial criteria are those that affect their everyday routines and personal
              security. They have a deep concern for water quality, as it influences health and living conditions, and the
              effectiveness of flood protection, since robust defences against flooding are crucial for their homes and
              infrastructure. The visual effect is significant for them, as substantial flood defence structures can change
              the look of the city and its environment. Ultimately, the duration of implementation matters since residents
              tend to favour solutions that can be executed rapidly and reduce disturbances.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Tourism industry</h3>
            <p className="mt-3 text-sm text-slate-600">
              The tourism industry has certain common concerns but highlights factors that influence the city&apos;s appeal
              and accessibility. The visual effect holds significant importance for them since the aesthetic charm of Venice
              directly affects tourism. The quality of water impacts the visitor experience, particularly due to the
              city&apos;s strong connection with its waterways. Furthermore, the dependability of flood protection is
              essential to prevent harm and disruptions to tourist activities, while shipping durations are connected to the
              efficient functioning of transport and services that aid tourism.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Environmental organisations</h3>
            <p className="mt-3 text-sm text-slate-600">
              For environmental organizations, the primary emphasis is on ecological integrity. Their primary focus is on
              water quality and biodiversity, since these are direct indicators of the environmental sustainability of every
              option. Their assessment emphasizes options that reduce ecological disruption and uphold the natural
              equilibrium in the lagoon and adjacent environments. Therefore, alternatives that keep the lagoon open to
              natural tides as much as possible are preferred.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Government</h3>
            <p className="mt-3 text-sm text-slate-600">
              Ultimately, the government usually focuses on economic viability and lasting dependability. Their primary
              factors are expenses, both upfront construction and upkeep, and dependability of the flood defence. These
              indicate the necessity for financial accountability, efficient utilization of public assets, and the enduring
              operation of the selected system. These costs can also only be justified if the defence is highly reliable.
            </p>
          </article>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-800">Criterion weights</h3>
            <p className="text-xs uppercase tracking-wide text-slate-500">Local · Global · Weighting values</p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-slate-200 text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="px-5 py-3 text-left font-semibold uppercase tracking-wide">Criterion</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold uppercase tracking-wide">Local weights</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold uppercase tracking-wide">Global weights</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold uppercase tracking-wide">
                    Weighting values
                  </th>
                </tr>
              </thead>
              <tbody>
                {weightedCriteria.map((row, index) =>
                  row.localWeight === null ? (
                    <tr key={row.label} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td colSpan={4} className="px-5 py-2 font-semibold uppercase tracking-wide text-slate-600">
                        {row.label}
                      </td>
                    </tr>
                  ) : (
                    <tr key={row.label} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className={`px-5 py-2 text-slate-800 ${indentClasses[row.level]}`}>{row.label}</td>
                      <td className="px-5 py-2 text-right font-mono text-xs text-slate-700">
                        {formatWeight(row.localWeight)}
                      </td>
                      <td className="px-5 py-2 text-right font-mono text-xs text-slate-700">
                        {formatWeight(row.globalWeight)}
                      </td>
                      <td className="px-5 py-2 text-right font-mono text-xs text-slate-700">
                        {formatWeight(row.weightingValue)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            In this stakeholder analysis for the MOSE barrier, weights reflect each group&apos;s influence in decision-making:
            government leads with 0.5 thanks to its control over financing, regulation, and long-term reliability; residents follow at
            0.2 because they live with the flood risk; environmental organisations hold 0.15, focusing on biodiversity and water quality;
            and the tourism industry also carries 0.15 due to its economic dependence on lagoon stability. Together these weights balance
            authority with lived impact before the alternatives are scored.
          </p>
        </div>
        <p className="text-sm text-slate-600">
          These varying opinions emphasize how each group of stakeholders perceives the value of the design uniquely. Some
          emphasize social or environmental effects, while others prioritize economic or aesthetic issues; the model
          combines these viewpoints for a comprehensive and clear assessment of all options, by assigning weights per
          stakeholder to each criterion and scoring the design alternatives.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800">Results</h2>
        <p className="text-sm text-slate-600">
          When solving the Tetra model, we get the following result. More details of the solution report can be found in
          the appendix.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Rank</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Design alternative</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Rating</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {overallResults.map((item) => (
                  <tr
                    key={item.alternative}
                    className={item.highlight ? 'bg-lagoon-50' : 'bg-white'}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs uppercase text-slate-700">
                      {item.rank}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-slate-800">
                        <span className="font-semibold">{item.alternative}</span>
                        {item.highlight ? (
                          <span className="inline-flex items-center rounded-full bg-lagoon-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lagoon-800">
                            Preferred
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-500">{item.assessment}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs uppercase text-slate-700">
                      {item.rating.toFixed(3)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.narrative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800">Sensitivity analysis</h2>
        <p className="text-sm text-slate-600">
          It can be interesting to perform a sensitivity-analysis, where you look at the preferred alternative of every
          stakeholder by setting the weight of the other stakeholders at 0. This gives us the following results.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {sensitivityTables.map((table) => (
            <div key={table.stakeholder} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{table.stakeholder}</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-right font-semibold uppercase tracking-wide">Rank</th>
                      <th scope="col" className="px-3 py-2 text-left font-semibold uppercase tracking-wide">Alternative</th>
                      <th scope="col" className="px-3 py-2 text-right font-semibold uppercase tracking-wide">Rating</th>
                      <th scope="col" className="px-3 py-2 text-left font-semibold uppercase tracking-wide">Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {table.rows.map((row) => (
                      <tr key={`${table.stakeholder}-${row.alternative}`}>
                        <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-[10px] uppercase text-slate-500">
                          {row.rank}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-slate-800">{row.alternative}</div>
                          <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-wide text-slate-500">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${preferenceStyles[row.preference]}`}>
                              {row.preference}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-[10px] uppercase text-slate-500">
                          {row.rating.toFixed(3)}
                        </td>
                        <td className="px-3 py-2">{row.rationale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[13px] font-medium text-slate-700">{table.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-lagoon-500 bg-lagoon-600 px-6 py-6 shadow-soft text-white">
        <h2 className="text-2xl font-semibold text-white">Conclusion</h2>
        <p className="mt-3 text-sm text-lagoon-50">
          Although the preferred design alternative differs per stakeholder, the total combination of the stakeholders, as
          calculated by the Tetra model, is the{' '}
          <span className="font-semibold text-white">MOSE barrier</span>
          . The next step is to optimise the design of the{' '}
          <span className="font-semibold text-white">MOSE barrier</span>, as will be done in the next chapter{' '}
          <Link href="/design" className="font-semibold text-white underline underline-offset-4 hover:text-lagoon-100">
            Design optimization
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
