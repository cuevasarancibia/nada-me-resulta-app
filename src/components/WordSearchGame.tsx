import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';
import { WORD_SEARCH_POOL } from '../data/bookData';

interface WordSearchGameProps {
  onComplete: () => void;
}

const GRID_SIZE = 10;
const WORDS_PER_ROUND = 8;

function pickRandomWords(pool: string[], count: number): string[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

interface CellCoord {
  r: number;
  c: number;
}

function buildGrid(words: string[]) {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '')
  );
  const dirs = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal
  ];

  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const word of sorted) {
    let placed = false;
    for (let attempt = 0; attempt < 150 && !placed; attempt++) {
      const [dr, dc] = dirs[attempt % dirs.length];
      const maxR = dr === 0 ? GRID_SIZE - 1 : GRID_SIZE - word.length;
      const maxC = dc === 0 ? GRID_SIZE - 1 : GRID_SIZE - word.length;
      if (maxR < 0 || maxC < 0) continue;

      const r0 = Math.floor(Math.random() * (maxR + 1));
      const c0 = Math.floor(Math.random() * (maxC + 1));

      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const ch = grid[r0 + dr * i][c0 + dc * i];
        if (ch !== '' && ch !== word[i]) {
          canPlace = false;
          break;
        }
      }
      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          grid[r0 + dr * i][c0 + dc * i] = word[i];
        }
        placed = true;
      }
    }
  }

  const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
  return grid;
}

function getLineCells(a: CellCoord, b: CellCoord): CellCoord[] {
  const dr = b.r - a.r;
  const dc = b.c - a.c;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [a];

  const isStraight = dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
  if (!isStraight) return [a];

  const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
  const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

  return Array.from({ length: steps + 1 }, (_, i) => ({
    r: a.r + stepR * i,
    c: a.c + stepC * i,
  }));
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({
  onComplete,
}) => {
  const [seed, setSeed] = useState(0);
  const activeWords = useMemo(
    () => pickRandomWords(WORD_SEARCH_POOL, WORDS_PER_ROUND),
    [seed]
  );
  const grid = useMemo(() => buildGrid(activeWords), [activeWords]);
  const [startCell, setStartCell] = useState<CellCoord | null>(null);
  const [hoverCell, setHoverCell] = useState<CellCoord | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundKeys, setFoundKeys] = useState<Set<string>>(new Set());

  const previewCells = useMemo(() => {
    if (!startCell) return [];
    return getLineCells(startCell, hoverCell ?? startCell);
  }, [startCell, hoverCell]);

  const handleCellClick = (r: number, c: number) => {
    if (!startCell) {
      setStartCell({ r, c });
      setHoverCell({ r, c });
      return;
    }

    const line = getLineCells(startCell, { r, c });
    const word = line.map((cell) => grid[cell.r][cell.c]).join('');
    const reversed = word.split('').reverse().join('');

    const matched = activeWords.find(
      (w) => (w === word || w === reversed) && !foundWords.includes(w)
    );

    if (matched) {
      const nextWords = [...foundWords, matched];
      const nextKeys = new Set(foundKeys);
      line.forEach((cell) => nextKeys.add(`${cell.r}-${cell.c}`));
      setFoundWords(nextWords);
      setFoundKeys(nextKeys);
      confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
      if (nextWords.length === activeWords.length) {
        onComplete();
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
      }
    }

    setStartCell(null);
    setHoverCell(null);
  };

  const handleReset = () => {
    setSeed((s) => s + 1);
    setStartCell(null);
    setHoverCell(null);
    setFoundWords([]);
    setFoundKeys(new Set());
  };

  return (
    <div className="storybook-card p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-2xl font-bold">🔤 Sopa de Letras del Cuento</h3>
          <p className="text-sm sm:text-base text-[#6e635b] font-semibold">
            Haz clic en la <strong>primera letra</strong> y luego en la{' '}
            <strong>última letra</strong> de cada palabra.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#e3f2e6] border-2 border-[#2a2420] text-sm font-bold">
          {foundWords.length} / {activeWords.length} palabras
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">
        <div
          className="grid gap-[3px] sm:gap-1 p-2 sm:p-3 rounded-2xl bg-[#faf5e8] border-[3px] border-[#2a2420] select-none mx-auto max-w-full"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r}-${c}`;
              const isFound = foundKeys.has(key);
              const isPreview = previewCells.some(
                (cell) => cell.r === r && cell.c === c
              );
              const isStart = startCell?.r === r && startCell?.c === c;

              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(r, c)}
                  onMouseEnter={() => startCell && setHoverCell({ r, c })}
                  className={`w-[27px] h-[27px] sm:w-9 sm:h-9 rounded-md sm:rounded-lg border-2 font-bold text-xs sm:text-base flex items-center justify-center transition touch-manipulation ${
                    isStart
                      ? 'bg-[#f5b82e] border-[#2a2420] scale-105'
                      : isPreview
                      ? 'bg-[#dcebfa] border-[#4a90e2]'
                      : isFound
                      ? 'bg-[#5b9268] text-white border-[#2a2420]'
                      : 'bg-white border-[#e5dcc8] hover:border-[#2a2420]'
                  }`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>

        <div className="space-y-4">
          <div className="font-bold text-lg">Palabras por encontrar:</div>
          <div className="flex flex-wrap gap-2">
            {activeWords.map((word) => {
              const found = foundWords.includes(word);
              return (
                <span
                  key={word}
                  className={`px-3 py-1.5 rounded-xl border-2 border-[#2a2420] font-bold text-sm transition ${
                    found
                      ? 'bg-[#5b9268] text-white line-through'
                      : 'bg-white text-[#2a2420]'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          <button className="storybook-btn" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            Nueva sopa con otras palabras
          </button>

          {foundWords.length === activeWords.length && (
            <div className="p-4 rounded-2xl bg-[#fef3d1] border-2 border-[#2a2420] font-bold">
              🎉 ¡Increíble! Encontraste todas las palabras de ¡Nada me resulta!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

