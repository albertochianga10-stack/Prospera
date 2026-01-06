
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import FinanceView from './components/FinanceView';
import LearningView from './components/LearningView';
import HabitView from './components/HabitView';
import { Transaction, Lesson, Habit, UserProfile } from './types';
import { INITIAL_LESSONS } from './constants';
import { getFinancialAdvice } from './services/gemini';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [financeInitialState, setFinanceInitialState] = useState<{ open: boolean, type: 'receita' | 'despesa' } | null>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('prospera_user');
    return saved ? JSON.parse(saved) : { name: "Adalberto", level: 1, xp: 120, streak: 3 };
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('prospera_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('prospera_lessons');
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('prospera_habits');
    return saved ? JSON.parse(saved) : [
      { id: 'h1', title: 'Registrar gastos do dia', completedDays: [], frequency: 'diaria' },
      { id: 'h2', title: 'Ler 10 min de Finanças', completedDays: [], frequency: 'diaria' }
    ];
  });

  const [advice, setAdvice] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('prospera_user', JSON.stringify(user));
    localStorage.setItem('prospera_transactions', JSON.stringify(transactions));
    localStorage.setItem('prospera_lessons', JSON.stringify(lessons));
    localStorage.setItem('prospera_habits', JSON.stringify(habits));
  }, [user, transactions, lessons, habits]);

  const handleAddTransaction = (newT: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newT,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTransactions([transaction, ...transactions]);
    setFinanceInitialState(null); // Clear initial state if it was open
    
    // XP reward
    setUser(prev => ({ ...prev, xp: prev.xp + 10 }));
  };

  const handleCompleteLesson = (id: string) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, isCompleted: true } : l));
    setUser(prev => ({ 
      ...prev, 
      xp: prev.xp + 50, 
      level: Math.floor((prev.xp + 50) / 500) + 1 
    }));
  };

  const handleToggleHabit = (id: string, date: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const isCompleted = h.completedDays.includes(date);
        return {
          ...h,
          completedDays: isCompleted 
            ? h.completedDays.filter(d => d !== date)
            : [...h.completedDays, date]
        };
      }
      return h;
    }));
    setUser(prev => ({ ...prev, xp: prev.xp + 5 }));
  };

  const handleAddHabit = (title: string) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completedDays: [],
      frequency: 'diaria'
    };
    setHabits([newHabit, ...habits]);
  };

  const handleRequestAdvice = async () => {
    setLoadingAdvice(true);
    const tip = await getFinancialAdvice(transactions);
    setAdvice(tip);
    setLoadingAdvice(false);
  };

  const navigateToFinance = (initialType?: 'receita' | 'despesa') => {
    if (initialType) {
      setFinanceInitialState({ open: true, type: initialType });
    } else {
      setFinanceInitialState(null);
    }
    setActiveTab('finance');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView 
          user={user} 
          transactions={transactions} 
          onAdviceRequest={handleRequestAdvice}
          advice={advice}
          loadingAdvice={loadingAdvice}
          onNavigateToFinance={navigateToFinance}
        />;
      case 'finance':
        return (
          <FinanceView 
            transactions={transactions} 
            onAddTransaction={handleAddTransaction} 
            initialAddState={financeInitialState}
          />
        );
      case 'learn':
        return <LearningView lessons={lessons} onCompleteLesson={handleCompleteLesson} />;
      case 'habits':
        return <HabitView habits={habits} onToggleHabit={handleToggleHabit} onAddHabit={handleAddHabit} />;
      default:
        return <HomeView user={user} transactions={transactions} onAdviceRequest={handleRequestAdvice} advice={advice} loadingAdvice={loadingAdvice} onNavigateToFinance={navigateToFinance} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      setFinanceInitialState(null); // Reset when manually switching
    }}>
      {renderContent()}
    </Layout>
  );
};

export default App;
