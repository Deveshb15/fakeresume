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

// Define type for Random User API response
interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
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
const generateResumeData = (user: RandomUser): ResumeData => {
  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(now.getFullYear() - 10);
  
  // Job titles for random generation
  const jobTitles = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 'UI/UX Designer',
    'Marketing Specialist', 'Financial Analyst', 'HR Manager', 'Operations Director',
    'Content Strategist', 'Project Manager', 'Full Stack Developer', 'DevOps Engineer',
    'Frontend Developer', 'Backend Developer', 'Mobile App Developer', 'QA Engineer',
    'Systems Architect', 'Database Administrator', 'Cloud Solutions Architect', 'IT Support Specialist',
    'Network Engineer', 'Cybersecurity Analyst', 'Business Analyst', 'SEO Specialist',
    'Digital Marketing Manager', 'Social Media Manager', 'Content Writer', 'Copywriter',
    'Graphic Designer', 'UX Researcher', 'Product Owner', 'Scrum Master',
    'Technical Writer', 'Customer Success Manager', 'Account Executive', 'Sales Representative',
    'Chief Technology Officer', 'Chief Information Officer', 'Chief Marketing Officer', 'Chief Financial Officer',
    'VP of Engineering', 'VP of Product', 'VP of Marketing', 'VP of Sales',
    'Director of Engineering', 'Director of Product', 'Director of Marketing', 'Director of Sales',
    'Research Scientist', 'Machine Learning Engineer', 'AI Specialist', 'Blockchain Developer',
    'IoT Developer', 'AR/VR Developer', 'Game Developer', 'E-commerce Specialist',
    'Supply Chain Manager', 'Logistics Coordinator', 'Procurement Specialist', 'Operations Manager',
    'Executive Assistant', 'Office Manager', 'Administrative Coordinator', 'Receptionist',
    'Accountant', 'Tax Specialist', 'Auditor', 'Financial Controller',
    'Investment Banker', 'Financial Planner', 'Wealth Manager', 'Risk Analyst',
    'Compliance Officer', 'Legal Counsel', 'Paralegal', 'Contract Specialist',
    'Human Resources Specialist', 'Recruiter', 'Talent Acquisition Manager', 'Training Coordinator',
    'Benefits Administrator', 'Compensation Analyst', 'Employee Relations Specialist', 'HRIS Analyst',
    'Public Relations Specialist', 'Media Relations Manager', 'Communications Director', 'Brand Manager',
    'Event Coordinator', 'Community Manager', 'Customer Service Representative', 'Technical Support Engineer',
    'Data Engineer', 'Data Analyst', 'Business Intelligence Analyst', 'ETL Developer',
    'Solutions Engineer', 'Solutions Architect', 'Technical Account Manager', 'Implementation Specialist',
    'Integration Specialist', 'API Developer', 'Embedded Systems Engineer', 'Firmware Engineer',
    'Hardware Engineer', 'Electrical Engineer', 'Mechanical Engineer', 'Civil Engineer',
    'Environmental Engineer', 'Biomedical Engineer', 'Chemical Engineer', 'Aerospace Engineer',
    'Industrial Designer', 'Interior Designer', 'Fashion Designer', 'Web Designer',
    'Motion Graphics Designer', '3D Artist', 'Illustrator', 'Photographer',
    'Video Editor', 'Sound Engineer', 'Music Producer', 'Voice Actor'
  ];
  
  // Companies for random generation
  const companies = [
    'Innovatech Solutions', 'Global Dynamics', 'Future Horizons', 'Apex Systems',
    'Bright Path Inc.', 'Stellar Innovations', 'Quantum Technologies', 'Visionary Group',
    'Pinnacle Enterprises', 'Frontier Analytics', 'Synergy Systems', 'Elevate Digital',
    'Techwave Solutions', 'Nexus Innovations', 'Horizon Technologies', 'Vector Systems',
    'Summit Digital', 'Prism Technologies', 'Catalyst Solutions', 'Elevate Dynamics',
    'Pulse Innovations', 'Vertex Corporation', 'Atlas Enterprises', 'Meridian Solutions',
    'Orion Technologies', 'Nova Systems', 'Phoenix Dynamics', 'Titan Industries',
    'Aurora Technologies', 'Lumina Systems', 'Spectra Solutions', 'Centurion Enterprises',
    'Velocity Innovations', 'Fusion Technologies', 'Apex Dynamics', 'Quantum Leap Solutions',
    'Vanguard Systems', 'Horizon Enterprises', 'Momentum Technologies', 'Pulse Dynamics',
    'Eclipse Solutions', 'Radiant Technologies', 'Vertex Innovations', 'Nimbus Systems',
    'Helios Technologies', 'Solaris Innovations', 'Celestial Systems', 'Nebula Enterprises',
    'Vortex Technologies', 'Pinnacle Dynamics', 'Summit Innovations', 'Paragon Systems',
    'Precision Enterprises', 'Latitude Technologies', 'Altitude Innovations', 'Axiom Systems',
    'Lighthouse Technologies', 'Beacon Innovations', 'Compass Systems', 'Trailblazer Enterprises',
    'Polaris Technologies', 'Navigator Systems', 'Voyager Innovations', 'Odyssey Enterprises',
    'Frontier Systems', 'Pioneer Technologies', 'Pathfinder Innovations', 'Discovery Enterprises',
    'Moonshot Technologies', 'Stardust Systems', 'Galaxy Innovations', 'Cosmos Enterprises',
    'Zenith Technologies', 'Apex Heights', 'Summit Peak Systems', 'Everest Innovations',
    'Cascade Technologies', 'Avalanche Systems', 'Typhoon Innovations', 'Tsunami Enterprises',
    'Oceanic Technologies', 'Coral Systems', 'Maritime Innovations', 'Nautilus Enterprises',
    'Redwood Technologies', 'Oak Systems', 'Maple Innovations', 'Cedar Enterprises',
    'Granite Technologies', 'Steel Systems', 'Titanium Innovations', 'Platinum Enterprises',
    'Emerald Technologies', 'Ruby Systems', 'Sapphire Innovations', 'Diamond Enterprises',
    'Eagle Technologies', 'Falcon Systems', 'Hawk Innovations', 'Phoenix Enterprises',
    'Alpha Technologies', 'Beta Systems', 'Delta Innovations', 'Omega Enterprises',
    'Infinity Technologies', 'Eternity Systems', 'Legacy Innovations', 'Heritage Enterprises',
    'Epoch Technologies', 'Eon Systems', 'Millennium Innovations', 'Century Enterprises',
    'Artemis Technologies', 'Apollo Systems', 'Athena Innovations', 'Zeus Enterprises',
    'Atlas Technologies', 'Hercules Systems', 'Titan Innovations', 'Olympus Enterprises',
    'Genesis Technologies', 'Nexus Prime', 'Omni Systems', 'Ultra Innovations',
    'Meta Technologies', 'Hyper Systems', 'Quantum Core', 'Fusion Dynamics'
  ];
  
  // Educational institutions for random generation
  const institutions = [
    'University of Technology', 'Global Institute of Science', 'Metropolitan University',
    'National College', 'International Academy', 'Central State University',
    'Pacific Institute of Technology', 'Northern University', 'Atlantic College',
    'MIT (Massachusetts Institute of Technology)', 'Stanford University', 'Harvard University',
    'California Institute of Technology', 'Princeton University', 'Yale University',
    'University of Chicago', 'Columbia University', 'University of Pennsylvania',
    'Cornell University', 'University of California, Berkeley', 'University of California, Los Angeles',
    'University of Michigan', 'Carnegie Mellon University', 'Johns Hopkins University',
    'Duke University', 'Northwestern University', 'University of California, San Diego',
    'University of Texas at Austin', 'Georgia Institute of Technology', 'University of Wisconsin-Madison',
    'University of Illinois Urbana-Champaign', 'University of Washington', 'University of Southern California',
    'New York University', 'Boston University', 'University of California, Davis',
    'University of Minnesota', 'Ohio State University', 'Purdue University',
    'University of North Carolina at Chapel Hill', 'Pennsylvania State University', 'University of Florida',
    'University of California, Irvine', 'University of Virginia', 'University of Maryland, College Park',
    'Texas A&M University', 'Michigan State University', 'University of California, Santa Barbara',
    'University of Pittsburgh', 'University of Rochester', 'University of Arizona',
    'University of Colorado Boulder', 'University of Iowa', 'Indiana University Bloomington',
    'Arizona State University', 'University of California, Riverside', 'Tufts University',
    'University of Oregon', 'University of Miami', 'Florida State University',
    'University of Delaware', 'University of Massachusetts Amherst', 'University of Connecticut',
    'Syracuse University', 'University of South Florida', 'Colorado State University',
    'Virginia Tech', 'Oregon State University', 'North Carolina State University',
    'University of Central Florida', 'University of Georgia', 'University of Kansas',
    'Washington State University', 'University of Tennessee', 'Auburn University',
    'University of Kentucky', 'University of Missouri', 'Rutgers University',
    'Temple University', 'Drexel University', 'Northeastern University',
    'Oxford University', 'Cambridge University', 'Imperial College London',
    'University College London', 'ETH Zurich', 'National University of Singapore',
    'University of Toronto', 'University of British Columbia', 'McGill University',
    'University of Sydney', 'University of Melbourne', 'University of Tokyo',
    'Seoul National University', 'Peking University', 'Tsinghua University'
  ];
  
  // Degrees for random generation
  const degrees = [
    'Bachelor of Science', 'Bachelor of Arts', 'Master of Science',
    'Master of Arts', 'Master of Business Administration', 'Associate Degree',
    'Doctor of Philosophy', 'Bachelor of Engineering',
    'Bachelor of Technology', 'Bachelor of Fine Arts', 'Bachelor of Commerce',
    'Bachelor of Business Administration', 'Bachelor of Computer Applications',
    'Bachelor of Education', 'Bachelor of Architecture', 'Bachelor of Medicine',
    'Bachelor of Law', 'Bachelor of Social Work', 'Bachelor of Nursing',
    'Bachelor of Pharmacy', 'Bachelor of Psychology', 'Bachelor of Journalism',
    'Bachelor of Music', 'Bachelor of Design', 'Bachelor of Economics',
    'Master of Engineering', 'Master of Technology', 'Master of Computer Applications',
    'Master of Commerce', 'Master of Education', 'Master of Architecture',
    'Master of Fine Arts', 'Master of Public Health', 'Master of Social Work',
    'Master of Public Administration', 'Master of Library Science', 'Master of Philosophy',
    'Master of Nursing', 'Master of Law', 'Master of Design',
    'Master of Economics', 'Master of Finance', 'Master of Information Technology',
    'Master of International Relations', 'Master of Journalism', 'Master of Marketing',
    'Doctor of Education', 'Doctor of Business Administration', 'Doctor of Medicine',
    'Doctor of Law', 'Doctor of Engineering', 'Doctor of Science',
    'Doctor of Psychology', 'Doctor of Social Work', 'Doctor of Public Health',
    'Doctor of Arts', 'Doctor of Music', 'Doctor of Nursing Practice',
    'Doctor of Physical Therapy', 'Doctor of Pharmacy', 'Doctor of Veterinary Medicine',
    'Executive MBA', 'Global MBA', 'Online MBA',
    'Professional Doctorate', 'Postgraduate Diploma', 'Graduate Certificate',
    'Higher National Diploma', 'Specialist Diploma', 'Advanced Diploma',
    'Professional Certificate', 'Technical Diploma', 'Vocational Certificate',
    'Foundation Degree', 'Integrated Master\'s', 'Joint Honours Degree',
    'Combined Honours Degree', 'Dual Degree', 'Double Major'
  ];
  
  // Fields of study for random generation
  const fields = [
    'Computer Science', 'Business Administration', 'Marketing', 'Finance',
    'Electrical Engineering', 'Psychology', 'Communications', 'Information Technology',
    'Graphic Design', 'Data Science', 'Human Resources', 'Economics',
    'Software Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering',
    'Biomedical Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Aerospace Engineering',
    'Materials Science', 'Physics', 'Chemistry', 'Biology',
    'Mathematics', 'Statistics', 'Actuarial Science', 'Accounting',
    'Management', 'Entrepreneurship', 'International Business', 'Supply Chain Management',
    'Operations Management', 'Project Management', 'Organizational Leadership', 'Strategic Management',
    'Digital Marketing', 'Public Relations', 'Advertising', 'Media Studies',
    'Journalism', 'Film Studies', 'Photography', 'Animation',
    'Game Design', 'Web Development', 'Mobile App Development', 'Database Administration',
    'Network Security', 'Cybersecurity', 'Artificial Intelligence', 'Machine Learning',
    'Blockchain Technology', 'Cloud Computing', 'Internet of Things', 'Big Data Analytics',
    'Clinical Psychology', 'Cognitive Psychology', 'Developmental Psychology', 'Social Psychology',
    'Neuroscience', 'Behavioral Science', 'Counseling Psychology', 'Organizational Psychology',
    'Architecture', 'Interior Design', 'Urban Planning', 'Landscape Architecture',
    'English Literature', 'Creative Writing', 'Linguistics', 'Foreign Languages',
    'History', 'Anthropology', 'Sociology', 'Political Science',
    'International Relations', 'Public Policy', 'Public Administration', 'Social Work',
    'Education', 'Early Childhood Education', 'Special Education', 'Educational Leadership',
    'Music', 'Theater', 'Dance', 'Visual Arts',
    'Fashion Design', 'Textile Design', 'Product Design', 'Industrial Design',
    'Medicine', 'Nursing', 'Pharmacy', 'Public Health',
    'Dentistry', 'Veterinary Medicine', 'Physical Therapy', 'Occupational Therapy',
    'Speech Therapy', 'Nutrition', 'Dietetics', 'Exercise Science',
    'Sports Management', 'Recreation Management', 'Tourism Management', 'Hospitality Management',
    'Culinary Arts', 'Food Science', 'Agricultural Science', 'Environmental Science',
    'Forestry', 'Wildlife Conservation', 'Marine Biology', 'Ecology',
    'Geology', 'Astronomy', 'Meteorology', 'Geography',
    'Law', 'Criminal Justice', 'Forensic Science', 'Paralegal Studies',
    'Philosophy', 'Religious Studies', 'Ethics', 'Cultural Studies',
    'Women\'s Studies', 'Gender Studies', 'Ethnic Studies', 'African American Studies'
  ];
  
  // Skills for random generation
  const skillsList = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Data Analysis',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving',
    'UX/UI Design', 'Agile Methodology', 'Marketing Strategy', 'Sales',
    'Customer Service', 'Content Creation', 'Social Media Management',
    'Financial Planning', 'Strategic Thinking', 'Team Building',
    'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust',
    'TypeScript', 'Angular', 'Vue.js', 'Next.js', 'Svelte', 'jQuery', 'Bootstrap', 'Tailwind CSS',
    'Material UI', 'Sass/SCSS', 'CSS3', 'HTML5', 'GraphQL', 'REST API', 'AWS', 'Azure',
    'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'JIRA', 'Confluence',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle', 'Redis', 'Elasticsearch', 'Firebase',
    'Django', 'Flask', 'Laravel', 'Spring Boot', 'Express.js', 'ASP.NET', 'Ruby on Rails',
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'R', 'MATLAB',
    'Tableau', 'Power BI', 'Google Analytics', 'Excel', 'PowerPoint', 'Word', 'Google Workspace',
    'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD', 'Figma', 'Sketch', 'InVision',
    'Premiere Pro', 'After Effects', 'Final Cut Pro', 'Blender', 'Unity', 'Unreal Engine',
    'SEO', 'SEM', 'PPC Advertising', 'Email Marketing', 'Content Marketing', 'Copywriting',
    'Blogging', 'Technical Writing', 'Public Speaking', 'Negotiation', 'Conflict Resolution',
    'Time Management', 'Organizational Skills', 'Critical Thinking', 'Analytical Skills',
    'Research', 'Data Visualization', 'Statistical Analysis', 'Forecasting', 'Budgeting',
    'Financial Analysis', 'Risk Management', 'Business Development', 'Client Relationship Management',
    'CRM Systems', 'Salesforce', 'HubSpot', 'Zoho', 'Shopify', 'WooCommerce', 'Magento',
    'WordPress', 'Webflow', 'Wix', 'Squarespace', 'Google Ads', 'Facebook Ads', 'LinkedIn Ads',
    'Networking', 'Mentoring', 'Coaching', 'Training', 'Recruiting', 'Performance Management',
    'Employee Relations', 'Benefits Administration', 'Payroll Management', 'Compensation Analysis',
    'HRIS Systems', 'Diversity & Inclusion', 'Change Management', 'Process Improvement',
    'Lean Six Sigma', 'Quality Assurance', 'Testing', 'Debugging', 'Responsive Design',
    'Mobile Development', 'Cross-platform Development', 'IoT Development', 'Blockchain',
    'Cryptocurrency', 'Smart Contracts', 'NFTs', 'AR/VR Development', 'Game Development',
    'Cybersecurity', 'Network Security', 'Penetration Testing', 'Cryptography', 'Identity Management',
    'DevOps', 'SysAdmin', 'Cloud Architecture', 'Microservices', 'Serverless Architecture',
    'CI/CD', 'Infrastructure as Code', 'Linux', 'Windows', 'macOS', 'Shell Scripting',
    'Bash', 'PowerShell', 'Automation', 'RPA', 'Machine Learning Operations (MLOps)',
    'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Deep Learning',
    'Generative AI', 'Data Engineering', 'ETL Processes', 'Data Warehousing', 'Business Intelligence',
    'Customer Experience', 'User Research', 'Usability Testing', 'Wireframing', 'Prototyping',
    'Animation', '3D Modeling', 'Video Editing', 'Audio Production', 'Music Production',
    'Podcast Production', 'Streaming', 'Virtual Events', 'Event Planning', 'Project Coordination',
    'Product Strategy', 'Product Roadmapping', 'Market Research', 'Competitive Analysis',
    'Brand Management', 'Brand Strategy', 'Corporate Communication', 'Crisis Management'
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
    'Negotiated contracts with vendors resulting in cost reductions.',
    'Architected and implemented scalable cloud-based solutions that reduced infrastructure costs by 30%.',
    'Developed and maintained RESTful APIs serving over 1 million requests daily.',
    'Refactored legacy codebase, resulting in 40% improvement in application performance.',
    'Led Agile transformation across multiple development teams, increasing delivery velocity by 25%.',
    'Implemented CI/CD pipelines that reduced deployment time from days to minutes.',
    'Designed and executed A/B tests that increased conversion rates by 15%.',
    'Created responsive web designs that improved mobile user engagement by 35%.',
    'Migrated on-premises infrastructure to cloud platforms, resulting in 50% reduction in operational costs.',
    'Built and deployed machine learning models that improved prediction accuracy by 28%.',
    'Integrated third-party APIs to enhance product functionality and user experience.',
    'Implemented security best practices that reduced vulnerability risk by 40%.',
    'Developed microservices architecture to replace monolithic application.',
    'Created data visualization dashboards that provided real-time insights to stakeholders.',
    'Optimized front-end performance, resulting in 60% faster page load times.',
    'Designed database schema that improved data integrity and query efficiency.',
    'Conducted code reviews and implemented best practices across development teams.',
    'Automated manual processes that saved 20+ hours of work per week.',
    'Developed and implemented content marketing strategies that increased organic traffic by 45%.',
    'Created SEO-optimized content that improved search engine rankings for key terms.',
    'Managed social media campaigns that increased follower engagement by 50%.',
    'Produced and edited video content that generated over 1 million views.',
    'Designed and executed email marketing campaigns with 25% above-industry-average open rates.',
    'Conducted user interviews that informed product development and feature prioritization.',
    'Created style guides and design systems that ensured brand consistency across platforms.',
    'Managed digital advertising campaigns that achieved 300% ROI.',
    'Analyzed user behavior data to identify opportunities for product improvements.',
    'Developed financial models for forecasting and budget planning.',
    'Prepared and presented quarterly financial reports to executive leadership.',
    'Managed accounts payable and accounts receivable processes.',
    'Conducted financial audits and implemented improved control procedures.',
    'Negotiated terms with suppliers that resulted in 15% cost reduction.',
    'Managed inventory systems that reduced stockouts by 30%.',
    'Implemented ERP system that integrated financial and operational data.',
    'Developed and executed strategic plans that achieved 20% year-over-year growth.',
    'Led cross-departmental initiatives that improved organizational efficiency.',
    'Conducted training sessions on new technologies and methodologies.',
    'Implemented diversity and inclusion initiatives that improved team dynamics.',
    'Created employee onboarding programs that reduced turnover by 15%.',
    'Managed recruitment processes that reduced time-to-hire by 30%.',
    'Developed performance management systems that aligned with company objectives.',
    'Created compensation structures that improved employee satisfaction and retention.',
    'Implemented HR policies and procedures that ensured compliance with regulations.',
    'Managed employee relations and resolved workplace conflicts.',
    'Developed and implemented customer support protocols that improved satisfaction ratings.',
    'Managed IT infrastructure and ensured 99.9% system uptime.',
    'Implemented data backup and disaster recovery procedures.',
    'Resolved technical issues with average response time of less than 2 hours.',
    'Developed user manuals and technical documentation for products.',
    'Created and delivered presentations to clients and stakeholders.',
    'Managed website content and ensured consistent brand messaging.',
    'Conducted quality assurance testing that reduced post-release defects by 35%.',
    'Implemented tracking systems for project milestones and deliverables.',
    'Managed budget allocations and tracked expenditures against forecasts.',
    'Developed partnerships with industry leaders that expanded market reach.',
    'Created pricing strategies that increased profit margins by 18%.',
    'Analyzed competitive landscape and identified market opportunities.',
    'Managed product launches that exceeded revenue targets by 25%.',
    'Implemented customer feedback systems that improved product development.',
    'Developed sales strategies that increased new customer acquisition by 40%.',
    'Managed CRM system implementation and data migration.',
    'Created reporting dashboards that provided insights into sales performance.',
    'Conducted sales training programs that improved team conversion rates.',
    'Managed key client accounts representing over $5 million in annual revenue.',
    'Negotiated enterprise contracts that expanded service offerings.',
    'Implemented lead generation strategies that increased qualified prospects by 60%.',
    'Developed upsell and cross-sell programs that increased customer lifetime value.',
    'Created customer retention strategies that reduced churn by 20%.',
    'Implemented sustainability initiatives that reduced carbon footprint.',
    'Developed community outreach programs that strengthened brand reputation.',
    'Created and managed budgets for departmental operations.',
    'Implemented process improvements that increased operational efficiency by 35%.',
    'Managed facilities and ensured compliance with safety regulations.',
    'Coordinated with external partners to deliver integrated solutions.',
    'Analyzed business requirements and translated them into technical specifications.',
    'Developed and maintained relationships with key industry influencers.',
    'Created and implemented brand guidelines across all marketing materials.',
    'Managed product roadmap and prioritized feature development.',
    'Conducted competitive analysis to inform product strategy.',
    'Implemented accessibility improvements that ensured WCAG compliance.',
    'Created internationalization framework that expanded product to 12 new markets.',
    'Developed mobile applications with over 500,000 downloads.',
    'Implemented data governance policies that ensured regulatory compliance.',
    'Created and executed content calendars for multi-channel marketing.',
    'Designed and implemented loyalty programs that increased repeat purchases by 30%.',
    'Managed crisis communications during company transitions.',
    'Developed internal communication strategies that improved employee engagement.',
    'Created risk management frameworks that identified and mitigated potential issues.',
    'Implemented knowledge management systems that improved information sharing.',
    'Managed vendor relationships and ensured delivery of contracted services.'
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
