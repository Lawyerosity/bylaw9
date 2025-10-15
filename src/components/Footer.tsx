import { Scale, Mail, ExternalLink, Home, Youtube, FileText, Users, Zap } from 'lucide-react';

type FooterProps = {
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onFAQClick?: () => void;
  onContactClick?: () => void;
  onVideoLibraryClick?: () => void;
  onFormsClick?: () => void;
  onBookkeepersClick?: () => void;
  onClioClick?: () => void;
};

export function Footer({
  onHomeClick,
  onAboutClick,
  onFAQClick,
  onContactClick,
  onVideoLibraryClick,
  onFormsClick,
  onBookkeepersClick,
  onClioClick
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleClick = (callback?: () => void) => {
    if (callback) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      callback();
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Scale size={24} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">By-Law 9 Guide</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Your comprehensive resource for understanding and complying with Ontario's
              Law Society By-Law 9 trust accounting requirements.
            </p>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Disclaimer:</strong> This website is not owned, operated, or affiliated with the Law Society of Ontario (LSO). This is an independent educational resource created to help legal professionals better understand By-Law 9.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm">
              {onHomeClick && (
                <li>
                  <button
                    onClick={() => handleClick(onHomeClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
              )}
              {onVideoLibraryClick && (
                <li>
                  <button
                    onClick={() => handleClick(onVideoLibraryClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Videos
                  </button>
                </li>
              )}
              {onFormsClick && (
                <li>
                  <button
                    onClick={() => handleClick(onFormsClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Forms
                  </button>
                </li>
              )}
              {onBookkeepersClick && (
                <li>
                  <button
                    onClick={() => handleClick(onBookkeepersClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Bookkeepers
                  </button>
                </li>
              )}
              {onClioClick && (
                <li>
                  <button
                    onClick={() => handleClick(onClioClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Clio
                  </button>
                </li>
              )}
              {onAboutClick && (
                <li>
                  <button
                    onClick={() => handleClick(onAboutClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    About
                  </button>
                </li>
              )}
              {onFAQClick && (
                <li>
                  <button
                    onClick={() => handleClick(onFAQClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
              )}
              {onContactClick && (
                <li>
                  <button
                    onClick={() => handleClick(onContactClick)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">External Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://lso.ca/about-lso/legislation-rules/by-laws/by-law-9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Official By-Law 9
                  <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://lso.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Law Society of Ontario
                  <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://trustreq.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  TrustReq Platform
                  <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Contact & Support</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@trustreq.ca"
                className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
              >
                <Mail size={16} />
                hello@trustreq.ca
              </a>
              <p className="text-sm text-gray-400 leading-relaxed">
                Questions about By-Law 9 compliance or TrustReq?
                We're here to help.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} TrustReq. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 text-center md:text-right">
              This guide is for educational purposes. Always consult the Law Society of Ontario
              for official guidance and verify current regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
