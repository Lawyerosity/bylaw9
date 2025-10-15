import { DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function CashLimitsVisualizer() {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cash Transaction Limits at a Glance
        </h2>
        <p className="text-gray-600">
          Quick reference for maximum cash amounts you can accept
        </p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-red-500 flex items-center justify-center">
            <DollarSign size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              $7,500 CAD Maximum
            </h3>
            <p className="text-red-900 font-semibold">
              Per client file
            </p>
            <p className="text-xs text-red-800 mt-1 italic">
              Section 4(1)
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <span className="font-semibold">Section 5 - Application:</span> This limit applies when you engage in or give instructions for: receiving or paying funds; purchasing or selling securities, real properties or business assets or entities; or transferring funds by any means.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center">
            <CheckCircle size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Exceptions Allowed
            </h3>
            <p className="text-xs text-green-800 mt-1 italic">
              Section 6
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-lg p-5">
            <p className="font-semibold text-green-900 mb-2">Public Body or Financial Institution</p>
            <p className="text-sm text-gray-700 mb-1">
              Cash received from government entities, banks, credit unions, or trust companies
            </p>
            <p className="text-xs text-green-800 italic">
              Section 6(a)
            </p>
          </div>

          <div className="bg-white/80 rounded-lg p-5">
            <p className="font-semibold text-green-900 mb-2">Law Enforcement</p>
            <p className="text-sm text-gray-700 mb-1">
              Cash received from peace officers, law enforcement agencies or other Crown agents acting officially
            </p>
            <p className="text-xs text-green-800 italic">
              Section 6(b)
            </p>
          </div>

          <div className="bg-white/80 rounded-lg p-5">
            <p className="font-semibold text-green-900 mb-2">Fines, Penalties or Bail</p>
            <p className="text-sm text-gray-700 mb-1">
              Cash received to pay a fine, penalty or bail
            </p>
            <p className="text-xs text-green-800 italic">
              Section 6(c)
            </p>
          </div>

          <div className="bg-white/80 rounded-lg p-5">
            <p className="font-semibold text-green-900 mb-2">Fees and Disbursements</p>
            <p className="text-sm text-gray-700 mb-1">
              Cash received for fees, disbursements or expenses, if any refund is also made in cash
            </p>
            <p className="text-xs text-green-800 italic">
              Section 6(d)
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle size={24} className="text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Compliant Examples</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Client pays $7,000 cash for legal fees in criminal defence matter</li>
                <li>• Police provide $3,500 cash seized from suspect for bail payment</li>
                <li>• Client pays $6,500 cash retainer for family law matter</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
          <div className="flex items-start gap-3 mb-3">
            <XCircle size={24} className="text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-900 mb-2">Non-Compliant Examples</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Individual client pays $8,000 cash to purchase investment property</li>
                <li>• Private business owner pays $5,000 + $3,000 cash on same corporate file</li>
                <li>• Family member pays $10,000 cash for estate administration services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
            <AlertTriangle size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Important Note</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              The $7,500 limit applies to <strong>aggregate amounts per client file</strong> (Section 4(1)).
              If you receive $5,000 in cash and later need to receive more on the same file,
              you can only accept up to $2,500 more in cash to stay compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
