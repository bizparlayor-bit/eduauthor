"use client";
import { motion } from "framer-motion";
import { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  category: string;
  summary: string;
  mission: string;
};

const CATEGORY_COLOR: Record<string, string> = {
  인성: "bg-[#F4D97A] text-[#5C2A1E]",
  습관: "bg-[#B8D4C3] text-[#2F5D4A]",
  공부: "bg-[#FBF1E4] text-[#5C2A1E]",
  관계: "bg-[#5C2A1E] text-[#FBF1E4]",
};

export default function LessonCard({
  lesson,
  highlight = false,
}: {
  lesson: Lesson;
  highlight?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      id={`card-${lesson.id}`}
      className={`[perspective:1000px] aspect-[3/4] w-full ${
        highlight ? "ring-4 ring-[#F4D97A] rounded-2xl" : ""
      }`}
    >
      <motion.button
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120, damping: 14 }}
        className="group relative w-full h-full [transform-style:preserve-3d] focus:outline-none cursor-pointer"
      >
        {/* 앞면 */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-[#A8D8F0]/50 group-hover:bg-[#8A9DC0] transition-colors duration-300 shadow-md p-4 flex flex-col justify-between items-center">
          <span className="text-xs text-[#5C2A1E]/60 group-hover:text-[#FBF1E4]/80 self-start font-medium transition-colors duration-300">
            {String(lesson.id).padStart(2, "0")}장
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#5C2A1E] group-hover:text-[#FBF1E4] leading-snug text-center [word-break:keep-all] [text-wrap:balance] px-1 transition-colors duration-300">
            {lesson.title}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              CATEGORY_COLOR[lesson.category] ?? "bg-white text-[#5C2A1E]"
            }`}
          >
            {lesson.category}
          </span>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-[#FFF8EC] text-[#5C2A1E] shadow-md px-4 pt-8 pb-4 flex flex-col gap-3 text-left border-2 border-[#8A9DC0]">
          <p className="text-xs sm:text-sm leading-relaxed">{lesson.summary}</p>
          <div className="mt-auto rounded-lg bg-[#F4D97A] text-[#5C2A1E] p-2 text-xs font-semibold">
            🎯 오늘의 미션
            <p className="font-normal mt-1">{lesson.mission}</p>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
