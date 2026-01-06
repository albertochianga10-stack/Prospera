
import React from 'react';
import { Category, Lesson } from './types';

export const CATEGORIES: Category[] = [
  'Alimentação', 'Transporte', 'Educação', 'Lazer', 'Poupança', 'Habitação', 'Investimento', 'Outros'
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'O Primeiro Passo: Orçamento',
    description: 'Aprenda a controlar cada Kwanza que entra e sai.',
    content: 'O orçamento é a base de toda riqueza. Sem saber para onde seu dinheiro vai, você não tem controle sobre seu futuro. Em Angola, onde a inflação é um desafio, o controle rigoroso é ainda mais vital.',
    category: 'Finanças',
    level: 'Iniciante',
    isCompleted: false
  },
  {
    id: '2',
    title: 'Reserva de Emergência',
    description: 'Como se proteger de imprevistos em Angola.',
    content: 'Sua reserva deve cobrir pelo menos 6 meses de seus gastos fixos. Comece pequeno, guardando 10% do que ganha.',
    category: 'Finanças',
    level: 'Iniciante',
    isCompleted: false
  },
  {
    id: '3',
    title: 'Investindo no Exterior',
    description: 'Diversificando além do Kwanza.',
    content: 'Aprenda como começar a investir em moedas fortes para proteger seu poder de compra a longo prazo.',
    category: 'Finanças',
    level: 'Avançado',
    isCompleted: false
  }
];

export const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Alimentação: <i className="fas fa-utensils"></i>,
  Transporte: <i className="fas fa-bus"></i>,
  Educação: <i className="fas fa-graduation-cap"></i>,
  Lazer: <i className="fas fa-gamepad"></i>,
  Poupança: <i className="fas fa-piggy-bank"></i>,
  Habitação: <i className="fas fa-home"></i>,
  Investimento: <i className="fas fa-chart-line"></i>,
  Outros: <i className="fas fa-ellipsis-h"></i>,
};
