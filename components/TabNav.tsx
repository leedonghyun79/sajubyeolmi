'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: '전체', href: '/' },
  { label: '사주·캐릭', href: '/saju' },
  { label: '운세·해설', href: '/unsehaesul' },
  { label: '상담', href: '/sangdam' },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-[52px] z-40">
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = tab.href === '/'
            ? pathname === '/'
            : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 py-3 text-xs font-bold text-center transition-all border-b-2 ${
                isActive
                  ? 'border-[#ff6b9d] text-[#ff6b9d]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
