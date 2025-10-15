type BylawContentProps = {
  content: string;
};

export function BylawContent({ content }: BylawContentProps) {
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
      const isSubsectionRoman = /^\b(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)\./.test(trimmedLine);
      const isBoldHeading = /^[A-Z][a-z]+(\s[a-z]+)*$/.test(trimmedLine) && trimmedLine.length < 60;
      const isSectionNumber = /^\d+\.\s/.test(trimmedLine) && trimmedLine.length < 100;

      let className = 'text-gray-700 leading-relaxed';
      let style: React.CSSProperties = {};

      if (isBoldHeading) {
        className = 'font-bold text-gray-900 mt-6 mb-3 text-lg';
      } else if (isSectionNumber) {
        className = 'font-semibold text-gray-900 mt-4 mb-2';
      } else if (isNumberedItem && indentLevel >= 2) {
        className = 'text-gray-700 leading-relaxed mb-4';
        style.paddingLeft = '2.5rem';
        style.textIndent = '-1.5rem';
      } else if (isSubsectionLetter) {
        className = 'text-gray-700 leading-relaxed mb-3';
        style.paddingLeft = '4rem';
        style.textIndent = '-1.5rem';
      } else if (isSubsectionRoman) {
        className = 'text-gray-700 leading-relaxed mb-3';
        style.paddingLeft = '5.5rem';
        style.textIndent = '-1.5rem';
      } else if (indentLevel >= 2) {
        style.paddingLeft = `${Math.min(indentLevel * 0.5, 4)}rem`;
      }

      elements.push(
        <p key={index} className={className} style={style}>
          {trimmedLine}
        </p>
      );
    });

    return elements;
  };

  return <div className="space-y-0.5">{formatContent(content)}</div>;
}
