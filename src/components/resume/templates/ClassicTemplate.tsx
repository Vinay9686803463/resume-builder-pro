import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal: p, education, skills, experience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-800 p-8 min-h-[1056px] text-[11px] leading-relaxed" style={{ fontFamily: 'Georgia, serif', width: '816px' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />}
        <h1 className="text-2xl font-bold tracking-wide text-gray-900">{p.fullName || 'Your Name'}</h1>
        {p.title && <p className="text-sm text-gray-600 mt-1">{p.title}</p>}
        <div className="flex items-center justify-center gap-4 mt-2 text-gray-600 text-[10px]">
          {p.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone}</span>}
          {p.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.address}</span>}
        </div>
      </div>

      {p.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Summary</h2>
          <p className="text-gray-700">{p.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <strong>{exp.position}</strong>
                <span className="text-gray-500">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <p className="text-gray-600 italic">{exp.company}</p>
              {exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <strong>{edu.degree} in {edu.field}</strong>
                <span className="text-gray-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
              </div>
              <p className="text-gray-600">{edu.institution}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <p className="text-gray-700">{skills.join(' • ')}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-2">
              <strong>{proj.name}</strong>{proj.technologies && <span className="text-gray-500 ml-2">({proj.technologies})</span>}
              {proj.description && <p className="text-gray-700">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Certifications</h2>
          {certifications.map(cert => (
            <div key={cert.id} className="mb-1">
              <strong>{cert.name}</strong> – {cert.issuer}{cert.date && ` (${formatDate(cert.date)})`}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
