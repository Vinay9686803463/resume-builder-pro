import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { Education } from '@/types/resume';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: Props) {
  const add = () => onChange([...data, { id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: keyof Education, value: string) => onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div className="space-y-5 animate-fade-in">
      {data.map((edu, i) => (
        <div key={edu.id} className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Education #{i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(edu.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <Label>Institution *</Label>
            <Input placeholder="Stanford University" value={edu.institution} onChange={e => update(edu.id, 'institution', e.target.value)} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Degree</Label>
              <Input placeholder="Bachelor's" value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input placeholder="Computer Science" value={edu.field} onChange={e => update(edu.id, 'field', e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Start Date</Label>
              <Input type="month" value={edu.startDate} onChange={e => update(edu.id, 'startDate', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="month" value={edu.endDate} onChange={e => update(edu.id, 'endDate', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>GPA</Label>
              <Input placeholder="3.8" value={edu.gpa} onChange={e => update(edu.id, 'gpa', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add} className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" /> Add Education
      </Button>
    </div>
  );
}
