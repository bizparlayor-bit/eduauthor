"use client";
import { useMemo, useState } from "react";
import lessons from "@/data/lessons.json";
import LessonCard from "@/components/LessonCard";

const CATEGORIES = ["전체", "인성", "습관", "공부", "관계"] as const;
type Category = (typeof CATEGORIES)[number];

export default function Home() {
  const [filter, setFilter] = useState<Category>("전체");
  const [highlightId, setHighlightId] = useState<number | null>(null);

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
          <p className="mt-3 text-sm text-[#5C2A1E]/70">
            이상덕 지음 · 자존감과 열정을 키우는 부모의 눈빛
          </p>
          <button
            onClick={pickRandom}
            className="mt-6 rounded-full bg-[#5C2A1E] px-6 py-3 text-[#FBF1E4] shadow-lg hover:scale-105 transition active:scale-95 hidden sm:inline-block font-semibold border-2 border-[#8A9DC0]"
          >
            🎲 오늘 나에게 필요한 교훈은?
          </button>
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

      {/* 하단 배너 */}
      <footer className="mt-16 bg-[#5C2A1E] text-[#FBF1E4] px-5 py-12">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="text-center sm:text-left">
            <p className="font-bold text-lg">공부보다 먼저, 부모가 가르쳐야 할 것</p>
            <p className="text-sm text-[#FBF1E4]/70 mt-1">이상덕 지음 · 매일 한 장의 교훈</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#"
              className="rounded-lg bg-[#FBF1E4] text-[#5C2A1E] px-5 py-3 font-semibold text-center"
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
