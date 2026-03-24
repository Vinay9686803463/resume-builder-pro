import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';
import type { PersonalDetails } from '@/types/resume';

interface Props {
  data: PersonalDetails;
  onChange: (data: Partial<PersonalDetails>) => void;
}

export function PersonalDetailsForm({ data, onChange }: Props) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange({ photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-5">
        <label className="relative cursor-pointer group">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
            {data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </label>
        <div className="flex-1 space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" placeholder="John Doe" value={data.fullName} onChange={e => onChange({ fullName: e.target.value })} />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Professional Title</Label>
        <Input id="title" placeholder="Software Engineer" value={data.title} onChange={e => onChange({ title: e.target.value })} className="mt-1.5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="john@example.com" value={data.email} onChange={e => onChange({ email: e.target.value })} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+1 (555) 123-4567" value={data.phone} onChange={e => onChange({ phone: e.target.value })} className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="San Francisco, CA" value={data.address} onChange={e => onChange({ address: e.target.value })} className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea id="summary" placeholder="Brief summary of your professional background..." rows={4} value={data.summary} onChange={e => onChange({ summary: e.target.value })} className="mt-1.5" />
      </div>
    </div>
  );
}
