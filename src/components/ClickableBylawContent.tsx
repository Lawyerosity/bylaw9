import { ExternalLink } from 'lucide-react';

type ClickableBylawContentProps = {
  content: string;
  currentSectionNumber?: string;
  onSectionClick?: (sectionNumber: string) => void;
};

export function ClickableBylawContent({ content, currentSectionNumber, onSectionClick }: ClickableBylawContentProps) {
  // Parse which sections are on the current page
  const sectionsOnPage = new Set<string>();
  if (currentSectionNumber) {
    // Handle ranges like "2.1-2.4" or "3-6"
    const rangeMatch = currentSectionNumber.match(/^([\d\.]+)-([\d\.]+)$/);
    if (rangeMatch) {
      const [_, start, end] = rangeMatch;
      const startNum = parseFloat(start);
      const endNum = parseFloat(end);

      // Add all numbers in range
      if (start.includes('.')) {
        // Decimal range like "2.1-2.4"
        const prefix = start.split('.')[0];
        const startSuffix = parseFloat(start.split('.')[1]);
        const endSuffix = parseFloat(end.split('.')[1]);
        for (let i = startSuffix; i <= endSuffix; i++) {
          sectionsOnPage.add(`${prefix}.${i}`);
        }
      } else {
        // Integer range like "3-6"
        for (let i = startNum; i <= endNum; i++) {
          sectionsOnPage.add(i.toString());
        }
      }
    } else {
      // Single section
      sectionsOnPage.add(currentSectionNumber);
    }

    // Also parse subsections mentioned in content
    const subsectionPattern = /^([\d\.]+)\s*\((\d+)\)/gm;
    let match;
    while ((match = subsectionPattern.exec(content)) !== null) {
      sectionsOnPage.add(match[1]); // Add base section
      sectionsOnPage.add(`${match[1]}(${match[2]})`); // Add subsection
    }
  }
  const isReferenceOnCurrentPage = (refText: string): boolean => {
    // Clean up the reference
    const cleanRef = refText.trim().replace(/\s+/g, '');

    // Check if this exact reference is on the current page
    if (sectionsOnPage.has(cleanRef)) {
      return true;
    }

    // Check if it's a subsection reference like "(2)" by checking if any section on page has this subsection
    if (/^\(\d+\)$/.test(cleanRef)) {
      for (const section of sectionsOnPage) {
        if (section.includes(cleanRef)) {
          return true;
        }
      }
    }

    return false;
  };

  const makeTextClickable = (text: string): (string | JSX.Element)[] => {
    if (!onSectionClick) {
      return [text];
    }

    // Pattern to match "section(s)" or "subsection(s)" followed by section references
    // Updated to better capture lists like "10, 11 and 12"
    const sectionPattern = /(section|subsection)s?\s+([\d\.\(\)\s,]+(?:and|or)?\s*[\d\.\(\)\s,]*)/gi;

    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = sectionPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const prefix = match[1];
      const referencesText = match[2].trim();

      const elements: JSX.Element[] = [];
      elements.push(<span key={`prefix-${match.index}`}>{prefix}s </span>);

      // Parse individual section references (e.g., "2.3", "2.4 (1)", "(2)", "10", "11")
      const refPattern = /(\d+(?:\.\d+)*(?:\s*\(\d+\))?|\(\d+\))/g;

      let refMatch;
      let lastRefIndex = 0;
      let refIndex = 0;
      let currentBase = '';

      while ((refMatch = refPattern.exec(referencesText)) !== null) {
        // Add any separator text between references
        if (refMatch.index > lastRefIndex) {
          const separatorText = referencesText.substring(lastRefIndex, refMatch.index);
          if (separatorText.trim()) {
            elements.push(<span key={`sep-${match.index}-${refIndex}`}>{separatorText}</span>);
          }
        }

        const refText = refMatch[0].trim();
        let displayText = refText;
        let sectionRef = refText;

        // Check if this is a standalone subsection like "(2)"
        if (/^\(\d+\)$/.test(refText)) {
          // Use the current base section number
          sectionRef = currentBase + refText.replace(/[()]/g, match => match === '(' ? '(' : ')');
        } else {
          // Extract base section (e.g., "2.3" from "2.3 (1)" or just "2.3")
          const baseMatch = refText.match(/^(\d+(?:\.\d+)*)/);
          if (baseMatch) {
            currentBase = baseMatch[1];
          }
          sectionRef = refText.replace(/\s+/g, '');
        }

        // Only make it clickable if it's NOT on the current page
        if (isReferenceOnCurrentPage(sectionRef)) {
          // Non-clickable reference
          elements.push(
            <span key={`ref-${match.index}-${refIndex}`} className="font-semibold">
              {displayText}
            </span>
          );
        } else {
          // Clickable reference (opens in new tab)
          elements.push(
            <button
              key={`ref-${match.index}-${refIndex}`}
              onClick={() => onSectionClick(sectionRef)}
              className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 hover:decoration-blue-800 transition-colors inline-flex items-center gap-0.5"
              title={`View Section ${sectionRef}`}
            >
              {displayText}
              <ExternalLink size={12} className="inline" />
            </button>
          );
        }

        lastRefIndex = refMatch.index + refMatch[0].length;
        refIndex++;
      }

      // Add any remaining text after the last reference
      if (lastRefIndex < referencesText.length) {
        const remaining = referencesText.substring(lastRefIndex);
        if (remaining.trim()) {
          elements.push(<span key={`trail-${match.index}`}>{remaining}</span>);
        }
      }

      parts.push(
        <span key={`section-${match.index}`}>
          {elements}
        </span>
      );

      lastIndex = sectionPattern.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  const formatContent = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        elements.push(<div key={`space-${index}`} className="h-4" />);
        return;
      }

      const indentLevel = line.length - line.trimStart().length;
      const isNumberedItem = /^\d+\./.test(trimmedLine);
      const isSubsectionLetter = /^\([a-z]\)/.test(trimmedLine);
      const isSubsectionRoman = /^\(i{1,3}|iv|vi{0,3}|ix|xi{0,2}\)/.test(trimmedLine);
      // Updated to match headings without numbers (e.g., "Permission to be exempt from requirement")
      const isBoldHeading = /^[A-Z][a-zA-Z]+(\s[a-z]+)*$/.test(trimmedLine) && trimmedLine.length < 100 && !/^\d/.test(trimmedLine);
      const isSectionNumber = /^\d+(\.\d+)?\s*\(\d+\)/.test(trimmedLine) || (/^\d+(\.\d+)?\s/.test(trimmedLine) && trimmedLine.length < 100);

      let className = 'text-gray-700 leading-relaxed';
      let style: React.CSSProperties = {};

      if (isBoldHeading) {
        className = 'font-bold text-gray-900 mt-6 mb-3 text-base';
      } else if (isSectionNumber) {
        className = 'text-gray-700 leading-relaxed mt-6 mb-2';
      } else if (isNumberedItem && indentLevel >= 2) {
        className = 'text-gray-700 leading-relaxed mb-4';
        style.paddingLeft = '2.5rem';
        style.textIndent = '-1.5rem';
      } else if (isSubsectionLetter) {
        className = 'text-gray-700 leading-relaxed mb-3';
        style.paddingLeft = '2rem';
        style.textIndent = '-1.5rem';
      } else if (isSubsectionRoman) {
        className = 'text-gray-700 leading-relaxed mb-3';
        style.paddingLeft = '4rem';
        style.textIndent = '-1.5rem';
      } else if (indentLevel >= 2) {
        style.paddingLeft = `${Math.min(indentLevel * 0.5, 4)}rem`;
      }

      elements.push(
        <p key={index} className={className} style={style}>
          {makeTextClickable(trimmedLine)}
        </p>
      );
    });

    return elements;
  };

  return <div className="space-y-0.5">{formatContent(content)}</div>;
}
