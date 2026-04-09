"use client";
import { useMemo, useState } from "react";
import lessons from "@/data/lessons.json";
import LessonCard from "@/components/LessonCard";

const CATEGORIES = ["전체", "인성", "습관", "공부", "관계"] as const;
type Category = (typeof CATEGORIES)[number];

export default function Home() {
  const [filter, setFilter] = useState<Category>("전체");
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [authorTab, setAuthorTab] = useState<"prologue" | "bio">("prologue");

  const filtered = useMemo(
    () =>
      filter === "전체"
        ? lessons
        : lessons.filter((l) => l.category === filter),
    [filter]
  );

  const pickRandom = () => {
    const r = lessons[Math.floor(Math.random() * lessons.length)];
    setFilter("전체");
    setHighlightId(r.id);
    setTimeout(() => {
      document
        .getElementById(`card-${r.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#FBF1E4] pb-24 sm:pb-0">
      <header className="relative px-5 py-12 sm:py-16 text-center overflow-hidden">
        {/* 배경 데코 - 블루 원 */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#8A9DC0]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#8A9DC0]/15 blur-3xl pointer-events-none" />

        <div className="relative">
          <span className="inline-block text-xs sm:text-sm text-[#FBF1E4] font-semibold tracking-wider bg-[#8A9DC0] px-4 py-1.5 rounded-full">
            매일 한 장, 70개의 교훈
          </span>
          <h1 className="mt-4 text-2xl sm:text-4xl font-bold text-[#5C2A1E] leading-tight [word-break:keep-all] [text-wrap:balance]">
            공부보다 먼저,
            <br /> 부모가 가르쳐야 할 것
          </h1>
          <p className="mt-2 text-sm text-[#5C2A1E]/70">
            자존감과 열정을 키우는 부모의 눈빛
          </p>
          <div className="mt-5">
            <button
              onClick={() => setAuthorOpen(true)}
              className="inline-block text-base sm:text-lg font-semibold text-[#5C2A1E] underline decoration-[#8A9DC0] decoration-2 underline-offset-4 hover:decoration-[#8A9DC0] hover:text-[#8A9DC0] hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              이상덕 지음
            </button>
          </div>
          <div className="mt-6">
            <button
              onClick={pickRandom}
              className="rounded-full bg-[#5C2A1E] px-6 py-3 text-[#FBF1E4] shadow-lg hover:scale-105 transition active:scale-95 hidden sm:inline-block font-semibold border-2 border-[#8A9DC0]"
            >
              🎲 오늘 나에게 필요한 교훈은?
            </button>
          </div>
        </div>
      </header>

      {/* 필터 - 데스크탑은 상단, 모바일은 하단 고정 */}
      <nav
        className="
          fixed bottom-0 inset-x-0 z-20 bg-[#FBF1E4]/95 backdrop-blur border-t border-[#5C2A1E]/10
          px-3 py-3 flex gap-2 overflow-x-auto justify-start
          sm:static sm:bg-transparent sm:border-0 sm:justify-center sm:py-3
        "
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition font-medium ${
              filter === c
                ? "bg-[#5C2A1E] text-[#FBF1E4] border-[#5C2A1E]"
                : "bg-white text-[#5C2A1E] border-[#5C2A1E]/20"
            }`}
          >
            {c}
          </button>
        ))}
      </nav>

      {/* 카드 그리드 */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-4 max-w-6xl mx-auto">
        {filtered.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            highlight={lesson.id === highlightId}
          />
        ))}
      </section>

      {/* 모바일 플로팅 랜덤 버튼 */}
      <button
        onClick={pickRandom}
        className="fixed bottom-20 right-4 z-30 rounded-full bg-[#F4D97A] text-[#5C2A1E] w-14 h-14 shadow-lg text-2xl sm:hidden active:scale-90 transition border-2 border-[#5C2A1E]"
        aria-label="랜덤 카드"
      >
        🎲
      </button>

      {/* 저자 모달 */}
      {authorOpen && (
        <div
          onClick={() => {
            setAuthorOpen(false);
            setAuthorTab("prologue");
          }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFF8EC] rounded-2xl max-w-lg w-full shadow-2xl border-2 border-[#8A9DC0] relative max-h-[85vh] flex flex-col"
          >
            <button
              onClick={() => {
                setAuthorOpen(false);
                setAuthorTab("prologue");
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#5C2A1E]/10 hover:bg-[#5C2A1E]/20 text-[#5C2A1E] text-lg z-10"
              aria-label="닫기"
            >
              ✕
            </button>

            {/* 헤더 */}
            <div className="text-center pt-6 sm:pt-8 px-6 sm:px-8">
              <p className="text-xs text-[#8A9DC0] font-semibold tracking-wider">AUTHOR</p>
              <h2 className="mt-1 text-2xl font-bold text-[#5C2A1E]">이상덕</h2>
              <p className="mt-1 text-xs text-[#5C2A1E]/60">
                20년 넘게 교육 현장에서 학부모와 학생을 만나 온 교육자
              </p>
            </div>

            {/* 탭 */}
            <div className="mt-5 px-6 sm:px-8 flex gap-2 border-b border-[#5C2A1E]/10">
              {[
                { key: "prologue", label: "프롤로그" },
                { key: "bio", label: "저자 약력" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setAuthorTab(t.key as "prologue" | "bio")}
                  className={`px-4 py-2 text-sm font-semibold transition border-b-2 -mb-px ${
                    authorTab === t.key
                      ? "text-[#5C2A1E] border-[#8A9DC0]"
                      : "text-[#5C2A1E]/40 border-transparent hover:text-[#5C2A1E]/70"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* 본문 */}
            <div className="overflow-y-auto px-6 sm:px-8 pt-5 pb-6 sm:pb-8">
              {authorTab === "prologue" ? (
                <div className="space-y-4 text-sm text-[#5C2A1E]/90 leading-relaxed [word-break:keep-all]">
                  <p>
                    아이를 잘 키운다는 것은 단순히 성적을 올리거나 공부를 잘하게 만드는 일이 아닙니다.
                    한 사람의 <strong className="text-[#5C2A1E]">인격을 기르고, 삶을 대하는 태도를 형성하는 일</strong>입니다.
                  </p>
                  <p>
                    이 책은 20년 넘게 교육 현장에서 수많은 학부모와 학생을 만나며 쌓아 온
                    경험과 통찰을 바탕으로 완성되었습니다. 부모는 자녀를 어떻게 바라보아야 하는지,
                    어떤 방향으로 이끌어 주는 것이 진정한 교육인지 오랜 시간 고민하고 실천한 결실이 담겨 있습니다.
                  </p>
                  <p>
                    공부법과 습관 형성, 자존감과 정서 관리, 인성 교육과 감정 코칭,
                    창의력과 실패의 의미, 인문학과 예술의 감수성, 그리고 부모의 한마디와 눈빛이
                    아이에게 미치는 영향까지 — 70가지의 짧고 깊은 이야기를 담았습니다.
                  </p>
                  <p className="text-[#5C2A1E] font-medium bg-[#F4D97A]/40 rounded-lg p-3">
                    정답을 가르치는 것이 아니라 <strong>길을 비춰 주는 안내자</strong>로서의
                    부모 역할을 되새기는 이야기. 한 아이의 삶을 사랑으로 안내하는 여정에
                    든든한 동반자가 되기를 바랍니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 text-sm text-[#5C2A1E]/90 leading-relaxed [word-break:keep-all]">
                  <div>
                    <p className="text-xs font-semibold text-[#8A9DC0] tracking-wider mb-3">CAREER</p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#5C2A1E]/85">
                      <li>• 한국미래인재연구소 대표</li>
                      <li>• MBC 자녀교육법 방영</li>
                      <li>• 국제 비즈니스미팅 통역 담당</li>
                      <li>• 미군사령관 표창 수상</li>
                      <li>• 대구지방법원 민사부 조정위원</li>
                      <li>• 영원문화원 영어과 강사</li>
                      <li>• GnB패럴랙스교육 본부장</li>
                      <li>• 김대중 대통령 표창 ‘수출의 탑’ 수상</li>
                      <li>• 고려대학교 경영전문대학원 최고경영자과정 수료</li>
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-[#5C2A1E]/10">
                    <p className="text-xs font-semibold text-[#8A9DC0] tracking-wider mb-3">함께하기</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="mailto:lsd.eduauthor2000@gmail.com"
                        className="flex items-center gap-3 rounded-lg bg-white border border-[#5C2A1E]/15 px-4 py-3 hover:border-[#8A9DC0] hover:bg-[#8A9DC0]/5 transition group"
                      >
                        <span className="text-lg">✉️</span>
                        <div className="text-left">
                          <p className="text-xs text-[#5C2A1E]/60">강연·집필 문의</p>
                          <p className="text-sm font-semibold text-[#5C2A1E] group-hover:text-[#8A9DC0] transition break-all">
                            lsd.eduauthor2000@gmail.com
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://product.kyobobook.co.kr/detail/S000219189320"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg bg-white border border-[#5C2A1E]/15 px-4 py-3 hover:border-[#8A9DC0] hover:bg-[#8A9DC0]/5 transition group"
                      >
                        <span className="text-lg">📖</span>
                        <div className="text-left">
                          <p className="text-xs text-[#5C2A1E]/60">도서 구매</p>
                          <p className="text-sm font-semibold text-[#5C2A1E] group-hover:text-[#8A9DC0] transition">
                            교보문고에서 책 보러가기 ↗
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 하단 배너 */}
      <footer className="mt-16 bg-[#5C2A1E] text-[#FBF1E4] px-5 py-12">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="text-center sm:text-left">
            <p className="font-bold text-lg">공부보다 먼저, 부모가 가르쳐야 할 것</p>
            <p className="text-sm text-[#FBF1E4]/70 mt-1">이상덕 지음 · 매일 한 장의 교훈</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://product.kyobobook.co.kr/detail/S000219189320"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#FBF1E4] text-[#5C2A1E] px-5 py-3 font-semibold text-center hover:bg-[#F4D97A] transition"
            >
              📖 도서 구매
            </a>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("구독해주셔서 감사합니다!");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="이메일 구독"
                className="flex-1 sm:w-56 rounded-lg px-3 py-2 text-[#5C2A1E] bg-[#FBF1E4]"
              />
              <button className="rounded-lg bg-[#F4D97A] text-[#5C2A1E] px-4 py-2 font-semibold">
                구독
              </button>
            </form>
          </div>
        </div>
      </footer>
    </main>
  );
}
