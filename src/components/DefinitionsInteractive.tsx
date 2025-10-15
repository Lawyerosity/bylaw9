import { useState } from 'react';
import { BookOpen, Scale, Banknote, Building2, FileText, Users, Briefcase, Home, Key, Calendar, Link2, DollarSign } from 'lucide-react';

type Definition = {
  term: string;
  definition: string;
  icon: JSX.Element;
  color: string;
};

const definitions: Definition[] = [
  {
    term: "arm's length",
    definition: 'Has the same meaning given it in the Income Tax Act (Canada)',
    icon: <Scale size={16} />,
    color: '#3B82F6'
  },
  {
    term: 'cash',
    definition: 'Means current coin within the meaning of the Currency Act (Canada), notes intended for circulation in Canada issued by the Bank of Canada pursuant to the Bank of Canada Act and current coin or bank notes of countries other than Canada',
    icon: <Banknote size={16} />,
    color: '#10B981'
  },
  {
    term: 'charge',
    definition: 'Has the same meaning given it in the Land Registration Reform Act',
    icon: <Home size={16} />,
    color: '#F59E0B'
  },
  {
    term: 'client',
    definition: 'Means a person or group of persons from whom or on whose behalf a licensee receives money or other property',
    icon: <Users size={16} />,
    color: '#8B5CF6'
  },
  {
    term: 'firm of licensees',
    definition: 'Means (a) a partnership of licensees and all licensees employed by the partnership, (b) a professional corporation established for the purpose of practising law in Ontario and all licensees employed by the professional corporation, (c) a professional corporation established for the purpose of providing legal services in Ontario and all licensees employed by the professional corporation, or (d) a professional corporation established for the purpose of practising law and providing legal services in Ontario and all licensees employed by the professional corporation',
    icon: <Building2 size={16} />,
    color: '#EC4899'
  },
  {
    term: 'holiday',
    definition: 'Means (a) any Saturday or Sunday, (b) New Year\'s Day, and where New Year\'s Day falls on a Saturday or Sunday, the following Monday, (c) Family Day, (d) Good Friday, (e) Easter Monday, (f) Victoria Day, (g) Canada Day, and where Canada Day falls on a Saturday or Sunday, the following Monday, (h) Civic Holiday, (i) Labour Day, (j) Thanksgiving Day, (k) Remembrance Day, and where Remembrance Day falls on a Saturday or Sunday, the following Monday, (l) Christmas Day, and where Christmas Day falls on a Saturday or Sunday, the following Monday and Tuesday, and where Christmas Day falls on a Friday, the following Monday, (m) Boxing Day, and (n) any special holiday proclaimed by the Governor General or the Lieutenant Governor',
    icon: <Calendar size={16} />,
    color: '#06B6D4'
  },
  {
    term: 'lender',
    definition: 'Means a person who is making a loan that is secured or to be secured by a charge, including a charge to be held in trust directly or indirectly through a related person or corporation',
    icon: <DollarSign size={16} />,
    color: '#14B8A6'
  },
  {
    term: 'licensee',
    definition: 'Includes a firm of licensees',
    icon: <Key size={16} />,
    color: '#F97316'
  },
  {
    term: 'money',
    definition: 'Includes cash, cheques, drafts, credit card sales slips, post office orders and express and bank money orders',
    icon: <Banknote size={16} />,
    color: '#84CC16'
  },
  {
    term: 'related',
    definition: 'Has the same meaning given it in the Income Tax Act (Canada)',
    icon: <Link2 size={16} />,
    color: '#EF4444'
  },
  {
    term: 'Teranet',
    definition: 'Means Teranet Inc., a corporation incorporated under the Business Corporations Act, acting as agent for the Ministry of Consumer and Business Services',
    icon: <Building2 size={16} />,
    color: '#A855F7'
  }
];

export function DefinitionsInteractive() {
  const [selectedTerm, setSelectedTerm] = useState<Definition | null>(null);

  const handleTermClick = (def: Definition) => {
    setSelectedTerm(def);
  };

  const handleClose = () => {
    setSelectedTerm(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <BookOpen size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Interactive Definitions</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Click on any defined term below to see its full definition. These terms are foundational to understanding By-Law 9.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {definitions.map((def) => (
            <button
              key={def.term}
              onClick={() => handleTermClick(def)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-all hover:scale-105 shadow-sm"
              style={{ backgroundColor: def.color }}
            >
              <span className="flex items-center">{def.icon}</span>
              <span className="text-sm">{def.term}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTerm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                style={{ backgroundColor: selectedTerm.color }}
              >
                <span className="text-white">{selectedTerm.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 capitalize mb-1">
                  {selectedTerm.term}
                </h3>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: selectedTerm.color }}
                >
                  Defined Term - Section 1(1)
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {selectedTerm.definition}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
