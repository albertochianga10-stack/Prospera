
export type Category = 'Alimentação' | 'Transporte' | 'Educação' | 'Lazer' | 'Poupança' | 'Habitação' | 'Investimento' | 'Outros';

export interface Transaction {
  id: string;
  type: 'receita' | 'despesa';
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface Habit {
  id: string;
  title: string;
  completedDays: string[]; // ISO dates
  frequency: 'diaria' | 'semanal';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'Finanças' | 'Carreira' | 'Soft Skills';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  isCompleted: boolean;
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  streak: number;
}
