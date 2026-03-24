import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Printer, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useResumeBuilder } from '@/hooks/useResumeBuilder';
import { sampleResumeData } from '@/types/resume';
import { StepIndicator } from '@/components/resume/StepIndicator';
import { PersonalDetailsForm } from '@/components/resume/PersonalDetailsForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { ProjectsForm } from '@/components/resume/ProjectsForm';
import { CertificationsForm } from '@/components/resume/CertificationsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const stepTitles = ['Personal Details', 'Education', 'Skills', 'Work Experience', 'Projects', 'Certifications'];

export default function Index() {
  const { data, currentStep, updatePersonal, updateField, nextStep, prevStep, goToStep, loadSample } = useResumeBuilder();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'letter');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.personal.fullName || 'resume'}.pdf`);
  };

  const handlePrint = () => {
    if (!previewRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Resume</title>
      <style>body{margin:0;padding:0;} @media print{body{margin:0;}}</style>
      </head><body>${previewRef.current.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalDetailsForm data={data.personal} onChange={updatePersonal} />;
      case 1: return <EducationForm data={data.education} onChange={v => updateField('education', v)} />;
      case 2: return <SkillsForm data={data.skills} onChange={v => updateField('skills', v)} />;
      case 3: return <ExperienceForm data={data.experience} onChange={v => updateField('experience', v)} />;
      case 4: return <ProjectsForm data={data.projects} onChange={v => updateField('projects', v)} />;
      case 5: return <CertificationsForm data={data.certifications} onChange={v => updateField('certifications', v)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="font-bold text-lg text-foreground">ResumeBuilder</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => loadSample(sampleResumeData)}>
              Load Sample
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button size="sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-1" /> Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form panel */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <StepIndicator currentStep={currentStep} onStepClick={goToStep} />
            
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">{stepTitles[currentStep]}</h2>
              <p className="text-sm text-muted-foreground">Fill in your {stepTitles[currentStep].toLowerCase()}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button onClick={nextStep} disabled={currentStep === 5}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Preview panel */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Live Preview</h2>
              <TemplateSelector current={data.template} onChange={t => updateField('template', t)} />
            </div>
            <div className="border rounded-lg overflow-hidden bg-muted/50" style={{ height: '600px' }}>
              <ResumePreview data={data} previewRef={previewRef as React.RefObject<HTMLDivElement>} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
