import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: '평생사주 - AI 명리 분석',
  description: '생년월일시로 사주팔자를 계산하고 AI가 해석해주는 명리학 운세 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      {/* 바깥: 검정 배경 */}
      <body className="antialiased min-h-screen bg-[#111111]" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
        {/* 중앙 컬럼: 흰 배경 */}
        <div className="max-w-[480px] mx-auto bg-white min-h-screen flex flex-col relative">
          {/* Header */}
          <header className="bg-white sticky top-0 z-50 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xl">🐱</span>
              <span className="text-base font-black text-gray-900 tracking-tight">평생사주</span>
            </div>
            <button className="text-xs font-semibold text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors">
              로그인
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 pb-20">
            {children}
          </main>

          <BottomNav />
        </div>
      </body>
    </html>
  );
}
