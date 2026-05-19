'use client';

import { useState } from 'react';
import { SajuResult } from '@/types/saju';

export interface SajuFormProps {
  onSubmit: (data: { year: number; month: number; day: number; hour: number; gender: 'male' | 'female' }, result: SajuResult) => void;
  isLoading?: boolean;
}

const HOURS = [
  { value: 0, label: '자시 (23:00-01:00)' },
  { value: 2, label: '축시 (01:00-03:00)' },
  { value: 4, label: '인시 (03:00-05:00)' },
  { value: 6, label: '묘시 (05:00-07:00)' },
  { value: 8, label: '진시 (07:00-09:00)' },
  { value: 10, label: '사시 (09:00-11:00)' },
  { value: 12, label: '오시 (11:00-13:00)' },
  { value: 14, label: '미시 (13:00-15:00)' },
  { value: 16, label: '신시 (15:00-17:00)' },
  { value: 18, label: '유시 (17:00-19:00)' },
  { value: 20, label: '술시 (19:00-21:00)' },
  { value: 22, label: '해시 (21:00-23:00)' },
];

export default function SajuForm({ onSubmit, isLoading = false }: SajuFormProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('0');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !month || !day) {
      alert('생년월일을 모두 입력해주세요');
      return;
    }

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          hour: parseInt(hour),
          gender,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || '계산 실패');
        return;
      }

      const result = await response.json();
      onSubmit(
        { year: parseInt(year), month: parseInt(month), day: parseInt(day), hour: parseInt(hour), gender },
        result
      );
    } catch (error) {
      alert('계산에 실패했습니다');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-amber-600/30">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-amber-100 mb-1">사주팔자 운세</h2>
        <p className="text-sm text-amber-200/60">명리학 기반 · AI 해석</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-xs text-amber-200/70 uppercase tracking-wider mb-2">
              생년 (양력)
            </label>
            <input
              id="year"
              type="number"
              min="1900"
              max="2025"
              placeholder="예: 1990"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-amber-600/30 rounded text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label htmlFor="month" className="block text-xs text-amber-200/70 uppercase tracking-wider mb-2">
              생월
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-amber-600/30 rounded text-amber-100 focus:outline-none focus:border-amber-500"
            >
              <option value="">월 선택</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="day" className="block text-xs text-amber-200/70 uppercase tracking-wider mb-2">
              생일
            </label>
            <input
              id="day"
              type="number"
              min="1"
              max="31"
              placeholder="예: 15"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-amber-600/30 rounded text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label htmlFor="hour" className="block text-xs text-amber-200/70 uppercase tracking-wider mb-2">
              생시
            </label>
            <select
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-amber-600/30 rounded text-amber-100 text-sm focus:outline-none focus:border-amber-500"
            >
              {HOURS.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-amber-200/70 uppercase tracking-wider mb-2">
            성별
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="w-4 h-4"
              />
              <span className="text-amber-100">남성</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="w-4 h-4"
              />
              <span className="text-amber-100">여성</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded transition-all"
        >
          {isLoading ? '계산 중...' : '✦ 사주팔자 보기'}
        </button>
      </div>
    </form>
  );
}
