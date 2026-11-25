import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Player, PlayerRef } from '@remotion/player';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BOOK_CHAPTERS, BookChapter } from '../data/bookData';

const ChapterSceneComposition: React.FC<{ chapter: BookChapter }> = ({
  chapter,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardPop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 95 },
  });

  const textOpacity = interpolate(frame, [10, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const quoteOpacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const charPop = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  const zoom = interpolate(frame, [0, 240], [1, 1.08], {
    extrapolateRight: 'clamp',
  });

  const isDark = chapter.effect === 'stars';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: chapter.moodColor,
        fontFamily: 'Fredoka, Nunito, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 28,
      }}
    >
      {/* Animated Ken Burns Background */}
      <img
        src={chapter.image}
        alt={chapter.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isDark ? 0.55 : 0.32,
          transform: `scale(${zoom})`,
        }}
      />

      {/* Rain effect for rainy chapters */}
      {chapter.effect === 'rain' &&
        Array.from({ length: 18 }).map((_, i) => {
          const y = ((frame * (6 + (i % 4)) + i * 42) % 460) - 40;
          const x = 30 + i * 42;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 5,
                height: 22,
                borderRadius: 99,
                backgroundColor: 'rgba(74, 144, 226, 0.5)',
              }}
            />
          );
        })}

      {/* Twinkling stars for stars chapter */}
      {chapter.effect === 'stars' &&
        Array.from({ length: 10 }).map((_, i) => {
          const pulse = 0.75 + Math.sin((frame + i * 11) * 0.12) * 0.35;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${8 + (i * 9) % 85}%`,
                top: `${10 + ((i * 23) % 75)}%`,
                fontSize: 22,
                transform: `scale(${pulse})`,
              }}
            >
              ⭐
            </div>
          );
        })}

      {/* Storybook Page Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          transform: `scale(${cardPop})`,
          backgroundColor: 'rgba(255, 253, 247, 0.95)',
          border: '4px solid #2A2420',
          borderRadius: 28,
          padding: '22px 28px',
          width: '92%',
          boxShadow: '0 10px 0 rgba(42, 36, 32, 0.85)',
          display: 'grid',
          gridTemplateColumns: chapter.characterImage ? '150px 1fr' : '1fr',
          gap: 22,
          alignItems: 'center',
        }}
      >
        {chapter.characterImage && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              transform: `scale(${charPop})`,
            }}
          >
            <img
              src={chapter.characterImage}
              alt={chapter.title}
              style={{
                width: 136,
                height: 136,
                borderRadius: 22,
                objectFit: 'cover',
                border: '3px solid #2A2420',
                boxShadow: '0 4px 0 #2A2420',
              }}
            />
            <span
              style={{
                backgroundColor: '#FEF3D1',
                border: '2px solid #2A2420',
                borderRadius: 99,
                padding: '2px 10px',
                fontSize: 13,
                fontWeight: 800,
                color: '#2A2420',
              }}
            >
              {chapter.page}
            </span>
          </div>
        )}

        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: '#D94E3B',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              }}
            >
              Capítulo {chapter.id} de {BOOK_CHAPTERS.length}
            </span>
            {!chapter.characterImage && (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#6E635B',
                }}
              >
                {chapter.page}
              </span>
            )}
          </div>

          <h3
            style={{
              margin: '0 0 10px 0',
              fontSize: 28,
              fontWeight: 700,
              color: '#2A2420',
              lineHeight: 1.15,
            }}
          >
            {chapter.title}
          </h3>

          <p
            style={{
              margin: 0,
              opacity: textOpacity,
              fontFamily: 'Nunito, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#2A2420',
              lineHeight: 1.45,
            }}
          >
            {chapter.text}
          </p>

          {chapter.quote && (
            <div
              style={{
                marginTop: 12,
                opacity: quoteOpacity,
                backgroundColor: '#FEF3D1',
                borderLeft: '5px solid #F5B82E',
                borderRadius: 12,
                padding: '8px 14px',
                fontSize: 15,
                fontWeight: 800,
                color: '#4A3E35',
                fontStyle: 'italic',
              }}
            >
              “{chapter.quote}”
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BookAnimationsPanel: React.FC = () => {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [speechRate, setSpeechRate] = useState<0.8 | 0.95>(0.95);
  const playerRef = useRef<PlayerRef>(null);

  const chapter = BOOK_CHAPTERS[chapterIdx];

  const stopAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speakChapter = useCallback(
    (chap: BookChapter, rate: number, shouldAutoNext: boolean) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }
      window.speechSynthesis.cancel();

      const fullText = chap.quote
        ? `${chap.title}. ${chap.text} ${chap.quote}`
        : `${chap.title}. ${chap.text}`;

      const utterance = new SpeechSynthesisUtterance(fullText);
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice =
        voices.find((v) => v.lang.startsWith('es-CL')) ||
        voices.find((v) => v.lang.startsWith('es-419')) ||
        voices.find((v) => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      utterance.lang = 'es-CL';
      utterance.rate = rate;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (shouldAutoNext) {
          setChapterIdx((prev) =>
            prev + 1 < BOOK_CHAPTERS.length ? prev + 1 : prev
          );
        }
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  // Trigger speech when audioEnabled or chapterIdx changes
  useEffect(() => {
    if (audioEnabled) {
      speakChapter(chapter, speechRate, autoAdvance);
      playerRef.current?.seekTo(0);
      playerRef.current?.play();
    } else {
      stopAudio();
    }
  }, [audioEnabled, chapterIdx, speechRate, autoAdvance, chapter, speakChapter, stopAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  return (
    <div className="storybook-card p-5 sm:p-7 space-y-5">
      {/* Header & Audiobook Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2a2420] flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-[#d94e3b]" />
            Audiolibro Animado (Remotion)
          </h2>
          <p className="text-[#6e635b] font-semibold m-0">
            Lee y escucha el libro completo hoja por hoja ({BOOK_CHAPTERS.length}{' '}
            capítulos)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className={`storybook-btn ${audioEnabled ? 'primary' : 'gold'}`}
            onClick={toggleAudio}
          >
            {audioEnabled ? (
              <>
                <VolumeX className="w-5 h-5" />
                {isSpeaking ? 'Detener Audiolibro' : 'Silenciar Voz'}
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                Escuchar Audiolibro
              </>
            )}
          </button>

          <button
            className="storybook-btn !py-2 !px-3 text-sm"
            onClick={() => setSpeechRate((r) => (r === 0.95 ? 0.8 : 0.95))}
            title="Cambiar velocidad de lectura"
          >
            🐢 Voz: {speechRate === 0.8 ? 'Lenta' : 'Normal'}
          </button>

          <button
            className={`storybook-btn !py-2 !px-3 text-sm ${
              autoAdvance ? 'green' : ''
            }`}
            onClick={() => setAutoAdvance((a) => !a)}
            title="Avanzar automáticamente al siguiente capítulo"
          >
            {autoAdvance ? (
              <>
                <Play className="w-4 h-4" /> Auto-página: SÍ
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" /> Auto-página: NO
              </>
            )}
          </button>
        </div>
      </div>

      {/* Remotion Player */}
      <div className="rounded-2xl overflow-hidden border-[3px] border-[#2a2420] bg-[#162238]">
        <Player
          ref={playerRef}
          key={chapter.id}
          component={ChapterSceneComposition}
          inputProps={{ chapter }}
          durationInFrames={240}
          compositionWidth={760}
          compositionHeight={400}
          fps={30}
          controls
          loop
          autoPlay
          style={{ width: '100%', height: 'auto', aspectRatio: '760 / 400' }}
        />
      </div>

      {/* Mobile-friendly large text reader (visible on phones) */}
      <div className="sm:hidden p-4 rounded-2xl bg-[#faf5e8] border-2 border-[#2a2420] space-y-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-[#d94e3b] uppercase">
          <span>Capítulo {chapter.id} de {BOOK_CHAPTERS.length}</span>
          <span className="text-[#6e635b]">{chapter.page}</span>
        </div>
        <h3 className="text-xl font-bold m-0 text-[#2a2420]">{chapter.title}</h3>
        <p className="text-base font-bold text-[#2a2420] leading-relaxed m-0">
          {chapter.text}
        </p>
        {chapter.quote && (
          <div className="p-2.5 rounded-xl bg-[#fef3d1] border-l-4 border-[#f5b82e] text-sm font-bold italic text-[#4a3e35]">
            “{chapter.quote}”
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          className="storybook-btn"
          disabled={chapterIdx === 0}
          onClick={() => setChapterIdx((i) => Math.max(0, i - 1))}
        >
          <ChevronLeft className="w-5 h-5" /> Página anterior
        </button>

        <div className="font-bold text-base sm:text-lg text-center">
          Capítulo {chapterIdx + 1} / {BOOK_CHAPTERS.length}:{' '}
          <span className="text-[#d94e3b]">{chapter.title}</span>
        </div>

        <button
          className="storybook-btn blue"
          disabled={chapterIdx === BOOK_CHAPTERS.length - 1}
          onClick={() =>
            setChapterIdx((i) => Math.min(BOOK_CHAPTERS.length - 1, i + 1))
          }
        >
          Página siguiente <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Chapter Dots / Index */}
      <div className="flex flex-wrap gap-1.5 justify-center pt-1">
        {BOOK_CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => setChapterIdx(idx)}
            className={`px-2.5 py-1 rounded-xl border-2 border-[#2a2420] text-xs font-bold transition ${
              idx === chapterIdx
                ? 'bg-[#f5b82e] text-[#2a2420] scale-105'
                : 'bg-white hover:bg-[#faf5e8] text-[#6e635b]'
            }`}
            title={ch.title}
          >
            {idx + 1}. {ch.title}
          </button>
        ))}
      </div>
    </div>
  );
};
