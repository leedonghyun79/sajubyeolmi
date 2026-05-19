'use client';

import { useState } from 'react';
import SajuForm from '@/components/SajuForm';
import ResultDisplay from '@/components/ResultDisplay';
import { SajuResult } from '@/types/saju';

export default function Home() {
  const [result, setResult] = useState<SajuResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'total' | 'love' | 'career' | 'money' | 'health'>('total');

  const handleFormSubmit = async (data: any, sajuResult: SajuResult) => {
    setResult(sajuResult);
    setAiAnalysis({});
    setActiveTab('total');

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          saju: sajuResult,
          type: 'total',
        }),
      });

      if (response.ok) {
        const { analysis } = await response.json();
        setAiAnalysis({ total: analysis });
      }
    } catch (error) {
      console.error('AI 분석 실패:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadFortune = async (type: 'total' | 'love' | 'career' | 'money' | 'health') => {
    setActiveTab(type);

    if (aiAnalysis[type]) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          saju: result,
          type,
        }),
      });

      if (response.ok) {
        const { analysis } = await response.json();
        setAiAnalysis((prev) => ({ ...prev, [type]: analysis }));
      }
    } catch (error) {
      console.error('AI 분석 실패:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <SajuForm onSubmit={handleFormSubmit} />

      {result && (
        <>
          <ResultDisplay result={result} />

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-amber-600/30 p-6">
            <h3 className="text-xs uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
              AI 명리 해석
              <div className="flex-1 h-px bg-amber-600/30"></div>
            </h3>

            <div className="flex gap-2 mb-4 flex-wrap">
              {(['total', 'love', 'career', 'money', 'health'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleLoadFortune(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    activeTab === tab
                      ? 'bg-amber-600 text-slate-900'
                      : 'bg-slate-700 text-amber-200/70 hover:bg-slate-600'
                  }`}
                >
                  {{
                    total: '종합운',
                    love: '애정운',
                    career: '직업운',
                    money: '재물운',
                    health: '건강운',
                  }[tab]}
                </button>
              ))}
            </div>

            <div className="bg-slate-700/50 rounded p-4 min-h-48">
              {isAnalyzing ? (
                <div className="flex justify-center items-center h-48">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              ) : aiAnalysis[activeTab] ? (
                <p className="text-amber-100 text-sm leading-relaxed whitespace-pre-wrap">{aiAnalysis[activeTab]}</p>
              ) : (
                <p className="text-amber-200/40 text-sm">분석 중...</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
