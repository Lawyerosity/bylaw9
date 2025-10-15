import {
  BookOpen,
  FileText,
  Shield,
  Layers,
  Users,
  ArrowRight,
  AlertCircle,
  Banknote
} from 'lucide-react';
import type { Part } from '../lib/supabase';

const iconMap = {
  BookOpen,
  FileText,
  Shield,
  Layers,
  Users,
  AlertCircle,
  Banknote,
};

type PartCardProps = {
  part: Part;
  onClick: () => void;
};

export function PartCard({ part, onClick }: PartCardProps) {
  const Icon = iconMap[part.icon as keyof typeof iconMap] || BookOpen;

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white border-2 border-gray-100"
      style={{
        boxShadow: `0 4px 20px ${part.color}15`,
      }}
    >
      <div className="relative z-10">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${part.color}20` }}
        >
          <Icon
            size={32}
            style={{ color: part.color }}
            strokeWidth={2}
          />
        </div>

        <div className="mb-3">
          <span
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: part.color }}
          >
            Part {part.part_number}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
          {part.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">
          {part.description}
        </p>

        <div className="flex items-center text-sm font-semibold transition-all duration-300 group-hover:gap-3 gap-2" style={{ color: part.color }}>
          Explore Part {part.part_number}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ backgroundColor: part.color }}
      />
    </button>
  );
}
