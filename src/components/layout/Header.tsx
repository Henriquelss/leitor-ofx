interface HeaderProps {
  activeTab: 'processor' | 'history' | 'settings';
  onChangeTab: (tab: 'processor' | 'history' | 'settings') => void;
}

export default function Header({ activeTab, onChangeTab }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
      <div className="text-xl font-medium tracking-tight cursor-pointer" onClick={() => onChangeTab('processor')}>
        <strong className="font-extrabold">OFX</strong> Ledger
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
        <button 
          onClick={() => onChangeTab('processor')}
          className={`pb-1 transition-colors ${activeTab === 'processor' ? 'text-slate-900 border-b-2 border-slate-900' : 'hover:text-slate-900'}`}
        >
          Processador
        </button>
        <button 
          onClick={() => onChangeTab('history')}
          className={`pb-1 transition-colors ${activeTab === 'history' ? 'text-slate-900 border-b-2 border-slate-900' : 'hover:text-slate-900'}`}
        >
          Histórico
        </button>
        <button 
          onClick={() => onChangeTab('settings')}
          className={`pb-1 transition-colors ${activeTab === 'settings' ? 'text-slate-900 border-b-2 border-slate-900' : 'hover:text-slate-900'}`}
        >
          Configurações
        </button>
      </nav>
      <div className="flex gap-5 items-center">
        <button className="text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        </button>
        <button className="text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-orange-200"></div>
      </div>
    </header>
  );
}
