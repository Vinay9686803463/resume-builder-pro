export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  title: string;
  summary: string;
  photo: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export interface ResumeData {
  personal: PersonalDetails;
  education: Education[];
  skills: string[];
  experience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  template: 'classic' | 'modern' | 'creative';
}

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    summary: '',
    photo: null,
  },
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  template: 'classic',
};

export const sampleResumeData: ResumeData = {
  personal: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    summary: 'Experienced software engineer with 6+ years building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
    photo: null,
  },
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: "Bachelor's",
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-06',
      gpa: '3.8',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Led development of microservices architecture serving 2M+ users. Mentored team of 4 junior engineers. Reduced API response times by 40%.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2018-07',
      endDate: '2021-02',
      current: false,
      description: 'Built and maintained React-based dashboard. Implemented CI/CD pipelines. Collaborated with design team on UI/UX improvements.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source CLI Tool',
      description: 'A developer productivity CLI tool with 500+ GitHub stars',
      technologies: 'Go, Cobra, GitHub Actions',
      link: 'https://github.com/example/cli-tool',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-01',
      credentialId: 'AWS-SA-12345',
    },
  ],
  template: 'classic',
};
