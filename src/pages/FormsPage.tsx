import { ArrowLeft, FileText, ExternalLink, Youtube, Download } from 'lucide-react';

type FormsPageProps = {
  onBack: () => void;
  onSectionClick?: (sectionNumber: string) => void;
};

type Form = {
  id: string;
  number: string;
  title: string;
  description: string;
  purpose: string;
  videoUrl: string;
  videoTitle: string;
  sampleUrl: string;
  relatedSection: string;
  sectionNumbers: string[];
  color: string;
};

const forms: Form[] = [
  {
    id: 'form-9a',
    number: '9A',
    title: 'Electronic Trust Transfer Requisition',
    description: 'Required authorization form for electronic transfers from your trust account',
    purpose: 'Use this form to authorize electronic trust transfers (ETTs) in compliance with By-Law 9. This form ensures proper documentation and dual authorization for electronic fund movements.',
    videoUrl: 'https://www.youtube.com/watch?v=ItVRcGNk36E',
    videoTitle: 'How to generate a Form 9A on TrustReq',
    sampleUrl: 'https://lso.ca/lawyers/practice-supports-and-resources/topics/managing-money/bookkeeping/sample-form-9a-(1)',
    relatedSection: 'Section 12: Electronic Trust Transfers',
    sectionNumbers: ['12'],
    color: '#3B82F6'
  },
  {
    id: 'form-9b',
    number: '9B',
    title: 'Authorization of Withdrawal by Teranet',
    description: 'Authorization for automatic Teranet withdrawals from trust',
    purpose: 'Authorizes Teranet to automatically withdraw funds from your trust account for land registration services. This form establishes the proper authorization framework for recurring Teranet charges.',
    videoUrl: 'https://www.youtube.com/watch?v=ikLzQ7wi-Bc',
    videoTitle: 'How to generate a Form 9B on TrustReq',
    sampleUrl: 'https://lso.ca/lawyers/practice-supports-and-resources/topics/managing-money/bookkeeping/sample-form-9b',
    relatedSection: 'Section 15-17: Teranet Automatic Withdrawals',
    sectionNumbers: ['15-17'],
    color: '#10B981'
  },
  {
    id: 'form-9c',
    number: '9C',
    title: 'Electronic Trust Transfer Requisition: Closing Funds',
    description: 'Specialized form for real estate closing fund transfers',
    purpose: 'Required for electronic trust transfers of real estate closing funds. This form includes additional requirements specific to real estate transactions and ensures compliance with closing fund regulations.',
    videoUrl: 'https://www.youtube.com/watch?v=ml-9RNiV0WU',
    videoTitle: 'How to generate a Form 9C on TrustReq',
    sampleUrl: 'https://lso.ca/lawyers/practice-supports-and-resources/topics/managing-money/bookkeeping/sample-form-9c',
    relatedSection: 'Section 13: Real Estate Closing Funds',
    sectionNumbers: ['13'],
    color: '#8B5CF6'
  },
  {
    id: 'form-9d',
    number: '9D',
    title: 'Investment Authority',
    description: 'Authorization form for investing trust funds',
    purpose: 'Required when trust funds are to be invested (such as mortgage investments). This form documents the client authorization and investment details, ensuring proper authorization and transparency.',
    videoUrl: 'https://www.youtube.com/watch?v=PpLCDj5TvCI',
    videoTitle: 'How to generate a Form 9D on TrustReq',
    sampleUrl: 'https://lso.ca/lawyers/practice-supports-and-resources/topics/managing-money/bookkeeping/sample-form-9d',
    relatedSection: 'Section 20: Mortgage Trust Records',
    sectionNumbers: ['20'],
    color: '#F59E0B'
  },
  {
    id: 'form-9e',
    number: '9E',
    title: 'Report on the Investment',
    description: 'Investment reporting form for trust funds',
    purpose: 'Required when trust funds are invested (such as mortgage investments). This form documents the investment details, terms, and ensures proper reporting to clients and the Law Society.',
    videoUrl: 'https://www.youtube.com/watch?v=7P36l4cXMHY',
    videoTitle: 'How to generate a Form 9E on TrustReq',
    sampleUrl: 'https://lso.ca/lawyers/practice-supports-and-resources/topics/managing-money/bookkeeping/sample-form-9e',
    relatedSection: 'Section 20: Mortgage Trust Records',
    sectionNumbers: ['20'],
    color: '#EC4899'
  }
];

export function FormsPage({ onBack, onSectionClick }: FormsPageProps) {
  const handleSectionClick = async (sectionNumber: string) => {
    // Store the section number in localStorage with a unique key
    const navigationKey = `nav_${Date.now()}`;
    localStorage.setItem(navigationKey, sectionNumber);

    // Open new window with the navigation key as a hash
    const baseUrl = window.location.origin + window.location.pathname;
    window.open(`${baseUrl}#${navigationKey}`, '_blank');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <FileText size={32} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                By-Law 9 Forms
              </h1>
              <p className="text-xl text-gray-600 mt-1">
                Required forms for trust account compliance (Forms 9A-9E)
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
            <p className="text-gray-700 leading-relaxed">
              By-Law 9 requires specific forms for various trust account activities. Each form serves
              a distinct compliance purpose and must be completed accurately. Below you'll find detailed
              information, official sample forms from the Law Society, and video tutorials for each form.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {forms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-200"
              style={{ borderColor: `${form.color}30` }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: form.color }}
                >
                  <span className="text-3xl font-bold text-white">
                    {form.number}
                  </span>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Form {form.number}: {form.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{form.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Purpose & Use</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {form.purpose}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-xs font-semibold text-gray-700">
                      Related:
                    </span>
                    {form.sectionNumbers.map((sectionNum) => (
                      <button
                        key={sectionNum}
                        onClick={() => handleSectionClick(sectionNum)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center gap-1 group"
                        style={{ backgroundColor: form.color }}
                        title={`View Section ${sectionNum}`}
                      >
                        Section {sectionNum}
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <a
                      href={form.sampleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 p-4 rounded-lg border-2 border-blue-200 transition-all group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Download size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-blue-900 text-sm">
                          Official LSO Sample
                        </p>
                        <p className="text-xs text-blue-700">
                          Download from Law Society
                        </p>
                      </div>
                      <ExternalLink size={16} className="text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <a
                      href={form.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 p-4 rounded-lg border-2 border-red-200 transition-all group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                        <Youtube size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-red-900 text-sm">
                          Video Tutorial
                        </p>
                        <p className="text-xs text-red-700 truncate">
                          {form.videoTitle}
                        </p>
                      </div>
                      <ExternalLink size={16} className="text-red-600 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Form Compliance Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Complete all required fields accurately and legibly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Retain copies of all completed forms for your records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Ensure proper authorization signatures before submission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Keep forms with related client matter files</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Download size={20} className="text-orange-600" />
              Using TrustReq for Forms
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              TrustReq automatically generates all By-Law 9 forms with pre-populated data from
              your trust records, eliminating manual data entry and reducing errors.
            </p>
            <a
              href="https://trustreq.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              Learn more about TrustReq
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 border-2 border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>Important:</strong> The sample forms linked above are provided by the Law Society
            of Ontario for reference. Always verify you are using the most current version of each form.
            For official guidance, visit{' '}
            <a
              href="https://lso.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              lso.ca
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
