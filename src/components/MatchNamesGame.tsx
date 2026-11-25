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
    // Deterministic-ish shuffle per seed
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

  return (
    <div className="storybook-card p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-2xl font-bold">🔗 Cruza los Nombres</h3>
          <p className="text-sm sm:text-base text-[#6e635b] font-semibold">
            Toca un personaje a la izquierda y únelo con lo que hizo en el libro.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#e3f2e6] border-2 border-[#2a2420] text-sm font-bold">
          {matchedIds.length} / {MATCH_PAIRS.length} unidos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          {MATCH_PAIRS.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedLeft === item.id;
            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => setSelectedLeft(item.id)}
                className={`w-full p-3.5 rounded-2xl border-[3px] border-[#2a2420] font-bold text-left flex items-center justify-between gap-3 transition ${
                  isMatched
                    ? 'bg-[#e3f2e6] border-[#5b9268] opacity-75'
                    : isSelected
                    ? 'bg-[#fef3d1] ring-4 ring-[#f5b82e]'
                    : 'bg-white hover:bg-[#faf5e8]'
                }`}
              >
                <span className="flex items-center gap-3 text-lg">
                  <img
                    src={item.image}
                    alt={item.left}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-[#2a2420] shrink-0"
                  />
                  {item.left}
                </span>
                {isMatched && <Check className="w-5 h-5 text-[#5b9268]" />}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {shuffledRight.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isWrong = wrongPair === item.id;
            return (
              <button
                key={item.id}
                disabled={isMatched || !selectedLeft}
                onClick={() => handlePickRight(item.id)}
                className={`w-full p-3.5 rounded-2xl border-[3px] border-[#2a2420] font-semibold text-left flex items-center justify-between gap-3 transition ${
                  isMatched
                    ? 'bg-[#e3f2e6] border-[#5b9268] opacity-75'
                    : isWrong
                    ? 'bg-[#fde8e5] border-[#d94e3b]'
                    : selectedLeft
                    ? 'bg-white hover:bg-[#dcebfa]'
                    : 'bg-white/80'
                }`}
              >
                <span className="text-sm sm:text-base">{item.right}</span>
                {isMatched && <Check className="w-5 h-5 text-[#5b9268] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {allDone && (
        <div className="p-4 rounded-2xl bg-[#fef3d1] border-2 border-[#2a2420] flex flex-wrap items-center justify-between gap-3">
          <div className="font-bold text-lg">
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

