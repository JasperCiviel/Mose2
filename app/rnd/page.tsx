'use client';

import Image from 'next/image';

type Section =
  | { heading: string; body: string }
  | { heading: string; list: string[]; ordered?: boolean };

interface Quadrant {
  id: string;
  quadrant: string;
  label: string;
  author: string;
  summary: string;
  sections: Section[];
}

const quadrants: Quadrant[] = [
  {
    id: 'quadrant-1',
    quadrant: 'Quadrant 1',
    label: 'Analyzing Object Behaviour',
    author: 'Mike Schaap',
    summary:
      'Structural behaviour and material performance of the MOSE barrier gates under real-world loading and exposure.',
    sections: [
      {
        heading: 'Problem Description',
        body:
          'MOSE gates undergo cyclic loading, corrosion, and buoyancy shifts that may deviate from design expectations. These factors influence hydrodynamic response, stiffness, and deformation, raising the question: how does long-term marine exposure affect structural integrity?'
      },
      {
        heading: 'Literature Review',
        body:
          'Prior work focuses on hydrodynamic modelling and control; fewer studies examine corrosion–fatigue interactions and biofouling for MOSE. Insights from the Thames Barrier and Delta Works show these mechanisms can degrade maritime steel, yet empirical MOSE data remain limited.'
      },
      {
        heading: 'Research Question',
        body:
          'To what extent do corrosion, cyclic loading, and biofouling influence the mechanical strength, deformation behaviour, and fatigue life of the MOSE barrier gates?'
      },
      {
        heading: 'Source Material',
        list: [
          'Engineering and maintenance reports from the MOSE Consortium or Venetian Water Authority.',
          'Structural monitoring data: strain, stress, and displacement sensors.',
          'Material samples from protective coatings and steel elements.',
          'Environmental data capturing salinity, temperature, and hydrodynamic loads.',
          'Comparative datasets from Thames Barrier and Eastern Scheldt systems.'
        ]
      },
      {
        heading: 'Methods',
        ordered: true,
        list: [
          'Material characterisation on extracted or replicated steel specimens.',
          'Finite-element modelling of stress distribution, deformation, and fatigue under tidal loading.',
          'In-situ monitoring of strain, vibration, and displacement to validate models.',
          'Correlation analysis connecting environmental exposure to measured degradation.'
        ]
      }
    ]
  },
  {
    id: 'quadrant-2',
    quadrant: 'Quadrant 2',
    label: 'Analysing Subject Behaviour',
    author: 'Wout Kragten',
    summary:
      'Visibility and tourism impacts when the MOSE barrier interrupts Venice’s sightlines along the coastline.',
    sections: [
      {
        heading: 'Case Study',
        body:
          'The MOSE barrier enhances safety yet blocks sea views during closures, altering Venice’s cultural and touristic experience.'
      },
      {
        heading: 'Research Question',
        body:
          'What is the effect on tourism along the coastline of Venice when sea visibility is blocked several times a year by the MOSE barrier?'
      },
      {
        heading: 'Observation',
        body:
          'Venice’s identity is tied to its openness to the sea. Initial observations suggest obstructed views diminish the sense of place for visitors.'
      },
      {
        heading: 'Empirical Data Collection',
        list: [
          'Visitor perception surveys and interviews.',
          'Tourism metrics before and after barrier closures.',
          'Mapping of sightlines and viewpoints affected by MOSE activations.'
        ]
      },
      {
        heading: 'Hypothesis',
        body:
          'Reduced visibility lowers aesthetic and emotional satisfaction for visitors, potentially suppressing coastal tourism during closures.'
      },
      {
        heading: 'Research Method',
        body:
          'A mixed-method design combining statistical analysis of visitor data with qualitative observation through photography and mapped visibility changes.'
      },
      {
        heading: 'Results & Evaluation',
        body:
          'Expected findings include temporary shifts in visitor behaviour during closures and longer-term adaptations. The study evaluates how flood safety infrastructure can coexist with Venice’s cultural identity.'
      }
    ]
  },
  {
    id: 'quadrant-3',
    quadrant: 'Quadrant 3',
    label: 'Improving Object Performance',
    author: 'Jasper de Ruiter',
    summary:
      'Enhancing MOSE gate operation through predictive control, real-time monitoring, and optimal actuation strategies.',
    sections: [
      {
        heading: 'Problem Description',
        body:
          'Gate deployment must balance mechanical reliability, energy usage, and response time. Actuator wear, hydrodynamic resistance, and uneven pressurisation can delay closures and increase maintenance demands.'
      },
      {
        heading: 'Literature Review',
        body:
          'While MOSE hydrodynamics are documented, fewer studies examine control algorithms and actuation efficiency. Lessons from Eastern Scheldt and Thames barriers highlight the value of condition-based maintenance and adaptive control.'
      },
      {
        heading: 'Research Question',
        body:
          'How can predictive control algorithms, real-time monitoring, and adaptive operation strategies enhance MOSE reliability, actuation efficiency, and lifespan while minimising maintenance and energy consumption?'
      },
      {
        heading: 'Source Material',
        list: [
          'MOSE operating logs and maintenance reports.',
          'Real-time gate data: positions, pressures, flow rates, actuation cycles.',
          'Environmental records of tides, waves, and wind.',
          'Hydraulic and control system specifications.',
          'Comparative datasets from similar flood barriers.'
        ]
      },
      {
        heading: 'Methods',
        ordered: true,
        list: [
          'Analyse historical operations to pinpoint inefficiencies and failure modes.',
          'Develop predictive control models (e.g., model predictive control or reinforcement learning).',
          'Simulate gate performance with tools such as MIKE 21 or Delft3D under varied storm scenarios.',
          'Pilot optimised control strategies on a digital twin to assess response time, energy use, and wear reduction.'
        ]
      }
    ]
  },
  {
    id: 'quadrant-4',
    quadrant: 'Quadrant 4',
    label: 'Improving Subject Performance',
    author: 'Roel Wielemaker',
    summary:
      'Human–system integration and decision-support enhancements for MOSE operators during flood events.',
    sections: [
      {
        heading: 'Problem Description',
        body:
          'Operators must interpret complex sensor data and forecasts under time pressure. Manual decision processes risk delays, inconsistent judgement, and excessive mechanical strain.'
      },
      {
        heading: 'Research Question',
        body:
          'How can advanced decision-support tools, human–machine interface design, and simulation-based training improve operational accuracy, coordination, and decision-making performance for MOSE operators?'
      },
      {
        heading: 'Literature Review',
        body:
          'Critical infrastructure studies emphasise human–system integration. Intuitive interfaces and simulation-based training improve accuracy in comparable domains, yet MOSE-specific HMI research is limited.'
      },
      {
        heading: 'Source Material',
        list: [
          'Operational manuals and decision protocols from the MOSE Consortium.',
          'Historical activation data and outcomes.',
          'Operator feedback, performance records, and training assessments.',
          'Environmental and forecast datasets used during operations.'
        ]
      },
      {
        heading: 'Methods',
        list: [
          'Task and decision analysis of workflows during barrier activation.',
          'Interface evaluation focusing on cognitive load and situational awareness.',
          'Simulation-based training modules or VR scenarios that rehearse flood responses.',
          'Decision-support prototypes integrating real-time visualisation and predictive modelling.',
          'Performance assessments comparing trained and untrained operator responses.'
        ]
      }
    ]
  }
];

