import React, { useState } from 'react';
import { ApplicationSection } from '../../types/application';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Save, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';

export interface DraftEditorProps {
  section: ApplicationSection;
  onSaveContent: (sectionId: string, newContent: string) => void;
  onApplyAISuggestion: (sectionId: string, suggestion: string) => void;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({
  section,
  onSaveContent,
  onApplyAISuggestion,
}) => {
  const [content, setContent] = useState(section.content);
  const [isSaved, setIsSaved] = useState(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSave = () => {
    onSaveContent(section.id, content);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setContent(section.content);
  };

  return (
    <Card className="flex flex-col h-full space-y-4">
      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block">Application Prompt</span>
          <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
          <p className="text-xs text-slate-600 mt-1 italic leading-relaxed">{section.prompt}</p>
        </div>

        {section.wordCountLimit && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            wordCount > section.wordCountLimit ? 'bg-danger-50 text-danger-700 border-danger-200' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            {wordCount} / {section.wordCountLimit} words
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-[320px]">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Student Submission Draft</span>
          <span className="text-[11px] text-slate-400 font-normal">Markdown supported</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write or refine your statement draft here..."
          className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-y min-h-[280px]"
        />
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-slate-500 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Draft</span>
        </Button>

        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved locally</span>
            </span>
          )}
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-1.5 shadow-sm">
            <Save className="w-4 h-4" />
            <span>Save Application Draft</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
