import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { Project } from '@/types/resume';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsForm({ data, onChange }: Props) {
  const add = () => onChange([...data, { id: crypto.randomUUID(), name: '', description: '', technologies: '', link: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: keyof Project, value: string) => onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div className="space-y-5 animate-fade-in">
      {data.map((proj, i) => (
        <div key={proj.id} className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Project #{i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(proj.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <Label>Project Name *</Label>
            <Input placeholder="My Awesome Project" value={proj.name} onChange={e => update(proj.id, 'name', e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="What does this project do?" rows={2} value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Technologies</Label>
              <Input placeholder="React, Node.js, PostgreSQL" value={proj.technologies} onChange={e => update(proj.id, 'technologies', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Link</Label>
              <Input placeholder="https://github.com/..." value={proj.link} onChange={e => update(proj.id, 'link', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add} className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" /> Add Project
      </Button>
    </div>
  );
}
