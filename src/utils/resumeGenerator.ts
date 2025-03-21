
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Define types for our resume data
export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
}

// Format date to a more readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

// Generate random date within a range
const getRandomDate = (start: Date, end: Date): string => {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

// Generate random number within a range
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Fetch random user data from randomuser.me API
export const fetchRandomUserData = async (): Promise<ResumeData> => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    
    // Generate resume data based on the random user
    return generateResumeData(user);
  } catch (error) {
    console.error('Error fetching random user data:', error);
    toast.error('Failed to fetch random user data. Please try again.');
    throw error;
  }
};

// Generate fake resume data based on the random user
const generateResumeData = (user: any): ResumeData => {
  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(now.getFullYear() - 10);
  
  // Job titles for random generation
  const jobTitles = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 'UI/UX Designer',
    'Marketing Specialist', 'Financial Analyst', 'HR Manager', 'Operations Director',
    'Content Strategist', 'Project Manager', 'Full Stack Developer', 'DevOps Engineer'
  ];
  
  // Companies for random generation
  const companies = [
    'Innovatech Solutions', 'Global Dynamics', 'Future Horizons', 'Apex Systems',
    'Bright Path Inc.', 'Stellar Innovations', 'Quantum Technologies', 'Visionary Group',
    'Pinnacle Enterprises', 'Frontier Analytics', 'Synergy Systems', 'Elevate Digital'
  ];
  
  // Educational institutions for random generation
  const institutions = [
    'University of Technology', 'Global Institute of Science', 'Metropolitan University',
    'National College', 'International Academy', 'Central State University',
    'Pacific Institute of Technology', 'Northern University', 'Atlantic College'
  ];
  
  // Degrees for random generation
  const degrees = [
    'Bachelor of Science', 'Bachelor of Arts', 'Master of Science',
    'Master of Arts', 'Master of Business Administration', 'Associate Degree',
    'Doctor of Philosophy', 'Bachelor of Engineering'
  ];
  
  // Fields of study for random generation
  const fields = [
    'Computer Science', 'Business Administration', 'Marketing', 'Finance',
    'Electrical Engineering', 'Psychology', 'Communications', 'Information Technology',
    'Graphic Design', 'Data Science', 'Human Resources', 'Economics'
  ];
  
  // Skills for random generation
  const skillsList = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Data Analysis',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving',
    'UX/UI Design', 'Agile Methodology', 'Marketing Strategy', 'Sales',
    'Customer Service', 'Content Creation', 'Social Media Management',
    'Financial Planning', 'Strategic Thinking', 'Team Building'
  ];
  
  // Work descriptions for random generation
  const workDescriptions = [
    'Led a team of developers to successfully deliver projects on time and within budget.',
    'Increased efficiency by implementing automated testing procedures.',
    'Collaborated with cross-functional teams to improve product features.',
    'Managed client relationships and ensured high satisfaction rates.',
    'Developed innovative solutions to complex technical problems.',
    'Conducted market research and competitive analysis.',
    'Created and executed strategic marketing campaigns.',
    'Streamlined operational processes resulting in cost savings.',
    'Designed and implemented data analytics frameworks.',
    'Improved user experience through research-based design iterations.',
    'Mentored junior team members and facilitated professional development.',
    'Optimized database performance and reduced query response times.',
    'Introduced new methodologies that improved team productivity.',
    'Created documentation and training materials for internal processes.',
    'Negotiated contracts with vendors resulting in cost reductions.'
  ];
  
  // Generate random work experiences
  const generateWorkExperiences = (): WorkExperience[] => {
    const numExperiences = getRandomInt(1, 3);
    const experiences: WorkExperience[] = [];
    
    let currentDate = now;
    
    for (let i = 0; i < numExperiences; i++) {
      const duration = getRandomInt(12, 36); // Duration in months
      const endDate = new Date(currentDate);
      const startDate = new Date(currentDate);
      startDate.setMonth(endDate.getMonth() - duration);
      
      // For next iteration, set current date before this job's start date
      currentDate = new Date(startDate);
      currentDate.setMonth(currentDate.getMonth() - getRandomInt(1, 6)); // Gap between jobs
      
      // Generate random descriptions
      const numDescriptions = getRandomInt(2, 4);
      const descriptions: string[] = [];
      const usedDescIndexes = new Set<number>();
      
      for (let j = 0; j < numDescriptions; j++) {
        let descIndex: number;
        do {
          descIndex = getRandomInt(0, workDescriptions.length - 1);
        } while (usedDescIndexes.has(descIndex));
        
        usedDescIndexes.add(descIndex);
        descriptions.push(workDescriptions[descIndex]);
      }
      
      experiences.push({
        company: companies[getRandomInt(0, companies.length - 1)],
        position: jobTitles[getRandomInt(0, jobTitles.length - 1)],
        startDate: startDate.toISOString().split('T')[0],
        endDate: i === 0 ? 'Present' : endDate.toISOString().split('T')[0],
        description: descriptions
      });
    }
    
    return experiences;
  };
  
  // Generate random education
  const generateEducation = (): Education[] => {
    const numEducation = getRandomInt(1, 2);
    const educationList: Education[] = [];
    
    let currentDate = fiveYearsAgo;
    
    for (let i = 0; i < numEducation; i++) {
      const duration = getRandomInt(24, 48); // Duration in months
      const endDate = new Date(currentDate);
      const startDate = new Date(currentDate);
      startDate.setMonth(endDate.getMonth() - duration);
      
      // For next iteration, set current date before this education's start date
      currentDate = new Date(startDate);
      currentDate.setMonth(currentDate.getMonth() - getRandomInt(6, 24)); // Gap between education
      
      educationList.push({
        institution: institutions[getRandomInt(0, institutions.length - 1)],
        degree: degrees[getRandomInt(0, degrees.length - 1)],
        fieldOfStudy: fields[getRandomInt(0, fields.length - 1)],
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
    }
    
    return educationList;
  };
  
  // Generate random skills
  const generateSkills = (): Skill[] => {
    const numSkills = getRandomInt(5, 8);
    const skills: Skill[] = [];
    const usedSkillIndexes = new Set<number>();
    
    for (let i = 0; i < numSkills; i++) {
      let skillIndex: number;
      do {
        skillIndex = getRandomInt(0, skillsList.length - 1);
      } while (usedSkillIndexes.has(skillIndex));
      
      usedSkillIndexes.add(skillIndex);
      skills.push({
        name: skillsList[skillIndex],
        level: getRandomInt(3, 5)
      });
    }
    
    return skills;
  };
  
  // Generate professional title
  const generateTitle = (): string => {
    return jobTitles[getRandomInt(0, jobTitles.length - 1)];
  };
  
  // Generate professional summary
  const generateSummary = (): string => {
    const summaries = [
      `Dedicated and efficient ${generateTitle()} with ${getRandomInt(3, 10)} years of experience in the industry. Proven track record of delivering high-quality results and driving innovation.`,
      `Results-oriented ${generateTitle()} experienced in developing and implementing successful strategies. Excellent communication and leadership skills with a strong analytical mindset.`,
      `Detail-oriented ${generateTitle()} with a passion for continuous improvement. Skilled at problem-solving and adapting to new technologies and methodologies.`,
      `Creative and analytical ${generateTitle()} with expertise in delivering strategic solutions. Known for exceptional organizational skills and ability to work well under pressure.`,
      `Highly motivated ${generateTitle()} with strong technical abilities and excellent interpersonal skills. Committed to professional growth and achieving organizational objectives.`
    ];
    
    return summaries[getRandomInt(0, summaries.length - 1)];
  };
  
  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    location: `${user.location.city}, ${user.location.country}`,
    title: generateTitle(),
    summary: generateSummary(),
    education: generateEducation(),
    workExperience: generateWorkExperiences(),
    skills: generateSkills()
  };
};

// Function to generate PDF from HTML element
export const generatePdf = async (elementId: string, fileName: string): Promise<void> => {
  try {
    toast.info('Preparing your PDF...');
    
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
    pdf.save(`${fileName}.pdf`);
    
    toast.success('PDF generated successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
