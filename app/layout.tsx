import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '사주팔자 운세 - AI 명리 분석',
  description: '생년월일시로 사주팔자를 계산하고 AI가 해석해주는 명리학 운세 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <header className="border-b border-amber-600/20 bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">☯</span>
              <h1 className="text-2xl font-serif font-bold text-amber-100">사주팔자 운세</h1>
            </div>
            <p className="text-sm text-amber-200/60">명리학 기반 · AI 해석</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          {children}
        </main>

        <footer className="border-t border-amber-600/20 bg-slate-950 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-amber-200/60">
            <p className="mb-2">본 앱은 전통 명리학을 기반으로 AI가 해석한 결과입니다.</p>
            <p>참고용으로만 활용하시고, 중요한 결정은 전문가와 상담하세요.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
