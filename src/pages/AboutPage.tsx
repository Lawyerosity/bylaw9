import { ArrowLeft, ExternalLink, Heart, Palette, BookOpen, Users } from 'lucide-react';

type AboutPageProps = {
  onBack: () => void;
};

export function AboutPage({ onBack }: AboutPageProps) {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About This Project
          </h1>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Users size={20} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Important Disclaimer</h3>
                <p className="text-gray-700 leading-relaxed">
                  This website is <strong>not owned, operated, or affiliated with the Law Society of Ontario (LSO)</strong>.
                  This is an independent educational resource created to help legal professionals better understand By-Law 9.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Heart className="text-red-500" size={28} />
              Created by TrustReq
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              This website is owned and maintained by{' '}
              <a
                href="https://trustreq.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
              >
                TrustReq
                <ExternalLink size={16} />
              </a>
              , a company dedicated to helping law firms maintain compliance with the Law Society of Ontario's trust accounting requirements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-3">
              <Palette className="text-purple-500" size={28} />
              Why We Built This
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By-Law 9 is one of the most important documents for Ontario lawyers, yet it's traditionally presented
              as dense, difficult-to-navigate legal text. We believe this contributes to unintentional non-compliance
              among legal professionals who simply find it challenging to:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>Navigate through lengthy documents to find relevant sections</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>Understand complex requirements without getting lost in legal language</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Remember which records need to be maintained and when</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-1">•</span>
                <span>Stay motivated to regularly review compliance requirements</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-3">
              <BookOpen className="text-blue-500" size={28} />
              Our Approach
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We've taken By-Law 9 and reimagined it with modern design principles:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">Beautiful Design</h3>
                <p className="text-blue-800 text-sm">
                  Clean layouts, thoughtful typography, and generous white space make content easier to digest.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-2">Color-Coded Parts</h3>
                <p className="text-green-800 text-sm">
                  Each part of By-Law 9 has its own color theme, making navigation intuitive and memorable.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                <h3 className="font-bold text-purple-900 mb-2">Interactive Elements</h3>
                <p className="text-purple-800 text-sm">
                  Expandable cards, visualizers, and summaries help you explore at your own pace.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-2">Clear Organization</h3>
                <p className="text-orange-800 text-sm">
                  Logical structure with quick summaries and detailed views for every section.
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              By making By-Law 9 more accessible and engaging, we hope to reduce unintentional non-compliance
              and help lawyers feel confident they understand their obligations.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">Want to Learn More About TrustReq?</h3>
              <p className="text-gray-700 mb-4">
                TrustReq automates trust accounting compliance for law firms, making it effortless to maintain
                all required records and stay audit-ready.
              </p>
              <a
                href="https://trustreq.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Visit TrustReq.ca
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
