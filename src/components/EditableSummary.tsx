import { useState, useEffect } from 'react';
import { BylawEditor } from './BylawEditor';
import { BylawContentRenderer } from './BylawContentRenderer';
import { Edit } from 'lucide-react';

type EditableSummaryProps = {
  summary: string;
  summaryHtml?: string | null;
  onSave: (newSummaryHtml: string) => Promise<void>;
  color?: string;
};

export function EditableSummary({
  summary,
  summaryHtml,
  onSave,
  color = '#3b82f6'
}: EditableSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayContent, setDisplayContent] = useState('');
  const [isHtmlContent, setIsHtmlContent] = useState(false);

  useEffect(() => {
    if (summaryHtml) {
      setDisplayContent(summaryHtml);
      setIsHtmlContent(true);
    } else {
      const htmlContent = convertSummaryToHtml(summary);
      setDisplayContent(htmlContent);
      setIsHtmlContent(false);
    }
  }, [summary, summaryHtml]);

  const convertSummaryToHtml = (text: string): string => {
    if (!text) return '<p></p>';
    const paragraphs = text.split('\n\n');
    return paragraphs
      .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (htmlContent: string) => {
    try {
      await onSave(htmlContent);
      setDisplayContent(htmlContent);
      setIsHtmlContent(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving summary:', error);
      throw error;
    }
  };

  if (isEditing) {
    return (
      <BylawEditor
        content={displayContent}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        color={color}
      />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleEdit}
        className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md text-white z-10"
        style={{ backgroundColor: color }}
      >
        <Edit size={18} />
        Edit
      </button>
      <div className="pr-24">
        {isHtmlContent ? (
          <BylawContentRenderer htmlContent={displayContent} />
        ) : (
          <div className="text-lg text-gray-700 leading-relaxed">
            <BylawContentRenderer htmlContent={displayContent} />
          </div>
        )}
      </div>
    </div>
  );
}
