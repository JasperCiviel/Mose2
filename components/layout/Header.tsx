'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/stakeholders', label: 'Stakeholders' },
  { href: '/tetra', label: 'Tetra' },
  { href: '/design', label: 'Design' },
  { href: '/opt', label: 'Optimization' },
  { href: '/ethics', label: 'Ethics' },
  { href: '/rnd', label: 'R&D' },
  { href: '/appendix', label: 'Appendix' }
];

export function Header() {
  const pathname = usePathname();
  const active = useMemo(() => pathname, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-lagoon-700">
          MOSE Open Design Lab
        </Link>
        <nav className="hidden gap-4 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition-colors ${
                  isActive ? 'bg-lagoon-100 text-lagoon-800' : 'text-slate-600 hover:bg-lagoon-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
