import Link from 'next/link';

const documents = [
  {
    title: 'MOSE 3×5 Optimization Notebook',
    description:
      'Jupyter notebook used for the sensitivity runs and GA experiments that informed the site narrative.',
    href: '/docs/mose_3x5_corrected.ipynb',
    details: 'Jupyter Notebook · 3×5 stakeholder configuration'
  }
] as const;

export default function AppendixPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-800">Appendix & Source Files</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Download the notebook that underpins our optimisation runs and review the key literature sources that informed the
          MOSE Barrier study.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {documents.map((item) => (
          <article key={item.href} className="rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-slate-800">{item.title}</h2>
              <p className="text-xs uppercase tracking-wide text-slate-400">{item.details}</p>
              <p className="text-sm text-slate-600">{item.description}</p>
              <Link
                href={item.href}
                className="mt-auto w-fit rounded-full bg-lagoon-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-lagoon-600"
              >
                Download
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800">Literature</h2>
        <div className="space-y-5 text-sm leading-relaxed text-slate-600">
          <div>
            <h3 className="font-semibold text-slate-800">Articles</h3>
            <ul className="mt-2 space-y-1 pl-5 text-xs text-slate-500">
              <li>
                Sea-Help (2020). “Venice MOSE Flood Protection.” Retrieved from{' '}
                <a
                  href="https://www.sea-help.eu/en/news-general/venice-mose-flood-protection/"
                  className="text-lagoon-700 underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.sea-help.eu/en/news-general/venice-mose-flood-protection/
                </a>
              </li>
              <li>
                Engineering.com (2020). “Venice’s Tide Barrier Has Already Cost €6 Billion — Will It Work?” Retrieved from{' '}
                <a
                  href="https://www.engineering.com/venices-tide-barrier-has-already-cost-6-billion-euros-will-it-work/"
                  className="text-lagoon-700 underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.engineering.com/venices-tide-barrier-has-already-cost-6-billion-euros-will-it-work/
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">Images</h3>
            <ul className="mt-2 space-y-1 pl-5 text-xs text-slate-500">
              <li>
                “Superlevee” image: ResearchGate (2023). “Cross-section of the super-levee concept.” Retrieved from{' '}
                <a
                  href="https://www.researchgate.net/figure/Cross-section-of-the-super-levee-concept_fig3_382274354"
                  className="text-lagoon-700 underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.researchgate.net/figure/Cross-section-of-the-super-levee-concept_fig3_382274354
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">Books</h3>
            <ul className="mt-2 space-y-1 pl-5 text-xs text-slate-500">
              <li>
                Stive, M. J. F., Aarninkhof, S. G. J., &amp; de Vries, S. (Eds.). (2021). <em>Coastal Dynamics of Sea Level Rise: Adaptive Management of the Coastal Zone</em>.
                Delft University of Technology, TU Delft Open. Retrieved from{' '}
                <a
                  href="https://books.open.tudelft.nl/home/catalog/view/78/133/203"
                  className="text-lagoon-700 underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://books.open.tudelft.nl/home/catalog/view/78/133/203
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
