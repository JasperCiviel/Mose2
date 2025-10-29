'use client';

import Image from 'next/image';
import { useCallback } from 'react';

const sceneIntro = [
  "It's a bright morning in the main market square in Venice. Around you, people chat over espresso, tourists grab selfies by the canal and vendors sell a variety of fresh fruits. The square feels alive, full of different voices, choices, and ways of seeing the world.",
  "As you wander through the crowd, four people catch your attention. Each seems ready to share a different perspective on what it means to make the \"right\" decision.",
  "In this square, these four voices are sharing their opinion on different views of ethics. They also heavily discuss what should be done about the regular floodings of Venice.",
  "Who will you approach first? (You can click on who you'd like to approach)"
] as const;

const marketSceneImage = '/images/ethics/venice-market.avif';

const visitors = [
  {
    id: 'henry-sidgwick',
    name: 'Henry Sidgwick',
    lens: 'Ethical Egoism',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Henry_Sidgwick_National_Portrait_Gallery_headshot_crop.png/960px-Henry_Sidgwick_National_Portrait_Gallery_headshot_crop.png',
    alt: 'Portrait of Henry Sidgwick wearing a suit and looking to the right.',
    highlight: "Believes the most ethical path is protecting one's own interests.",
    dialogue:
      "The first gentleman, Henry Sidgwick, believes that doing what's best for yourself is the most ethical path. Looking after your own interests first is not selfish but natural and necessary. Ethical Egoism, he explains, holds that an action is morally right if it advances the self-interest of the decision-maker. In this view, the designer's or authority's own preferences take priority over those of others, much like the MOSE project, which was designed to protect Venice itself from flooding and preserve the city's long-term security."
  },
  {
    id: 'jeremy-bentham',
    name: 'Jeremy Bentham',
    lens: 'Utilitarianism',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Jeremy_Bentham_by_Henry_William_Pickersgill.jpg/960px-Jeremy_Bentham_by_Henry_William_Pickersgill.jpg',
    alt: 'Oil painting of Jeremy Bentham in formal attire, facing forward.',
    highlight: 'Seeks the greatest happiness for the greatest number.',
    dialogue:
      'Another, Jeremy Bentham, thinks the goal is to create the greatest happiness for the greatest number. Ethics is about outcomes and collective well-being. His Utilitarian approach judges actions by their consequences and aims to maximize overall happiness or well-being for as many people as possible, similar to how the MOSE project seeks to safeguard the lives, homes, and livelihoods of Venice\'s residents.'
  },
  {
    id: 'socrates',
    name: 'Socrates',
    lens: 'Rights Perspective',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Socrate_du_Louvre.jpg/960px-Socrate_du_Louvre.jpg',
    alt: 'Marble bust of Socrates from the Louvre Museum.',
    highlight: 'Insists that fundamental rights should never be violated.',
    dialogue:
      "A third, named Socrates, insists that every person has basic rights that should never be violated, no matter the situation. The Rights Perspective, as he describes it, emphasizes that people possess inherent moral rights that must be respected, regardless of potential benefits or harms to others, reminding us that large projects like MOSE must consider citizens' rights and environmental protections, not just efficiency or cost."
  },
  {
    id: 'john-rawls',
    name: 'John Rawls',
    lens: 'Justice Perspective',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/John_Rawls_%281971_photo_portrait%29.jpg/960px-John_Rawls_%281971_photo_portrait%29.jpg',
    alt: 'Black and white photograph of John Rawls wearing glasses.',
    highlight: 'Focuses on fairness, equality, and balanced outcomes for all.',
    dialogue:
      'Lastly, a fourth named John Rawls focuses on fairness, on justice, equality, and ensuring that everyone is treated with respect and balance. The Justice Perspective centers on the fair and equitable distribution of both benefits and burdens among all stakeholders, reflecting debates about MOSE\'s impact on different communities, from fishermen to city residents, and ensuring that no group bears an unfair share of the consequences.'
  }
] as const;