export default function RnDPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-800">Research &amp; Development Portfolio</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Four research directions explore how MOSE performs, how it shapes human experience, and how operators can
          manage Venice’s flood defence more effectively. Choose a quadrant to dive into the proposal authored by each
          team member.
        </p>
      </header>

      <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/rnd/quadrants.png"
          alt="Quadrant map illustrating the four R&D approaches."
          width={1920}
          height={1080}
          className="h-auto w-full"
          priority
        />
        <figcaption className="px-4 pb-4 text-center text-xs uppercase tracking-wide text-slate-500">
          Quadrant overview of MOSE R&amp;D proposals
        </figcaption>
      </figure>

      <section className="grid gap-8 md:grid-cols-2">
        {quadrants.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-lagoon-700">{item.quadrant}</p>
              <h2 className="text-xl font-semibold text-slate-800">{item.label}</h2>
              <p className="text-sm font-medium text-slate-500">Prepared by {item.author}</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{item.summary}</p>
            <div className="space-y-5 text-sm leading-relaxed text-slate-600">
              {item.sections.map((section) => (
                <section key={section.heading} className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {section.heading}
                  </h3>
                  {'body' in section ? (
                    <p>{section.body}</p>
                  ) : section.ordered ? (
                    <ol className="list-decimal space-y-1 pl-5 text-sm">
                      {section.list.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      {section.list.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
