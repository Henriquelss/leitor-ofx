import { useState } from 'react';

interface HeaderProps {
  activeTab: 'processor' | 'history' | 'settings';
  onChangeTab: (tab: 'processor' | 'history' | 'settings') => void;
}

export default function Header({ activeTab, onChangeTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchTab = (tab: 'processor' | 'history' | 'settings') => {
    onChangeTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="relative flex justify-between items-center px-4 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full">
      
      <div className="text-xl font-medium tracking-tight cursor-pointer" onClick={() => switchTab('processor')}>
        <strong className="font-extrabold">OFX</strong> Ledger
      </div>

      <div className="flex md:hidden items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-orange-200"></div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 bg-slate-100 rounded-md">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <nav className={`${isMenuOpen ? 'flex flex-col items-start absolute top-20 left-4 right-4 bg-white p-6 shadow-2xl rounded-2xl z-50 border border-slate-100 animate-[fadeIn_0.2s_ease-out]' : 'hidden'} md:flex md:items-center md:static md:flex-row md:bg-transparent md:p-0 md:shadow-none md:border-none md:w-auto md:justify-center gap-6 md:gap-8 text-lg md:text-sm font-semibold text-slate-500`}>
        <button 
          onClick={() => switchTab('processor')}
          className={`pb-1 w-fit transition-colors ${activeTab === 'processor' ? 'text-slate-900 border-b-2 border-slate-900' : 'hover:text-slate-900'}`}
        >
          Processador
        </button>
        <button 
          onClick={() => switchTab('history')}
          className={`pb-1 w-fit transition-colors ${activeTab === 'history' ? 'text-slate-900 border-b-2 border-slate-900' : 'hover:text-slate-900'}`}
        >
          Histórico
        </button>
        <button 
          onClick={() => switchTab('settings')}
          className={`pb-1 w-fit transition-colors ${activeTab === 'settings' ? 'text-slate-900 border-b-2 border-slate-900' : 'hover:text-slate-900'}`}
        >
          Configurações
        </button>
      </nav>

      <div className="hidden md:flex gap-5 items-center">
        <button className="text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        </button>
        <button className="text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-orange-200"></div>
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-slate-900/20 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  );
}
