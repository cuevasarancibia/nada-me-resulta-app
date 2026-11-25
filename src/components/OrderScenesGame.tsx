import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react';
import { STORY_SCENES, StoryScene } from '../data/bookData';

interface OrderScenesGameProps {
  onComplete: () => void;
}

const INITIAL_SHUFFLED: StoryScene[] = [
  STORY_SCENES[3],
  STORY_SCENES[0],
  STORY_SCENES[5],
  STORY_SCENES[2],
  STORY_SCENES[4],
  STORY_SCENES[1],
];

export const OrderScenesGame: React.FC<OrderScenesGameProps> = ({
  onComplete,
}) => {
  const [scenes, setScenes] = useState<StoryScene[]>(INITIAL_SHUFFLED);
  const [checked, setChecked] = useState(false);

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= scenes.length) return;
    const copy = [...scenes];
    [copy[idx], copy[target]] = [copy[target], copy[idx]];
    setScenes(copy);
    setChecked(false);
  };

  const correctCount = scenes.filter((s, i) => s.order === i + 1).length;
  const allCorrect = correctCount === scenes.length;

  const handleCheck = () => {
    setChecked(true);
    if (allCorrect) {
      onComplete();
      confetti({ particleCount: 95, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setScenes(INITIAL_SHUFFLED);
    setChecked(false);
  };

  return (
    <div className="storybook-card p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-2xl font-bold">📚 Ordena las Escenas</h3>
          <p className="text-sm sm:text-base text-[#6e635b] font-semibold">
            Usa las flechas ⬆️ y ⬇️ para ordenar la historia del 1 al 6.
          </p>
        </div>
        {checked && (
          <span className="px-3 py-1 rounded-full bg-[#fef3d1] border-2 border-[#2a2420] text-sm font-bold">
            {correctCount} / {scenes.length} en su lugar
          </span>
        )}
      </div>

      <div className="space-y-3">
        {scenes.map((scene, idx) => {
          const isRightSpot = checked && scene.order === idx + 1;
          const isWrongSpot = checked && scene.order !== idx + 1;

          return (
            <div
              key={scene.id}
              className={`p-3.5 rounded-2xl border-[3px] border-[#2a2420] flex items-center justify-between gap-3 transition ${
                isRightSpot
                  ? 'bg-[#e3f2e6] border-[#5b9268]'
                  : isWrongSpot
                  ? 'bg-[#fde8e5] border-[#d94e3b]'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fef3d1] border-2 border-[#2a2420] flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-[#2a2420] shrink-0"
                />
                <div>
                  <div className="font-bold text-base sm:text-lg">
                    {scene.title}
                  </div>
                  <div className="text-xs sm:text-sm text-[#6e635b] font-semibold">
                    {scene.description}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-1.5 shrink-0">
                <button
                  className="storybook-btn !p-2"
                  disabled={idx === 0}
                  onClick={() => move(idx, -1)}
                  aria-label="Subir escena"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  className="storybook-btn !p-2"
                  disabled={idx === scenes.length - 1}
                  onClick={() => move(idx, 1)}
                  aria-label="Bajar escena"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button className="storybook-btn" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
          Mezclar otra vez
        </button>
        <button className="storybook-btn green" onClick={handleCheck}>
          <CheckCircle2 className="w-5 h-5" />
          Comprobar orden
        </button>
      </div>

      {checked && allCorrect && (
        <div className="p-4 rounded-2xl bg-[#e3f2e6] border-2 border-[#2a2420] font-bold text-center text-lg">
          🎉 ¡Excelente! Ordenaste toda la aventura de Cristóbal de principio a fin.
        </div>
      )}
    </div>
  );
};

