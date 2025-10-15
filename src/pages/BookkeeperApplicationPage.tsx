import { useEffect } from 'react';
import { ArrowLeft, Mail, DollarSign, Shield } from 'lucide-react';

type BookkeeperApplicationPageProps = {
  onBack: () => void;
};

export function BookkeeperApplicationPage({ onBack }: BookkeeperApplicationPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Bookkeepers
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-10 text-white">
            <h1 className="text-4xl font-bold mb-3">
              Join Our Network
            </h1>
            <p className="text-xl text-blue-100">
              Apply to become a recommended By-Law 9 bookkeeper
            </p>
          </div>

          <div className="p-10">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield size={24} className="text-blue-600" />
                What We're Looking For
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Demonstrated experience with By-Law 9 compliance and trust accounting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Positive reviews and testimonials from lawyer clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Professional reputation and commitment to excellence</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign size={24} className="text-amber-600" />
                Advertising Fee Information
              </h3>
              <p className="text-gray-700 leading-relaxed">
                If selected to join our recommended bookkeepers network, there will be an advertising
                fee to maintain your listing. This typically involves a monthly or bi-weekly fee.
                Specific pricing details will be discussed during the review process.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Mail size={28} className="text-blue-600" />
                How to Apply
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                To apply to join our network, please send an email to <a href="mailto:hello@trustreq.ca" className="text-blue-600 hover:text-blue-700 font-semibold underline">hello@trustreq.ca</a> with the following information:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="font-semibold text-gray-900 mb-1">Business Information</h4>
                  <p className="text-gray-700 text-sm">Your business name, contact name, email, and phone number</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="font-semibold text-gray-900 mb-1">Experience</h4>
                  <p className="text-gray-700 text-sm">Years of By-Law 9 experience and a detailed description of your work with trust accounting and legal compliance</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="font-semibold text-gray-900 mb-1">Reviews & Testimonials</h4>
                  <p className="text-gray-700 text-sm">Links to your Google reviews, client testimonials, or other sources of positive feedback from lawyer clients</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="font-semibold text-gray-900 mb-1">Website (Optional)</h4>
                  <p className="text-gray-700 text-sm">Your business website, if available</p>
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href="mailto:hello@trustreq.ca"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Mail size={20} />
                  Email Your Application
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
