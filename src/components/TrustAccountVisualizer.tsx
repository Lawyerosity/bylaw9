import { Building2, Clock, Shield, AlertCircle } from 'lucide-react';

type Requirement = {
  icon: typeof Building2;
  title: string;
  description: string;
  citation: string;
  color: string;
};

const requirements: Requirement[] = [
  {
    icon: Building2,
    title: 'Designated Financial Institution',
    description: 'Trust accounts must be at a chartered bank, provincial savings office, credit union, central, or registered trust corporation',
    citation: 'Section 7(1)',
    color: '#3B82F6'
  },
  {
    icon: Shield,
    title: 'Account Name Requirements',
    description: 'Must be kept in the name of the licensee or the firm, and designated as a trust account',
    citation: 'Section 7(1)',
    color: '#10B981'
  },
  {
    icon: Clock,
    title: 'Immediate Deposit Required',
    description: 'Money received in trust for a client must be immediately paid into the trust account',
    citation: 'Section 7(1)',
    color: '#F59E0B'
  }
];

export function TrustAccountVisualizer() {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Trust Account Requirements
        </h2>
        <p className="text-gray-600">
          Essential rules for setting up and maintaining trust accounts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {requirements.map((req) => {
          const Icon = req.icon;
          return (
            <div
              key={req.title}
              className="bg-white rounded-xl p-6 border-2 hover:shadow-lg transition-all duration-200"
              style={{ borderColor: `${req.color}30` }}
            >
              <div className="flex flex-col gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${req.color}20` }}
                >
                  <Icon size={24} style={{ color: req.color }} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{req.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">{req.description}</p>
                  <p className="text-xs italic" style={{ color: req.color }}>{req.citation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          What is "Money Received in Trust"?
        </h3>
        <p className="text-xs text-blue-800 italic mb-4">Section 7(2)</p>
        <p className="text-gray-700 mb-4 text-sm">
          A licensee receives money in trust for a client when they receive from a person:
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { letter: 'a', text: 'Money that belongs in whole or in part to a client' },
            { letter: 'b', text: 'Money to be held on behalf of a client' },
            { letter: 'c', text: 'Money to be held on a client\'s direction or order' },
            { letter: 'd', text: 'Money advanced on account of fees for services not yet rendered' },
            { letter: 'e', text: 'Money advanced on account of disbursements not yet made' }
          ].map((item) => (
            <div key={item.letter} className="flex items-start gap-3 bg-white/80 rounded-lg p-4">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">{item.letter}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Additional Money to be Paid into Trust
        </h3>
        <p className="text-xs text-purple-800 italic mb-4">Section 7(3)</p>
        <div className="space-y-3">
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Money that may by inadvertence have been drawn from a trust account in contravention of section 9
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  Money paid to a licensee that belongs in part to a client and in part to the licensee where it is not practical to split the payment
                </p>
                <p className="text-xs text-purple-800 italic">
                  Note: Section 7(4) requires licensees to withdraw their portion as soon as practical
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
            <Shield size={20} className="text-green-600" />
            Multiple Trust Accounts Permitted
          </h4>
          <p className="text-sm text-green-800 leading-relaxed mb-2">
            A licensee may keep one or more trust accounts.
          </p>
          <p className="text-xs text-green-800 italic">Section 7(5)</p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-2">Critical Warning</h4>
              <p className="text-red-800 text-sm leading-relaxed">
                Never commingle trust funds with personal or business operating funds. Mixing trust and non-trust money is a serious violation that can result in disciplinary action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
