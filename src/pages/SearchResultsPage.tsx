import { useState, useEffect } from 'react';
import { ArrowLeft, Search, FileText, Youtube, BookOpen, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Part, Section } from '../lib/supabase';

type SearchResultsPageProps = {
  query: string;
  onBack: () => void;
  onSectionSelect: (section: Section, part: Part) => void;
  onPartSelect: (part: Part) => void;
};

type VideoResult = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  section_number: string;
  section_title: string;
  type: 'video';
  relevance: number;
};

type SectionResult = {
  id: string;
  section_number: string;
  title: string;
  content: string | null;
  part_number: number;
  part_title: string;
  part: Part;
  section: Section;
  type: 'section';
  relevance: number;
};

type PartResult = {
  id: string;
  part_number: number;
  title: string;
  description: string | null;
  part: Part;
  type: 'part';
  relevance: number;
};

type SearchResult = VideoResult | SectionResult | PartResult;

export function SearchResultsPage({ query, onBack, onSectionSelect, onPartSelect }: SearchResultsPageProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performSearch();
  }, [query]);

  function tokenizeQuery(query: string): string[] {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being']);

    const tokens = query
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 1 && !stopWords.has(token));

    return tokens;
  }

  function calculateRelevance(text: string, searchTokens: string[], exactQuery: string): number {
    if (!text) return 0;

    const lowerText = text.toLowerCase();
    const lowerExactQuery = exactQuery.toLowerCase();
    let score = 0;

    if (lowerText.includes(lowerExactQuery)) {
      score += 100;
    }

    if (lowerText.startsWith(lowerExactQuery)) {
      score += 50;
    }

    for (const token of searchTokens) {
      if (lowerText.includes(token)) {
        score += 10;

        if (lowerText.startsWith(token)) {
          score += 5;
        }

        const wordBoundaryRegex = new RegExp(`\\b${token}\\b`, 'i');
        if (wordBoundaryRegex.test(text)) {
          score += 5;
        }
      }
    }

    const matchCount = searchTokens.filter(token => lowerText.includes(token)).length;
    const matchPercentage = matchCount / searchTokens.length;
    score += matchPercentage * 20;

    return score;
  }

  async function performSearch() {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const searchTerm = query.trim();
      const searchTokens = tokenizeQuery(searchTerm);
      const allResults: SearchResult[] = [];

      if (searchTokens.length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      const tokenConditions = searchTokens.map(token =>
        `title.ilike.%${token}%,description.ilike.%${token}%`
      ).join(',');

      const { data: videos, error: videosError } = await supabase
        .from('resources')
        .select(`
          id,
          title,
          url,
          description,
          section_id,
          sections!inner (
            section_number,
            title
          )
        `)
        .eq('resource_type', 'video')
        .or(tokenConditions);

      if (!videosError && videos) {
        videos.forEach((v: any) => {
          const titleRelevance = calculateRelevance(v.title, searchTokens, searchTerm);
          const descRelevance = calculateRelevance(v.description || '', searchTokens, searchTerm);
          const relevance = titleRelevance * 2 + descRelevance;

          if (relevance > 0) {
            allResults.push({
              id: v.id,
              title: v.title,
              url: v.url,
              description: v.description,
              section_number: v.sections.section_number,
              section_title: v.sections.title,
              type: 'video',
              relevance
            });
          }
        });
      }

      const sectionTokenConditions = searchTokens.map(token =>
        `title.ilike.%${token}%,content.ilike.%${token}%,section_number.ilike.%${token}%`
      ).join(',');

      const { data: sections, error: sectionsError } = await supabase
        .from('sections')
        .select(`
          id,
          section_number,
          title,
          content,
          part_id,
          parts!inner (
            id,
            part_number,
            title,
            description
          )
        `)
        .or(sectionTokenConditions);

      if (!sectionsError && sections) {
        sections.forEach((s: any) => {
          const part: Part = {
            id: s.parts.id,
            part_number: s.parts.part_number,
            title: s.parts.title,
            description: s.parts.description
          };

          const section: Section = {
            id: s.id,
            part_id: s.part_id,
            section_number: s.section_number,
            title: s.title,
            content: s.content
          };

          const titleRelevance = calculateRelevance(s.title, searchTokens, searchTerm);
          const contentRelevance = calculateRelevance(s.content || '', searchTokens, searchTerm);
          const sectionNumRelevance = calculateRelevance(s.section_number, searchTokens, searchTerm);
          const relevance = titleRelevance * 3 + contentRelevance + sectionNumRelevance * 2;

          if (relevance > 0) {
            allResults.push({
              id: s.id,
              section_number: s.section_number,
              title: s.title,
              content: s.content,
              part_number: s.parts.part_number,
              part_title: s.parts.title,
              part,
              section,
              type: 'section',
              relevance
            });
          }
        });
      }

      const partTokenConditions = searchTokens.map(token =>
        `title.ilike.%${token}%,description.ilike.%${token}%`
      ).join(',');

      const { data: parts, error: partsError } = await supabase
        .from('parts')
        .select('*')
        .or(partTokenConditions);

      if (!partsError && parts) {
        parts.forEach((p: Part) => {
          const titleRelevance = calculateRelevance(p.title, searchTokens, searchTerm);
          const descRelevance = calculateRelevance(p.description || '', searchTokens, searchTerm);
          const relevance = titleRelevance * 2 + descRelevance;

          if (relevance > 0) {
            allResults.push({
              id: p.id,
              part_number: p.part_number,
              title: p.title,
              description: p.description,
              part: p,
              type: 'part',
              relevance
            });
          }
        });
      }

      allResults.sort((a, b) => {
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance;
        }

        if (a.type === 'video' && b.type !== 'video') return -1;
        if (a.type !== 'video' && b.type === 'video') return 1;
        if (a.type === 'section' && b.type === 'part') return -1;
        if (a.type === 'part' && b.type === 'section') return 1;

        return 0;
      });

      const uniqueResults = allResults.filter((result, index, self) =>
        index === self.findIndex((r) => r.id === result.id && r.type === result.type)
      );

      setResults(uniqueResults);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  }

  const getYouTubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const tokens = tokenizeQuery(query);
    if (tokens.length === 0) return text;

    const regex = new RegExp(`(${tokens.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isMatch = tokens.some(token =>
        part.toLowerCase() === token.toLowerCase()
      );

      return isMatch
        ? <mark key={i} className="bg-yellow-200 font-semibold">{part}</mark>
        : part;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Search size={32} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Search Results
              </h1>
              <p className="text-xl text-gray-600 mt-1">
                {loading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-100">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No results found for "{query}"</p>
            <p className="text-gray-500 text-sm">Try different keywords or check your spelling</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => {
              if (result.type === 'video') {
                const youtubeId = getYouTubeId(result.url);
                const thumbnailUrl = youtubeId
                  ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  : null;

                return (
                  <a
                    key={result.id}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-red-300 hover:shadow-lg transition-all duration-200 flex gap-6 group"
                  >
                    {thumbnailUrl && (
                      <div className="flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={thumbnailUrl}
                          alt={result.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <Youtube size={20} className="text-red-600 flex-shrink-0 mt-1" />
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {highlightText(result.title, query)}
                        </h3>
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {highlightText(result.description, query)}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          Video
                        </span>
                        <span className="text-xs text-gray-500">
                          Section {result.section_number}: {result.section_title}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              }

              if (result.type === 'section') {
                return (
                  <button
                    key={result.id}
                    onClick={() => onSectionSelect(result.section, result.part)}
                    className="w-full bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <BookOpen size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          Section {result.section_number}: {highlightText(result.title, query)}
                        </h3>
                        {result.content && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {result.content.substring(0, 200)}...
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            By-Law Section
                          </span>
                          <span className="text-xs text-gray-500">
                            Part {result.part_number}: {result.part_title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              }

              if (result.type === 'part') {
                return (
                  <button
                    key={result.id}
                    onClick={() => onPartSelect(result.part)}
                    className="w-full bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <FileText size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          Part {result.part_number}: {highlightText(result.title, query)}
                        </h3>
                        {result.description && (
                          <p className="text-sm text-gray-600 mb-2">
                            {highlightText(result.description, query)}
                          </p>
                        )}
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                          By-Law Part
                        </span>
                      </div>
                    </div>
                  </button>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
