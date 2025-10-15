import { useState } from 'react';
import { ChevronDown, FileText, BookOpen, Users, ArrowRightLeft, DollarSign, Receipt, Scale, Box, Building, Zap, FileCheck } from 'lucide-react';

type Requirement = {
  id: number;
  icon: typeof FileText;
  title: string;
  description: string;
  color: string;
};

const requirements: Requirement[] = [
  {
    id: 1,
    icon: BookOpen,
    title: 'Trust Receipts Book',
    description: 'A book of original entry identifying each date on which money is received in trust for a client, the method by which money is received, the person from whom money is received, the amount of money received, the purpose for which money is received and the client for whom money is received in trust.',
    color: '#3B82F6'
  },
  {
    id: 2,
    icon: FileText,
    title: 'Trust Disbursements Book',
    description: 'A book of original entry showing all disbursements out of money held in trust for a client and identifying each date on which money is disbursed, the method by which money is disbursed, including the number or a similar identifier of any document used to disburse money, the person to whom money is disbursed, the amount of money which is disbursed, the purpose for which money is disbursed and the client on whose behalf money is disbursed.',
    color: '#10B981'
  },
  {
    id: 3,
    icon: Users,
    title: 'Client Trust Ledgers',
    description: 'A clients\' trust ledger showing separately for each client for whom money is received in trust all money received and disbursed and any unexpended balance.',
    color: '#F59E0B'
  },
  {
    id: 4,
    icon: ArrowRightLeft,
    title: 'Transfer Records',
    description: 'A record showing all transfers of money between clients\' trust ledger accounts and explaining the purpose for which each transfer is made.',
    color: '#EF4444'
  },
  {
    id: 5,
    icon: DollarSign,
    title: 'Non-Trust Receipts Book',
    description: 'A book of original entry showing all money received, other than money received in trust for a client, and identifying each date on which money is received, the method by which money is received, the amount of money which is received and the person from whom money is received.',
    color: '#8B5CF6'
  },
  {
    id: 6,
    icon: Receipt,
    title: 'Non-Trust Disbursements Book',
    description: 'A book of original entry showing all disbursements of money, other than money held in trust for a client, and identifying each date on which money is disbursed, the method by which money is disbursed, including the number or a similar identifier of any document used to disburse money, the amount of money which is disbursed and the person to whom money is disbursed.',
    color: '#EC4899'
  },
  {
    id: 7,
    icon: FileCheck,
    title: 'Fees Book / Billing Records',
    description: 'A fees book or a chronological file of copies of billings, showing all fees charged and other billings made to clients and the dates on which fees are charged and other billings are made to clients and identifying the clients charged and billed.',
    color: '#14B8A6'
  },
  {
    id: 8,
    icon: Scale,
    title: 'Monthly Trust Reconciliation',
    description: 'A record showing a comparison made monthly of the total of balances held in the trust account or accounts and the total of all unexpended balances of funds held in trust for clients as they appear from the financial records together with the reasons for any differences between the totals, and the following records to support the monthly comparisons: (i) A detailed listing made monthly showing the amount of money held in trust for each client and identifying each client for whom money is held in trust. (ii) A detailed reconciliation made monthly of each trust bank account.',
    color: '#F97316'
  },
  {
    id: 9,
    icon: Box,
    title: 'Property Records',
    description: 'A record showing all property, other than money, held in trust for clients, and describing each property and identifying the date on which the licensee took possession of each property, the person who had possession of each property immediately before the licensee took possession of the property, the value of each property, the client for whom each property is held in trust, the date on which possession of each property is given away and the person to whom possession of each property is given.',
    color: '#06B6D4'
  },
  {
    id: 10,
    icon: Building,
    title: 'Bank Statements & Documents',
    description: 'Bank statements or pass books, cashed cheques and detailed duplicate deposit slips for all trust and general accounts.',
    color: '#8B5CF6'
  },
  {
    id: 11,
    icon: Zap,
    title: 'Electronic Transfer Records',
    description: 'Signed electronic trust transfer requisitions and signed printed confirmations of electronic transfers of trust funds.',
    color: '#F59E0B'
  },
  {
    id: 12,
    icon: FileText,
    title: 'Teranet Records',
    description: 'Signed authorizations of withdrawals by Teranet and signed paper copies of confirmations of withdrawals by Teranet.',
    color: '#10B981'
  }
];

export function RecordKeepingVisualizer() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          12 Required Financial Records
        </h2>
        <p className="text-gray-600">
          Click any record type to see the detailed requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requirements.map((req) => {
          const Icon = req.icon;
          const isExpanded = expandedId === req.id;

          return (
            <button
              key={req.id}
              onClick={() => toggleExpand(req.id)}
              className={`relative overflow-hidden rounded-xl p-5 text-left transition-all duration-300 border-2 ${
                isExpanded
                  ? 'col-span-full shadow-xl scale-[1.02]'
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
              style={{
                backgroundColor: isExpanded ? `${req.color}05` : 'white',
                borderColor: isExpanded ? req.color : `${req.color}30`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${req.color}${isExpanded ? '30' : '15'}`,
                  }}
                >
                  <Icon
                    size={24}
                    style={{ color: req.color }}
                    strokeWidth={2}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-1"
                        style={{ color: req.color }}
                      >
                        Record #{req.id}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {req.title}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-gray-700 leading-relaxed border-t-2 pt-4" style={{ borderColor: `${req.color}20` }}>
                      {req.description}
                    </div>
                  </div>

                  {!isExpanded && (
                    <div className="text-xs text-gray-500 mt-2">
                      Click to view details
                    </div>
                  )}
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: req.color }}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <Scale size={20} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Pro Tip</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Most law firms struggle with maintaining all 12 record types manually.
              Use a combination of Clio and TrustReq to ensure you maintain all of these records,
              ensuring you're always audit-ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
