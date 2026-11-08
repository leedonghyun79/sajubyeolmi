'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { icon: '🏠', label: '홈', href: '/' },
  { icon: '🔮', label: '사주풀이', href: '/saju' },
  { big: true, icon: '🐱', label: '메뉴', href: '/' },
  { icon: '💬', label: '상담', href: '/sangdam' },
  { icon: '✨', label: '운세·해설', href: '/unsehaesul' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 z-50 px-2 py-2">
      <div className="flex justify-around items-center">
        {NAV_ITEMS.map((item, i) =>
          item.big ? (
            <Link key={i} href={item.href} className="flex flex-col items-center -mt-5">
              <div className="w-12 h-12 rounded-full bg-[#ff6b9d] flex items-center justify-center text-2xl shadow-lg border-4 border-white hover:bg-[#ff5586] transition-colors">
                🐱
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5">{item.label}</span>
            </Link>
          ) : (
            <Link key={i} href={item.href!} className="flex flex-col items-center gap-0.5 group">
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] font-medium transition-colors ${
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href!)
                  ? 'text-[#ff6b9d]'
                  : 'text-gray-400 group-hover:text-[#ff6b9d]'
              }`}>
                {item.label}
              </span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
