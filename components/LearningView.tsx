
import React from 'react';
import { Lesson } from '../types';

interface LearningViewProps {
  lessons: Lesson[];
  onCompleteLesson: (id: string) => void;
}

const LearningView: React.FC<LearningViewProps> = ({ lessons, onCompleteLesson }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Caminho da Riqueza</h2>
          <p className="text-white/80 text-xs mb-4">Sua jornada educativa diária</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-1000" 
                style={{ width: `${(lessons.filter(l => l.isCompleted).length / lessons.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold">{Math.round((lessons.filter(l => l.isCompleted).length / lessons.length) * 100)}%</span>
          </div>
        </div>
        <i className="fas fa-graduation-cap absolute -right-4 -bottom-4 text-8xl text-white/10 rotate-12"></i>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 px-1">Trilhas Progressivas</h3>
        {lessons.map(lesson => (
          <div 
            key={lesson.id} 
            className={`bg-white rounded-3xl p-5 shadow-sm border border-slate-100 transition-all ${lesson.isCompleted ? 'opacity-60 grayscale' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${
                  lesson.level === 'Iniciante' ? 'bg-green-50 text-green-600' :
                  lesson.level === 'Intermediário' ? 'bg-amber-50 text-amber-600' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  {lesson.level}
                </span>
                <h4 className="font-bold text-slate-800">{lesson.title}</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <i className={lesson.category === 'Finanças' ? 'fas fa-coins' : 'fas fa-briefcase'}></i>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              {lesson.description}
            </p>
            
            <details className="group">
              <summary className="list-none flex items-center gap-2 text-indigo-600 font-bold text-xs cursor-pointer select-none">
                <i className="fas fa-chevron-right group-open:rotate-90 transition-transform"></i>
                Ver Microlição
              </summary>
              <div className="mt-4 p-4 bg-indigo-50/50 rounded-2xl text-slate-700 text-sm leading-relaxed border-l-4 border-indigo-600 animate-in fade-in zoom-in duration-300">
                {lesson.content}
                {!lesson.isCompleted && (
                  <button 
                    onClick={() => onCompleteLesson(lesson.id)}
                    className="mt-4 w-full bg-white border-2 border-indigo-600 text-indigo-600 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                  >
                    Marcar como Concluído (+50 XP)
                  </button>
                )}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningView;
