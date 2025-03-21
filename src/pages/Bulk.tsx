import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';
import PrimaryButton from '@/components/PrimaryButton';
import ResumePreview from '@/components/ResumePreview';
import { fetchRandomUserData, generatePdf, ResumeData } from '@/utils/resumeGenerator';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Bulk: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [count, setCount] = useState(1);

  const generateBulkResumes = async () => {
    try {
      setIsLoading(true);
      const promises = Array(count).fill(null).map(() => fetchRandomUserData());
      const results = await Promise.all(promises);
      setResumeData(results);
    } catch (error) {
      console.error('Error generating resumes:', error);
      toast.error('Failed to generate resumes', {
        description: 'Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSinglePdf = async (data: ResumeData, index: number) => {
    try {
      setDownloadingIndex(index);
      await generatePdf(`resume-preview-${index}`, `${data.name.replace(/\s+/g, '_')}_Resume`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF', {
        description: 'Please try again.'
      });
    } finally {
      setDownloadingIndex(null);
    }
  };

  const generatePdfBlob = async (elementId: string): Promise<Blob> => {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    return pdf.output('blob');
  };

  const downloadAllPdfs = async () => {
    try {
      setIsBulkDownloading(true);
      toast.info('Preparing bulk download...', {
        description: 'Creating ZIP file with all resumes...'
      });
      
      const zip = new JSZip();
      
      // Generate all PDFs and add them to the zip
      for (let i = 0; i < resumeData.length; i++) {
        const data = resumeData[i];
        const pdfBlob = await generatePdfBlob(`resume-preview-${i}`);
        const fileName = `${data.name.replace(/\s+/g, '_')}_Resume.pdf`;
        zip.file(fileName, pdfBlob);
        
        // Update progress
        toast.info(`Processing resume ${i + 1} of ${resumeData.length}`);
      }
      
      // Generate and download the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'resumes.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      
      toast.success('Download complete!', {
        description: 'All resumes have been packaged into a ZIP file.'
      });
    } catch (error) {
      console.error('Error downloading PDFs:', error);
      toast.error('Failed to download PDFs', {
        description: 'Please try again.'
      });
    } finally {
      setIsBulkDownloading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 w-full max-w-6xl mx-auto relative">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/20 pointer-events-none" />
        
        <div className="text-center space-y-2 relative">
          <h1 className="font-bold tracking-tight text-4xl text-foreground animate-slide-down">
            Bulk Resume Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-down">
            Generate multiple professional resumes at once.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 animate-slide-up">
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max="15"
              value={count}
              onChange={(e) => setCount(Math.min(15, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-20 px-3 py-2 border rounded-md"
            />
            <PrimaryButton
              onClick={generateBulkResumes}
              loading={isLoading}
              disabled={isLoading}
              className="relative group overflow-hidden bg-blue-500 hover:bg-blue-600 transition-all duration-300"
            >
              Generate Resumes
            </PrimaryButton>
          </div>
        </div>

        {resumeData.length > 0 && (
          <div className="flex justify-center mb-8">
            <PrimaryButton
              onClick={downloadAllPdfs}
              loading={isBulkDownloading}
              disabled={isBulkDownloading}
              variant="outline"
              className="group relative overflow-hidden border-blue-500/30 hover:border-blue-500/60"
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
                Download All PDFs
              </span>
            </PrimaryButton>
          </div>
        )}

        {resumeData.length > 0 ? (
          <div className="space-y-12 animate-fade-in">
            {resumeData.map((data, index) => (
              <div key={index} className="relative">
                <div id={`resume-preview-${index}`}>
                  <ResumePreview data={data} />
                </div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <PrimaryButton
                    onClick={() => downloadSinglePdf(data, index)}
                    loading={downloadingIndex === index}
                    disabled={downloadingIndex !== null}
                    size="sm"
                    variant="outline"
                    className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <span className="relative flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </span>
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white/5 backdrop-blur-sm rounded-lg border border-blue-500/10 relative group hover:border-blue-500/30 transition-all duration-300">
            <div className="max-w-sm mx-auto">
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
                No resumes generated yet
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select the number of resumes (max 15) and click generate to create multiple resumes at once.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bulk; 