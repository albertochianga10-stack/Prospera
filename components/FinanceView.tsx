
import React, { useState, useEffect } from 'react';
import { Transaction, Category } from '../types';
import { CATEGORIES, CATEGORY_ICONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FinanceViewProps {
  transactions: Transaction[];
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
  initialAddState?: { open: boolean, type: 'receita' | 'despesa' } | null;
}

const FinanceView: React.FC<FinanceViewProps> = ({ transactions, onAddTransaction, initialAddState }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [type, setType] = useState<'receita' | 'despesa'>('despesa');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Outros');
  const [description, setDescription] = useState('');

  // Handle external triggers for the modal
  useEffect(() => {
    if (initialAddState?.open) {
      setType(initialAddState.type);
      setIsAdding(true);
    }
  }, [initialAddState]);

  const chartData = CATEGORIES.map(cat => {
    const total = transactions
      .filter(t => t.category === cat && t.type === 'despesa')
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat, value: total };
  }).filter(d => d.value > 0);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#475569'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString()
    });
    setAmount('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div className="p-4 space-y-6 pb-12">
      {/* Overview Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
        <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Despesas por Categoria</h3>
        <div className="h-48 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 text-sm italic">
              Nenhuma despesa para exibir no gráfico
            </div>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-800">Transações</h3>
          <button 
            onClick={() => {
              setType('despesa');
              setIsAdding(true);
            }}
            className="w-10 h-10 bg-indigo-600 rounded-full text-white flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-10 text-slate-300 italic text-sm">
              Sua lista de transações está vazia.
            </div>
          ) : (
            transactions.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-500`}>
                    {CATEGORY_ICONS[t.category]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.description}</p>
                    <p className="text-slate-400 text-[10px] font-medium">{new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${t.type === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'receita' ? '+' : '-'} {t.amount.toLocaleString('pt-AO')} Kz
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal / Overlay for adding */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm px-4 pb-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Nova Transação</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 p-2 active:scale-75 transition-all">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button 
                  type="button"
                  onClick={() => setType('despesa')}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${type === 'despesa' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-400'}`}
                >
                  Despesa
                </button>
                <button 
                  type="button"
                  onClick={() => setType('receita')}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${type === 'receita' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                >
                  Receita
                </button>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Quantia (AOA)</label>
                <input 
                  type="number" 
                  autoFocus
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00" 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-2xl font-bold focus:ring-2 focus:ring-indigo-600 placeholder:text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Descrição</label>
                <input 
                  type="text" 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Almoço, Saldo, etc" 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Categoria</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600 appearance-none outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                Salvar Transação
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceView;
