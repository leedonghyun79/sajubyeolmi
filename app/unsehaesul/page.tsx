// 운세·해설 페이지
import Link from 'next/link';
import TabNav from '@/components/TabNav';

const UNSE_CARDS = [
  {
    id: 'gunghap',
    badge: 'BEST',
    badgeBg: '#e11d48',
    title: '궁합 해설',
    sub: '우리 커플 잘 맞을까?',
    desc: '두 사람의 사주를 분석해 궁합 점수와 관계 특징을 AI가 상세히 알려드립니다.',
    tag: '인기',
    tagBg: '#fce7f3',
    tagColor: '#db2777',
    emoji: '👫',
    bg: 'repeating-linear-gradient(45deg, #fda4af, #fda4af 8px, #fecdd3 8px, #fecdd3 16px)',
    href: '/unsehaesul/gunghap',
  },
  {
    id: 'daeun',
    badge: null,
    title: '대운 해설',
    sub: '10년 단위 큰 흐름',
    desc: '인생을 10년 단위로 나누는 대운의 흐름을 파악해 미래를 대비하세요.',
    tag: '입문무료',
    tagBg: '#dbeafe',
    tagColor: '#2563eb',
    emoji: '🌊',
    bg: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    href: '/unsehaesul/daeun',
  },
  {
    id: 'zodiac',
    badge: null,
    title: '띠별 운세',
    sub: '내 띠의 오늘 운세',
    desc: '쥐·소·호랑이·토끼 등 12지신 띠별 오늘의 운세를 확인하세요.',
    tag: '매일무료',
    tagBg: '#d1fae5',
    tagColor: '#065f46',
    emoji: '🐉',
    bg: 'linear-gradient(135deg, #a3e635 0%, #16a34a 100%)',
    href: '/unsehaesul/zodiac',
  },
  {
    id: 'wealth',
    badge: 'NEW',
    badgeBg: '#f59e0b',
    title: '재물운 해설',
    sub: '돈이 들어오는 시기',
    desc: '재물운의 흐름과 투자·저축 최적 시기를 사주를 통해 알아봅니다.',
    tag: null,
    tagBg: '',
    tagColor: '',
    emoji: '💰',
    bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    href: '/unsehaesul/wealth',
  },
  {
    id: 'love',
    badge: null,
    title: '연애·이성운',
    sub: '인연은 언제 올까?',
    desc: '나에게 맞는 이상형과 연애운이 들어오는 시기를 AI가 분석해 드립니다.',
    tag: null,
    tagBg: '',
    tagColor: '',
    emoji: '💌',
    bg: 'linear-gradient(135deg, #f472b6 0%, #a855f7 100%)',
    href: '/unsehaesul/love',
  },
];

export default function UnsePage() {
  return (
    <div>
      <TabNav />
      <div className="p-3 space-y-3">
      <div className="px-2 pt-2 pb-1">
        <h2 className="text-base font-black text-gray-900">운세 · 해설</h2>
        <p className="text-xs text-gray-400 mt-0.5">다양한 운세 테마를 탐색해보세요</p>
      </div>

      {UNSE_CARDS.map((card) => (
        <Link key={card.id} href={card.href}>
          <div className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform mb-3" style={{ minHeight: '130px' }}>
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
                <p className="text-xs text-white/70 mt-1 leading-relaxed max-w-[200px]">{card.desc}</p>
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
