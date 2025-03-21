import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PrimaryButton from './PrimaryButton';
import ResumePreview from './ResumePreview';
import { fetchRandomUserData, generatePdf, ResumeData } from '@/utils/resumeGenerator';

const ResumeGenerator: React.FC = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const generateResume = async () => {
    try {
      setIsLoading(true);
      const data = await fetchRandomUserData();
      setResumeData(data);
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!resumeData) return;
    
    try {
      setIsPdfGenerating(true);
      await generatePdf('resume-preview', `${resumeData.name.replace(/\s+/g, '_')}_Resume`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to download PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto relative">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/20 pointer-events-none" />
      
      <div className="text-center space-y-2 relative">
        <h1 className="font-bold tracking-tight text-4xl text-foreground animate-slide-down">
          Resume Generator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-down">
          Generate a professional, beautifully designed resume with random data in seconds. 
          <span className="block mt-1 text-blue-500/80">Powered by AI technology.</span>
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
        <PrimaryButton 
          onClick={generateResume} 
          loading={isLoading}
          disabled={isLoading}
          className="w-full sm:w-auto relative group overflow-hidden bg-blue-500 hover:bg-blue-600 transition-all duration-300"
        >
          <span className="relative">
            {resumeData ? 'Generate New Resume' : 'Generate Random Resume'}
          </span>
        </PrimaryButton>
        
        {resumeData && (
          <PrimaryButton 
            onClick={downloadPdf} 
            loading={isPdfGenerating}
            disabled={isPdfGenerating}
            variant="outline"
            className="w-full sm:w-auto group relative overflow-hidden border-blue-500/30 hover:border-blue-500/60"
          >
            <span className="relative flex items-center gap-2">
              <svg
                className="w-4 h-4 animate-pulse-soft"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </span>
          </PrimaryButton>
        )}
      </div>
      
      {resumeData ? (
        <div className="animate-fade-in mt-10 relative">
          <ResumePreview data={resumeData} />
        </div>
      ) : (
        <div className="text-center p-12 bg-white/5 backdrop-blur-sm rounded-lg border border-blue-500/10 relative group hover:border-blue-500/30 transition-all duration-300">
          <div className="max-w-sm mx-auto relative">
            <svg
              className="mx-auto h-12 w-12 text-blue-500/50 animate-pulse-soft"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No resume generated yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the "Generate Random Resume" button above to create a beautiful resume with randomly generated data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;
