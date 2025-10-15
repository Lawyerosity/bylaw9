import { Scale, Home, ExternalLink, Menu, X, Youtube, FileText, Search, Users, ChevronDown, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

type HeaderProps = {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onFAQClick: () => void;
  onContactClick: () => void;
  onVideoLibraryClick: () => void;
  onFormsClick: () => void;
  onBookkeepersClick: () => void;
  onClioClick: () => void;
  onSearch: (query: string) => void;
  showHome?: boolean;
};

export function Header({ onHomeClick, onAboutClick, onFAQClick, onContactClick, onVideoLibraryClick, onFormsClick, onBookkeepersClick, onClioClick, onSearch, showHome = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleHomeClick = () => {
    onHomeClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.resources-menu-container')) {
        setResourcesMenuOpen(false);
      }
    };

    if (resourcesMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [resourcesMenuOpen]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 group transition-all"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg group-hover:scale-105 transition-transform shadow-lg">
              <Scale size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                By-Law 9 Guide
              </h1>
            </div>
          </button>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
              />
            </div>
          </form>

          <nav className="hidden lg:flex items-center gap-1">
            {showHome && (
              <button
                onClick={handleHomeClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
              >
                <Home size={16} />
                <span>Home</span>
              </button>
            )}
            <div className="relative resources-menu-container">
              <button
                onClick={() => setResourcesMenuOpen(!resourcesMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
              >
                <span>Resources</span>
                <ChevronDown size={14} className={`transition-transform ${resourcesMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {resourcesMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onVideoLibraryClick();
                      setResourcesMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Youtube size={18} className="text-gray-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Videos</div>
                      <div className="text-xs text-gray-500">Tutorial library</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onFormsClick();
                      setResourcesMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <FileText size={18} className="text-gray-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Forms</div>
                      <div className="text-xs text-gray-500">Required documents</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onBookkeepersClick();
                      setResourcesMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Users size={18} className="text-gray-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Bookkeepers</div>
                      <div className="text-xs text-gray-500">Find experts</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onClioClick();
                      setResourcesMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Zap size={18} className="text-gray-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Clio (10% off)</div>
                      <div className="text-xs text-gray-500">Practice management</div>
                    </div>
                  </button>
                  <a
                    href="https://lso.ca/about-lso/legislation-rules/by-laws/by-law-9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setResourcesMenuOpen(false)}
                  >
                    <ExternalLink size={18} className="text-gray-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Official By-Law 9</div>
                      <div className="text-xs text-gray-500">LSO website</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                onAboutClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => {
                onFAQClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                onContactClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium ml-1"
            >
              Contact
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
            <form onSubmit={handleSearch} className="mb-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search By-Law 9..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                />
              </div>
            </form>
            {showHome && (
              <button
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            )}
            <button
              onClick={() => {
                onVideoLibraryClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
            >
              <Youtube size={18} />
              <span>Videos</span>
            </button>
            <button
              onClick={() => {
                onFormsClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
            >
              <FileText size={18} />
              <span>Forms</span>
            </button>
            <button
              onClick={() => {
                onBookkeepersClick();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
            >
              <Users size={18} />
              <span>Bookkeepers</span>
            </button>
            <button
              onClick={() => {
                onClioClick();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
            >
              <Zap size={18} />
              <span>Clio (10% off)</span>
            </button>
            <a
              href="https://lso.ca/about-lso/legislation-rules/by-laws/by-law-9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Official By-Law 9</span>
              <ExternalLink size={16} />
            </a>
            <button
              onClick={() => {
                onAboutClick();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
            >
              About
            </button>
            <button
              onClick={() => {
                onFAQClick();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-left"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                onContactClick();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium text-left"
            >
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
