import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

const suggestions = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Docker', 'Git', 'REST APIs', 'GraphQL', 'CSS', 'HTML', 'MongoDB', 'PostgreSQL'];

export function SkillsForm({ data, onChange }: Props) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const skill = input.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setInput('');
    }
  };

  const addSuggestion = (skill: string) => {
    if (!data.includes(skill)) onChange([...data, skill]);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
        />
        <Button onClick={addSkill} size="icon"><Plus className="w-4 h-4" /></Button>
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map(skill => (
            <Badge key={skill} variant="secondary" className="gap-1 pl-3 pr-1.5 py-1.5 text-sm">
              {skill}
              <button onClick={() => onChange(data.filter(s => s !== skill))} className="hover:text-destructive transition-colors">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div>
        <p className="text-sm text-muted-foreground mb-2">💡 Suggested skills:</p>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.filter(s => !data.includes(s)).map(skill => (
            <button key={skill} onClick={() => addSuggestion(skill)} className="text-xs px-2.5 py-1 rounded-full border border-dashed border-primary/30 text-primary hover:bg-accent transition-colors">
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
