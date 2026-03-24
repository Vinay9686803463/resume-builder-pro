import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import type { WorkExperience } from '@/types/resume';

interface Props {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export function ExperienceForm({ data, onChange }: Props) {
  const add = () => onChange([...data, { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: keyof WorkExperience, value: string | boolean) => onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div className="space-y-5 animate-fade-in">
      {data.map((exp, i) => (
        <div key={exp.id} className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Experience #{i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(exp.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Company *</Label>
              <Input placeholder="Google" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Position *</Label>
              <Input placeholder="Software Engineer" value={exp.position} onChange={e => update(exp.id, 'position', e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Start Date</Label>
              <Input type="month" value={exp.startDate} onChange={e => update(exp.id, 'startDate', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="month" value={exp.endDate} onChange={e => update(exp.id, 'endDate', e.target.value)} className="mt-1" disabled={exp.current} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={exp.current} onCheckedChange={(v) => update(exp.id, 'current', !!v)} />
            <Label className="text-sm">Currently working here</Label>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Key responsibilities and achievements..." rows={3} value={exp.description} onChange={e => update(exp.id, 'description', e.target.value)} className="mt-1" />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add} className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>
    </div>
  );
}
