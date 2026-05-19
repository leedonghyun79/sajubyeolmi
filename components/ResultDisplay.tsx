import { SajuResult } from '@/types/saju';
import ElementsChart from './ElementsChart';

const ELEMENT_COLORS: Record<'목' | '화' | '토' | '금' | '수', string> = {
  목: '#5a8a4a',
  화: '#c84a2a',
  토: '#b8922a',
  금: '#8a9aaa',
  수: '#3a6a9a',
};

export default function ResultDisplay({ result }: { result: SajuResult }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
      {/* 사주팔자 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-amber-600/30 p-6">
        <h3 className="text-xs uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
          사주팔자 (四柱八字)
          <div className="flex-1 h-px bg-amber-600/30"></div>
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {result.pillars.map((pillar) => {
            const stemColor = ELEMENT_COLORS[
              ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수'][
                ['甲갑','乙을','丙병','丁정','戊무','己기','庚경','辛신','壬임','癸계'].indexOf(pillar.stem)
              ] as '목' | '화' | '토' | '금' | '수'
            ];
            const branchColor = ELEMENT_COLORS[
              ['수','토','목','목','토','화','화','토','금','금','토','수'][
                ['子자','丑축','寅인','卯묘','辰진','巳사','午오','未미','申신','酉유','戌술','亥해'].indexOf(pillar.branch)
              ] as '목' | '화' | '토' | '금' | '수'
            ];

            return (
              <div key={pillar.label} className="bg-slate-700 border border-amber-600/20 rounded p-4 text-center">
                <div className="text-xs text-amber-200/70 mb-2">{pillar.label}</div>
                <div className="font-serif text-2xl font-bold mb-1" style={{ color: stemColor }}>
                  {pillar.stem[0]}
                  <span className="text-xs text-amber-200/60 ml-0.5">{pillar.stem.slice(1)}</span>
                </div>
                <div className="font-serif text-lg text-amber-200/80" style={{ color: branchColor }}>
                  {pillar.branch[0]}
                  <span className="text-xs text-amber-200/60">{pillar.branch.slice(1)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 오행 분포 */}
      <ElementsChart elements={result.elements} />

      {/* 십신 분석 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-amber-600/30 p-6">
        <h3 className="text-xs uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
          십신 (十神)
          <div className="flex-1 h-px bg-amber-600/30"></div>
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {[
            { label: '년주', god: result.ten_gods.year_god },
            { label: '월주', god: result.ten_gods.month_god },
            { label: '일주', god: result.ten_gods.day_god },
            { label: '시주', god: result.ten_gods.hour_god },
          ].map((item) => (
            <div key={item.label} className="bg-slate-700 border border-amber-600/20 rounded p-3 text-sm">
              <div className="text-xs text-amber-300 font-semibold mb-1">{item.label}</div>
              <div className="text-sm text-amber-100 font-semibold">{item.god.name}</div>
              <div className="text-xs text-amber-200/60 mt-1 leading-tight">{item.god.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 대운 */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-amber-600/30 p-6">
        <h3 className="text-xs uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
          대운 흐름 (大運)
          <div className="flex-1 h-px bg-amber-600/30"></div>
        </h3>

        <div className="grid grid-cols-5 gap-2">
          {result.da_yun.slice(0, 10).map((d, idx) => (
            <div key={idx} className="bg-slate-700 border border-amber-600/20 rounded p-2 text-center text-xs">
              <div className="text-amber-200/70 mb-1">{d.age}세</div>
              <div className="font-serif text-sm font-bold text-amber-100">{d.stem[0]}</div>
              <div className="font-serif text-xs text-amber-200/60">{d.branch[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
