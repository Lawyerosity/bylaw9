import { ArrowLeft, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';

type BookkeepersPageProps = {
  onBack: () => void;
  onApplyClick: () => void;
};

export function BookkeepersPage({ onBack, onApplyClick }: BookkeepersPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
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
                <Users size={28} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">
                Professional Network
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recommended Bookkeepers
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
              Find trusted bookkeeping professionals with proven expertise in By-Law 9 compliance.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-lg mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
              <Users size={40} className="text-blue-600" strokeWidth={2} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We're building a curated directory of exceptional bookkeepers who specialize in
              By-Law 9 compliance. Our network will feature professionals with verified experience
              and outstanding client reviews.
            </p>

            <div className="bg-blue-50 rounded-xl p-8 mb-8 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star size={24} className="text-blue-600" />
                What Makes Our Network Special
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Verified By-Law 9 expertise and compliance knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Positive reviews from lawyer clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Proven track record in trust accounting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Commitment to professional excellence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-10 border-2 border-green-200">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Are You a Bookkeeper with By-Law 9 Experience?
            </h3>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We're actively seeking qualified bookkeepers to join our recommended network.
              If you have experience working with By-Law 9 and positive client reviews,
              we'd love to hear from you.
            </p>

            <button
              onClick={onApplyClick}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Apply to Join Our Network
              <ArrowRight size={20} />
            </button>

            <p className="text-sm text-gray-600 mt-4">
              Selected bookkeepers will be featured on our platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
