import { BookMarked, ChevronRight } from 'lucide-react';
import type { Section } from '../lib/supabase';

type SectionCardProps = {
  section: Section;
  color: string;
  onClick: () => void;
};

export function SectionCard({ section, color, onClick }: SectionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          <BookMarked size={24} style={{ color }} strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color }}
              >
                Section {section.section_number}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-gray-700 transition-colors">
                {section.title}
              </h3>
            </div>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-600"
            />
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {section.summary}
          </p>
        </div>
      </div>
    </button>
  );
}
