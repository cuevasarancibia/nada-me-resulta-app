import { useState } from 'react';
import {
  BookOpen,
  Film,
  HelpCircle,
  Home,
  Link2,
  ListOrdered,
  Search,
  Sparkles,
  Star,
  UserCheck,
} from 'lucide-react';
import { QuizGame } from './components/QuizGame';
import { GuessCharacterGame } from './components/GuessCharacterGame';
import { MatchNamesGame } from './components/MatchNamesGame';
import { OrderScenesGame } from './components/OrderScenesGame';
import { WordSearchGame } from './components/WordSearchGame';
import { BookAnimationsPanel } from './remotion/BookAnimations';

export type GameSection =
  | 'home'
  | 'quiz'
  | 'guess'
  | 'match'
  | 'order'
  | 'wordsearch'
  | 'cinema';

const GAMES: {
  id: GameSection;
  label: string;
  emoji: string;
  desc: string;
  color: string;
}[] = [
  {
    id: 'quiz',
    label: 'Preguntas',
    emoji: '❓',
    desc: '8 preguntas sobre la historia de Cristóbal',
    color: 'bg-[#dcebfa]',
  },
  {
    id: 'guess',
    label: 'Adivina el Personaje',
    emoji: '🕵️‍♂️',
    desc: 'Lee las pistas y descubre quién es',
    color: 'bg-[#fef3d1]',
  },
  {
    id: 'match',
    label: 'Cruza los Nombres',
    emoji: '🔗',
    desc: 'Une cada personaje con su aventura',
    color: 'bg-[#e3f2e6]',
  },
  {
    id: 'order',
    label: 'Ordena las Escenas',
    emoji: '📚',
    desc: 'Pon en orden los momentos del cuento',
    color: 'bg-[#fde8e5]',
  },
  {
    id: 'wordsearch',
    label: 'Sopa de Letras',
    emoji: '🔤',
    desc: 'Encuentra 10 palabras mágicas del libro',
    color: 'bg-[#ede7f6]',
  },
  {
    id: 'cinema',
    label: 'Cine Remotion',
    emoji: '🎬',
    desc: 'Mira los capítulos animados del libro',
    color: 'bg-[#fff3e0]',
  },
];

