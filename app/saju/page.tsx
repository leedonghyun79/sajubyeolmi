// 사주·캐릭 페이지
import Link from 'next/link';
import TabNav from '@/components/TabNav';

const SAJU_CARDS = [
  {
    id: 'lifetime',
    badge: 'PREMIUM',
    badgeBg: '#7c3aed',
    title: '평생 사주',
    sub: '나의 일생을 관통하는 총운',
    desc: '성격·재물·건강·이성 등 평생에 걸친 모든 운세를 AI가 상세히 풀이해 드립니다.',
    tag: '인기',
    tagBg: '#fce7f3',
    tagColor: '#db2777',
    emoji: '🌟',
    bg: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
    href: '/saju/lifetime',
  },
  {
    id: 'annual',
    badge: 'NEW',
    badgeBg: '#22c55e',
    title: '연도별 운세',
    sub: '올해 그리고 내년은?',
    desc: '해마다 찾아오는 운세의 흐름을 미리 파악하고 대비하세요.',
    tag: '무료',
    tagBg: '#dbeafe',
    tagColor: '#2563eb',
    emoji: '📅',
    bg: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    href: '/saju/annual',
  },
  {
    id: 'daily',
    badge: null,
    title: '오늘의 운세',
    sub: '오늘 하루의 기운은?',
    desc: '매일 갱신되는 AI 일일 운세. 오늘 하루를 슬기롭게 시작하세요.',
    tag: '매일무료',
    tagBg: '#d1fae5',
    tagColor: '#065f46',
    emoji: '☀️',
    bg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    href: '/saju/daily',
  },
  {
    id: 'career',
    badge: null,
    title: '직업·적성 운',
    sub: '나에게 맞는 직업은?',
    desc: '사주팔자로 알아보는 타고난 직업적성과 성공 분야.',
    tag: null,
    tagBg: '',
    tagColor: '',
    emoji: '💼',
    bg: 'linear-gradient(135deg, #10b981 0%, #0891b2 100%)',
    href: '/saju/career',
  },
];

export default function SajuPage() {
  return (
    <div>
      <TabNav />
      <div className="p-3 space-y-3">
      <div className="px-2 pt-2 pb-1">
        <h2 className="text-base font-black text-gray-900">사주 · 캐릭</h2>
        <p className="text-xs text-gray-400 mt-0.5">나의 사주를 AI로 풀어봅니다</p>
      </div>

      {SAJU_CARDS.map((card) => (
        <Link key={card.id} href={card.href}>
          <div className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform mb-3" style={{ minHeight: '140px' }}>
            <div className="absolute inset-0" style={{ background: card.bg }} />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-30 select-none">{card.emoji}</div>
            {card.badge && (
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: card.badgeBg }}>{card.badge}</span>
              </div>
            )}
            <div className="relative z-10 p-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs text-white/70 font-medium mb-0.5">{card.sub}</p>
                <h3 className="text-xl font-black text-white drop-shadow-md">{card.title}</h3>
                <p className="text-xs text-white/70 mt-1 leading-relaxed max-w-[220px]">{card.desc}</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                {card.tag && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: card.tagBg, color: card.tagColor }}>{card.tag}</span>
                )}
                <span className="text-[11px] font-bold bg-white/20 text-white px-3 py-1 rounded-full border border-white/30">
                  자세히 보기 →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
