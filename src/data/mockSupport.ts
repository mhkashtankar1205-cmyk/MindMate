export interface SupportResource {
  id: string;
  title: string;
  category: 'Campus Counselor' | 'Helpline' | 'Peer Support' | 'Professional Therapy';
  description: string;
  contactInfo: string;
  availability: string;
  isEmergency?: boolean;
}

export const mockSupportResources: SupportResource[] = [
  {
    id: 'sup_1',
    title: 'University Wellness & Counseling Cell',
    category: 'Campus Counselor',
    description: 'Free confidential counseling for students enrolled at your college.',
    contactInfo: 'Building A, Room 204 | counselor@college.edu',
    availability: 'Mon - Fri (9:00 AM - 5:00 PM)',
  },
  {
    id: 'sup_2',
    title: 'National Tele-MANAS Student Mental Health Line',
    category: 'Helpline',
    description: '24/7 toll-free helpline providing confidential psychological support in multiple languages.',
    contactInfo: 'Toll-Free: 14416 / 1800 891 4416',
    availability: 'Available 24/7',
    isEmergency: true,
  },
  {
    id: 'sup_3',
    title: 'KIRAN Mental Health Rehabilitation Line',
    category: 'Helpline',
    description: 'Government helpline offering early screening, first-aid, psychological support, and stress management.',
    contactInfo: 'Toll-Free: 1800-599-0019',
    availability: 'Available 24/7',
    isEmergency: true,
  },
  {
    id: 'sup_4',
    title: 'Vandrevala Foundation Helpline',
    category: 'Helpline',
    description: 'Free professional mental health counseling and crisis intervention.',
    contactInfo: '+91 9999 666 555',
    availability: 'Available 24/7',
    isEmergency: true,
  },
  {
    id: 'sup_5',
    title: 'Student Peer Support Network',
    category: 'Peer Support',
    description: 'Trained senior student volunteers offering listening sessions and exam study support.',
    contactInfo: 'Student Activity Center | peerhelp@college.edu',
    availability: 'Mon - Sat (4:00 PM - 8:00 PM)',
  },
];
