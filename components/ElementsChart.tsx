import { ElementAnalysis } from '@/types/saju';

const ELEMENT_COLORS: Record<'목' | '화' | '토' | '금' | '수', string> = {
  목: '#5a8a4a',
  화: '#c84a2a',
  토: '#b8922a',
  금: '#8a9aaa',
  수: '#3a6a9a',
};

const ELEMENT_NAMES = ['목', '화', '토', '금', '수'] as const;

export default function ElementsChart({ elements }: { elements: ElementAnalysis }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-amber-600/30 p-6">
      <h3 className="text-xs uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
        오행 분포 (五行)
        <div className="flex-1 h-px bg-amber-600/30"></div>
      </h3>

      <div className="space-y-3">
        {ELEMENT_NAMES.map((element) => (
          <div key={element} className="flex items-center gap-3">
            <div className="w-8 text-sm text-amber-200/70 font-semibold">{element}</div>
            <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${elements.analysis[element].percentage}%`,
                  backgroundColor: ELEMENT_COLORS[element],
                }}
              />
            </div>
            <div className="w-12 text-right text-sm text-amber-200/70">
              {elements[element]}개
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-slate-700/50 border border-amber-600/20 rounded text-sm">
        <div className="text-amber-300 font-semibold mb-1">가장 강한 오행</div>
        <div className="text-amber-100">{elements.dominant_element} (주도적 기질)</div>
      </div>
    </div>
  );
}