export function App() {
  const [section, setSection] = useState<GameSection>('home');
  const [completed, setCompleted] = useState<GameSection[]>([]);

  const markCompleted = (id: GameSection) => {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const mood =
    completed.length === 0
      ? { emoji: '😠', text: 'Amurrado', bg: 'bg-[#fde8e5]' }
      : completed.length < 3
      ? { emoji: '🤔', text: 'Pensándolo mejor', bg: 'bg-[#fef3d1]' }
      : { emoji: '😄', text: '¡Feliz y Sabio!', bg: 'bg-[#e3f2e6]' };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#faf5e8]/95 backdrop-blur border-b-[3px] border-[#2a2420]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setSection('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#d94e3b] border-[3px] border-[#2a2420] flex items-center justify-center text-white shadow-[0_3px_0_#2a2420] group-hover:scale-105 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold leading-none text-[#2a2420]">
                ¡Nada me resulta!
              </h1>
              <p className="text-xs sm:text-sm font-bold text-[#6e635b] m-0 mt-0.5">
                Aventura interactiva • Neva Milicic
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2.5">
            <div
              className={`px-3 py-1.5 rounded-xl border-2 border-[#2a2420] font-bold text-xs sm:text-sm flex items-center gap-1.5 ${mood.bg}`}
            >
              <span>{mood.emoji}</span>
              <span className="hidden sm:inline">Cristóbal:</span>
              <span>{mood.text}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#f5b82e] border-2 border-[#2a2420] font-bold text-xs sm:text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-white text-[#2a2420]" />
              <span>{completed.length} / 5 juegos</span>
            </div>
          </div>
        </div>

        {/* Navigation Strip */}
        <div className="max-w-5xl mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setSection('home')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'home' ? 'primary' : ''
            }`}
          >
            <Home className="w-4 h-4" /> Inicio
          </button>
          <button
            onClick={() => setSection('quiz')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'quiz' ? 'blue' : ''
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Preguntas
          </button>
          <button
            onClick={() => setSection('guess')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'guess' ? 'gold' : ''
            }`}
          >
            <UserCheck className="w-4 h-4" /> Personajes
          </button>
          <button
            onClick={() => setSection('match')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'match' ? 'green' : ''
            }`}
          >
            <Link2 className="w-4 h-4" /> Cruza nombres
          </button>
          <button
            onClick={() => setSection('order')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'order' ? 'primary' : ''
            }`}
          >
            <ListOrdered className="w-4 h-4" /> Escenas
          </button>
          <button
            onClick={() => setSection('wordsearch')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'wordsearch' ? 'blue' : ''
            }`}
          >
            <Search className="w-4 h-4" /> Sopa de letras
          </button>
          <button
            onClick={() => setSection('cinema')}
            className={`storybook-btn !py-1.5 !px-3 !text-sm shrink-0 ${
              section === 'cinema' ? 'gold' : ''
            }`}
          >
            <Film className="w-4 h-4" /> Cine Remotion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 space-y-6">
        {section === 'home' && (
          <>
            {/* Illustrated Storybook Hero Banner */}
            <div className="storybook-card overflow-hidden relative bg-[#fffdf7]">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center">
                <div className="p-5 sm:p-7 space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#fef3d1] border-2 border-[#2a2420] text-xs font-extrabold uppercase tracking-wide">
                    📖 El Barco de Vapor • Neva Milicic
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold m-0 text-[#2a2420]">
                    ¡Acompaña a Cristóbal en su gran día!
                  </h2>
                  <p className="text-sm sm:text-base font-semibold text-[#6e635b] m-0">
                    Lee y escucha el libro completo en el{' '}
                    <strong>Audiolibro Remotion</strong> o juega los 5 desafíos
                    para cambiar el humor de Cristóbal de la lluvia a las estrellas.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button
                      onClick={() => setSection('cinema')}
                      className="storybook-btn primary !text-sm sm:!text-base"
                    >
                      <Film className="w-4 h-4" /> Escuchar Audiolibro
                    </button>
                    <button
                      onClick={() => setSection('quiz')}
                      className="storybook-btn gold !text-sm sm:!text-base"
                    >
                      <HelpCircle className="w-4 h-4" /> Empezar a jugar
                    </button>
                  </div>
                </div>

                <div className="relative h-48 sm:h-60 md:h-full min-h-[200px] border-t-[3px] md:border-t-0 md:border-l-[3px] border-[#2a2420]">
                  <img
                    src={
                      completed.length >= 3
                        ? '/images/scene-stars.jpg'
                        : completed.length >= 1
                        ? '/images/scene-lemonade.jpg'
                        : '/images/scene-rain.jpg'
                    }
                    alt="Escena de ¡Nada me resulta!"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 bg-[#fffdf7]/95 backdrop-blur border-2 border-[#2a2420] rounded-2xl p-2 shadow">
                    <img
                      src="/images/cristobal.jpg"
                      alt="Cristóbal"
                      className="w-11 h-11 rounded-xl object-cover border-2 border-[#2a2420] shrink-0"
                    />
                    <div className="text-xs sm:text-sm font-bold leading-tight">
                      <div>Humor actual: {mood.emoji} {mood.text}</div>
                      <div className="text-[#6e635b] font-semibold">
                        {completed.length >= 3
                          ? '¡Cielo lleno de estrellas!'
                          : `Completa ${3 - completed.length} juego(s) más para despejar la lluvia`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GAMES.map((g) => {
                const isDone = completed.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => setSection(g.id)}
                    className={`storybook-card p-5 text-left flex flex-col justify-between gap-3 hover:-translate-y-1 ${g.color}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-4xl">{g.emoji}</span>
                      {isDone && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#5b9268] text-white border-2 border-[#2a2420] text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> ¡Listo!
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold m-0">{g.label}</h3>
                      <p className="text-sm font-semibold text-[#6e635b] m-0 mt-1">
                        {g.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {section === 'quiz' && (
          <QuizGame onComplete={() => markCompleted('quiz')} />
        )}
        {section === 'guess' && (
          <GuessCharacterGame onComplete={() => markCompleted('guess')} />
        )}
        {section === 'match' && (
          <MatchNamesGame onComplete={() => markCompleted('match')} />
        )}
        {section === 'order' && (
          <OrderScenesGame onComplete={() => markCompleted('order')} />
        )}
        {section === 'wordsearch' && (
          <WordSearchGame onComplete={() => markCompleted('wordsearch')} />
        )}
        {section === 'cinema' && <BookAnimationsPanel />}
      </main>

      <footer className="text-center py-4 px-4 text-xs sm:text-sm font-bold text-[#6e635b]">
        Basado en el libro “¡Nada me resulta!” de Neva Milicic (El Barco de Vapor) • Hecho con React y Remotion
      </footer>
    </div>
  );
}

export default App;
