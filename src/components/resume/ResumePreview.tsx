import type { ResumeData } from '@/types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface Props {
  data: ResumeData;
  previewRef: React.RefObject<HTMLDivElement>;
}

export function ResumePreview({ data, previewRef }: Props) {
  const Template = data.template === 'modern' ? ModernTemplate
    : data.template === 'creative' ? CreativeTemplate
    : ClassicTemplate;

  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      <div className="origin-top-left" style={{ transform: 'scale(0.55)', transformOrigin: 'top left', width: '816px' }}>
        <div ref={previewRef}>
          <Template data={data} />
        </div>
      </div>
    </div>
  );
}
