
import React from 'react';
import { UserProfile, Transaction } from '../types';

interface HomeViewProps {
  user: UserProfile;
  transactions: Transaction[];
  onAdviceRequest: () => void;
  advice: string;
  loadingAdvice: boolean;
  onNavigateToFinance: (initialType?: 'receita' | 'despesa') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  user, 
  transactions, 
  onAdviceRequest, 
  advice, 
  loadingAdvice,
  onNavigateToFinance
}) => {
  const balance = transactions.reduce((acc, curr) => 
    curr.type === 'receita' ? acc + curr.amount : acc - curr.amount, 0
  );

  return (
    <div className="p-4 space-y-6">
      {/* User Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <img src={`https://picsum.photos/seed/${user.name}/100`} className="w-12 h-12 rounded-full border-2 border-white/30" alt="Avatar" />
          <div>
            <h2 className="font-bold text-lg">Olá, {user.name}!</h2>
            <p className="text-white/80 text-sm">Nível {user.level} • {user.xp} XP</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-white/70 text-sm font-medium">Patrimônio Atual</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">{balance.toLocaleString('pt-AO')}</h3>
            <span className="text-white/80 font-medium">AOA</span>
          </div>
        </div>

        <div className="mt-6 bg-white/10 rounded-2xl p-3 flex justify-around text-center border border-white/10">
          <div>
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Fogo</p>
            <p className="font-bold">{user.streak} Dias</p>
          </div>
          <div className="w-[1px] bg-white/20 h-full"></div>
          <div>
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Ranking</p>
            <p className="font-bold">#12</p>
          </div>
          <div className="w-[1px] bg-white/20 h-full"></div>
          <div>
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Metas</p>
            <p className="font-bold">3/5</p>
          </div>
        </div>
      </div>

      {/* AI Advisor Card */}
      <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="font-bold text-slate-800">Dica do Mentor IA</h3>
          </div>
          <button 
            onClick={onAdviceRequest}
            disabled={loadingAdvice}
            className="text-indigo-600 text-sm font-bold active:scale-95 transition-transform disabled:opacity-50"
          >
            {loadingAdvice ? 'Pensando...' : 'Pedir Dica'}
          </button>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 italic text-slate-600 text-sm leading-relaxed min-h-[60px] flex items-center justify-center">
          {loadingAdvice ? (
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          ) : (
            advice || "Clique em 'Pedir Dica' para receber uma orientação personalizada."
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="font-bold text-slate-800 mb-4 px-1">Atalhos Rápidos</h3>
        <div className="grid grid-cols-2 gap-4">
          <QuickAction 
            color="bg-emerald-50" 
            icon="fas fa-plus" 
            iconColor="text-emerald-600" 
            label="Nova Receita" 
            onClick={() => onNavigateToFinance('receita')}
          />
          <QuickAction 
            color="bg-rose-50" 
            icon="fas fa-minus" 
            iconColor="text-rose-600" 
            label="Novo Gasto" 
            onClick={() => onNavigateToFinance('despesa')}
          />
        </div>
      </section>

      {/* Recent History */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-slate-800">Atividade Recente</h3>
          <button 
            onClick={() => onNavigateToFinance()}
            className="text-indigo-600 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
          >
            Ver tudo
          </button>
        </div>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center">
              <p className="text-slate-400 text-sm italic">Nenhuma transação registrada.</p>
            </div>
          ) : (
            transactions.slice(0, 3).map(t => (
              <div key={t.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'receita' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    <i className={t.type === 'receita' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.description}</p>
                    <p className="text-slate-400 text-[10px] font-medium">{t.category}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${t.type === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'receita' ? '+' : '-'} {t.amount.toLocaleString('pt-AO')} Kz
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const QuickAction = ({ color, icon, iconColor, label, onClick }: { color: string, icon: string, iconColor: string, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`${color} p-4 rounded-3xl flex flex-col items-center gap-2 border border-slate-100 active:scale-95 transition-all shadow-sm w-full`}
  >
    <div className={`w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center ${iconColor}`}>
      <i className={icon}></i>
    </div>
    <span className={`text-xs font-bold ${iconColor}`}>{label}</span>
  </button>
);

export default HomeView;
