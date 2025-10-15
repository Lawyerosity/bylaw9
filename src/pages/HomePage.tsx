import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { PartCard } from '../components/PartCard';
import { supabase, type Part } from '../lib/supabase';

type HomePageProps = {
  onPartSelect: (part: Part) => void;
};

export function HomePage({ onPartSelect }: HomePageProps) {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParts();
  }, []);

  async function loadParts() {
    try {
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setParts(data || []);
    } catch (error) {
      console.error('Error loading parts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={16} />
            Interactive Learning Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master By-Law 9
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Trust Accounting Made Clear
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Navigate Ontario's most critical legal accounting requirements through
            interactive cards, visual learning, and practical examples. Designed
            specifically for Ontario lawyers who want to ensure compliance and avoid headaches.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-96 bg-white rounded-2xl animate-pulse border-2 border-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onClick={() => onPartSelect(part)}
              />
            ))}
          </div>
        )}

        <div className="mt-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Simplify Your Practice with TrustReq
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Built by lawyers, for lawyers. TrustReq automates By-Law 9 compliance,
            so you can focus on serving clients instead of wrestling with trust accounting.
          </p>
          <a
            href="https://trustreq.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Learn More About TrustReq
          </a>
        </div>
      </div>
    </div>
  );
}
