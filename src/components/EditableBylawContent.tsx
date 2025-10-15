import { useState, useEffect } from 'react';
import { BylawEditor } from './BylawEditor';
import { ClickableBylawContent } from './ClickableBylawContent';
import { BylawContentRenderer } from './BylawContentRenderer';
import { Edit } from 'lucide-react';

type EditableBylawContentProps = {
  content: string;
  currentSectionNumber?: string;
  onSectionClick?: (sectionNumber: string) => void;
  onSave: (newContent: string) => Promise<void>;
  color?: string;
};

export function EditableBylawContent({
  content,
  currentSectionNumber,
  onSectionClick,
  onSave,
  color = '#3b82f6'
}: EditableBylawContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [isHtmlContent, setIsHtmlContent] = useState(false);

  useEffect(() => {
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);
    setIsHtmlContent(hasHtmlTags);
    if (hasHtmlTags) {
      setHtmlContent(content);
    } else {
      setHtmlContent(convertContentToHtml(content));
    }
  }, [content]);

  const convertContentToHtml = (text: string): string => {
    const lines = text.split('\n');
    let html = '';

    lines.forEach(line => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        html += '<p><br></p>';
        return;
      }

      const indentLevel = line.length - line.trimStart().length;
      const isNumberedItem = /^\d+\./.test(trimmedLine);
      const isSubsectionLetter = /^\([a-z]\)/.test(trimmedLine);
      const isSubsectionRoman = /^\(i{1,3}|iv|vi{0,3}|ix|xi{0,2}\)/.test(trimmedLine);
      const isBoldHeading = /^[A-Z][a-zA-Z]+(\s[a-z]+)*$/.test(trimmedLine) && trimmedLine.length < 100 && !/^\d/.test(trimmedLine);
      const isSectionNumber = /^\d+(\.\d+)?\s*\(\d+\)/.test(trimmedLine) || (/^\d+(\.\d+)?\s/.test(trimmedLine) && trimmedLine.length < 100);

      if (isBoldHeading) {
        html += `<h3><strong>${trimmedLine}</strong></h3>`;
      } else if (isSectionNumber) {
        html += `<p>${trimmedLine}</p>`;
      } else if (isNumberedItem && indentLevel >= 2) {
        html += `<p class="indent-1">${trimmedLine}</p>`;
      } else if (isSubsectionLetter) {
        html += `<p class="indent-2">${trimmedLine}</p>`;
      } else if (isSubsectionRoman) {
        html += `<p class="indent-3">${trimmedLine}</p>`;
      } else if (indentLevel >= 2) {
        const level = Math.floor(indentLevel / 2);
        html += `<p class="indent-${Math.min(level, 3)}">${trimmedLine}</p>`;
      } else {
        html += `<p>${trimmedLine}</p>`;
      }
    });

    return html;
  };

  const handleEdit = () => {
    setEditedHtml(htmlContent);
    setIsEditing(true);
  };

  const handleSave = async (htmlContent: string) => {
    setIsSaving(true);
    try {
      await onSave(htmlContent);
      setHtmlContent(htmlContent);
      setIsHtmlContent(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <BylawEditor
        content={htmlContent}
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
          <BylawContentRenderer htmlContent={htmlContent} />
        ) : (
          <ClickableBylawContent
            content={content}
            currentSectionNumber={currentSectionNumber}
            onSectionClick={onSectionClick}
          />
        )}
      </div>
    </div>
  );
}
