import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal: p, education, skills, experience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-800 min-h-[1056px] text-[11px] leading-relaxed flex" style={{ fontFamily: 'Inter, sans-serif', width: '816px' }}>
      {/* Sidebar */}
      <div className="w-[260px] bg-[#1e3a5f] text-white p-6 flex-shrink-0">
        <div className="text-center mb-6">
          {p.photo && <img src={p.photo} alt="" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-white/30" />}
          <h1 className="text-lg font-bold">{p.fullName || 'Your Name'}</h1>
          {p.title && <p className="text-blue-200 text-xs mt-1">{p.title}</p>}
        </div>

        <div className="space-y-2 mb-6 text-[10px]">
          {p.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-blue-300 flex-shrink-0" /><span className="break-all">{p.email}</span></div>}
          {p.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-blue-300 flex-shrink-0" />{p.phone}</div>}
          {p.address && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-blue-300 flex-shrink-0" />{p.address}</div>}
        </div>

        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-200 border-b border-blue-400/30 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => <span key={s} className="px-2 py-0.5 bg-white/10 rounded text-[10px]">{s}</span>)}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-200 border-b border-blue-400/30 pb-1 mb-3">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-2">
                <p className="font-semibold text-[10px]">{cert.name}</p>
                <p className="text-blue-200 text-[9px]">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {p.summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2">PROFILE</h2>
            <p className="text-gray-600">{p.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2">EXPERIENCE</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{exp.position}</p>
                    <p className="text-[#1e3a5f] font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-[10px] whitespace-nowrap">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                {exp.description && <p className="mt-1 text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2">EDUCATION</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{edu.degree} in {edu.field}</p>
                    <p className="text-gray-600">{edu.institution}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                  </div>
                  <span className="text-gray-400 text-[10px]">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2">PROJECTS</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-gray-900">{proj.name}</p>
                  {proj.link && <ExternalLink className="w-3 h-3 text-[#1e3a5f]" />}
                </div>
                {proj.technologies && <p className="text-[#1e3a5f] text-[10px]">{proj.technologies}</p>}
                {proj.description && <p className="text-gray-600">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
