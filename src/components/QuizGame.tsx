import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/bookData';

interface QuizGameProps {
  onComplete: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
      onComplete();
      confetti({ particleCount: 90, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="storybook-card p-6 sm:p-8 text-center space-y-5">
        <div className="text-6xl">🏆</div>
        <h2 className="text-3xl font-bold">¡Desafío de Preguntas Completado!</h2>
        <p className="text-xl font-bold text-[#5b9268]">
          Respondiste bien {score} de {QUIZ_QUESTIONS.length} preguntas
        </p>
        <p className="text-[#6e635b] max-w-md mx-auto">
          {score >= 6
            ? '¡Excelente memoria! Te sabes la historia de Cristóbal y Victoria de memoria.'
            : '¡Buen intento! Puedes volver a jugar para conseguir todas las respuestas.'}
        </p>
        <button className="storybook-btn gold" onClick={handleRestart}>
          <RotateCcw className="w-5 h-5" />
          Jugar otra vez
        </button>
      </div>
    );
  }

  return (
    <div className="storybook-card p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-[#fef3d1] border-2 border-[#2a2420] text-sm font-bold">
          Pregunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}
        </span>
        <span className="px-3 py-1 rounded-full bg-[#e3f2e6] border-2 border-[#2a2420] text-sm font-bold">
          ⭐ Puntos: {score}
        </span>
      </div>

      <div className="text-xs font-bold uppercase tracking-wider text-[#4a90e2]">
        {q.pageHint}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold leading-snug">{q.question}</h3>

      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correctIndex;
          const isSelected = idx === selected;
          let bg = 'bg-white hover:bg-[#faf5e8]';
          if (selected !== null) {
            if (isCorrect) bg = 'bg-[#e3f2e6] border-[#5b9268]';
            else if (isSelected) bg = 'bg-[#fde8e5] border-[#d94e3b]';
            else bg = 'bg-white opacity-60';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-2xl border-[3px] border-[#2a2420] font-bold text-base sm:text-lg transition flex items-center justify-between gap-3 ${bg}`}
            >
              <span>{opt}</span>
              {selected !== null && isCorrect && (
                <CheckCircle2 className="w-6 h-6 text-[#5b9268] shrink-0" />
              )}
              {selected !== null && isSelected && !isCorrect && (
                <XCircle className="w-6 h-6 text-[#d94e3b] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="p-4 rounded-2xl bg-[#dcebfa] border-2 border-[#2a2420] space-y-3">
          <div className="flex items-start gap-2 font-bold">
            <Sparkles className="w-5 h-5 text-[#4a90e2] shrink-0 mt-0.5" />
            <p className="m-0 text-sm sm:text-base">{q.explanation}</p>
          </div>
          <div className="flex justify-end">
            <button className="storybook-btn primary" onClick={handleNext}>
              {currentIdx + 1 < QUIZ_QUESTIONS.length
                ? 'Siguiente pregunta →'
                : 'Ver resultado 🎉'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

