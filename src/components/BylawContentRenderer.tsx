type BylawContentRendererProps = {
  htmlContent: string;
};

export function BylawContentRenderer({ htmlContent }: BylawContentRendererProps) {
  return (
    <div
      className="bylaw-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
