
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
          <h1 className="font-bold text-xl tracking-tight text-slate-800">Prospera</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <i className="fas fa-bell"></i>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t flex justify-around items-center h-20 px-4 z-20">
        <NavItem 
          icon="fas fa-home" 
          label="Início" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon="fas fa-wallet" 
          label="Finanças" 
          active={activeTab === 'finance'} 
          onClick={() => setActiveTab('finance')} 
        />
        <NavItem 
          icon="fas fa-book-open" 
          label="Aprender" 
          active={activeTab === 'learn'} 
          onClick={() => setActiveTab('learn')} 
        />
        <NavItem 
          icon="fas fa-check-double" 
          label="Hábitos" 
          active={activeTab === 'habits'} 
          onClick={() => setActiveTab('habits')} 
        />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all ${active ? 'text-indigo-600' : 'text-slate-400'}`}
  >
    <div className={`w-12 h-8 flex items-center justify-center rounded-2xl transition-all ${active ? 'bg-indigo-50' : 'bg-transparent'}`}>
      <i className={`${icon} text-lg`}></i>
    </div>
    <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
  </button>
);

export default Layout;
