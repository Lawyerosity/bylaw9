import { ArrowLeft, CheckCircle, ExternalLink, Zap, Shield, Clock, Database, Link as LinkIcon } from 'lucide-react';

type ClioPageProps = {
  onBack: () => void;
};

export function ClioPage({ onBack }: ClioPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                <Zap size={28} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">
                Recommended Partner
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Power Your Practice with Clio
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
              The perfect complement to TrustReq for complete practice management
            </p>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 mb-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <ExternalLink size={40} className="text-green-600" strokeWidth={2} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Exclusive 10% Off Clio
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            We're delighted to offer you a 10% discount on Clio,
            Canada's leading practice management software trusted by thousands of legal professionals.
          </p>

          <a
            href="https://refer.clio.com/RyanKeeney?utm_source=copy&utm_medium=RAF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Claim Your 10% Discount
            <ExternalLink size={20} />
          </a>

          <p className="text-sm text-gray-600 mt-4">
            Click to redeem your exclusive offer
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Use Both Clio and TrustReq?
          </h2>

          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TrustReq is designed as a specialized By-Law 9 compliance tool, not a replacement
              for your practice management software. Think of us as the perfect complement to Clio:
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-blue-900">Clio</strong> handles your day-to-day practice management,
                while <strong className="text-blue-900">TrustReq</strong> provides specialized By-Law 9 compliance
                features. Together, they create a comprehensive solution that covers everything your practice needs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Zap size={24} className="text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Clio</h3>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Comprehensive practice management platform for running your entire law firm
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Client intake and CRM</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Matter management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Time tracking and billing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Document management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Calendaring and task management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic trust accounting</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                  <Shield size={24} className="text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">TrustReq</h3>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Specialized By-Law 9 compliance and education platform
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Deep By-Law 9 expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Interactive compliance guides</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Trust accounting education</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Required forms and templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Video tutorials and resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Bookkeeper network access</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
            <div className="flex items-start gap-4">
              <LinkIcon size={32} className="text-blue-600 flex-shrink-0" strokeWidth={2} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Better Together
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Using Clio and TrustReq together gives you the best of both worlds:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Clio</strong> manages your daily operations, client relationships, and billing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">
                      <strong>TrustReq</strong> ensures you understand and maintain By-Law 9 compliance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">
                      Neither platform does everything the other does, making them perfectly complementary
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Clock size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Save Time
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Clio handles operations while TrustReq provides instant By-Law 9 answers and guidance
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Stay Compliant
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              TrustReq's specialized focus ensures you're always up to date with By-Law 9 requirements
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Database size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Complete Solution
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Together, they provide everything you need to run a compliant, efficient practice
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Get Started with Clio?
          </h3>
          <p className="text-blue-100 mb-6 leading-relaxed max-w-2xl mx-auto">
            Join thousands of Canadian lawyers who trust Clio for their practice management needs,
            and save 10% with our exclusive offer.
          </p>

          <a
            href="https://refer.clio.com/RyanKeeney?utm_source=copy&utm_medium=RAF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Claim Your 10% Discount Now
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
