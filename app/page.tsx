'use client';

import { useState } from 'react';
import Link from 'next/link';
import SajuForm from '@/components/SajuForm';
import ResultDisplay from '@/components/ResultDisplay';
import { SajuResult } from '@/types/saju';

const CARDS = [
  {
    id: 'saju',
    badge: 'NEW',
    badgeBg: '#22c55e',
    title: '사주',
    titleBig: true,
    sub: '990원 사주',
    desc: '슬라이드 소드의 사주 해설',
    tag: '1확률',
    tagBg: '#fce7f3',
    tagColor: '#db2777',
    emoji: '🧙',
    bg: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
    href: '/saju',
    span: 1,
  },
  {
    id: 'gunghap',
    badge: null,
    title: '궁합',
    titleBig: true,
    sub: '궁합 해설',
    desc: '우리 커플 이 정도 관계인지 알아보고',
    tag: '1확률',
    tagBg: '#fce7f3',
    tagColor: '#db2777',
    emoji: '🎀',
    bg: 'repeating-linear-gradient(45deg, #fda4af, #fda4af 8px, #fecdd3 8px, #fecdd3 16px)',
    href: '/unsehaesul',
    span: 1,
  },
  {
    id: 'daeun',
    badge: null,
    title: '대운해설',
    titleBig: false,
    sub: '',
    desc: '운 흐름대로 나가는 사람 스타일로',
    tag: '입문무료',
    tagBg: '#dbeafe',
    tagColor: '#2563eb',
    emoji: '🏄',
    bg: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    href: '/saju',
    span: 2,
  },
  {
    id: 'coming',
    badge: null,
    title: '업데이트 예정',
    titleBig: false,
    sub: '',
    desc: '곧 새로운 컨텐츠가 올 예정이에요',
    tag: null,
    tagBg: '',
    tagColor: '',
    emoji: '✨',
    bg: '#f3f4f6',
    href: '#',
    span: 1,
  },
];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState<SajuResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [heroDot, setHeroDot] = useState(0);

  const handleFormSubmit = async (data: any, sajuResult: SajuResult) => {
    setResult(sajuResult);
    setAiAnalysis('');
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saju: sajuResult, type: 'total' }),
      });
      if (response.ok) {
        const { analysis } = await response.json();
        setAiAnalysis(analysis);
      }
    } catch (error) {
      console.error('AI 분석 실패:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="text-gray-900">

      {/* ── Hero Carousel Banner ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef9c3 100%)' }}>
        <div className="px-6 py-8 flex items-center justify-between min-h-[160px]">
          <div>
            <p className="text-xs font-semibold text-yellow-700 mb-1">1000일 특별 할인</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-black text-[#059669] drop-shadow-sm" style={{ WebkitTextStroke: '2px #065f46' }}>990</span>
              <span className="text-xl font-black text-[#059669]">원</span>
            </div>
            <p className="text-sm font-bold text-gray-700">사주아이에 오신 걸 환영합니다</p>
            <p className="text-xs text-gray-500 mt-0.5">도움이 필요하신가요?</p>
          </div>
          <div className="text-7xl select-none opacity-80">🍦</div>
        </div>
        <div className="flex justify-center gap-1.5 pb-3">
          {[0, 1, 2].map(i => (
            <div key={i} onClick={() => setHeroDot(i)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${heroDot === i ? 'w-5 bg-yellow-600' : 'w-1.5 bg-yellow-300'}`} />
          ))}
        </div>
      </section>

      {/* ── Category Tab Nav (links to pages) ── */}
      <div className="bg-white border-b border-gray-100 sticky top-[52px] z-40">
        <div className="flex">
          {[
            { label: '전체', href: '/' },
            { label: '사주·캐릭', href: '/saju' },
            { label: '운세·해설', href: '/unsehaesul' },
            { label: '상담', href: '/sangdam' },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 py-3 text-xs font-bold text-center transition-all border-b-2 ${
                tab.href === '/'
                  ? 'border-[#ff6b9d] text-[#ff6b9d]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Card Grid ── */}
      <div className="p-3 grid grid-cols-2 gap-3">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform ${card.span === 2 ? 'col-span-2' : ''}`}
            style={{ minHeight: card.span === 2 ? '140px' : '200px' }}
            onClick={() => {
              if (card.id === 'daeun' || card.id === 'saju' || card.id === 'gunghap') setShowForm(true);
            }}
          >
            <div className="absolute inset-0" style={{ background: card.bg }} />
            <div className={`absolute ${card.span === 2 ? 'right-6 top-1/2 -translate-y-1/2 text-7xl' : 'right-3 top-3 text-5xl'} opacity-30 select-none`}>
              {card.emoji}
            </div>
            {card.badge && (
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: card.badgeBg }}>
                  {card.badge}
                </span>
              </div>
            )}
            <div className="relative z-10 p-4 h-full flex flex-col justify-between">
              <div>
                {card.titleBig ? (
                  <h3 className="text-4xl font-black text-white drop-shadow-md leading-tight">{card.title}</h3>
                ) : (
                  <h3 className="text-lg font-black text-white drop-shadow-md leading-tight">{card.title}</h3>
                )}
                {card.sub && <p className="text-xs text-white/80 font-medium mt-0.5">{card.sub}</p>}
                <p className="text-xs text-white/70 mt-1 leading-relaxed">{card.desc}</p>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {card.tag && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: card.tagBg, color: card.tagColor }}>
                    {card.tag}
                  </span>
                )}
                {card.id !== 'coming' ? (
                  <button className="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm transition-colors">
                    해당 골라가기 →
                  </button>
                ) : (
                  <span className="text-[11px] font-bold bg-white/20 text-gray-500 px-3 py-1 rounded-full border border-gray-200">
                    업데이트 예정
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Saju Form (opens on card click) ── */}
      {showForm && (
        <section className="mx-3 mb-4 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/80 font-medium">AI 명리 분석</p>
              <h3 className="text-base font-black text-white">나의 평생 사주 풀이</h3>
            </div>
            <button onClick={() => setShowForm(false)} className="text-white/70 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              ✕
            </button>
          </div>
          <div className="p-4">
            <SajuForm onSubmit={handleFormSubmit} />
          </div>
        </section>
      )}

      {/* ── Results ── */}
      {result && (
        <section className="mx-3 mb-4 space-y-4">
          <ResultDisplay result={result} />
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-base">🔮</span>
                AI 평생 사주 해석
              </h3>
            </div>
            <div className="p-5">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="text-4xl animate-bounce">🐱</div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 mb-1">명운을 분석 중입니다...</p>
                    <p className="text-xs text-gray-400">사주명식과 오행을 분석합니다</p>
                  </div>
                </div>
              ) : aiAnalysis ? (
                <div className="text-gray-700 text-[14px] leading-[1.9]">
                  {aiAnalysis.split('\n').map((line, i) => {
                    if (line.trim() === '') return <div key={i} className="h-2" />;
                    if (line.startsWith('- ') || line.startsWith('#') || line.includes('총평') || line.includes('운') || line.includes('성격') || line.includes('비법')) {
                      const title = line.replace(/^[-#*]+ /, '');
                      return (
                        <div key={i} className="pt-5 pb-1">
                          <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff6b9d] inline-block flex-shrink-0" />
                            {title}
                          </h4>
                        </div>
                      );
                    }
                    return <p key={i} className="text-gray-600">{line}</p>;
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* ── Service Info ── */}
      <section className="mx-3 mb-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🐱</span>
          <h3 className="text-sm font-black text-gray-900">990 사주아이</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">990이 사주 · 궁합 · 구재</p>
        <div className="bg-[#fdf2f8] rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-gray-800 mb-1">🤔 기시 소는 정보 보셨나요?</p>
          <p className="text-xs text-gray-500 leading-relaxed">29잔에서 나와 같은 사주인가... 이 사주가 기술합니다.</p>
        </div>
        <ul className="space-y-2 text-xs text-gray-600">
          {[
            '990이 사주 — 사고와 소드의 사주풀이, 해설',
            '신규 · 기 가족사 산이 이런 전에 사자주를 소개하도록.',
            '제주 · 운세 — 10년 의해 이번의 기 대운 해설',
            '연도별 금세 — 올해의 내년, 내년후년에 재운에',
            '오늘의 운세 — 매일 유로의 전자사 일일운세',
            '사주 임상 — 부정하기 를반내보세요',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#ff6b9d] flex-shrink-0 mt-0.5">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {['#사주', '#오늘사주', '#MBTI사주', '#사주궁합', '#타로', '#전생', '#재물운', '#연애운'].map(tag => (
            <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="mx-3 mb-6 text-xs text-gray-400 space-y-1 px-1">
        <p className="font-bold text-gray-500">사주아이</p>
        <p>사주아이의 공식 사이트입니다</p>
        <div className="flex gap-4 mt-3 text-lg">
          <span className="cursor-pointer hover:opacity-70">📸</span>
          <span className="cursor-pointer hover:opacity-70">🐦</span>
        </div>
      </section>

    </div>
  );
}
