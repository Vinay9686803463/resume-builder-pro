import { Button } from '@/components/ui/button';
import { FileText, Columns, Palette } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface Props {
  current: ResumeData['template'];
  onChange: (t: ResumeData['template']) => void;
}

const templates = [
  { id: 'classic' as const, label: 'Classic', icon: FileText, desc: 'Traditional & professional' },
  { id: 'modern' as const, label: 'Modern', icon: Columns, desc: 'Sidebar layout' },
  { id: 'creative' as const, label: 'Creative', icon: Palette, desc: 'Bold & colorful' },
];

export function TemplateSelector({ current, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {templates.map(t => {
        const Icon = t.icon;
        const active = current === t.id;
        return (
          <Button
            key={t.id}
            variant={active ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(t.id)}
            className="gap-1.5"
          >
            <Icon className="w-3.5 h-3.5" />
            {t.label}
          </Button>
        );
      })}
    </div>
  );
}
