
import React, { useState } from 'react';
import { Habit } from '../types';

interface HabitViewProps {
  habits: Habit[];
  onToggleHabit: (id: string, date: string) => void;
  onAddHabit: (title: string) => void;
}

const HabitView: React.FC<HabitViewProps> = ({ habits, onToggleHabit, onAddHabit }) => {
  const [newHabit, setNewHabit] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    onAddHabit(newHabit);
    setNewHabit('');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Novo Hábito</h3>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input 
            type="text" 
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Ex: Ler 10 min sobre finanças"
            className="flex-1 bg-slate-50 border-0 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-600"
          />
          <button className="w-12 h-12 bg-indigo-600 rounded-2xl text-white flex items-center justify-center shadow-lg active:scale-90 transition-all">
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 px-1">Missões Diárias</h3>
        {habits.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
            <i className="fas fa-tasks text-3xl mb-3 opacity-20"></i>
            <p className="text-sm italic">Crie hábitos para fortalecer sua disciplina.</p>
          </div>
        ) : (
          habits.map(habit => {
            const isCompletedToday = habit.completedDays.includes(today);
            return (
              <div key={habit.id} className="bg-white p-4 rounded-3xl flex items-center justify-between border border-slate-100 shadow-sm transition-all hover:border-indigo-100">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onToggleHabit(habit.id, today)}
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                      isCompletedToday 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'border-slate-100 bg-slate-50 text-slate-200'
                    }`}
                  >
                    <i className={`fas ${isCompletedToday ? 'fa-check' : 'fa-circle'} text-lg`}></i>
                  </button>
                  <div>
                    <h4 className={`font-bold text-sm ${isCompletedToday ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {habit.title}
                    </h4>
                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                      {habit.completedDays.length} Dias Concluídos
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-6 rounded-full ${i < habit.completedDays.length ? 'bg-indigo-400' : 'bg-slate-100'}`}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Motivation Tip */}
      <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100 flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-white text-xl flex-shrink-0">
          <i className="fas fa-bolt"></i>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-amber-800 text-sm">Poder da Consistência</h4>
          <p className="text-amber-700/70 text-xs leading-relaxed">
            Economizar apenas 100 Kz por dia consistentemente gera mais riqueza que 50.000 Kz guardados uma única vez no ano. A disciplina é sua maior aliada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HabitView;
