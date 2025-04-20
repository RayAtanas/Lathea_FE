import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../../services/EmployeeService';
import { Employee } from '../../types/ProjectType';
import { getImageUrl, handleImageError } from '../../utils/ImageUtils';
import './TeamPage.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for team specialties
const LeadershipIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2A93D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="team-svg-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ResearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2A93D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="team-svg-icon">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const ConsultantIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2A93D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="team-svg-icon">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const OperationsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2A93D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="team-svg-icon">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#0077b5" stroke="none">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

// Avatar placeholder component
interface AvatarPlaceholderProps {
  name: string;
}

const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({ name }) => (
  <div className="member-image-placeholder">
    {name.split(' ').map((n: string) => n[0]).join('')}
  </div>
);

// Team Member Card Component with specialty badges
interface TeamMemberCardProps {
  employee: Employee;
  groupType: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ employee, groupType }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(!!employee.image);
  const [imageUrl, setImageUrl] = useState<string | null>(
    employee.image ? getImageUrl(employee.image) || null : null
  );

  // Handle image error
  const handleImageLoadError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageError(e, employee.image, (newUrl: string | null) => {
      if (newUrl) {
        setImageUrl(newUrl);
      } else {
        setImageLoaded(false);
      }
    });
  };

  // Format LinkedIn URL
  const getLinkedInUrl = (linkedIn: string): string => {
    if (!linkedIn) return '';
    return linkedIn.startsWith('http') ? linkedIn : `https://linkedin.com/in/${linkedIn}`;
  };

  // Get the appropriate icon based on team type
  const getTeamIcon = (): JSX.Element => {
    switch(groupType) {
      case 'Leadership Team': return <LeadershipIcon />;
      case 'Research Team': return <ResearchIcon />;
      case 'Consultants': return <ConsultantIcon />;
      case 'Operations': return <OperationsIcon />;
      default: return <OperationsIcon />;
    }
  };

  return (
    <div className="team-member-card">
      <div className="member-image-container">
        {imageLoaded && imageUrl ? (
          <img 
            src={imageUrl} 
            alt={employee.name} 
            className="member-image" 
            onError={handleImageLoadError}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <AvatarPlaceholder name={employee.name} />
        )}
       
      </div>
      <div className="member-details">
        <h3 className="member-name">{employee.name}</h3>
        {employee.title && <p className="member-title">{employee.title}</p>}
        
        {employee.skills && employee.skills.length > 0 && (
          <div className="member-skills">
            {employee.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}
        
        <div className="member-contact">
          <a href={`mailto:${employee.email}`} className="contact-link" aria-label={`Email ${employee.name}`}>
            <EmailIcon /> <span>{employee.email}</span>
          </a>
          
          {employee.phoneNumber && (
            <a href={`tel:${employee.phoneNumber}`} className="contact-link" aria-label={`Call ${employee.name}`}>
              <PhoneIcon /> <span>{employee.phoneNumber}</span>
            </a>
          )}
          
          {employee.linkedIn && (
            <a 
              href={getLinkedInUrl(employee.linkedIn)}
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link linkedin"
              aria-label={`${employee.name}'s LinkedIn Profile`}
            >
              <LinkedInIcon /> <span>Connect on LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Group Team Members by Type
const groupEmployeesByType = (employees: Employee[]): Record<string, Employee[]> => {
  // Create a simple categorization based on title
  const groups: Record<string, Employee[]> = {
    'Leadership Team': [],
    'Research Team': [],
    'Consultants': [],
    'Operations': []
  };
  
  employees.forEach(employee => {
    const title = (employee.title || '').toLowerCase();
    
    if (title.includes('ceo') || title.includes('cfo') || title.includes('director') || title.includes('head')) {
      groups['Leadership Team'].push(employee);
    } else if (title.includes('research') || title.includes('phd') || title.includes('analyst')) {
      groups['Research Team'].push(employee);
    } else if (title.includes('consult') || title.includes('advisor')) {
      groups['Consultants'].push(employee);
    } else {
      groups['Operations'].push(employee);
    }
  });
  
  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });
  
  return groups;
};

// Get section description based on team type
const getSectionDescription = (groupName: string): string => {
  switch(groupName) {
    case 'Leadership Team':
      return 'Our leadership team brings decades of combined experience in real estate, finance, and business management to guide our vision and strategy.';
    case 'Research Team':
      return 'Our research professionals analyze market trends, collect data, and generate insights that inform strategic decision-making.';
    case 'Consultants':
      return 'Our consultants work directly with clients to provide expert guidance and tailored solutions for complex real estate challenges.';
    case 'Operations':
      return 'Our operations team ensures the smooth execution of all projects and maintains the high standards that define our work.';
    default:
      return '';
  }
};

const TeamPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groupedEmployees, setGroupedEmployees] = useState<Record<string, Employee[]>>({});
  
  useEffect(() => {
    const fetchEmployees = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const fetchedEmployees = await getAllEmployees();
        setEmployees(fetchedEmployees);
        setGroupedEmployees(groupEmployeesByType(fetchedEmployees));
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Unable to load team members. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  // Function to check if element is in viewport
  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  };

  // Function to handle scroll and add visible class
  useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll<HTMLElement>('.fade-in');
      fadeElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
    };

    // Initial check on load
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="team-page">
      <Navbar/>
      <div className="team-header">
        <div className="team-header-content">
          <h1>Our Team</h1>
          <div className="header-divider"></div>
          <p className="team-intro">
            Dedicated team of experienced professionals and academic researchers who bring knowledge and expertise to the real estate industry. Coming from diversified fields and sectors, with a know how to tackle complex challenges and provide strategic advice tailored to your specific needs.
          </p>
          <p className="team-intro">
            In addition to practical experience, many members of our team hold Doctorate degrees and have conducted research in relevant areas ensuring that our clients benefit from the latest insights and best practices.
          </p>
          <p className="team-intro">
            At Lathea Group, our Team is dedicated to empowering you with the knowledge and support necessary to make informed decisions. devoted to guide you every step of the way, ensuring that your real estate choices are both successful and rewarding.
          </p>
        </div>
      </div>
      
      <div className="team-content">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="team-stats fade-in">
              <div className="stat-item">
                <div className="stat-number">{employees.length}</div>
                <div className="stat-label">Team Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{Object.keys(groupedEmployees).length}</div>
                <div className="stat-label">Departments</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          
            {Object.entries(groupedEmployees).map(([groupName, groupMembers]) => (
              <div key={groupName} className="team-section fade-in">
                <h2 className="team-section-title">{groupName}</h2>
                <p className="section-description">{getSectionDescription(groupName)}</p>
                <div className="team-members-grid">
                  {groupMembers.map((employee) => (
                    <TeamMemberCard 
                      key={employee.id} 
                      employee={employee} 
                      groupType={groupName}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamPage;