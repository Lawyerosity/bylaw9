import { useState } from 'react';
import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react';

type FAQPageProps = {
  onBack: () => void;
  onNavigateToSection?: (partNumber: number, sectionNumber: string) => void;
};

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
  category: string;
};

export function FAQPage({ onBack, onNavigateToSection }: FAQPageProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const createSectionLink = (partNumber: number, sectionNumber: string, text: string) => {
    if (onNavigateToSection) {
      return (
        <button
          onClick={() => {
            onNavigateToSection(partNumber, sectionNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-blue-600 hover:text-blue-700 font-semibold underline"
        >
          {text}
        </button>
      );
    }
    return <span className="font-semibold">{text}</span>;
  };

  const faqs: FAQItem[] = [
    {
      category: 'About This Site',
      question: 'Is this the official Law Society of Ontario website?',
      answer: 'No, this is not an official LSO website. This is an independent educational resource created by TrustReq to make By-Law 9 more accessible. For official LSO information, please visit lso.ca.'
    },
    {
      category: 'About This Site',
      question: 'Can I rely on this website for legal compliance?',
      answer: 'While we strive for accuracy, this website is for educational purposes only. Always refer to the official By-Law 9 text on the Law Society of Ontario website for definitive guidance. When in doubt, consult with the LSO or a practice advisor.'
    },
    {
      category: 'About This Site',
      question: 'How often is this content updated?',
      answer: 'We monitor By-Law 9 for updates and amendments. However, there may be a delay between official changes and updates to this site. Always verify critical information with the official LSO By-Law 9 document.'
    },
    {
      category: 'Using This Site',
      question: 'How do I navigate to specific sections?',
      answer: 'From the home page, click on any of the 5 color-coded Parts to view its sections. Then click on individual sections to see detailed information, summaries, and the full By-Law text.'
    },
    {
      category: 'Using This Site',
      question: 'What are the colored parts on the home page?',
      answer: 'By-Law 9 is divided into 5 parts covering different topics: Interpretation, Handling of Money by Bankrupt Licensee, Cash Transactions, Trust Account, and Record Keeping Requirements. Each part has its own color theme to make navigation easier.'
    },
    {
      category: 'Using This Site',
      question: 'Can I print or save sections?',
      answer: 'You can use your browser\'s print function to print individual pages. However, we recommend bookmarking this site and referring to the official LSO By-Law 9 PDF for your official records.'
    },
    {
      category: 'Trust Accounting',
      question: 'What records do I need to maintain under Section 18?',
      answer: (
        <span>
          {createSectionLink(5, '18', 'Section 18')} requires 12 specific types of financial records, including trust receipts and disbursements books, client trust ledgers, monthly reconciliations, and more. Click the link to see an interactive breakdown of all requirements.
        </span>
      )
    },
    {
      category: 'Trust Accounting',
      question: 'How much cash can I accept from a client?',
      answer: (
        <span>
          Under {createSectionLink(3, '3-6', 'Section 4')}, licensees cannot accept more than $7,500 CAD in cash per client file. This applies to receiving/paying funds, buying/selling securities or property, and transferring funds. Certain exceptions apply.
        </span>
      )
    },
    {
      category: 'Trust Accounting',
      question: 'How quickly must I deposit trust funds?',
      answer: (
        <span>
          Under {createSectionLink(4, '7', 'Section 7')}, trust funds must be deposited immediately, or by the next banking day at the latest. {createSectionLink(1, '1(3)', 'Section 1(3)')} provides specific rules about when money is deemed to be held in trust.
        </span>
      )
    },
    {
      category: 'Trust Accounting',
      question: 'Can I withdraw money from my trust account?',
      answer: (
        <span>
          {createSectionLink(4, '9', 'Section 9')} specifies exactly when and how you can withdraw from trust accounts. You can only withdraw money properly required for payment to clients, reimbursement of expenses, payment of fees after billing, transfers between trust accounts, or money deposited by mistake.
        </span>
      )
    },
    {
      category: 'About TrustReq',
      question: 'What is TrustReq?',
      answer: 'TrustReq is a By-Law 9 compliance platform that helps law firms stay audit-ready and compliant, when used in conjunction with a day-to-day practice management software (like Clio). Visit trustreq.ca to learn more.'
    },
    {
      category: 'About TrustReq',
      question: 'How can TrustReq help with By-Law 9 compliance?',
      answer: 'TrustReq generates and maintains required records that other practice management apps miss, such as monthly reconciliations, physical cash management, By-Law 9 forms, virtual ID verification, and referral fee compliance. It ensures you\'re always compliant with By-Law 9 requirements, when used in conjunction with other standard practice management and bookkeeping software. It eliminates headaches stemming from complex record-keeping requirements and reduces the risk of non-compliance.'
    },
    {
      category: 'General Questions',
      question: 'I found an error or have a suggestion. How do I contact you?',
      answer: 'We appreciate your feedback! Please email us at hello@trustreq.ca with any corrections, suggestions, or questions.'
    },
    {
      category: 'General Questions',
      question: 'Is this website free to use?',
      answer: 'Yes, this educational resource is completely free. Our goal is to make By-Law 9 more accessible to all Ontario legal professionals.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

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

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about this site and By-Law 9
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle size={24} className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
            </div>

            <div className="space-y-3">
              {faqs
                .map((faq, index) => ({ faq, originalIndex: index }))
                .filter(({ faq }) => faq.category === category)
                .map(({ faq, originalIndex }) => {
                  const isExpanded = expandedIndex === originalIndex;

                  return (
                    <div
                      key={originalIndex}
                      className="w-full bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleExpand(originalIndex)}
                        className="w-full text-left flex items-start justify-between gap-4"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          size={20}
                          className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="text-gray-700 leading-relaxed border-t-2 border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 mt-8">
          <h3 className="font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-700 mb-4">
            If you couldn't find the answer you were looking for, we'd love to hear from you.
          </p>
          <a
            href="mailto:hello@trustreq.ca"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
