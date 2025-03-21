
import React from 'react';
import type { ResumeData } from '@/utils/resumeGenerator';
import { formatDate } from '@/utils/resumeGenerator';
import RandomFactChip from './RandomFactChip';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div 
      id="resume-preview" 
      className="w-full max-w-[210mm] mx-auto bg-white text-black shadow-lg rounded-lg overflow-hidden transition-all duration-300 border border-border/50"
    >
      <div className="p-8 md:p-10 space-y-6">
        {/* Header */}
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
          <p className="text-lg text-gray-700 mt-1">{data.title}</p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.email}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.phone}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {data.location}
            </div>
          </div>
        </header>
        
        {/* Summary */}
        <section>
          <div className="flex items-center mb-3">
            <RandomFactChip label="PROFESSIONAL SUMMARY" />
          </div>
          <p className="text-gray-700">{data.summary}</p>
        </section>
        
        {/* Work Experience */}
        <section>
          <div className="flex items-center mb-4">
            <RandomFactChip label="EXPERIENCE" />
          </div>
          <div className="space-y-6">
            {data.workExperience.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4 transition-all hover:border-primary animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-lg font-medium text-gray-900">{job.position}</h3>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">{job.company}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm">
                    {formatDate(job.startDate)} - {job.endDate === 'Present' ? 'Present' : formatDate(job.endDate)}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-gray-700">
                  {job.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1 text-gray-500">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        
        {/* Education */}
        <section>
          <div className="flex items-center mb-4">
            <RandomFactChip label="EDUCATION" />
          </div>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="transition-all animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-lg font-medium text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">{edu.institution}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills */}
        <section>
          <div className="flex items-center mb-4">
            <RandomFactChip label="SKILLS" />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div 
                key={index} 
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm animate-slide-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill.name}
                <span className="ml-2 text-gray-500">
                  {Array(skill.level).fill('•').join('')}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumePreview;