export default function EthicsPage() {
  const handleApproach = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.focus({ preventScroll: true });
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <header className="space-y-8">
        <div className="relative h-64 overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
          <Image
            src={marketSceneImage}
            alt="Early morning view of the Rialto market in Venice with stalls and the Grand Canal."
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs uppercase tracking-[0.3em] text-lagoon-200">Mercato di Rialto, Venezia</p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Voices in the market square debating MOSE&apos;s future.
            </h1>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-slate-100 shadow-xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,96,219,0.35),_transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.25),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.08)_0%,_rgba(15,23,42,0.75)_70%)]" />
            <div className="absolute bottom-[-15%] left-0 right-0 h-36 bg-[length:80px_40px] bg-repeat-x opacity-40 [background-image:repeating-linear-gradient(90deg,_rgba(226,232,240,0.3)_0,_rgba(226,232,240,0.3)_40px,_transparent_40px,_transparent_80px)]" />
          </div>
          <div className="relative z-10 px-8 py-10">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lagoon-200">Venice Market · Ethics</p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Step into a morning conversation on what is right for MOSE.
              </h1>
              <div className="space-y-4 text-sm leading-relaxed text-slate-100/90">
                {sceneIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visitors.map((visitor) => (
            <button
              key={visitor.id}
              type="button"
              onClick={() => handleApproach(visitor.id)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={visitor.image}
                  alt={visitor.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 text-left">
                  <p className="text-xs uppercase tracking-wide text-lagoon-200">{visitor.lens}</p>
                  <p className="text-lg font-semibold text-white">{visitor.name}</p>
                </div>
              </div>
              <div className="p-4 text-left">
                <p className="text-sm text-slate-600">{visitor.highlight}</p>
              </div>
            </button>
          ))}
        </nav>
      </header>

      <section className="space-y-10">
        {visitors.map((visitor) => (
          <article
            key={visitor.id}
            id={visitor.id}
            tabIndex={-1}
            className="grid gap-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:grid-cols-[minmax(0,0.4fr)_1fr]"
          >
            <div className="relative h-64 w-full overflow-hidden rounded-2xl">
              <Image
                src={visitor.image}
                alt={visitor.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 to-transparent p-4">
                <p className="text-xs uppercase tracking-wide text-lagoon-200">{visitor.lens}</p>
                <p className="text-xl font-semibold text-white">{visitor.name}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 text-sm leading-relaxed text-slate-700">
              <p>{visitor.dialogue}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Where PBED Sits Among These Views</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            Let us finish by explaining the preference-based engineering design methodology (PBED). PBED is an approach
            that integrates the preferences and values of stakeholders into the engineering design process. The goal is to
            achieve a design that not only satisfies technical and operational requirements but also reflects the diverse
            priorities of affected groups. In the case of the MOSE barrier system, this means accounting for the needs and
            preferences of local residents, policymakers, environmental organizations, port authorities, and the tourism
            sector. By incorporating these perspectives, PBED helps align technical feasibility with societal
            acceptability, ensuring that the system functions not only as an engineering achievement but also as a socially
            responsible solution.
          </p>
          <p>
            When comparing these ethical theories to the PBED methodology, <strong>utilitarianism</strong> appears most closely aligned.
            Both aim to identify the design outcome that provides the greatest benefit for the majority of stakeholders.
            In the case of the MOSE system, the intention is to protect the city of Venice from flooding, thereby
            safeguarding infrastructure, cultural heritage, and public welfare. This aligns with <strong>utilitarian</strong> reasoning,
            which prioritizes maximizing collective well-being. However, PBED differs in that it also explicitly considers
            minority stakeholder preferences, such as those of environmentalists concerned about ecosystem disruption,
            rather than focusing solely on aggregate benefit.
          </p>
          <p>
            That said, PBED can also be seen as a mix of ethical perspectives. The <strong>justice perspective</strong> is partially
            embedded in PBED through its inclusive and participatory approach, ensuring that each stakeholder has an
            opportunity to voice preferences and influence design decisions. Similarly, the <strong>rights perspective</strong> is
            reflected in the emphasis on respecting local communities’ autonomy and their right to a safe and sustainable
            environment. <strong>Ethical egoism</strong>, however, contrasts sharply with PBED, as PBED rejects any design process that
            prioritizes the interests of a single party (e.g., a government or contractor) over others.
          </p>
          <p>
            Regarding the positive aspects, PBED promotes transparency, inclusiveness, and trust by systematically
            incorporating stakeholder feedback. In the MOSE project, this approach helped balance conflicting interests,
            such as the need for flood protection versus the preservation of lagoon ecosystems. The iterative nature of
            PBED, revisiting stakeholder inputs across multiple cycles, allowed design assumptions to evolve and improve
            alignment between social, environmental, and technical goals. On the negative side, PBED can be time-intensive
            and may lead to compromises that dilute the technical optimality of the system. Moreover, unequal power
            dynamics between stakeholders (for instance, between policymakers and local citizens) may distort the
            preference aggregation process.
          </p>
          <p>
            Overall, after conducting two PBED cycles with stakeholders and assigning them different weights, it can be
            concluded that PBED most closely resembles <strong>utilitarianism</strong>, as both aim to achieve the best possible outcome
            for the majority, while still incorporating fairness and respect for rights. The approach supports balanced
            decision-making for the MOSE barrier, ensuring that the protection of Venice’s citizens and heritage is
            achieved without neglecting environmental and social concerns. <strong>Ethical egoism</strong> remains the least aligned,
            as it fundamentally opposes the collective, preference-oriented ethos of PBED.
          </p>
        </div>
      </section>
    </div>
  );
}
