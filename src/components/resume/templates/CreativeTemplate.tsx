import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal: p, education, skills, experience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-800 min-h-[1056px] text-[11px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', width: '816px' }}>
      {/* Header with accent */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 pb-6">
        <div className="flex items-center gap-5">
          {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-2xl object-cover shadow-lg" />}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{p.fullName || 'Your Name'}</h1>
            {p.title && <p className="text-blue-100 text-sm mt-0.5">{p.title}</p>}
            <div className="flex items-center gap-4 mt-2 text-[10px] text-blue-100">
              {p.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{p.email}</span>}
              {p.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone}</span>}
              {p.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.address}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 pt-5">
        {p.summary && (
          <section className="mb-5 bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700 italic">{p.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-[1fr_240px] gap-6">
          {/* Main */}
          <div>
            {experience.length > 0 && (
              <section className="mb-5">
                <h2 className="text-sm font-extrabold text-blue-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-blue-500 rounded" />Experience
                </h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-3 pl-4 border-l-2 border-blue-200">
                    <p className="font-bold text-gray-900">{exp.position}</p>
                    <p className="text-blue-600 text-[10px] font-medium">{exp.company} • {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                    {exp.description && <p className="mt-1 text-gray-600">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className="text-sm font-extrabold text-blue-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-blue-500 rounded" />Projects
                </h2>
                {projects.map(proj => (
                  <div key={proj.id} className="mb-2 pl-4 border-l-2 border-blue-200">
                    <p className="font-bold text-gray-900">{proj.name}</p>
                    {proj.technologies && <p className="text-blue-500 text-[10px]">{proj.technologies}</p>}
                    {proj.description && <p className="text-gray-600">{proj.description}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Side */}
          <div>
            {skills.length > 0 && (
              <section className="mb-5">
                <h2 className="text-sm font-extrabold text-blue-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-blue-500 rounded" />Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => <span key={s} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-medium">{s}</span>)}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section className="mb-5">
                <h2 className="text-sm font-extrabold text-blue-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-blue-500 rounded" />Education
                </h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <p className="font-bold text-gray-900 text-[10px]">{edu.degree} in {edu.field}</p>
                    <p className="text-gray-500 text-[10px]">{edu.institution}</p>
                    <p className="text-gray-400 text-[9px]">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-extrabold text-blue-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-blue-500 rounded" />Certifications
                </h2>
                {certifications.map(cert => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-bold text-gray-900 text-[10px]">{cert.name}</p>
                    <p className="text-gray-500 text-[9px]">{cert.issuer}{cert.date && ` • ${formatDate(cert.date)}`}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
