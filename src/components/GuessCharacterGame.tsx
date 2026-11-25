import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lightbulb, RotateCcw } from 'lucide-react';
import { CHARACTER_RIDDLES } from '../data/bookData';

interface GuessCharacterGameProps {
  onComplete: () => void;
}

export const GuessCharacterGame: React.FC<GuessCharacterGameProps> = ({
  onComplete,
}) => {
  const [index, setIndex] = useState(0);
  const [revealedClues, setRevealedClues] = useState(1);
  const [guessed, setGuessed] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = CHARACTER_RIDDLES[index];

  const handleGuess = (id: string) => {
    if (guessed !== null) return;
    setGuessed(id);
    if (id === current.id) {
      setScore((s) => s + 1);
      confetti({ particleCount: 40, spread: 65, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    if (index + 1 < CHARACTER_RIDDLES.length) {
      setIndex((i) => i + 1);
      setRevealedClues(1);
      setGuessed(null);
    } else {
      setDone(true);
      onComplete();
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setRevealedClues(1);
    setGuessed(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="storybook-card p-6 sm:p-8 text-center space-y-5">
        <div className="text-6xl">🕵️‍♂️✨</div>
        <h2 className="text-3xl font-bold">¡Gran Detective del Libro!</h2>
        <p className="text-xl font-bold text-[#5b9268]">
          Adivinaste {score} de {CHARACTER_RIDDLES.length} personajes
        </p>
        <button className="storybook-btn gold" onClick={handleRestart}>
          <RotateCcw className="w-5 h-5" />
          Volver a adivinar
        </button>
      </div>
    );
  }

  return (
    <div className="storybook-card p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-[#fef3d1] border-2 border-[#2a2420] text-sm font-bold">
          Personaje {index + 1} de {CHARACTER_RIDDLES.length}
        </span>
        <span className="px-3 py-1 rounded-full bg-[#e3f2e6] border-2 border-[#2a2420] text-sm font-bold">
          ⭐ Aciertos: {score}
        </span>
      </div>

      <h3 className="text-2xl font-bold">¿Quién soy? 🤔</h3>

      <div className="space-y-2.5">
        {current.clues.slice(0, revealedClues).map((clue, i) => (
          <div
            key={i}
            className="p-3.5 rounded-2xl bg-[#faf5e8] border-2 border-[#2a2420] font-semibold flex items-start gap-2.5"
          >
            <span className="px-2 py-0.5 rounded-lg bg-[#f5b82e] border border-[#2a2420] text-xs font-bold shrink-0">
              Pista {i + 1}
            </span>
            <span>{clue}</span>
          </div>
        ))}
      </div>

      {revealedClues < 3 && guessed === null && (
        <button
          className="storybook-btn gold text-sm"
          onClick={() => setRevealedClues((c) => Math.min(3, c + 1))}
        >
          <Lightbulb className="w-4 h-4" />
          Pedir otra pista ({revealedClues}/3)
        </button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {CHARACTER_RIDDLES.map((char) => {
          const isCorrect = char.id === current.id;
          const isPicked = guessed === char.id;
          let style = 'bg-white hover:bg-[#faf5e8]';
          if (guessed !== null) {
            if (isCorrect) style = 'bg-[#e3f2e6] border-[#5b9268]';
            else if (isPicked) style = 'bg-[#fde8e5] border-[#d94e3b]';
            else style = 'bg-white opacity-55';
          }

          return (
            <button
              key={char.id}
              onClick={() => handleGuess(char.id)}
              disabled={guessed !== null}
              className={`p-3.5 rounded-2xl border-[3px] border-[#2a2420] font-bold flex flex-col items-center gap-1.5 transition ${style}`}
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2a2420] shadow-sm"
              />
              <span className="text-base">{char.name}</span>
              <span className="text-xs text-[#6e635b]">{char.role}</span>
            </button>
          );
        })}
      </div>

      {guessed !== null && (
        <div className="p-4 rounded-2xl bg-[#e3f2e6] border-2 border-[#2a2420] space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={current.image}
              alt={current.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-[#2a2420]"
            />
            <div className="font-bold text-lg">
              {guessed === current.id
                ? `¡Sí! Es ${current.name}`
                : `¡Casi! Era ${current.name}`}
            </div>
          </div>
          <p className="m-0 text-sm sm:text-base font-semibold text-[#2a2420]">
            💡 Dato curioso del libro: {current.funFact}
          </p>
          <div className="flex justify-end">
            <button className="storybook-btn primary" onClick={handleNext}>
              {index + 1 < CHARACTER_RIDDLES.length
                ? 'Siguiente personaje →'
                : 'Finalizar juego 🎉'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

