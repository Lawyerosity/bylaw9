import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Video } from 'lucide-react';
import { SectionCard } from '../components/SectionCard';
import { supabase, type Part, type Section } from '../lib/supabase';

type PartDetailPageProps = {
  part: Part;
  onBack: () => void;
  onSectionSelect: (section: Section) => void;
  onVideoLibraryClick?: () => void;
};

export function PartDetailPage({ part, onBack, onSectionSelect, onVideoLibraryClick }: PartDetailPageProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasVideos, setHasVideos] = useState(false);

  useEffect(() => {
    loadSections();
  }, [part.id]);

  useEffect(() => {
    if (sections.length > 0) {
      checkForVideos();
    }
  }, [sections]);

  async function loadSections() {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('part_id', part.id)
        .order('order_index');

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error loading sections:', error);
    } finally {
      setLoading(false);
    }
  }

  async function checkForVideos() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('id, section_id')
        .eq('resource_type', 'video')
        .not('section_id', 'is', null);

      if (error) throw error;

      const sectionIds = sections.map(s => s.id);
      const hasPartVideos = data?.some(resource =>
        resource.section_id && sectionIds.includes(resource.section_id)
      ) || false;

      setHasVideos(hasPartVideos);
    } catch (error) {
      console.error('Error checking for videos:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to All Parts
        </button>

        <div
          className="rounded-3xl p-12 mb-12 relative overflow-hidden"
          style={{
            backgroundColor: `${part.color}10`,
            borderLeft: `6px solid ${part.color}`,
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${part.color}25` }}
              >
                <BookOpen size={28} style={{ color: part.color }} strokeWidth={2} />
              </div>
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: part.color }}
              >
                Part {part.part_number}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {part.title}
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
              {part.description}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sections in This Part
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-white rounded-xl animate-pulse border-2 border-gray-100"
                />
              ))}
            </div>
          ) : sections.length > 0 ? (
            <div className="space-y-4">
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  color={part.color}
                  onClick={() => onSectionSelect(section)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-gray-100">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">
                Content for this part is being prepared. Check back soon!
              </p>
            </div>
          )}
        </div>

        {hasVideos && (
          <div
            className="rounded-2xl p-10 mt-12"
            style={{ backgroundColor: `${part.color}08` }}
          >
            <div className="flex items-start gap-6">
              <div
                className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${part.color}20` }}
              >
                <Video size={32} style={{ color: part.color }} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Video Tutorial Series
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Watch our comprehensive video guides that break down Part {part.part_number}{' '}
                  into digestible lessons. Learn best practices, common mistakes to avoid,
                  and see real-world examples.
                </p>
                <button
                  onClick={onVideoLibraryClick}
                  className="font-semibold transition-all hover:gap-3 flex items-center gap-2"
                  style={{ color: part.color }}
                >
                  Browse Video Library
                  <ArrowLeft size={16} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
