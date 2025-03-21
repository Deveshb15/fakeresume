
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import PrimaryButton from '@/components/PrimaryButton';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3 animate-slide-down">
          <h1 className="font-bold tracking-tight">About ResumeCraft</h1>
          <p className="text-muted-foreground">
            Minimal, elegant resume generation with pixel-perfect design.
          </p>
        </div>
        
        <div className="prose prose-gray mx-auto animate-fade-in">
          <p className="text-lg leading-relaxed">
            ResumeCraft was designed with a focus on simplicity, elegance, and functionality. 
            Inspired by the design principles of minimalism and clarity, this tool generates 
            professional resumes with random data that you can use for various purposes.
          </p>
          
          <div className="my-8 p-6 bg-accent rounded-lg">
            <h3 className="text-xl font-medium mb-3">Our Design Philosophy</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span><strong>Simplicity:</strong> Clean interfaces that eliminate distractions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span><strong>Functionality:</strong> Every element serves a purpose</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span><strong>Elegance:</strong> Beautiful typography and spacing</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span><strong>Attention to detail:</strong> Pixel-perfect implementation</span>
              </li>
            </ul>
          </div>
          
          <h3 className="text-xl font-medium">How It Works</h3>
          <p>
            ResumeCraft uses the <a href="https://randomuser.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Random User API
            </a> to generate realistic user profiles. We combine this data with carefully crafted professional 
            descriptions, job titles, and skills to create complete resumes that look authentic.
          </p>
          
          <p>
            All generated resumes can be downloaded as PDFs for your convenience. The design is 
            responsive and optimized for all screen sizes, ensuring a seamless experience across devices.
          </p>
          
          <div className="my-8 text-center">
            <Link to="/">
              <PrimaryButton>
                Generate a Resume Now
              </PrimaryButton>
            </Link>
          </div>
          
          <h3 className="text-xl font-medium">Privacy Note</h3>
          <p>
            All data is generated randomly and processed entirely in your browser. 
            We do not store or transmit any of the generated information.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
