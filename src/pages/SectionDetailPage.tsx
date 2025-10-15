import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Youtube, ExternalLink, Lightbulb, AlertCircle, Play, Wrench } from 'lucide-react';
import { supabase, type Part, type Section, type Resource } from '../lib/supabase';
import { BylawContentRenderer } from '../components/BylawContentRenderer';
import { RecordKeepingVisualizer } from '../components/RecordKeepingVisualizer';
import { CashLimitsVisualizer } from '../components/CashLimitsVisualizer';
import { WithdrawalMethodsVisualizer } from '../components/WithdrawalMethodsVisualizer';
import { TrustAccountVisualizer } from '../components/TrustAccountVisualizer';
import { DefinitionsInteractive } from '../components/DefinitionsInteractive';

type SectionDetailPageProps = {
  section: Section;
  part: Part;
  onBack: () => void;
  onSectionClick?: (sectionNumber: string) => void;
  onPartClick?: (partNumber: number) => void;
};

export function SectionDetailPage({ section, part, onBack, onSectionClick, onPartClick }: SectionDetailPageProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentContent, setCurrentContent] = useState(section.content_html || section.content);
  const [currentSummary, setCurrentSummary] = useState(section.summary);
  const [currentSummaryHtml, setCurrentSummaryHtml] = useState(section.summary_html);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [nextSection, setNextSection] = useState<Section | null>(null);
  const [previousSection, setPreviousSection] = useState<Section | null>(null);
  const [nextPart, setNextPart] = useState<Part | null>(null);
  const [previousPart, setPreviousPart] = useState<Part | null>(null);

  useEffect(() => {
    setCurrentContent(section.content_html || section.content);
    setCurrentSummary(section.summary);
    setCurrentSummaryHtml(section.summary_html);
  }, [section.content, section.content_html, section.summary, section.summary_html]);

  useEffect(() => {
    loadResources();
    loadAllSections();
    loadNextPart();
    loadPreviousPart();
  }, [section.id, part.id]);

  async function loadResources() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('section_id', section.id);

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadAllSections() {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('part_id', part.id)
        .order('order_index');

      if (error) throw error;

      const sections = data || [];
      setAllSections(sections);

      const currentIndex = sections.findIndex(s => s.id === section.id);
      if (currentIndex !== -1 && currentIndex < sections.length - 1) {
        setNextSection(sections[currentIndex + 1]);
      } else {
        setNextSection(null);
      }
      if (currentIndex > 0) {
        setPreviousSection(sections[currentIndex - 1]);
      } else {
        setPreviousSection(null);
      }
    } catch (error) {
      console.error('Error loading sections:', error);
    }
  }

  async function loadNextPart() {
    try {
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .eq('part_number', part.part_number + 1)
        .maybeSingle();

      if (error) throw error;
      setNextPart(data);
    } catch (error) {
      console.error('Error loading next part:', error);
    }
  }

  async function loadPreviousPart() {
    try {
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .eq('part_number', part.part_number - 1)
        .maybeSingle();

      if (error) throw error;
      setPreviousPart(data);
    } catch (error) {
      console.error('Error loading previous part:', error);
    }
  }

  const handlePreviousPartClick = async () => {
    if (!previousPart) return;

    try {
      const { data: sections, error } = await supabase
        .from('sections')
        .select('section_number')
        .eq('part_id', previousPart.id)
        .order('order_index', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (sections && sections.length > 0) {
        onSectionClick?.(sections[0].section_number);
      } else {
        onPartClick?.(previousPart.part_number);
      }
    } catch (error) {
      console.error('Error navigating to previous part:', error);
      onPartClick?.(previousPart.part_number);
    }
  };

  const videos = resources.filter(r => r.resource_type === 'video');
  const tools = resources.filter(r => r.resource_type === 'tool');

  const isSection18 = section.section_number === '18' && part.part_number === 5;
  const isCashLimits = section.section_number === '3-6' && part.part_number === 3;
  const isWithdrawalMethods = section.section_number === '10-11' && part.part_number === 4;
  const isTrustAccount = section.section_number === '7' && part.part_number === 4;
  const isDefinitions = section.section_number === '1(1)' && part.part_number === 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Part {part.part_number}
        </button>

        <div className="mb-8">
          <span
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: part.color }}
          >
            Part {part.part_number} / Section {section.section_number}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
            {section.title}
          </h1>
        </div>

        {!loading && videos.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Video Resources</h2>
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-orange-200"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-red-500 flex items-center justify-center shadow-lg">
                    <Play size={32} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {video.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {video.description}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Youtube size={20} />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-gray-100 shadow-sm">
          <div
            className="flex items-center gap-3 mb-6 pb-6"
            style={{ borderBottom: `2px solid ${part.color}20` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${part.color}15` }}
            >
              <Lightbulb size={22} style={{ color: part.color }} strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Quick Summary</h2>
          </div>
          <BylawContentRenderer htmlContent={currentSummaryHtml || currentSummary} />
        </div>

        {isDefinitions && <DefinitionsInteractive />}
        {isSection18 && <RecordKeepingVisualizer />}
        {isCashLimits && <CashLimitsVisualizer />}
        {isWithdrawalMethods && <WithdrawalMethodsVisualizer />}
        {isTrustAccount && <TrustAccountVisualizer />}

        <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {(isSection18 || isCashLimits || isWithdrawalMethods || isTrustAccount || isDefinitions) ? 'Complete By-Law Text' : 'Full By-Law Text'}
          </h2>
          <BylawContentRenderer htmlContent={currentContent} />
        </div>

        {!loading && tools.length > 0 && (
          <div className="space-y-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                    <Wrench size={32} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-blue-100 mb-6 leading-relaxed text-lg">
                      {tool.description}
                    </p>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Learn More
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-between items-center">
          <div>
            {previousSection && (
              <button
                onClick={() => onSectionClick?.(previousSection.section_number)}
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white text-lg"
                style={{ backgroundColor: part.color }}
              >
                <ArrowLeft size={20} />
                Previous Section: {previousSection.section_number}
              </button>
            )}

            {!previousSection && previousPart && (
              <button
                onClick={handlePreviousPartClick}
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white text-lg"
                style={{ backgroundColor: previousPart.color }}
              >
                <ArrowLeft size={20} />
                Previous Part: Part {previousPart.part_number}
              </button>
            )}
          </div>

          <div>
            {nextSection && (
              <button
                onClick={() => onSectionClick?.(nextSection.section_number)}
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white text-lg"
                style={{ backgroundColor: part.color }}
              >
                Next Section: {nextSection.section_number}
                <ArrowRight size={20} />
              </button>
            )}

            {!nextSection && nextPart && (
              <button
                onClick={() => onPartClick?.(nextPart.part_number)}
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white text-lg"
                style={{ backgroundColor: nextPart.color }}
              >
                Next Part: Part {nextPart.part_number}
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
