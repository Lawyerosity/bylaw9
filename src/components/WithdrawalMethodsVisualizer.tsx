import { FileText, AlertCircle, XCircle, CheckCircle } from 'lucide-react';

export function WithdrawalMethodsVisualizer() {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Withdrawal Methods and Cheque Rules
        </h2>
        <p className="text-gray-600">
          How to withdraw money from trust accounts under By-Law 9
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Withdrawal Methods for Reimbursement and Fees
        </h3>
        <p className="text-xs text-blue-800 italic mb-4">Section 10</p>
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          When withdrawing money under Section 9(1) paragraph 2 (reimbursement) or paragraph 3 (fees), a licensee may only use these methods:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">(a)</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Cheque to Licensee</h4>
                <p className="text-sm text-gray-700">
                  By a cheque drawn in favour of the licensee
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">(b)</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Bank Transfer</h4>
                <p className="text-sm text-gray-700">
                  By a transfer to a bank account in the licensee's name that is not a trust account
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">(c)</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Electronic Transfer</h4>
                <p className="text-sm text-gray-700">
                  By electronic transfer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-8 border-2 border-red-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Cheque Restrictions
        </h3>
        <p className="text-xs text-red-800 italic mb-4">Section 11</p>
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          A cheque drawn on a trust account has the following restrictions:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <XCircle size={24} className="text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-red-900 mb-2">Prohibited: Cash or Bearer Cheques</h4>
                <p className="text-sm text-gray-700 mb-1">
                  A cheque shall not be made payable either to cash or to bearer
                </p>
                <p className="text-xs text-red-800 italic">Section 11(a)</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-red-900 mb-2">Non-Licensee Signing Restrictions</h4>
                <p className="text-sm text-gray-700 mb-1">
                  A cheque shall not be signed by a person who is not a licensee except in exceptional circumstances and when:
                </p>
                <ul className="text-xs text-gray-700 space-y-1 mt-2 ml-3">
                  <li>• The person has signing authority on the trust account, and</li>
                  <li>• Is bonded in an amount at least equal to the maximum balance during the immediately preceding fiscal year</li>
                </ul>
                <p className="text-xs text-red-800 italic mt-2">Section 11(b)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-green-900 mb-2">Compliant Examples</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Cheque payable to "Jane Smith Law Professional Corporation"</li>
                <li>• Electronic transfer to lawyer's operating account</li>
                <li>• Bank transfer to paralegal's business account</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
          <div className="flex items-start gap-3">
            <XCircle size={24} className="text-orange-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-orange-900 mb-2">Non-Compliant Examples</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Cheque made payable to "Cash"</li>
                <li>• Cheque made payable to "Bearer"</li>
                <li>• Cheque signed by unbonded assistant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
