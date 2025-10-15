import { ArrowLeft, Mail, MessageCircle, Send } from 'lucide-react';

type ContactPageProps = {
  onBack: () => void;
};

export function ContactPage({ onBack }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-8 border-2 border-gray-100 shadow-lg">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <MessageCircle size={32} className="text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Mail size={24} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Email Us Directly
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Have a question, suggestion, or found an error? We're here to help.
                    Send us an email and we'll get back to you as soon as possible.
                  </p>
                  <a
                    href="mailto:hello@trustreq.ca"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Send size={18} />
                    hello@trustreq.ca
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-3 text-lg">
                  Report an Error
                </h3>
                <p className="text-green-800 text-sm leading-relaxed mb-3">
                  Notice something that doesn't match the official By-Law 9? Please let us know so we can fix it.
                </p>
                <p className="text-green-700 text-xs">
                  Include the Part and Section number in your email for faster processing.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-bold text-purple-900 mb-3 text-lg">
                  Suggest a Feature
                </h3>
                <p className="text-purple-800 text-sm leading-relaxed mb-3">
                  Have an idea to make this site even better? We're always looking for ways to improve.
                </p>
                <p className="text-purple-700 text-xs">
                  Tell us what would help you understand By-Law 9 more easily.
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-3 text-lg">
                  General Inquiries
                </h3>
                <p className="text-orange-800 text-sm leading-relaxed mb-3">
                  Questions about this site, TrustReq, or anything else? We're happy to chat.
                </p>
                <p className="text-orange-700 text-xs">
                  We typically respond within 24-48 hours.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3 text-lg">
                  Partnership Opportunities
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed mb-3">
                  Interested in collaborating or integrating with TrustReq? Let's talk.
                </p>
                <p className="text-blue-700 text-xs">
                  We're open to partnerships that help lawyers stay compliant.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">
                About Response Times
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We're a small team passionate about helping lawyers with compliance. While we aim to respond
                to all emails within 24-48 hours, please allow up to 3 business days during busy periods.
                For urgent compliance questions, please contact the Law Society of Ontario directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
