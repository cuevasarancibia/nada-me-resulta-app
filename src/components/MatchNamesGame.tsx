import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Check } from 'lucide-react';
import { MATCH_PAIRS } from '../data/bookData';

interface MatchNamesGameProps {
  onComplete: () => void;
}

export const MatchNamesGame: React.FC<MatchNamesGameProps> = ({
  onComplete,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [seed, setSeed] = useState(1);

  const shuffledRight = useMemo(() => {
    const arr = [...MATCH_PAIRS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + seed * 3) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [seed]);

  const handlePickRight = (rightId: string) => {
    if (!selectedLeft || matchedIds.includes(rightId)) return;
    if (selectedLeft === rightId) {
      const next = [...matchedIds, rightId];
      setMatchedIds(next);
      setSelectedLeft(null);
      setWrongPair(null);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
      if (next.length === MATCH_PAIRS.length) {
        onComplete();
        confetti({ particleCount: 95, spread: 90, origin: { y: 0.6 } });
      }
    } else {
      setWrongPair(rightId);
      setTimeout(() => setWrongPair(null), 600);
    }
  };

  const handleReset = () => {
    setSelectedLeft(null);
    setMatchedIds([]);
    setWrongPair(null);
    setSeed((s) => s + 1);
  };

  const allDone = matchedIds.length === MATCH_PAIRS.length;
  const activeLeftItem = MATCH_PAIRS.find((m) => m.id === selectedLeft);

  return (
    <div className="storybook-card p-3.5 sm:p-7 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold m-0">🔗 Cruza los Nombres</h3>
          <p className="text-xs sm:text-base text-[#6e635b] font-semibold m-0 mt-1">
            {activeLeftItem
              ? `Ahora toca a la derecha lo que hizo ${activeLeftItem.left} 👉`
              : '1️⃣ Toca un personaje (izquierda) y 2️⃣ toca su historia (derecha).'}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#e3f2e6] border-2 border-[#2a2420] text-xs sm:text-sm font-bold shrink-0">
          {matchedIds.length} / {MATCH_PAIRS.length}
        </span>
      </div>

      {/* Always 2 side-by-side columns, even on mobile! */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 items-stretch">
        {/* Left Column: Characters */}
        <div className="space-y-2 sm:space-y-3 flex flex-col justify-between">
          {MATCH_PAIRS.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedLeft === item.id;
            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => setSelectedLeft(item.id)}
                className={`w-full flex-1 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border-[2.5px] sm:border-[3px] border-[#2a2420] font-bold text-left flex items-center justify-between gap-1.5 sm:gap-3 transition touch-manipulation ${
                  isMatched
                    ? 'bg-[#e3f2e6] border-[#5b9268] opacity-75'
                    : isSelected
                    ? 'bg-[#fef3d1] ring-2 sm:ring-4 ring-[#f5b82e] scale-[1.02]'
                    : 'bg-white hover:bg-[#faf5e8]'
                }`}
              >
                <span className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-lg leading-tight min-w-0">
                  <img
                    src={item.image}
                    alt={item.left}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl object-cover border-2 border-[#2a2420] shrink-0"
                  />
                  <span className="truncate">{item.left}</span>
                </span>
                {isMatched && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#5b9268] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Descriptions */}
        <div className="space-y-2 sm:space-y-3 flex flex-col justify-between">
          {shuffledRight.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isWrong = wrongPair === item.id;
            return (
              <button
                key={item.id}
                disabled={isMatched || !selectedLeft}
                onClick={() => handlePickRight(item.id)}
                className={`w-full flex-1 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border-[2.5px] sm:border-[3px] border-[#2a2420] font-semibold text-left flex items-center justify-between gap-1.5 sm:gap-3 transition touch-manipulation ${
                  isMatched
                    ? 'bg-[#e3f2e6] border-[#5b9268] opacity-75'
                    : isWrong
                    ? 'bg-[#fde8e5] border-[#d94e3b]'
                    : selectedLeft
                    ? 'bg-white hover:bg-[#dcebfa] border-[#4a90e2]'
                    : 'bg-white/80'
                }`}
              >
                <span className="text-[11px] sm:text-base leading-snug">
                  {item.right}
                </span>
                {isMatched && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#5b9268] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {allDone && (
        <div className="p-4 rounded-2xl bg-[#fef3d1] border-2 border-[#2a2420] flex flex-wrap items-center justify-between gap-3">
          <div className="font-bold text-base sm:text-lg">
            🎉 ¡Perfecto! Conectaste a todos los personajes del cuento.
          </div>
          <button className="storybook-btn gold" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};
