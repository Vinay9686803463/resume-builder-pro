import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { Certification } from '@/types/resume';

interface Props {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export function CertificationsForm({ data, onChange }: Props) {
  const add = () => onChange([...data, { id: crypto.randomUUID(), name: '', issuer: '', date: '', credentialId: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: keyof Certification, value: string) => onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div className="space-y-5 animate-fade-in">
      {data.map((cert, i) => (
        <div key={cert.id} className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Certification #{i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => remove(cert.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Certificate Name *</Label>
              <Input placeholder="AWS Solutions Architect" value={cert.name} onChange={e => update(cert.id, 'name', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Issuer</Label>
              <Input placeholder="Amazon Web Services" value={cert.issuer} onChange={e => update(cert.id, 'issuer', e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Date</Label>
              <Input type="month" value={cert.date} onChange={e => update(cert.id, 'date', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Credential ID</Label>
              <Input placeholder="ABC-12345" value={cert.credentialId} onChange={e => update(cert.id, 'credentialId', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add} className="w-full border-dashed">
        <Plus className="w-4 h-4 mr-2" /> Add Certification
      </Button>
    </div>
  );
}
