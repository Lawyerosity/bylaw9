import { useState, useEffect } from 'react';
import { ArrowLeft, Youtube, Play, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

type VideoLibraryPageProps = {
  onBack: () => void;
  defaultCategory?: string;
};

type VideoResource = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  section_number: string;
  section_title: string;
  part_number: number;
  part_title: string;
};

export function VideoLibraryPage({ onBack, defaultCategory }: VideoLibraryPageProps) {
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory || 'all');

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select(`
          id,
          title,
          url,
          description,
          section_id,
          sections!inner (
            section_number,
            title,
            part_id,
            parts!inner (
              part_number,
              title
            )
          )
        `)
        .eq('resource_type', 'video');

      if (error) throw error;

      const formattedVideos = data?.map((v: any) => ({
        id: v.id,
        title: v.title,
        url: v.url,
        description: v.description,
        section_number: v.sections.section_number,
        section_title: v.sections.title,
        part_number: v.sections.parts.part_number,
        part_title: v.sections.parts.title
      })) || [];

      setVideos(formattedVideos);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }

  const getYouTubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const isFormVideo = (title: string) => /Form 9[A-E]/i.test(title);
  const isCashVideo = (title: string) => /cash/i.test(title);
  const isReferralVideo = (title: string) => /referral/i.test(title);
  const isValuablePropertyVideo = (title: string) => /valuable property/i.test(title);

  const categorizeVideo = (video: VideoResource): string => {
    if (isFormVideo(video.title)) return 'By-Law 9 Forms (9A-9E)';
    if (isCashVideo(video.title)) return 'Cash Transactions';
    if (isReferralVideo(video.title)) return 'Referral Fees';
    if (isValuablePropertyVideo(video.title)) return 'Valuable Property';
    return 'Other';
  };

  const groupedVideos: Record<string, VideoResource[]> = {};

  videos.forEach((video) => {
    const category = categorizeVideo(video);
    if (!groupedVideos[category]) {
      groupedVideos[category] = [];
    }
    groupedVideos[category].push(video);
  });

  if (groupedVideos['By-Law 9 Forms (9A-9E)']) {
    groupedVideos['By-Law 9 Forms (9A-9E)'].sort((a, b) => {
      const getFormLetter = (title: string) => {
        const match = title.match(/Form 9([A-E])/i);
        return match ? match[1].toUpperCase() : 'Z';
      };
      return getFormLetter(a.title).localeCompare(getFormLetter(b.title));
    });
  }

  const categories = ['all', ...Object.keys(groupedVideos).sort()];

  const filteredVideos = Object.entries(groupedVideos).reduce((acc, [category, categoryVideos]) => {
    if (selectedCategory !== 'all' && category !== selectedCategory) {
      return acc;
    }

    const filtered = categoryVideos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length > 0) {
      acc[category] = filtered;
    }

    return acc;
  }, {} as Record<string, VideoResource[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <Youtube size={32} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Video Library
              </h1>
              <p className="text-xl text-gray-600 mt-1">
                Step-by-step tutorials for By-Law 9 compliance
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Videos' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading videos...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(filteredVideos).map(([category, categoryVideos]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryVideos.map((video) => {
                    const youtubeId = getYouTubeId(video.url);
                    const thumbnailUrl = youtubeId
                      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                      : null;

                    return (
                      <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl overflow-hidden border-2 border-gray-100 hover:border-red-300 hover:shadow-xl transition-all duration-200 group"
                      >
                        <div className="relative aspect-video bg-gray-200">
                          {thumbnailUrl && (
                            <img
                              src={thumbnailUrl}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-700 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
                              <Play size={28} className="text-white ml-1" fill="white" />
                            </div>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start gap-2 mb-2">
                            <Youtube size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <h3 className="font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors">
                              {video.title}
                            </h3>
                          </div>

                          {video.description && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                              {video.description}
                            </p>
                          )}

                          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              Section {video.section_number}
                            </span>
                            <span className="text-xs text-gray-500 truncate">
                              {video.section_title}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && Object.keys(filteredVideos).length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-100">
            <Youtube size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No videos found matching your search.</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
              <Youtube size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">About These Videos</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                All videos are created by TrustReq to help law firms and legal professionals
                understand and comply with By-Law 9 requirements. Each tutorial demonstrates
                practical implementation of trust accounting rules using modern compliance tools.
              </p>
              <a
                href="https://trustreq.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Learn more about TrustReq
                <ArrowLeft size={16} className="rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
