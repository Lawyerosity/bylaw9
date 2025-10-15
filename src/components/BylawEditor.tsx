import { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, X } from 'lucide-react';

type BylawEditorProps = {
  content: string;
  onSave: (newContent: string) => Promise<void>;
  onCancel: () => void;
  color?: string;
};

export function BylawEditor({ content, onSave, onCancel, color = '#3b82f6' }: BylawEditorProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link'],
        ['clean']
      ],
      handlers: {
        link: function(value: boolean) {
          if (value) {
            const href = prompt('Enter the URL:');
            if (href) {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const range = quill.getSelection();
                if (range) {
                  if (range.length === 0) {
                    const linkText = prompt('Enter the link text:') || href;
                    quill.insertText(range.index, linkText, 'link', href);
                  } else {
                    quill.formatText(range.index, range.length, 'link', href);
                  }
                }
              }
            }
          } else {
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              if (range) {
                quill.formatText(range.index, range.length, 'link', false);
              }
            }
          }
        }
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'indent',
    'link',
    'class'
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedContent);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    onCancel();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-md rounded-t-lg" ref={toolbarRef}>
        <div className="flex items-center justify-between p-3 border-b-2 border-gray-300">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: color }}
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all duration-300"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-300 rounded-lg overflow-visible bylaw-content">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={editedContent}
          onChange={setEditedContent}
          modules={modules}
          formats={formats}
          className="bg-white"
          preserveWhitespace
        />
      </div>
    </div>
  );
}
