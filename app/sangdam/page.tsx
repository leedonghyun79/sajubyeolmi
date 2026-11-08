// 상담 페이지
import TabNav from '@/components/TabNav';
const EXPERTS = [
  { name: '명운 선생님', spec: '사주·직업·재물', exp: '경력 15년', rate: '4.9', reviews: 312, color: '#fce7f3', emoji: '🔮' },
  { name: '하늘 선생님', spec: '연애·궁합·결혼', exp: '경력 12년', rate: '4.8', reviews: 245, color: '#dbeafe', emoji: '💌' },
  { name: '청룡 선생님', spec: '사업·투자·재물', exp: '경력 20년', rate: '5.0', reviews: 428, color: '#d1fae5', emoji: '🐉' },
  { name: '별빛 선생님', spec: '타로·신점·운세', exp: '경력 8년', rate: '4.7', reviews: 187, color: '#fef3c7', emoji: '⭐' },
];

const FAQ = [
  { q: '상담은 어떻게 진행되나요?', a: '선생님을 선택한 후 전화 또는 채팅으로 1:1 상담이 진행됩니다. 사전 예약도 가능합니다.' },
  { q: '상담 비용이 얼마인가요?', a: '선생님마다 다르며, 분당 990원부터 시작합니다. 첫 상담은 3분 무료로 제공됩니다.' },
  { q: '상담 전 준비할 것이 있나요?', a: '생년월일시와 태어난 곳(지역)을 미리 준비해 두시면 더욱 정확한 상담이 가능합니다.' },
];

export default function SangdamPage() {
  return (
    <div>
      <TabNav />
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-8 text-white">
        <h2 className="text-xl font-black mb-1">1:1 전문가 상담</h2>
        <p className="text-sm text-white/80">검증된 명리학 전문가와 직접 상담하세요</p>
        <div className="flex items-center gap-3 mt-4 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <span className="text-2xl">📞</span>
          <div>
            <p className="text-xs text-white/70">첫 상담</p>
            <p className="text-sm font-black">3분 무료 제공</p>
          </div>
        </div>
      </div>

      {/* Expert Cards */}
      <div className="p-3 space-y-3 mt-1">
        <div className="px-2 pb-1">
          <h3 className="text-sm font-black text-gray-900">전문가 목록</h3>
          <p className="text-xs text-gray-400 mt-0.5">실시간 온라인 상담 가능</p>
        </div>

        {EXPERTS.map((expert, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 border-2 border-white shadow-md"
              style={{ backgroundColor: expert.color }}>
              {expert.emoji}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-black text-gray-900">{expert.name}</h4>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-[10px] text-green-600 font-semibold">온라인</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{expert.spec}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{expert.exp}</span>
                <span className="text-[10px] text-yellow-500">★ {expert.rate}</span>
                <span className="text-[10px] text-gray-400">({expert.reviews})</span>
              </div>
            </div>
            {/* CTA */}
            <button className="flex-shrink-0 bg-[#7c3aed] text-white text-[11px] font-bold px-3 py-2 rounded-full hover:bg-[#6d28d9] transition-colors">
              상담하기
            </button>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="mx-3 mt-2 bg-[#fdf2f8] rounded-2xl p-5 border border-pink-100">
        <h3 className="text-sm font-black text-gray-800 mb-3">💳 상담 요금 안내</h3>
        <div className="space-y-2">
          {[
            { type: '전화 상담', price: '분당 990원~', color: 'text-purple-600' },
            { type: '채팅 상담', price: '분당 790원~', color: 'text-blue-600' },
            { type: '첫 상담', price: '3분 무료', color: 'text-green-600' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-pink-100 last:border-0">
              <span className="text-xs text-gray-600 font-medium">{row.type}</span>
              <span className={`text-xs font-black ${row.color}`}>{row.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-3 mt-3">
        <h3 className="text-sm font-black text-gray-900 px-1 mb-2">자주 묻는 질문</h3>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-800 mb-1.5 flex items-start gap-1.5">
                <span className="text-[#ff6b9d] flex-shrink-0 font-black">Q.</span>
                {item.q}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed flex items-start gap-1.5">
                <span className="text-purple-500 flex-shrink-0 font-black">A.</span>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
